/* =====================================================================
   ACCA with Hamza – Admin panel
   ===================================================================== */
"use strict";
const C = window.CONFIG;
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} }
};
let AT = store.get("ah_admin", null), D = { users: [], results: [], convos: [] }, TAB = "overview", POLL = null, CHATPOLL = null;
const dt = v => v ? new Date(v).toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "–";
const dd = v => v ? new Date(v).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "–";
const initials = n => (n || "?").split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("");
const userById = id => D.users.find(u => u.userId === id) || { name: "Unknown student", username: "", userId: id };

async function api(action, data = {}) {
  if (!/^https?:\/\//.test(C.APPS_SCRIPT_URL)) throw new Error("APPS_SCRIPT_URL is missing in config.js.");
  let r; try { r = await fetch(C.APPS_SCRIPT_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(Object.assign({ action, atoken: AT }, data)) }); }
  catch (e) { throw new Error("Network error – check your internet connection."); }
  const j = await r.json();
  if (!j.ok) { if (/admin session/i.test(j.error || "")) { logout(); } throw new Error(j.error || "Something went wrong."); }
  return j;
}
function modal(title, body, wide) {
  $("#ovl").innerHTML = `<div class="ov"><div class="modal" style="${wide ? "max-width:900px" : ""}"><div class="mh">${esc(title)}<button data-x aria-label="Close">×</button></div><div class="mb">${body}</div></div></div>`;
  $("#ovl [data-x]").onclick = () => $("#ovl").innerHTML = "";
  $("#ovl .ov").onclick = e => { if (e.target.classList.contains("ov")) $("#ovl").innerHTML = ""; };
}
function toast(m) { const t = document.createElement("div"); t.className = "toast"; t.textContent = m; document.body.appendChild(t); setTimeout(() => t.remove(), 2600); }

/* ---------- login ---------- */
function showLogin(msg) {
  $("#app").classList.add("hide"); const a = $("#auth"); a.classList.remove("hide");
  a.innerHTML = `<div class="authbox view"><div class="brand"><img class="logo-img" src="${C.LOGO}" style="width:3.2rem;height:3.2rem" alt=""><div><b>Admin panel</b><span>${esc(C.SITE_TITLE)}</span></div></div>
    <div class="card"><h1>Admin log in</h1><form id="lf"><label class="f" for="ap">Admin password</label><input class="in" type="password" id="ap" autocomplete="current-password">
    <div id="lm">${msg ? `<div class="msg e">${esc(msg)}</div>` : ""}</div><button class="btn block" style="margin-top:.8rem" type="submit">Log in</button></form></div></div>`;
  $("#lf").onsubmit = async e => {
    e.preventDefault(); const b = e.target.querySelector("button"); b.disabled = true; b.textContent = "Checking…";
    try { const j = await api("adminLogin", { password: $("#ap").value }); AT = j.atoken; store.set("ah_admin", AT); start(); }
    catch (err) { $("#lm").innerHTML = `<div class="msg e">${esc(err.message)}</div>`; b.disabled = false; b.textContent = "Log in"; }
  };
}
function logout() { store.del("ah_admin"); AT = null; clearInterval(POLL); clearInterval(CHATPOLL); showLogin(); }

/* ---------- shell ---------- */
async function start() {
  $("#auth").classList.add("hide"); $("#app").classList.remove("hide");
  $("#aLogo").src = C.LOGO;
  $("#aout").onclick = logout;
  $("#refresh").onclick = () => refresh(true);
  $("#view").innerHTML = `<div class="empty">Loading data…</div>`;
  await refresh();
  clearInterval(POLL); POLL = setInterval(() => { if (!document.hidden) refresh(); }, 30000);
}
async function refresh(manual) {
  try { const j = await api("adminData"); D = j; drawTabs(); if (TAB !== "inbox" || manual || !$("#thread")) show(TAB); else drawConvoList(); if (manual) toast("Data refreshed"); }
  catch (e) { if (AT) $("#view").innerHTML = `<div class="msg e">${esc(e.message)}</div>`; }
}
function drawTabs() {
  const unread = D.convos.reduce((a, c) => a + c.unread, 0);
  const tabs = [["overview", "Overview"], ["students", "Students"], ["results", "Results"], ["inbox", "Inbox" + (unread ? ` <span class="badge-n">${unread}</span>` : "")]];
  $("#tabs").innerHTML = tabs.map(t => `<button class="atab ${TAB === t[0] ? "on" : ""}" data-t="${t[0]}">${t[1]}</button>`).join("");
  $("#tabs").querySelectorAll("[data-t]").forEach(b => b.onclick = () => show(b.dataset.t));
  document.title = (unread ? `(${unread}) ` : "") + "Admin – ACCA with Hamza";
}
function show(t) {
  TAB = t; clearInterval(CHATPOLL); drawTabs();
  ({ overview: vOverview, students: vStudents, results: vResults, inbox: vInbox })[t]();
}
function setView(h) { $("#view").innerHTML = `<div class="view">${h}</div>`; }

/* ---------- overview ---------- */
function vOverview() {
  const U = D.users, R = D.results, week = Date.now() - 7 * 864e5;
  const scores = R.map(r => +r.score).filter(n => !isNaN(n));
  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : "–";
  const pass = scores.length ? Math.round(scores.filter(s => s >= C.PASS_MARK).length / scores.length * 100) + "%" : "–";
  const unread = D.convos.reduce((a, c) => a + c.unread, 0);
  let h = `<h1>Overview</h1><div class="grid g4" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">
    <div class="stat"><b>${U.length}</b><span>Registered students</span></div>
    <div class="stat"><b>${U.filter(u => new Date(u.createdAt) > week).length}</b><span>New this week</span></div>
    <div class="stat"><b>${R.length}</b><span>Mocks taken (incl. retakes)</span></div>
    <div class="stat"><b>${avg}${avg !== "–" ? "%" : ""}</b><span>Average score</span></div>
    <div class="stat"><b>${pass}</b><span>Pass rate</span></div>
    <div class="stat" style="cursor:pointer" id="unreadTile"><b>${unread}</b><span>Unread messages</span></div></div>`;
  // class-wide weakest areas per paper
  C.PAPERS.forEach(p => {
    const rs = R.filter(r => r.paper === p.code); if (!rs.length) return;
    const SY = (window.SYLLABUS || {})[p.code]; if (!SY) return;
    h += `<div class="card" style="margin-top:1rem"><h2>${p.code} – class average by syllabus area</h2>`;
    Object.keys(SY.areas).forEach(a => {
      const v = rs.map(r => r["Area " + a + " %"]).filter(x => x !== "" && x != null).map(Number);
      if (!v.length) return; const m = Math.round(v.reduce((x, y) => x + y, 0) / v.length), c = m >= 70 ? "var(--ok)" : m >= 50 ? "var(--gold)" : "var(--bad)";
      h += `<div class="bar"><span><b>${a}</b> ${esc(SY.areas[a])}</span><div class="track"><div class="fill" style="width:${m}%;background:${c}"></div><div class="passline"></div></div><span><b>${m}%</b></span></div>`;
    });
    h += `<p class="small mut" style="margin-bottom:0">Average of ${rs.length} attempt(s) – shows which topics to cover in your sessions.</p></div>`;
  });
  const recentU = U.slice().sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))).slice(0, 8);
  const recentR = R.slice().sort((a, b) => String(b.submittedAt).localeCompare(String(a.submittedAt))).slice(0, 8);
  h += `<div class="grid g2" style="margin-top:1rem"><div class="card"><h2>Latest sign-ups</h2>${recentU.length ? `<table class="t">${recentU.map(u => `<tr class="click" data-u="${u.userId}"><td><b>${esc(u.name)}</b><div class="small mut">${esc(u.username)}</div></td><td class="small">${dd(u.createdAt)}</td></tr>`).join("")}</table>` : `<div class="empty">No students yet.</div>`}</div>
    <div class="card"><h2>Latest mock results</h2>${recentR.length ? `<table class="t">${recentR.map((r, i) => `<tr class="click" data-r="${i}"><td><b>${esc(r.name)}</b><div class="small mut">${esc(r.paper)} · ${esc(r.mock)}</div></td><td><span class="pill ${r.score >= C.PASS_MARK ? "p" : "f"}">${r.score}%</span></td><td class="small">${dd(r.submittedAt)}</td></tr>`).join("")}</table>` : `<div class="empty">No mocks taken yet.</div>`}</div></div>`;
  setView(h);
  $("#unreadTile").onclick = () => show("inbox");
  document.querySelectorAll("[data-u]").forEach(r => r.onclick = () => studentModal(r.dataset.u));
  document.querySelectorAll("[data-r]").forEach(r => r.onclick = () => resultModal(recentR[+r.dataset.r]));
}

/* ---------- students ---------- */
function vStudents() {
  setView(`<h1>Students</h1><div class="toolbar"><input class="in" id="sq" placeholder="Search name, username, email, phone, Instagram…"><span class="small mut" id="sc"></span></div><div class="card" style="padding:.6rem"><div class="tscroll" id="st"></div></div>`);
  const draw = () => {
    const q = $("#sq").value.trim().toLowerCase();
    const list = D.users.filter(u => !q || [u.name, u.username, u.email, u.phone, u.insta].join(" ").toLowerCase().includes(q))
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    $("#sc").textContent = `${list.length} of ${D.users.length} students`;
    $("#st").innerHTML = list.length ? `<table class="t"><tr><th>Name</th><th>Username</th><th>Email</th><th>Phone</th><th>Instagram</th><th>Joined</th><th>Mocks</th><th>Best</th></tr>` + list.map(u => {
      const rs = D.results.filter(r => r.userId === u.userId), best = rs.length ? Math.max(...rs.map(r => +r.score || 0)) + "%" : "–";
      return `<tr class="click" data-u="${u.userId}"><td><b>${esc(u.name)}</b></td><td>${esc(u.username)}</td><td>${esc(u.email)}</td><td>${u.phone ? esc((u.countryCode || "") + " " + u.phone) : "–"}</td><td>${esc(u.insta || "–")}</td><td class="small">${dd(u.createdAt)}</td><td>${rs.length}</td><td>${best}</td></tr>`;
    }).join("") + `</table>` : `<div class="empty">No students found.</div>`;
    document.querySelectorAll("#st [data-u]").forEach(r => r.onclick = () => studentModal(r.dataset.u));
  };
  $("#sq").oninput = draw; draw();
}
function studentModal(id) {
  const u = userById(id), rs = D.results.filter(r => r.userId === id).sort((a, b) => String(b.submittedAt).localeCompare(String(a.submittedAt)));
  const dates = Object.entries(u.examDates || {});
  modal(u.name, `<div style="display:flex;gap:1rem;align-items:center;margin-bottom:1rem"><div class="av" style="width:3.4rem;height:3.4rem;font-size:1.1rem">${esc(initials(u.name))}</div><div style="flex:1"><h2 style="margin:0">${esc(u.name)}</h2><div class="small mut">${esc(u.username)}</div></div><button class="btn gold" id="msgBtn">💬 Message</button></div>
    <div class="kv"><span>Email</span><span>${esc(u.email)}</span><span>Phone</span><span>${u.phone ? esc((u.countryCode || "") + " " + u.phone) : "–"}</span><span>Instagram</span><span>${u.insta ? `<a href="https://instagram.com/${esc(String(u.insta).replace("@", ""))}" target="_blank" rel="noopener">${esc(u.insta)}</a>` : "–"}</span>
    <span>Joined</span><span>${dt(u.createdAt)}</span><span>Last login</span><span>${dt(u.lastLogin)}</span><span>Exam dates</span><span>${dates.length ? dates.map(([c, d]) => `${c}: ${d ? dd(d + "T00:00:00") : "not booked"}`).join(" · ") : "–"}</span></div>
    <h3 style="margin-top:1.2rem">Mock attempts (${rs.length})</h3>${rs.length ? `<div class="tscroll"><table class="t"><tr><th>Date</th><th>Mock</th><th>Score</th><th>Result</th><th>Weak chapters</th></tr>${rs.map((r, i) => `<tr class="click" data-r="${i}"><td class="small">${dt(r.submittedAt)}</td><td>${esc(r.paper)} ${esc(r.mock)}</td><td><b>${r.score}%</b></td><td><span class="pill ${r.score >= C.PASS_MARK ? "p" : "f"}">${esc(r.result)}</span></td><td class="small">${esc(r.weakChapters || "–")}</td></tr>`).join("")}</table></div><p class="small mut">Click an attempt to see its full analysis and recommendations.</p>` : `<div class="empty">No attempts yet.</div>`}`, true);
  $("#msgBtn").onclick = () => { $("#ovl").innerHTML = ""; openConvo(id); };
  document.querySelectorAll("#ovl [data-r]").forEach(r => r.onclick = () => resultModal(rs[+r.dataset.r]));
}

/* ---------- results ---------- */
function vResults() {
  const papers = [...new Set(D.results.map(r => r.paper))], mocks = [...new Set(D.results.map(r => r.mock))];
  setView(`<h1>Results</h1><div class="toolbar"><input class="in" id="rq" placeholder="Search student…">
    <select class="in" id="rp"><option value="">All papers</option>${papers.map(p => `<option>${esc(p)}</option>`).join("")}</select>
    <select class="in" id="rm"><option value="">All mocks</option>${mocks.map(p => `<option>${esc(p)}</option>`).join("")}</select>
    <select class="in" id="rr"><option value="">Pass & fail</option><option>PASS</option><option>FAIL</option></select><span class="small mut" id="rc"></span></div>
    <div class="card" style="padding:.6rem"><div class="tscroll" id="rt"></div></div>`);
  const draw = () => {
    const q = $("#rq").value.trim().toLowerCase(), fp = $("#rp").value, fm = $("#rm").value, fr = $("#rr").value;
    const list = D.results.filter(r => (!q || [r.name, r.username, r.email].join(" ").toLowerCase().includes(q)) && (!fp || r.paper === fp) && (!fm || r.mock === fm) && (!fr || r.result === fr))
      .sort((a, b) => String(b.submittedAt).localeCompare(String(a.submittedAt)));
    const sc = list.map(r => +r.score || 0);
    $("#rc").textContent = `${list.length} attempt(s)` + (sc.length ? ` · average ${Math.round(sc.reduce((a, b) => a + b, 0) / sc.length)}%` : "");
    $("#rt").innerHTML = list.length ? `<table class="t"><tr><th>Date</th><th>Student</th><th>Paper / mock</th><th>Score</th><th>Result</th><th>Attempted</th><th>Time</th></tr>` + list.map((r, i) =>
      `<tr class="click" data-i="${i}"><td class="small">${dt(r.submittedAt)}</td><td><b>${esc(r.name)}</b><div class="small mut">${esc(r.username)}</div></td><td>${esc(r.paper)} · ${esc(r.mock)}</td><td><b>${r.score}%</b></td><td><span class="pill ${r.score >= C.PASS_MARK ? "p" : "f"}">${esc(r.result)}</span></td><td>${esc(r.attempted)}</td><td>${esc(r.timeTakenMin)} min</td></tr>`).join("") + `</table>` : `<div class="empty">No results match.</div>`;
    document.querySelectorAll("#rt [data-i]").forEach(t => t.onclick = () => resultModal(list[+t.dataset.i]));
  };
  ["#rq", "#rp", "#rm", "#rr"].forEach(s => $(s).oninput = draw); draw();
}
function resultModal(r) {
  const skip = ["recommendations", "weakTopics", "weakChapters", "userId", "attemptId", "detail"];
  modal(`${r.name} – ${r.paper} ${r.mock}`, `<div class="kv">${Object.keys(r).filter(k => !skip.includes(k) && r[k] !== "").map(k => `<span>${esc(k)}</span><span>${k === "submittedAt" ? dt(r[k]) : esc(r[k])}</span>`).join("")}</div>
    <h3 style="margin-top:1rem">Weak chapters</h3><p class="small">${esc(r.weakChapters || "–")}</p>
    <h3>Weak topics</h3><p class="small">${esc(r.weakTopics || "–")}</p>
    <h3>Recommendations given</h3><div class="small" style="white-space:pre-wrap;background:var(--card2);padding:.7rem;border-radius:8px">${esc(r.recommendations || "–")}</div>
    <div style="margin-top:1rem"><button class="btn gold" id="rmMsg">💬 Message ${esc(String(r.name).split(" ")[0])}</button></div>`, true);
  $("#rmMsg").onclick = () => { $("#ovl").innerHTML = ""; openConvo(r.userId); };
}

/* ---------- inbox ---------- */
let OPEN = null, THREAD = [], PHOTO = "";
function vInbox() {
  setView(`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.8rem"><h1 style="margin:0">Inbox</h1><button class="btn gold" id="newMsg">+ New message</button></div>
    <div class="inbox"><div class="clist" id="clist"></div><div class="thread" id="thread"><div class="empty" style="margin:auto">Select a conversation, or start a new one.</div></div></div>`);
  $("#newMsg").onclick = pickStudent;
  drawConvoList();
  if (OPEN) openConvo(OPEN);
}
function drawConvoList() {
  const box = $("#clist"); if (!box) return;
  const list = D.convos.slice().sort((a, b) => String(b.last.at).localeCompare(String(a.last.at)));
  if (OPEN && !list.some(c => c.userId === OPEN)) list.unshift({ userId: OPEN, unread: 0, last: { at: new Date().toISOString(), from: "admin", text: "New conversation" } });
  box.innerHTML = list.length ? list.map(c => { const u = userById(c.userId); return `<div class="citem ${OPEN === c.userId ? "on" : ""}" data-c="${c.userId}"><div class="av">${esc(initials(u.name))}</div><div style="min-width:0;flex:1"><div style="display:flex;justify-content:space-between;gap:.4rem"><span class="nm">${esc(u.name)}</span><span class="small mut">${new Date(c.last.at).toLocaleDateString(undefined, { day: "numeric", month: "short" })}</span></div><div class="pv">${c.last.from === "admin" ? "You: " : ""}${esc(c.last.text)}</div></div>${c.unread ? `<span class="badge-n">${c.unread}</span>` : ""}</div>`; }).join("")
    : `<div class="empty">No messages yet. Students can message you from their portal, or click "+ New message".</div>`;
  box.querySelectorAll("[data-c]").forEach(el => el.onclick = () => openConvo(el.dataset.c));
}
function pickStudent() {
  modal("New message – choose a student", `<input class="in" id="pq" placeholder="Search name, username or email…"><div id="pl" style="margin-top:.6rem;max-height:50vh;overflow:auto"></div>`);
  const draw = () => {
    const q = $("#pq").value.trim().toLowerCase();
    $("#pl").innerHTML = D.users.filter(u => !q || [u.name, u.username, u.email].join(" ").toLowerCase().includes(q)).slice(0, 50)
      .map(u => `<div class="citem" data-p="${u.userId}"><div class="av">${esc(initials(u.name))}</div><div><div class="nm">${esc(u.name)}</div><div class="pv">${esc(u.username)} · ${esc(u.email)}</div></div></div>`).join("") || `<div class="empty">No students found.</div>`;
    document.querySelectorAll("#pl [data-p]").forEach(el => el.onclick = () => { $("#ovl").innerHTML = ""; openConvo(el.dataset.p); });
  };
  $("#pq").oninput = draw; draw(); $("#pq").focus();
}
async function openConvo(id) {
  if (TAB !== "inbox") { OPEN = id; return show("inbox"); }
  OPEN = id; PHOTO = ""; THREAD = []; drawConvoList();
  const u = userById(id);
  $("#thread").innerHTML = `<div class="chat-h"><div class="av" style="background:var(--gold);color:var(--pri)">${esc(initials(u.name))}</div><div style="flex:1;min-width:0"><b>${esc(u.name)}</b><div class="small" style="opacity:.85">${esc(u.username)} · ${esc(u.email)}</div></div><button class="btn" style="background:rgba(255,255,255,.15)" id="prof">Profile</button></div>
    <div class="chat-body" id="tbody" data-first="1"><div class="empty">Loading…</div></div><div class="chat-prev hide" id="tprev"></div>
    <div class="chat-in"><button class="ibtn att" id="tatt" title="Attach photo" aria-label="Attach photo">📎</button><textarea id="ttxt" rows="1" maxlength="2000" placeholder="Reply to ${esc(u.name.split(" ")[0])}… (Enter to send, Shift+Enter for new line)"></textarea><button class="btn" id="tsend">Send</button></div>`;
  $("#prof").onclick = () => studentModal(id);
  $("#tatt").onclick = () => $("#aFile").click();
  $("#tsend").onclick = sendReply;
  const t = $("#ttxt");
  t.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendReply(); } });
  t.addEventListener("input", () => { t.style.height = "auto"; t.style.height = Math.min(110, t.scrollHeight) + "px"; });
  await loadThread();
  clearInterval(CHATPOLL); CHATPOLL = setInterval(() => { if (!document.hidden && OPEN === id) loadThread(); }, 10000);
  t.focus();
}
const adminPhoto = id => api("chatPhoto", { id }).then(j => j.data);
function drawThread() { const b = $("#tbody"); if (b) ChatUI.render(b, THREAD, "admin", adminPhoto, ""); if (b && !THREAD.length) b.innerHTML = `<div class="empty">No messages yet – write the first one below. ${esc(userById(OPEN).name)} will see it in their portal and get an email reminder.</div>`; }
async function loadThread() {
  const id = OPEN;
  try {
    const j = await api("adminChat", { userId: id }); if (id !== OPEN) return;
    THREAD = j.messages.concat(THREAD.filter(m => m.pending)); drawThread();
    const c = D.convos.find(x => x.userId === id); if (c && c.unread) { c.unread = 0; drawTabs(); drawConvoList(); }
  } catch (e) { toast(e.message); }
}
function setPhoto(d) {
  PHOTO = d; const p = $("#tprev"); p.classList.toggle("hide", !d);
  p.innerHTML = d ? `<img src="${d}" alt=""><span style="flex:1">Photo attached</span><button class="linkbtn small" id="trm">Remove</button>` : "";
  if (d) $("#trm").onclick = () => setPhoto("");
}
$("#aFile").onchange = async e => { const f = e.target.files[0]; e.target.value = ""; if (!f) return; try { setPhoto(await ChatUI.compress(f)); } catch (err) { toast(err.message); } };
async function sendReply() {
  const t = $("#ttxt"), text = t.value.trim(), photo = PHOTO, id = OPEN;
  if (!text && !photo) return;
  const tmp = { id: "tmp" + Date.now(), at: new Date().toISOString(), from: "admin", text, localPhoto: photo, pending: true };
  THREAD.push(tmp); t.value = ""; t.style.height = ""; setPhoto(""); drawThread();
  try {
    const j = await api("adminSend", { userId: id, text, photo }); Object.assign(tmp, j.message, { pending: false });
    let c = D.convos.find(x => x.userId === id); if (!c) { c = { userId: id, count: 0, unread: 0 }; D.convos.push(c); }
    c.last = { at: tmp.at, from: "admin", text: text || "📷 Photo" }; drawConvoList();
  } catch (e) { THREAD = THREAD.filter(m => m !== tmp); t.value = text; if (photo) setPhoto(photo); toast("Not sent: " + e.message); }
  drawThread();
}

/* ---------- boot ---------- */
(function boot() {
  window.SYLLABUS = window.SYLLABUS || {};
  C.PAPERS.forEach(p => { const s = document.createElement("script"); s.src = p.syllabus; s.onload = () => { if (TAB === "overview" && AT && D.users.length) vOverview(); }; document.head.appendChild(s); });
  if (AT) start(); else showLogin();
})();
