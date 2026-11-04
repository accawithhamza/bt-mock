/**
 * ACCA with Hamza – Mock Portal : Google Sheet backend
 * --------------------------------------------------------------
 * Paste this whole file into Extensions > Apps Script of your Google Sheet.
 * Deploy > New deployment > Web app  (Execute as: Me, Who has access: Anyone)
 * After ANY change to this script: Deploy > Manage deployments > Edit (pencil)
 *   > Version: New version > Deploy  (the URL stays the same).
 *
 * Tabs created automatically:
 *   Users    – one row per student (passwords are stored only as secure hashes)
 *   Results  – one row per submitted mock (incl. retakes) with full analysis
 *   Photos   – profile pictures
 */
/* ====== YOUR SETTINGS ====== */
var ADMIN_PASSWORD = "HamzaACCA@01";   // <-- set your admin panel password here (keep it secret)
var PORTAL_URL = "https://accawithhamza.github.io/bt-mock";                 // <-- your site link, e.g. "https://yourname.github.io/bt-mock/" (used in emails)
var ADMIN_EMAIL = "hamzafaizanwar@gmail.com";                // leave "" to use your own Google account email
/* =========================== */

var USER_COLS = ["createdAt","userId","username","name","email","countryCode","phone","insta","examDates","lastLogin","salt","passHash","token"];
var SITE_NAME = "ACCA with Hamza – Mock Portal";

function doGet() { return out({ ok: true, message: "Mock Portal backend is running." }); }

var NO_LOCK = { me: 1, chatUnread: 1, chatPhoto: 1, adminData: 1 };
function doPost(e) {
  var lock = null;
  try {
    var peek = JSON.parse(e.postData.contents);
    if (!NO_LOCK[peek.action]) { lock = LockService.getScriptLock(); lock.waitLock(25000); }
    var d = JSON.parse(e.postData.contents);
    var fn = ACTIONS[d.action];
    if (!fn) throw new Error("Unknown action");
    return out(fn(d));
  } catch (err) {
    return out({ ok: false, error: String(err.message || err) });
  } finally {
    if (lock) lock.releaseLock();
  }
}

var ACTIONS = {
  register: function (d) {
    var email = clean(d.email).toLowerCase();
    var name = clean(d.name);
    if (!name) throw new Error("Please enter your name.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("Please enter a valid email address.");
    if (!d.passHash) throw new Error("Please set a password.");
    var insta = normInsta(d.insta);
    var username = normInsta(d.username) || insta || email;
    if (!/^[a-z0-9._@-]{3,60}$/.test(username)) throw new Error("Please choose a valid username.");
    var users = readUsers();
    users.forEach(function (u) {
      if (u.email === email) throw new Error("An account with this email already exists. Please log in.");
      if (u.username === username || u.email === username) throw new Error("This username is already taken. Please choose another.");
    });
    var salt = Utilities.getUuid();
    var u = {
      createdAt: new Date(), userId: "U" + Date.now().toString(36).toUpperCase(), username: username, name: name, email: email,
      countryCode: clean(d.countryCode), phone: clean(d.phone), insta: insta ? "@" + insta : "", examDates: "{}",
      lastLogin: new Date(), salt: salt, passHash: sha(salt + d.passHash), token: Utilities.getUuid()
    };
    usersSheet().appendRow(USER_COLS.map(function (c) { return c === "phone" && u.phone ? "'" + u.phone : u[c]; }));
    return { ok: true, token: u.token, user: pub(u), photo: "", history: [] };
  },

  login: function (d) {
    var id = normInsta(d.identifier) || "";
    var em = clean(d.identifier).toLowerCase();
    var u = readUsers().filter(function (x) { return x.username === id || x.email === em || x.username === em; })[0];
    if (!u || sha(u.salt + d.passHash) !== u.passHash) throw new Error("Incorrect username/email or password.");
    if (!u.token) { u.token = Utilities.getUuid(); setCell(u, "token", u.token); }
    setCell(u, "lastLogin", new Date());
    return { ok: true, token: u.token, user: pub(u), photo: getPhoto(u.userId), history: history(u.userId) };
  },

  me: function (d) {
    var u = auth(d.token);
    return { ok: true, user: pub(u), photo: getPhoto(u.userId), history: history(u.userId) };
  },

  forgot: function (d) {
    var u = findByIdentifier(d.identifier);
    if (!u) throw new Error("No account found with that email or username.");
    var otp = String(Math.floor(100000 + Math.random() * 900000));
    CacheService.getScriptCache().put("otp_" + u.userId, otp, 600);
    MailApp.sendEmail({
      to: u.email,
      subject: "Your password reset code – " + SITE_NAME,
      htmlBody: "<p>Hi " + u.name + ",</p><p>Your verification code is:</p><p style='font-size:28px;font-weight:bold;letter-spacing:4px;color:#6d1a2b'>" + otp +
        "</p><p>This code expires in 10 minutes. If you did not request this, you can ignore this email.</p><p>– " + SITE_NAME + "</p>"
    });
    return { ok: true, email: maskEmail(u.email) };
  },

  reset: function (d) {
    var u = findByIdentifier(d.identifier);
    if (!u) throw new Error("Account not found.");
    var c = CacheService.getScriptCache(), key = "otp_" + u.userId;
    if (!d.otp || c.get(key) !== String(d.otp).trim()) throw new Error("Invalid or expired code.");
    c.remove(key);
    var salt = Utilities.getUuid();
    setCell(u, "salt", salt); setCell(u, "passHash", sha(salt + d.passHash));
    u.token = Utilities.getUuid(); setCell(u, "token", u.token);
    return { ok: true, token: u.token, user: pub(u), photo: getPhoto(u.userId), history: history(u.userId) };
  },

  changePassword: function (d) {
    var u = auth(d.token);
    if (sha(u.salt + d.oldHash) !== u.passHash) throw new Error("Current password is incorrect.");
    var salt = Utilities.getUuid();
    setCell(u, "salt", salt); setCell(u, "passHash", sha(salt + d.newHash));
    u.token = Utilities.getUuid(); setCell(u, "token", u.token);
    return { ok: true, token: u.token };
  },

  updateProfile: function (d) {
    var u = auth(d.token);
    if (d.name !== undefined) { if (!clean(d.name)) throw new Error("Name cannot be empty."); setCell(u, "name", clean(d.name)); u.name = clean(d.name); }
    if (d.countryCode !== undefined) { setCell(u, "countryCode", clean(d.countryCode)); u.countryCode = clean(d.countryCode); }
    if (d.phone !== undefined) { setCell(u, "phone", d.phone ? "'" + clean(d.phone) : ""); u.phone = clean(d.phone); }
    if (d.insta !== undefined) { var i = normInsta(d.insta); setCell(u, "insta", i ? "@" + i : ""); u.insta = i ? "@" + i : ""; }
    return { ok: true, user: pub(u) };
  },

  setPhoto: function (d) {
    var u = auth(d.token);
    if (String(d.photo || "").length > 45000) throw new Error("Photo too large.");
    var sh = sheet("Photos", ["userId", "photo", "updatedAt"]);
    var ids = sh.getRange(1, 1, sh.getLastRow(), 1).getValues().map(function (r) { return r[0]; });
    var i = ids.indexOf(u.userId);
    if (i > 0) sh.getRange(i + 1, 2, 1, 2).setValues([[d.photo, new Date()]]);
    else sh.appendRow([u.userId, d.photo, new Date()]);
    return { ok: true };
  },

  setExamDate: function (d) {
    var u = auth(d.token);
    var dates = parse(u.examDates, {});
    dates[d.paper] = d.date || "";
    setCell(u, "examDates", JSON.stringify(dates));
    u.examDates = JSON.stringify(dates);
    return { ok: true, user: pub(u) };
  },

  saveResult: function (d) {
    var u = auth(d.token);
    var r = d.result || {};
    var row = { submittedAt: r.submittedAt || new Date(), attemptId: r.attemptId, userId: u.userId, username: u.username, name: u.name, email: u.email,
                phone: u.phone ? (u.countryCode || "") + " " + u.phone : "", insta: u.insta };
    Object.keys(r).forEach(function (k) { if (row[k] === undefined) row[k] = r[k]; });
    row.detail = JSON.stringify(d.detail || {});
    var sh = sheet("Results", []);
    // ignore duplicates (same attempt re-sent)
    if (sh.getLastRow() > 1) {
      var hdr = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0], ai = hdr.indexOf("attemptId");
      if (ai >= 0 && sh.getRange(2, ai + 1, sh.getLastRow() - 1, 1).getValues().some(function (x) { return x[0] === row.attemptId; })) return { ok: true, dup: true };
    }
    appendDynamic(sh, row);
    return { ok: true };
  }
};

/* ---------------- helpers ---------------- */
function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function clean(s) { return String(s == null ? "" : s).trim(); }
function normInsta(s) { return clean(s).replace(/^@+/, "").toLowerCase(); }
function parse(s, d) { try { return JSON.parse(s); } catch (e) { return d; } }
function sha(s) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, s, Utilities.Charset.UTF_8)
    .map(function (b) { return ("0" + (b & 255).toString(16)).slice(-2); }).join("");
}
function maskEmail(e) { var p = e.split("@"); return p[0].slice(0, 2) + "***@" + p[1]; }
function sheet(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    if (headers.length) styleHeader(sh, headers);
  }
  return sh;
}
function styleHeader(sh, headers) {
  sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground("#6d1a2b").setFontColor("#ffffff");
  sh.setFrozenRows(1);
}
function usersSheet() { return sheet("Users", USER_COLS); }
function readUsers() {
  var sh = usersSheet(), n = sh.getLastRow();
  if (n < 2) return [];
  return sh.getRange(2, 1, n - 1, USER_COLS.length).getValues().map(function (r, i) {
    var o = { _row: i + 2 }; USER_COLS.forEach(function (c, j) { o[c] = c === "phone" || c === "insta" ? String(r[j]) : r[j]; });
    o.username = String(o.username); o.email = String(o.email); return o;
  });
}
function setCell(u, col, val) { usersSheet().getRange(u._row, USER_COLS.indexOf(col) + 1).setValue(val); }
function auth(token) {
  if (!token) throw new Error("Please log in again.");
  var u = readUsers().filter(function (x) { return x.token === token; })[0];
  if (!u) throw new Error("Your session has expired. Please log in again.");
  return u;
}
function findByIdentifier(idf) {
  var id = normInsta(idf), em = clean(idf).toLowerCase();
  return readUsers().filter(function (x) { return x.username === id || x.email === em || x.username === em; })[0];
}
function pub(u) {
  return { userId: u.userId, username: u.username, name: u.name, email: u.email, countryCode: u.countryCode, phone: u.phone,
           insta: u.insta, examDates: parse(u.examDates, {}), createdAt: u.createdAt };
}
function getPhoto(userId) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Photos");
  if (!sh || sh.getLastRow() < 2) return "";
  var v = sh.getRange(2, 1, sh.getLastRow() - 1, 2).getValues().filter(function (r) { return r[0] === userId; })[0];
  return v ? v[1] : "";
}
function history(userId) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Results");
  if (!sh || sh.getLastRow() < 2) return [];
  var vals = sh.getDataRange().getValues(), h = vals[0];
  var ix = function (k) { return h.indexOf(k); };
  return vals.slice(1).filter(function (r) { return r[ix("userId")] === userId; }).map(function (r) {
    var at = r[ix("submittedAt")];
    return { attemptId: r[ix("attemptId")], submittedAt: at instanceof Date ? at.toISOString() : at, paper: r[ix("paper")], mock: r[ix("mock")],
             mockKey: r[ix("mockKey")], score: r[ix("score")], result: r[ix("result")], detail: parse(r[ix("detail")], {}) };
  });
}
function appendDynamic(sh, obj) {
  var headers = sh.getLastColumn() ? sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0] : [];
  var changed = false;
  Object.keys(obj).forEach(function (k) { if (headers.indexOf(k) === -1) { headers.push(k); changed = true; } });
  if (changed) styleHeader(sh, headers);
  sh.appendRow(headers.map(function (h) { var v = obj[h]; return v === undefined || v === null ? "" : v; }));
}

/** Run this once from the editor to grant email permission (sends you a test email). */
function authorizeEmail() {
  MailApp.sendEmail(Session.getEffectiveUser().getEmail(), "Mock Portal – email test", "Email permission is working.");
}


/* =====================================================================
   SUPPORT CHAT  (Messages tab + private photos in your Google Drive)
   ===================================================================== */
var MSG_COLS = ["msgId", "at", "userId", "from", "text", "photoId", "readAdmin", "readStudent"];
function msgSheet() { return sheet("Messages", MSG_COLS); }
function readMsgs(userId) {
  var sh = msgSheet(), n = sh.getLastRow();
  if (n < 2) return [];
  return sh.getRange(2, 1, n - 1, MSG_COLS.length).getValues().map(function (r, i) {
    var o = { _row: i + 2 }; MSG_COLS.forEach(function (c, j) { o[c] = r[j]; });
    o.at = o.at instanceof Date ? o.at.toISOString() : String(o.at); return o;
  }).filter(function (m) { return !userId || m.userId === userId; });
}
function pubMsg(m) { return { id: m.msgId, at: m.at, from: m.from, text: String(m.text || ""), photo: m.photoId ? 1 : 0 }; }
function markRead(msgs, fromWho, col) {
  var sh = msgSheet(), ci = MSG_COLS.indexOf(col) + 1;
  msgs.forEach(function (m) { if (m.from === fromWho && m[col] !== true) sh.getRange(m._row, ci).setValue(true); });
}
function chatFolder() {
  var p = PropertiesService.getScriptProperties(), id = p.getProperty("chatFolder");
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) {} }
  var f = DriveApp.createFolder("Mock Portal – chat photos (private)");
  p.setProperty("chatFolder", f.getId()); return f;
}
function savePhoto(dataUrl) {
  if (!dataUrl) return "";
  var b64 = String(dataUrl).split(",")[1] || "";
  if (b64.length > 3000000) throw new Error("Photo is too large.");
  var blob = Utilities.newBlob(Utilities.base64Decode(b64), "image/jpeg", "chat_" + Date.now() + ".jpg");
  return chatFolder().createFile(blob).getId();
}
function addMsg(userId, from, text, photo) {
  text = clean(text).slice(0, 2000);
  if (!text && !photo) throw new Error("Message is empty.");
  var m = { msgId: "M" + Date.now().toString(36) + Math.floor(Math.random() * 1000), at: new Date().toISOString(), userId: userId, from: from,
            text: text, photoId: savePhoto(photo), readAdmin: from === "admin", readStudent: from === "student" };
  msgSheet().appendRow(MSG_COLS.map(function (c) { return m[c]; }));
  return m;
}
function throttled(key, fn) {
  var c = CacheService.getScriptCache();
  if (c.get(key)) return;
  c.put(key, "1", 1800);
  try { fn(); } catch (e) {}
}
function adminEmail() { return ADMIN_EMAIL || Session.getEffectiveUser().getEmail(); }

/* ---- student ---- */
ACTIONS.chatList = function (d) {
  var u = auth(d.token), msgs = readMsgs(u.userId);
  markRead(msgs, "admin", "readStudent");
  return { ok: true, messages: msgs.map(pubMsg) };
};
ACTIONS.chatUnread = function (d) {
  var u = auth(d.token);
  return { ok: true, unread: readMsgs(u.userId).filter(function (m) { return m.from === "admin" && m.readStudent !== true; }).length };
};
ACTIONS.chatSend = function (d) {
  var u = auth(d.token), m = addMsg(u.userId, "student", d.text, d.photo);
  throttled("alertA_" + u.userId, function () {
    MailApp.sendEmail({ to: adminEmail(), subject: "New message from " + u.name + " – " + SITE_NAME,
      htmlBody: "<p><b>" + u.name + "</b> (" + u.username + ", " + u.email + ") sent you a message:</p><blockquote>" +
        (m.text ? m.text.replace(/</g, "&lt;") : "[photo]") + "</blockquote><p>Reply from your admin panel" + (PORTAL_URL ? ": " + PORTAL_URL + "admin.html" : ".") + "</p>" });
  });
  return { ok: true, message: pubMsg(m) };
};
ACTIONS.chatPhoto = function (d) {
  var m = readMsgs().filter(function (x) { return x.msgId === d.id; })[0];
  if (!m || !m.photoId) throw new Error("Photo not found.");
  if (d.atoken) adminAuth(d.atoken); else if (auth(d.token).userId !== m.userId) throw new Error("Not allowed.");
  var bytes = DriveApp.getFileById(m.photoId).getBlob().getBytes();
  return { ok: true, data: "data:image/jpeg;base64," + Utilities.base64Encode(bytes) };
};

/* =====================================================================
   ADMIN PANEL
   ===================================================================== */
function adminAuth(t) {
  var p = PropertiesService.getScriptProperties();
  if (!t || t !== p.getProperty("adminToken") || Date.now() > Number(p.getProperty("adminExp") || 0)) throw new Error("Admin session expired. Please log in again.");
}
ACTIONS.adminLogin = function (d) {
  if (ADMIN_PASSWORD === "CHANGE_ME" || !ADMIN_PASSWORD) throw new Error("Set ADMIN_PASSWORD in Code.gs first, then deploy a new version.");
  if (String(d.password) !== ADMIN_PASSWORD) { Utilities.sleep(1500); throw new Error("Wrong admin password."); }
  var p = PropertiesService.getScriptProperties(), t = Utilities.getUuid();
  p.setProperty("adminToken", t); p.setProperty("adminExp", String(Date.now() + 7 * 864e5));
  return { ok: true, atoken: t };
};
ACTIONS.adminData = function (d) {
  adminAuth(d.atoken);
  var users = readUsers().map(function (u) { var o = pub(u); o.lastLogin = u.lastLogin instanceof Date ? u.lastLogin.toISOString() : u.lastLogin;
    o.createdAt = u.createdAt instanceof Date ? u.createdAt.toISOString() : u.createdAt; return o; });
  var results = [], sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Results");
  if (sh && sh.getLastRow() > 1) {
    var v = sh.getDataRange().getValues(), h = v[0];
    results = v.slice(1).map(function (r) { var o = {}; h.forEach(function (k, i) { if (k !== "detail") o[k] = r[i] instanceof Date ? r[i].toISOString() : r[i]; }); return o; });
  }
  var convos = {};
  readMsgs().forEach(function (m) {
    var c = convos[m.userId] = convos[m.userId] || { userId: m.userId, count: 0, unread: 0, last: null };
    c.count++; if (m.from === "student" && m.readAdmin !== true) c.unread++;
    c.last = { at: m.at, from: m.from, text: m.text ? String(m.text).slice(0, 80) : "📷 Photo" };
  });
  return { ok: true, users: users, results: results, convos: Object.keys(convos).map(function (k) { return convos[k]; }) };
};
ACTIONS.adminChat = function (d) {
  adminAuth(d.atoken);
  var msgs = readMsgs(d.userId); markRead(msgs, "student", "readAdmin");
  return { ok: true, messages: msgs.map(pubMsg) };
};
ACTIONS.adminSend = function (d) {
  adminAuth(d.atoken);
  var u = readUsers().filter(function (x) { return x.userId === d.userId; })[0];
  if (!u) throw new Error("Student not found.");
  var m = addMsg(u.userId, "admin", d.text, d.photo);
  throttled("alertS_" + u.userId, function () {
    MailApp.sendEmail({ to: u.email, subject: "You have a new message from Hamza – " + SITE_NAME,
      htmlBody: "<p>Hi " + u.name + ",</p><p>Hamza has sent you a message on the Mock Portal. Log in to read and reply" +
        (PORTAL_URL ? ": <a href='" + PORTAL_URL + "'>" + PORTAL_URL + "</a>" : ".") + "</p><p>– " + SITE_NAME + "</p>" });
  });
  return { ok: true, message: pubMsg(m) };
};

/** Run once from the editor to approve Google Drive access (for chat photos). */
function authorizeDrive() { chatFolder(); }
