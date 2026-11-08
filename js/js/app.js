/* =====================================================================
   ACCA with Hamza – Mock Portal  ·  app logic
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
const LETTERS = "ABCDEFGH";
const fmtM = n => (Math.round(n * 10) / 10).toString();
const pct = o => o && o.m ? Math.round(o.e / o.m * 100) : 0;

/* ---------- icons ---------- */
const P = {
  menu: "M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z",
  insta: "M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm5 3.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM17.5 6a1 1 0 110 2 1 1 0 010-2z",
  yt: "M23 7.5a3 3 0 00-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 001 7.5 31 31 0 00.6 12 31 31 0 001 16.5a3 3 0 002.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 002.1-2.1 31 31 0 00.4-4.5 31 31 0 00-.4-4.5zM9.8 15.3V8.7l5.7 3.3z",
  gear: "M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm8.6 4.9l1.9 1.5-2 3.4-2.3-.9a8 8 0 01-1.8 1l-.4 2.4h-4l-.4-2.4a8 8 0 01-1.8-1l-2.3.9-2-3.4 1.9-1.5a8 8 0 010-2.1L1.5 9.8l2-3.4 2.3.9a8 8 0 011.8-1L8 3.9h4l.4 2.4a8 8 0 011.8 1l2.3-.9 2 3.4-1.9 1.5a8 8 0 010 2.1z",
  user: "M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.4 0-9 2.2-9 5v3h18v-3c0-2.8-4.6-5-9-5z",
  hist: "M13 3a9 9 0 00-9 9H1l4 4 4-4H6a7 7 0 112 4.9l-1.4 1.4A9 9 0 1013 3zm-1 5v5l4.3 2.5.7-1.2-3.5-2.1V8z",
  lock: "M12 2a5 5 0 00-5 5v3H5v12h14V10h-2V7a5 5 0 00-5-5zm-3 8V7a3 3 0 016 0v3z",
  out: "M10 17l1.4-1.4L8.8 13H20v-2H8.8l2.6-2.6L10 7l-5 5zM4 3h8v2H4v14h8v2H4a2 2 0 01-2-2V5a2 2 0 012-2z",
  moon: "M12 3a9 9 0 109 9 7 7 0 01-9-9z",
  text: "M9 4v3h5v12h3V7h5V4zM3 12h3v7h3v-7h3V9H3z",
  mega: "M18 3v18l-6-4H5a2 2 0 01-2-2V9a2 2 0 012-2h7zM20 9a3 3 0 010 6z",
  home: "M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3z",
  cal: "M7 2v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2zm-2 8h14v10H5z"
};
const ic = (n, cls) => `<svg viewBox="0 0 24 24" ${cls ? `class="${cls}"` : ""}><path d="${P[n]}"/></svg>`;
const socialBtns = () => `<span class="social"><a class="sbtn" href="${C.INSTAGRAM}" target="_blank" rel="noopener">${ic("insta")}${esc(C.INSTA_HANDLE)}</a><a class="sbtn yt" href="${C.YOUTUBE}" target="_blank" rel="noopener">${ic("yt")}YouTube</a></span>`;
const footer = () => `<p class="foot">${esc(C.SITE_TITLE)}<br>Independent practice material. Not affiliated with or endorsed by ACCA.</p>`;
const logoImg = (size = "2.6rem") => `<img class="logo-img" src="${C.LOGO}" alt="Hamza" style="width:${size};height:${size}">`;

/* ---------- preferences ---------- */
const prefs = () => store.get("ah_prefs", { theme: "light", fs: "m" });
function setPref(k, v) { const p = prefs(); p[k] = v; store.set("ah_prefs", p); document.documentElement.dataset[k === "theme" ? "theme" : "fs"] = v; }

/* ---------- modal / toast ---------- */
function modal(title, body, buttons, opt = {}) {
  const o = $("#ovl");
  o.innerHTML = `<div class="ov ${opt.cbe ? "cbe-modal" : ""}"><div class="modal" style="${opt.wide ? "max-width:820px" : ""}"><div class="mh">${esc(title)}${opt.noClose ? "" : "<button data-x aria-label='Close'>×</button>"}</div><div class="mb">${body}</div>${buttons && buttons.length === 0 ? "" : '<div class="mf"></div>'}</div></div>`;
  const f = o.querySelector(".mf");
  (buttons || [{ t: "Close", ghost: true }]).forEach(b => {
    const el = document.createElement("button");
    el.className = "btn" + (b.ghost ? " ghost" : "") + (b.gold ? " gold" : "");
    el.textContent = b.t;
    el.onclick = async () => { if (b.fn) { const r = await b.fn(el); if (r === false) return; } closeModal(); };
    f.appendChild(el);
  });
  const x = o.querySelector("[data-x]"); if (x) x.onclick = closeModal;
  return o;
}
function closeModal() { $("#ovl").innerHTML = ""; }
function toast(msg) { const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2600); }
async function busy(btn, fn) {
  const html = btn.innerHTML; btn.disabled = true; btn.innerHTML = `<span class="spin"></span>`;
  try { return await fn(); } finally { btn.disabled = false; btn.innerHTML = html; }
}

/* ---------- backend ---------- */
async function api(action, data = {}) {
  if (!/^https?:\/\//.test(C.APPS_SCRIPT_URL)) throw new Error("The portal is not connected to its database yet (APPS_SCRIPT_URL missing in config.js).");
  let r;
  try {
    r = await fetch(C.APPS_SCRIPT_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(Object.assign({ action }, data)) });
  } catch (e) { const er = new Error("Network error – please check your internet connection."); er.network = true; throw er; }
  let j; try { j = await r.json(); } catch (e) { const er = new Error("Server error – please try again."); er.network = true; throw er; }
  if (!j.ok) { const er = new Error(j.error || "Something went wrong."); if (/session|log in again/i.test(j.error || "")) er.auth = true; throw er; }
  return j;
}
async function hashPw(pw) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("ahmp|" + pw));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("");
}
function queue(action, data) { const q = store.get("ah_queue", []); q.push({ action, data }); store.set("ah_queue", q); flushQueue(); }
let flushing = false;
async function flushQueue() {
  if (flushing) return; flushing = true;
  let q = store.get("ah_queue", []);
  while (q.length) {
    try { await api(q[0].action, Object.assign({}, q[0].data, { token: SES && SES.token })); }
    catch (e) { if (e.network) break; }   // keep for retry when offline; drop if server rejected
    q.shift(); store.set("ah_queue", q);
  }
  flushing = false;
}
window.addEventListener("online", flushQueue);

/* ---------- session ---------- */
let SES = store.get("ah_session", null);   // {token,user,photo,history}
function saveSes() { store.set("ah_session", SES); }
function setSession(j) {
  SES = { token: j.token || (SES && SES.token), user: j.user, photo: j.photo ?? (SES && SES.photo) ?? "", history: mergeHistory(j.history) };
  saveSes();
}
function mergeHistory(server) {
  const local = (SES && SES.history) || [];
  if (!server) return local;
  const ids = new Set(server.map(h => h.attemptId));
  return server.concat(local.filter(h => !ids.has(h.attemptId) && h.pending));
}
function logout() {
  ["ah_session", "ah_exam", "ah_lastPaper"].forEach(store.del);
  stopChat(); SES = null; closeLayer(); showAuth("login");
}
const initials = n => (n || "?").split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("");
const avatarHTML = (cls = "") => SES.photo
  ? `<span class="avatar ${cls}" style="background-image:url('${SES.photo}')"></span>`
  : `<span class="avatar ${cls}">${esc(initials(SES.user.name))}</span>`;

/* =====================================================================
   AUTH SCREENS
   ===================================================================== */
const COUNTRIES = [["+91","India"],["+92","Pakistan"],["+880","Bangladesh"],["+94","Sri Lanka"],["+977","Nepal"],["+971","UAE"],["+966","Saudi Arabia"],["+974","Qatar"],["+968","Oman"],["+965","Kuwait"],["+973","Bahrain"],["+44","UK"],["+353","Ireland"],["+1","USA / Canada"],["+61","Australia"],["+64","New Zealand"],["+60","Malaysia"],["+65","Singapore"],["+62","Indonesia"],["+63","Philippines"],["+84","Vietnam"],["+86","China"],["+852","Hong Kong"],["+234","Nigeria"],["+254","Kenya"],["+233","Ghana"],["+27","South Africa"],["+260","Zambia"],["+263","Zimbabwe"],["+256","Uganda"],["+255","Tanzania"],["+265","Malawi"],["+267","Botswana"],["+230","Mauritius"],["+20","Egypt"],["+357","Cyprus"],["+356","Malta"],["+7","Russia / Kazakhstan"],["+49","Germany"],["+33","France"],["+31","Netherlands"],["+39","Italy"],["+34","Spain"]];
const ccSelect = (id, val = "+91") => `<select class="in" id="${id}">${COUNTRIES.map(c => `<option value="${c[0]}" ${c[0] === val ? "selected" : ""}>${c[0]} ${c[1]}</option>`).join("")}</select>`;

function showAuth(mode, extra) {
  ["#app", "#scr-exam", "#scr-review"].forEach(s => $(s).classList.add("hide"));
  const a = $("#auth"); a.classList.remove("hide");
  let h = `<div class="authbox view"><div class="brand">${logoImg("3.4rem")}<div><b>${esc(C.SITE_TITLE)}</b><span>${esc(C.TAGLINE)}</span></div></div><div class="card">`;
  if (mode === "login") {
    h += `<h1>Log in</h1><p class="mut small">Welcome back! Use your username or email.</p>
      <form id="fAuth" novalidate>
        <label class="f" for="a-id">Username or email</label><input class="in" id="a-id" autocomplete="username" placeholder="yourusername or you@email.com">
        <label class="f" for="a-pw">Password</label><input class="in" id="a-pw" type="password" autocomplete="current-password">
        <div style="text-align:right;margin-top:.4rem"><button type="button" class="linkbtn small" id="toForgot">Forgot password?</button></div>
        <div id="aMsg"></div>
        <button class="btn block" style="margin-top:.7rem" type="submit">Log in</button>
      </form>
      <p class="small" style="text-align:center;margin:1rem 0 0">New here? <button class="linkbtn" id="toReg">Create an account</button></p>`;
  } else if (mode === "register") {
    h += `<h1>Create your account</h1><p class="mut small">Get access to full-length mock exams with a detailed performance analysis.</p>
      <form id="fAuth" novalidate>
        <label class="f" for="r-name">Full name *</label><input class="in" id="r-name" autocomplete="name" maxlength="80"><div class="err" id="e-name"></div>
        <label class="f" for="r-email">Email *</label><input class="in" id="r-email" type="email" autocomplete="email" placeholder="you@email.com"><div class="err" id="e-email"></div>
        <label class="f" for="r-phone">Phone number <span class="mut">(optional)</span></label>
        <div class="row">${ccSelect("r-cc")}<input class="in" id="r-phone" type="tel" autocomplete="tel-national" placeholder="9876543210" maxlength="15"></div><div class="err" id="e-phone"></div>
        <label class="f" for="r-insta">Instagram ID <span class="mut">(optional)</span></label><input class="in" id="r-insta" placeholder="@yourhandle" maxlength="40">
        <div class="hint">Recommended for easy communication.</div><div class="err" id="e-insta"></div>
        <label class="f" for="r-user">Username *</label><input class="in" id="r-user" maxlength="30" autocomplete="off" placeholder="yourhandle">
        <div class="hint">Filled in from your Instagram ID – you can keep it or choose your own. You'll log in with this or your email.</div><div class="err" id="e-user"></div>
        <label class="f" for="r-pw">Set a password *</label><input class="in" id="r-pw" type="password" autocomplete="new-password" placeholder="At least 6 characters"><div class="err" id="e-pw"></div>
        <label class="f" for="r-pw2">Confirm password *</label><input class="in" id="r-pw2" type="password" autocomplete="new-password"><div class="err" id="e-pw2"></div>
        <div id="aMsg"></div>
        <button class="btn block" style="margin-top:.5rem" type="submit">Create account</button>
      </form>
      <p class="small" style="text-align:center;margin:1rem 0 0">Already registered? <button class="linkbtn" id="toLogin">Log in</button></p>`;
  } else if (mode === "forgot") {
    h += `<h1>Reset your password</h1><p class="mut small">We'll email a 6-digit verification code to your registered email address.</p>
      <form id="fAuth" novalidate>
        <label class="f" for="f-id">Email or username</label><input class="in" id="f-id" value="${esc(extra || "")}">
        <div id="aMsg"></div><button class="btn block" style="margin-top:.7rem" type="submit">Send code</button>
      </form>
      <p class="small" style="text-align:center;margin:1rem 0 0"><button class="linkbtn" id="toLogin">Back to log in</button></p>`;
  } else if (mode === "reset") {
    h += `<h1>Enter verification code</h1><div class="msg o">A code was sent to <b>${esc(extra.email)}</b>. It expires in 10 minutes.</div>
      <form id="fAuth" novalidate>
        <label class="f" for="o-otp">6-digit code</label><input class="in" id="o-otp" inputmode="numeric" maxlength="6" autocomplete="one-time-code" style="letter-spacing:.4em;font-size:1.2rem">
        <label class="f" for="o-pw">New password</label><input class="in" id="o-pw" type="password" autocomplete="new-password" placeholder="At least 6 characters">
        <label class="f" for="o-pw2">Confirm new password</label><input class="in" id="o-pw2" type="password" autocomplete="new-password">
        <div id="aMsg"></div><button class="btn block" style="margin-top:.7rem" type="submit">Reset password &amp; log in</button>
      </form>
      <p class="small" style="text-align:center;margin:1rem 0 0"><button class="linkbtn" id="resend">Resend code</button> · <button class="linkbtn" id="toLogin">Back to log in</button></p>`;
  }
  h += `</div><div class="authfoot">Follow for ACCA tips &amp; updates<br><div style="margin-top:.5rem">${socialBtns()}</div><p>Independent practice material. Not affiliated with or endorsed by ACCA.</p></div></div>`;
  a.innerHTML = h;
  const on = (id, fn) => { const el = $("#" + id); if (el) el.onclick = e => { e.preventDefault(); fn(); }; };
  on("toReg", () => showAuth("register")); on("toLogin", () => showAuth("login")); on("toForgot", () => showAuth("forgot", $("#a-id").value));
  on("resend", () => showAuth("forgot", extra.identifier));
  const msg = (t, ok) => { $("#aMsg").innerHTML = t ? `<div class="msg ${ok ? "o" : "e"}">${esc(t)}</div>` : ""; };
  const form = $("#fAuth"), btn = form.querySelector("button[type=submit]");
  if (mode === "register") {   // username auto-fills from Instagram ID (or email) until the student edits it
    let touched = false; const u = $("#r-user");
    const suggest = () => { if (touched) return; const ig = $("#r-insta").value.trim().replace(/^@+/, ""), em = $("#r-email").value.trim().split("@")[0];
      u.value = (ig || em).toLowerCase().replace(/[^a-z0-9._]/g, "").slice(0, 30); };
    $("#r-insta").addEventListener("input", suggest); $("#r-email").addEventListener("input", suggest);
    u.addEventListener("input", () => { touched = u.value.trim() !== ""; });
  }
  form.onsubmit = e => {
    e.preventDefault(); msg("");
    busy(btn, async () => {
      try {
        if (mode === "login") {
          const id = $("#a-id").value.trim(), pw = $("#a-pw").value;
          if (!id || !pw) return msg("Enter your username/email and password.");
          const j = await api("login", { identifier: id, passHash: await hashPw(pw) });
          setSession(j); enterApp();
        } else if (mode === "register") {
          const v = id => $("#" + id).value.trim();
          const d = { name: v("r-name"), email: v("r-email").toLowerCase(), countryCode: v("r-cc"), phone: v("r-phone").replace(/[\s-]/g, ""), insta: v("r-insta").replace(/^@+/, ""), username: v("r-user").replace(/^@+/, "").toLowerCase() };
          let ok = true; const set = (k, m) => { $("#e-" + k).textContent = m || ""; if (m) ok = false; };
          set("name", d.name.length < 2 && "Please enter your full name.");
          set("email", !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email) && "Please enter a valid email address.");
          set("phone", d.phone && !/^\d{6,15}$/.test(d.phone) && "Enter digits only (6–15).");
          set("insta", d.insta && !/^[a-zA-Z0-9._]{2,30}$/.test(d.insta) && "Instagram IDs use letters, numbers, . and _ only.");
          set("user", !/^[a-z0-9._]{3,30}$/.test(d.username) && "Use 3–30 characters: letters, numbers, . and _ only.");
          set("pw", $("#r-pw").value.length < 6 && "Use at least 6 characters.");
          set("pw2", $("#r-pw").value !== $("#r-pw2").value && "Passwords do not match.");
          if (!ok) return;
          d.passHash = await hashPw($("#r-pw").value);
          const j = await api("register", d);
          setSession(j); enterApp();
          modal("Welcome to the Mock Portal!", `<p>Your account has been created.</p><p>Your username is <b>${esc(j.user.username)}</b>. You can log in with this or your email address.</p><p class="small mut">Follow <a href="${C.INSTAGRAM}" target="_blank" rel="noopener">${esc(C.INSTA_HANDLE)}</a> for new mock releases.</p>`, [{ t: "Let's start", gold: true }]);
        } else if (mode === "forgot") {
          const id = $("#f-id").value.trim(); if (!id) return msg("Enter your email or username.");
          const j = await api("forgot", { identifier: id });
          showAuth("reset", { identifier: id, email: j.email });
        } else if (mode === "reset") {
          const otp = $("#o-otp").value.trim(), pw = $("#o-pw").value;
          if (!/^\d{6}$/.test(otp)) return msg("Enter the 6-digit code from your email.");
          if (pw.length < 6) return msg("Use at least 6 characters for your password.");
          if (pw !== $("#o-pw2").value) return msg("Passwords do not match.");
          const j = await api("reset", { identifier: extra.identifier, otp, passHash: await hashPw(pw) });
          setSession(j); enterApp(); toast("Password updated");
        }
      } catch (err) { msg(err.message); }
    });
  };
}

/* =====================================================================
   APP SHELL
   ===================================================================== */
let CUR_VIEW = null, CD_TIMER = null;
function enterApp() {
  $("#auth").classList.add("hide"); ["#scr-exam", "#scr-review"].forEach(s => $(s).classList.add("hide"));
  $("#app").classList.remove("hide");
  refreshHeader(); startChat();
  const last = store.get("ah_lastPaper", null);
  if (last && paperByCode(last)) goPaper(last); else goHome();
}
function refreshHeader() { $("#setBtn").innerHTML = ic("gear") + avatarHTML(); }
function render(html, name) {
  clearInterval(CD_TIMER); CUR_VIEW = name;
  $("#view").innerHTML = `<div class="view">${html}</div>`;
  window.scrollTo(0, 0);
  requestAnimationFrame(() => setTimeout(() => document.querySelectorAll(".fill[data-w]").forEach(f => f.style.width = f.dataset.w + "%"), 60));
}
function closeLayer() { $("#layer").innerHTML = ""; }
const paperByCode = c => C.PAPERS.find(p => p.code === c);

/* ---- left menu (papers) ---- */
function openMenu() {
  const cur = store.get("ah_lastPaper", "");
  $("#layer").innerHTML = `<div class="scrim" data-cl></div><nav class="drawer">
    <div class="dh">${esc(C.SITE_TITLE)}<span>Choose your paper</span></div>
    <button class="nav-item ${CUR_VIEW === "home" ? "on" : ""}" data-home>${ic("home").replace("<svg", '<svg style="width:1.2rem;height:1.2rem;fill:var(--mut)"')} Home</button>
    <div class="nav-sec">Papers</div>
    ${C.PAPERS.map(p => `<button class="nav-item ${CUR_VIEW === "paper" && cur === p.code ? "on" : ""}" data-paper="${p.code}"><span class="code">${p.code}</span>${esc(p.name)}</button>`).join("")}
    <div class="nav-sec">Coming soon</div>
    ${(C.COMING_SOON || []).map(s => `<div class="nav-item soon"><span class="code" style="background:var(--line2);color:var(--mut)">${esc(s.split(" ")[0])}</span>${esc(s.split("–")[1] || s)}</div>`).join("")}
  </nav>`;
  $("#layer [data-cl]").onclick = closeLayer;
  $("#layer [data-home]").onclick = () => { closeLayer(); goHome(); };
  $("#layer").querySelectorAll("[data-paper]").forEach(b => b.onclick = () => { closeLayer(); selectPaper(b.dataset.paper); });
}

/* ---- settings (right) ---- */
function openSettings() {
  const p = prefs(), u = SES.user;
  $("#layer").innerHTML = `<div class="scrim" data-cl style="background:transparent"></div><div class="menu">
    <div class="mhd">${avatarHTML()}<div style="min-width:0"><b>${esc(u.name)}</b><div class="small mut" style="overflow:hidden;text-overflow:ellipsis">${esc(u.username)}</div></div></div>
    <button class="mi" data-go="profile">${ic("user")} Profile</button>
    <button class="mi" data-go="history">${ic("hist")} Track history</button>
    <div class="mrow"><span style="display:flex;gap:.6rem;align-items:center">${ic("moon").replace("<svg", '<svg style="width:1.1rem;height:1.1rem;fill:var(--mut)"')} Dark mode</span><button class="switch ${p.theme === "dark" ? "on" : ""}" id="swTheme" aria-label="Dark mode"></button></div>
    <div class="mrow"><span style="display:flex;gap:.6rem;align-items:center">${ic("text").replace("<svg", '<svg style="width:1.1rem;height:1.1rem;fill:var(--mut)"')} Font size</span>
      <span class="seg">${[["s", "A-"], ["m", "A"], ["l", "A+"]].map(f => `<button data-fs="${f[0]}" class="${p.fs === f[0] ? "on" : ""}">${f[1]}</button>`).join("")}</span></div>
    <button class="mi" data-go="pw">${ic("lock")} Change password</button>
    <button class="mi" data-go="out" style="color:var(--bad)">${ic("out").replace("<svg", '<svg style="fill:var(--bad)"')} Log out</button>
  </div>`;
  const L = $("#layer");
  L.querySelector("[data-cl]").onclick = closeLayer;
  $("#swTheme").onclick = e => { const on = !e.currentTarget.classList.contains("on"); e.currentTarget.classList.toggle("on", on); setPref("theme", on ? "dark" : "light"); };
  L.querySelectorAll("[data-fs]").forEach(b => b.onclick = () => { setPref("fs", b.dataset.fs); L.querySelectorAll("[data-fs]").forEach(x => x.classList.toggle("on", x === b)); });
  L.querySelectorAll("[data-go]").forEach(b => b.onclick = () => {
    closeLayer();
    ({ profile: goProfile, history: goHistory, pw: changePassword, out: () => modal("Log out", "<p>Are you sure you want to log out?</p>", [{ t: "Cancel", ghost: true }, { t: "Log out", fn: logout }]) })[b.dataset.go]();
  });
}
function changePassword() {
  modal("Change password", `<label class="f">Current password</label><input class="in" type="password" id="cp1" autocomplete="current-password">
    <label class="f">New password</label><input class="in" type="password" id="cp2" autocomplete="new-password" placeholder="At least 6 characters">
    <label class="f">Confirm new password</label><input class="in" type="password" id="cp3" autocomplete="new-password"><div id="cpMsg"></div>`,
    [{ t: "Cancel", ghost: true }, { t: "Update password", fn: async btn => {
      const m = t => { $("#cpMsg").innerHTML = `<div class="msg e">${esc(t)}</div>`; return false; };
      const a = $("#cp1").value, b = $("#cp2").value;
      if (!a) return m("Enter your current password.");
      if (b.length < 6) return m("Use at least 6 characters.");
      if (b !== $("#cp3").value) return m("Passwords do not match.");
      return busy(btn, async () => {
        try { const j = await api("changePassword", { token: SES.token, oldHash: await hashPw(a), newHash: await hashPw(b) }); SES.token = j.token; saveSes(); toast("Password updated"); return true; }
        catch (e) { return m(e.message); }
      });
    } }]);
}

/* =====================================================================
   HOME (paper picker)
   ===================================================================== */
function goHome() {
  const u = SES.user;
  let h = C.ANNOUNCEMENT ? `<div class="announce">${ic("mega")}<span>${esc(C.ANNOUNCEMENT)}</span></div>` : "";
  h += `<h1>Hi ${esc(u.name.split(" ")[0])} 👋</h1><p class="mut" style="margin-top:0">Choose a paper to start practising.</p><div class="grid g2">`;
  C.PAPERS.forEach(p => {
    const n = SES.history.filter(x => x.paper === p.code).length;
    h += `<div class="papercard" data-paper="${p.code}"><div class="code">${p.code}</div><div style="flex:1"><b>${esc(p.name)}</b><div class="small mut">${esc(p.level)} · ${p.mocks.filter(m => m.live && !m.hidden).length} mock(s) available</div>${n ? `<span class="pill g" style="margin-top:.3rem">${n} attempt(s)</span>` : ""}</div><span style="font-size:1.4rem;color:var(--gold)">›</span></div>`;
  });
  (C.COMING_SOON || []).forEach(s => h += `<div class="papercard soon"><div class="code" style="background:var(--line2);color:var(--mut)">${esc(s.split(" ")[0])}</div><div><b>${esc(s.split("–")[1] || s)}</b><div class="small mut">Coming soon</div></div></div>`);
  h += `</div>${footer()}`;
  render(h, "home");
  document.querySelectorAll("[data-paper]").forEach(c => c.onclick = () => selectPaper(c.dataset.paper));
}

function selectPaper(code) {
  const dates = SES.user.examDates || {};
  if (!(code in dates)) examDateModal(code, () => goPaper(code)); else goPaper(code);
}
function examDateModal(code, done) {
  const p = paperByCode(code), cur = (SES.user.examDates || {})[code] || "";
  const today = new Date().toISOString().slice(0, 10);
  modal(`Your ${code} exam date`, `<p>When are you sitting <b>${code} – ${esc(p.name)}</b>? We'll show a countdown on your dashboard.</p>
    <label class="f" for="xd">Exam date</label><input class="in" type="date" id="xd" min="${today}" value="${esc(cur)}"><div id="xdMsg"></div>`,
    [{ t: "I haven't booked yet", ghost: true, fn: async btn => { await saveDate(code, "", btn); done && done(); } },
     { t: "Save date", gold: true, fn: async btn => {
        const v = $("#xd").value;
        if (!v) { $("#xdMsg").innerHTML = `<div class="msg e">Select your exam date.</div>`; return false; }
        await saveDate(code, v, btn); done && done();
     } }]);
}
async function saveDate(code, date, btn) {
  SES.user.examDates = Object.assign({}, SES.user.examDates, { [code]: date }); saveSes();
  queue("setExamDate", { paper: code, date });
}

/* =====================================================================
   PAPER DASHBOARD
   ===================================================================== */
const SCRIPTS = {};
function loadScript(src) {
  if (SCRIPTS[src]) return SCRIPTS[src];
  return SCRIPTS[src] = new Promise((res, rej) => {
    const s = document.createElement("script"); s.src = src + "?v=" + Date.now();
    s.onload = res; s.onerror = () => { delete SCRIPTS[src]; rej(new Error("Could not load content. Check your internet connection.")); };
    document.head.appendChild(s);
  });
}
async function ensurePaper(code) { const p = paperByCode(code); window.SYLLABUS = window.SYLLABUS || {}; if (!window.SYLLABUS[code]) await loadScript(p.syllabus); return p; }

function aggregate(code) {
  const hs = SES.history.filter(h => h.paper === code);
  const A = { area: {}, ch: {} };
  hs.forEach(h => {
    const d = h.detail || {};
    ["area", "ch"].forEach(k => Object.entries((k === "area" ? d.areas : d.chapters) || {}).forEach(([key, o]) => { A[k][key] = A[k][key] || { e: 0, m: 0 }; A[k][key].e += o.e; A[k][key].m += o.m; }));
  });
  const scores = hs.map(h => +h.score || 0);
  return { hs, A, n: hs.length, best: scores.length ? Math.max(...scores) : null, avg: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null, pass: scores.length ? Math.round(scores.filter(s => s >= C.PASS_MARK).length / scores.length * 100) : null };
}

async function goPaper(code) {
  let p;
  try { p = await ensurePaper(code); } catch (e) { return modal("Error", `<p>${esc(e.message)}</p>`); }
  store.set("ah_lastPaper", code);
  const SYL = window.SYLLABUS[code], G = aggregate(code);
  const date = (SES.user.examDates || {})[code];
  const exam = store.get("ah_exam", null);
  let h = C.ANNOUNCEMENT ? `<div class="announce">${ic("mega")}<span>${esc(C.ANNOUNCEMENT)}</span></div>` : "";
  h += `<div style="display:flex;align-items:center;gap:.8rem;margin-bottom:1rem"><div class="papercard" style="padding:0;border:0;background:none;box-shadow:none;cursor:default"><div class="code">${p.code}</div></div><div><h1 style="margin:0">${esc(p.name)}</h1><span class="pill g">${esc(p.level)}</span></div></div>`;
  // countdown
  h += `<div class="countdown"><div><div class="small" style="opacity:.85">${ic("cal").replace("<svg", '<svg style="width:1rem;height:1rem;fill:currentColor;vertical-align:-3px"')} ${date ? "Your " + code + " exam · " + new Date(date + "T00:00:00").toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "long", year: "numeric" }) : "Exam countdown"}</div>
      <div id="cd" style="margin-top:.4rem">${date ? "" : `<span style="font-size:1.05rem">Set your exam date to start a countdown</span>`}</div></div>
    <button class="btn" id="dateBtn">${date ? "Change date" : "Set exam date"}</button></div>`;
  // stats
  h += `<div class="grid g4" style="margin-top:1rem">
    <div class="stat"><b>${G.n}</b><span>Mock attempts</span></div>
    <div class="stat"><b>${G.best ?? "–"}${G.best != null ? "%" : ""}</b><span>Best score</span></div>
    <div class="stat"><b>${G.avg ?? "–"}${G.avg != null ? "%" : ""}</b><span>Average score</span></div>
    <div class="stat"><b>${G.pass ?? "–"}${G.pass != null ? "%" : ""}</b><span>Pass rate</span></div></div>`;
  // mocks
  h += `<div class="sechead"><h2>Your mocks</h2><span class="small mut">${p.minutes / 60} hours · pass mark ${C.PASS_MARK}%</span></div><div class="grid g3">`;
  p.mocks.filter(m => !m.hidden).forEach(m => {
    const att = G.hs.filter(x => x.mockKey === m.key).sort((a, b) => String(b.submittedAt).localeCompare(String(a.submittedAt)));
    let st = "Not attempted yet", btns = "";
    if (!m.live) { st = "Coming soon"; btns = `<button class="btn ghost" disabled>Coming soon</button>`; }
    else {
      if (att.length) { const best = Math.max(...att.map(a => +a.score)); st = `Last: <b>${att[0].score}%</b> <span class="pill ${att[0].score >= C.PASS_MARK ? "p" : "f"}">${att[0].score >= C.PASS_MARK ? "PASS" : "FAIL"}</span> · Best ${best}% · ${att.length} attempt(s)`; }
      if (exam && exam.mockKey === m.key) { st = `<span class="pill s">In progress</span>`; btns = `<button class="btn" data-resume="${m.key}">Resume exam</button>`; }
      else btns = `<button class="btn" data-start="${m.key}">${att.length ? "Retake" : "Start mock"}</button>` + (att.length ? `<button class="btn ghost" data-view="${att[0].attemptId}">Last analysis</button>` : "");
    }
    h += `<div class="mock ${m.live ? "" : "locked"}"><h3 style="margin:0">${esc(m.title)}</h3><div class="st">${st}</div><div style="display:flex;gap:.5rem;flex-wrap:wrap">${btns}</div></div>`;
  });
  h += `</div>`;
  // strength + weak chapters
  h += `<div class="grid g2" style="margin-top:1.2rem"><div class="card"><h2>Strength by syllabus area</h2>`;
  if (!G.n) h += `<div class="empty">Take your first mock to see your strengths and weaknesses here.</div>`;
  else Object.keys(SYL.areas).forEach(a => { const o = G.A.area[a]; if (!o) return; const v = pct(o); h += barHTML(`<b>${a}</b> ${esc(SYL.areas[a])}`, v, `${v}%`); });
  h += `<p class="small mut" style="margin-bottom:0">Combined across all your attempts · dashed line = 50%</p></div>${overallPlan(code, G, SYL, date)}</div>`;
  // tips + follow
  h += `<div class="grid g2" style="margin-top:1rem"><div class="card"><h2>Exam tips for ${code}</h2><ul class="tiplist">${(p.tips || []).map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>
    <div class="card" style="display:flex;flex-direction:column;justify-content:center;gap:.7rem;border:2px dashed var(--gold)"><div style="display:flex;gap:.9rem;align-items:center">${logoImg("4.2rem")}<div><b>About Hamza</b><div class="small mut">${esc(C.ABOUT)}</div></div></div>
    <div class="small"><b>More papers coming soon:</b> ${esc((C.COMING_SOON || []).map(s => s.split(" ")[0]).join(", "))}. Follow <b>${esc(C.INSTA_HANDLE)}</b> so you don't miss new mocks and exam tips.</div>${socialBtns()}</div></div>`;
  h += footer();
  render(h, "paper");
  $("#dateBtn").onclick = () => examDateModal(code, () => goPaper(code));
  if (date) startCountdown(date);
  document.querySelectorAll("[data-start]").forEach(b => b.onclick = () => {
    if (exam && exam.mockKey !== b.dataset.start) modal("Exam in progress", "<p>You have an unfinished mock. Starting a new one will discard it.</p>", [{ t: "Cancel", ghost: true }, { t: "Discard & start", fn: () => { store.del("ah_exam"); openIntro(code, b.dataset.start); } }]);
    else openIntro(code, b.dataset.start);
  });
  document.querySelectorAll("[data-resume]").forEach(b => b.onclick = () => resumeExam());
  document.querySelectorAll("[data-view]").forEach(b => b.onclick = () => goResult(SES.history.find(x => x.attemptId === b.dataset.view)));
}
const barHTML = (label, v, right) => { const c = v >= 70 ? "var(--ok)" : v >= 50 ? "var(--gold)" : "var(--bad)"; return `<div class="bar"><span>${label}</span><div class="track"><div class="fill" data-w="${v}" style="background:${c}"></div><div class="passline"></div></div><span><b>${right}</b></span></div>`; };
/* ---- overall (all-attempts) plan – different from the per-mock recommendations ---- */
function overallPlan(code, G, SYL, date) {
  let h = `<div class="card"><h2>Your overall plan</h2>`;
  if (!G.n) return h + `<div class="empty">Take your first mock – your overall readiness, progress trend and week-by-week revision plan will appear here.</div></div>`;
  const hs = G.hs.slice().sort((a, b) => String(a.submittedAt).localeCompare(String(b.submittedAt))), sc = hs.map(x => +x.score || 0);
  const recent = Math.round(sc.slice(-2).reduce((a, b) => a + b, 0) / Math.min(2, sc.length));
  const days = date ? Math.ceil((new Date(date + "T09:00:00") - Date.now()) / 864e5) : null;
  const V = recent >= 65 ? ["g", "On track", "Your recent mocks are comfortably above the pass mark. Keep your edge with regular timed mocks."]
          : recent >= C.PASS_MARK ? ["b", "Borderline", "You're passing, but with little margin. Push your weak chapters to reach 65%+ for safety."]
          : ["", "Not exam-ready yet", `Your recent average is ${recent}%. Focus on the chapters below before sitting more full mocks.`];
  h += `<div class="rec ${V[0]}"><b>Readiness: ${V[1]} (${recent}% recent average)</b>${V[2]}${days != null && days > 0 ? ` You have <b>${days} days</b> until your exam.` : ""}</div>`;
  if (sc.length >= 2) {
    const d1 = sc[sc.length - 1] - sc[0], d2 = sc[sc.length - 1] - sc[sc.length - 2];
    h += `<div class="rec ${d1 >= 0 ? "g" : ""}"><b>Progress: ${d1 >= 0 ? "▲ +" : "▼ "}${d1}% since your first mock</b>${d2 >= 0 ? `Up ${d2}% on your previous attempt – keep going.` : `Down ${-d2}% on your previous attempt – review that attempt's wrong answers before your next mock.`}</div>`;
  }
  // chapters weak in 2+ attempts (or in the only attempt)
  const cnt = {}; hs.forEach(x => Object.entries((x.detail || {}).chapters || {}).forEach(([c, o]) => { if (o.m && o.e / o.m < .5) cnt[c] = (cnt[c] || 0) + 1; }));
  const need = hs.length >= 2 ? 2 : 1;
  const persistent = Object.keys(cnt).filter(c => cnt[c] >= need && G.A.ch[c] && G.A.ch[c].m >= 2).sort((a, b) => pct(G.A.ch[a]) - pct(G.A.ch[b]));
  if (persistent.length) h += `<div class="rec"><b>${hs.length >= 2 ? "Repeatedly weak chapters" : "Chapters to fix first"}</b>${persistent.slice(0, 6).map(c => `Ch ${c} ${esc(SYL.chapters[c].n)} (${pct(G.A.ch[c])}%)`).join(" · ")}</div>`;
  // week-by-week plan
  const todo = Object.keys(G.A.ch).filter(c => G.A.ch[c].m >= 2 && pct(G.A.ch[c]) < 60).sort((a, b) => pct(G.A.ch[a]) - pct(G.A.ch[b])).slice(0, 12);
  if (days == null || days <= 0) h += `<div class="rec b"><b>Weekly revision plan</b>Set your exam date above to get a week-by-week revision plan.</div>`;
  else {
    const weeks = Math.max(1, Math.ceil(days / 7)), rev = weeks > 1 ? weeks - 1 : 1, per = Math.max(1, Math.ceil(todo.length / rev));
    let plan = "";
    for (let w = 0; w < Math.min(rev, 4) && w * per < todo.length; w++) plan += `<li><b>Week ${w + 1}:</b> ${todo.slice(w * per, w * per + per).map(c => `Ch ${c} ${esc(SYL.chapters[c].n)}`).join(", ")} – Study Text + Exam Kit questions</li>`;
    if (rev > 4 && todo.length > 4 * per) plan += `<li><b>Following weeks:</b> remaining weak chapters, then one full timed mock per week</li>`;
    if (!todo.length) plan += `<li>No chapter below 60% – sit one full timed mock every week and review every wrong answer.</li>`;
    plan += `<li><b>${weeks > 1 ? "Final week" : "This week"}:</b> full timed mocks, review flagged topics and exam technique</li>`;
    h += `<div class="rec b"><b>Weekly revision plan (${weeks} week${weeks > 1 ? "s" : ""} left)</b><ul class="tiplist" style="margin-top:.3rem">${plan}</ul></div>`;
  }
  // habits across attempts
  const avgMin = Math.round(hs.reduce((a, x) => a + ((x.detail || {}).timeMs || 0), 0) / hs.length / 60000);
  const un = hs.map(x => ((x.detail || {}).counts || {}).unattempted).filter(v => v != null);
  const habits = [];
  if (un.length && un.reduce((a, b) => a + b, 0) / un.length >= 1) habits.push("you often leave questions unanswered – there's no negative marking, so always answer");
  if (avgMin && avgMin < PAPER_MIN(code) * .45) habits.push(`you finish in about ${avgMin} min on average – use more of the ${PAPER_MIN(code)} minutes to re-check`);
  if (habits.length) h += `<div class="rec b"><b>Exam habits</b>Across your attempts, ${habits.join("; ")}.</div>`;
  return h + `</div>`;
}
const PAPER_MIN = code => (paperByCode(code) || {}).minutes || 120;
function startCountdown(date) {
  const tgt = new Date(date + "T09:00:00").getTime();
  const upd = () => {
    const el = $("#cd"); if (!el) return clearInterval(CD_TIMER);
    let ms = tgt - Date.now();
    if (ms <= 0) { el.innerHTML = `<span style="font-size:1.05rem">Exam day has arrived – good luck! Update your date if you've rebooked.</span>`; return clearInterval(CD_TIMER); }
    const d = Math.floor(ms / 864e5), hr = Math.floor(ms % 864e5 / 36e5), mn = Math.floor(ms % 36e5 / 6e4);
    el.innerHTML = `<div class="units"><div><span class="big">${d}</span><small>days</small></div><div><span class="big" style="font-size:1.6rem;animation:none">${hr}</span><small>hours</small></div><div><span class="big" style="font-size:1.6rem;animation:none">${mn}</span><small>mins</small></div></div>`;
  };
  upd(); CD_TIMER = setInterval(upd, 30000);
}

/* =====================================================================
   PROFILE & HISTORY
   ===================================================================== */
function goProfile() {
  const u = SES.user;
  const dates = Object.entries(u.examDates || {});
  let h = `<h1>Profile</h1><div class="grid g2"><div class="card" style="text-align:center">
      <div style="display:flex;justify-content:center">${avatarHTML("big")}</div>
      <button class="btn ghost" id="photoBtn" style="margin-top:.8rem">Change profile picture</button>
      ${SES.photo ? `<div><button class="linkbtn small" id="photoDel" style="margin-top:.5rem">Remove picture</button></div>` : ""}
      <h2 style="margin:1rem 0 .2rem">${esc(u.name)}</h2><div class="mut small">${esc(u.username)}</div>
      <div class="small mut" style="margin-top:.5rem">Member since ${u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "–"}</div>
      <div style="margin-top:1rem;text-align:left"><h3>Exam dates</h3>${dates.length ? dates.map(([c, d]) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:.4rem 0;border-bottom:1px solid var(--line)"><span><b>${c}</b> · ${d ? new Date(d + "T00:00:00").toLocaleDateString() : "Not booked yet"}</span><button class="linkbtn small" data-date="${c}">Change</button></div>`).join("") : `<div class="small mut">No exam dates set yet.</div>`}</div>
    </div>
    <div class="card"><h2>Your details</h2><form id="pf" novalidate>
      <label class="f">Username</label><input class="in" value="${esc(u.username)}" disabled>
      <label class="f">Email</label><input class="in" value="${esc(u.email)}" disabled>
      <label class="f" for="p-name">Full name</label><input class="in" id="p-name" value="${esc(u.name)}" maxlength="80">
      <label class="f" for="p-phone">Phone number</label><div class="row">${ccSelect("p-cc", u.countryCode || "+91")}<input class="in" id="p-phone" value="${esc(u.phone || "")}" maxlength="15"></div>
      <label class="f" for="p-insta">Instagram ID</label><input class="in" id="p-insta" value="${esc(u.insta || "")}" placeholder="@yourhandle">
      <div id="pfMsg"></div><button class="btn" type="submit" style="margin-top:.8rem">Save changes</button></form></div></div>${footer()}`;
  render(h, "profile");
  $("#photoBtn").onclick = () => $("#photoIn").click();
  const del = $("#photoDel"); if (del) del.onclick = () => { SES.photo = ""; saveSes(); queue("setPhoto", { photo: "" }); refreshHeader(); goProfile(); };
  document.querySelectorAll("[data-date]").forEach(b => b.onclick = () => examDateModal(b.dataset.date, goProfile));
  $("#pf").onsubmit = e => {
    e.preventDefault();
    const d = { name: $("#p-name").value.trim(), countryCode: $("#p-cc").value, phone: $("#p-phone").value.replace(/[\s-]/g, ""), insta: $("#p-insta").value.trim() };
    const m = (t, ok) => $("#pfMsg").innerHTML = `<div class="msg ${ok ? "o" : "e"}">${esc(t)}</div>`;
    if (d.name.length < 2) return m("Name cannot be empty.");
    if (d.phone && !/^\d{6,15}$/.test(d.phone)) return m("Phone: digits only (6–15).");
    busy(e.submitter || $("#pf button[type=submit]"), async () => {
      try { const j = await api("updateProfile", Object.assign({ token: SES.token }, d)); SES.user = Object.assign(SES.user, j.user); saveSes(); refreshHeader(); m("Profile updated", true); }
      catch (err) { m(err.message); }
    });
  };
}
$("#photoIn").onchange = async e => {
  const f = e.target.files[0]; e.target.value = ""; if (!f) return;
  try {
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = URL.createObjectURL(f); });
    const s = Math.min(img.width, img.height), cv = document.createElement("canvas"); cv.width = cv.height = 160;
    cv.getContext("2d").drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, 160, 160);
    let data = cv.toDataURL("image/jpeg", .8); if (data.length > 44000) data = cv.toDataURL("image/jpeg", .5);
    await api("setPhoto", { token: SES.token, photo: data });
    SES.photo = data; saveSes(); refreshHeader(); toast("Profile picture updated");
    if (CUR_VIEW === "profile") goProfile();
  } catch (err) { modal("Upload failed", `<p>${esc(err.message || "Could not read this image. Try a JPG or PNG.")}</p>`); }
};

function goHistory() {
  const hs = SES.history.slice().sort((a, b) => String(b.submittedAt).localeCompare(String(a.submittedAt)));
  const count = {}; SES.history.slice().sort((a, b) => String(a.submittedAt).localeCompare(String(b.submittedAt))).forEach(x => { count[x.mockKey] = (count[x.mockKey] || 0) + 1; x._n = count[x.mockKey]; });
  let h = `<h1>Track history</h1><p class="mut" style="margin-top:0">Every mock you've taken, including retakes.</p><div class="card">`;
  if (!hs.length) h += `<div class="empty">No attempts yet. Pick a paper from the menu and take your first mock!</div>`;
  else h += `<div class="tscroll"><table class="t"><tr><th>Date &amp; time</th><th>Paper</th><th>Mock</th><th>Attempt</th><th>Score</th><th>Result</th><th></th></tr>` +
    hs.map((x, i) => `<tr><td>${new Date(x.submittedAt).toLocaleString()}</td><td><b>${esc(x.paper)}</b></td><td>${esc(x.mock)}</td><td>#${x._n}</td><td><b>${x.score}%</b></td><td><span class="pill ${x.score >= C.PASS_MARK ? "p" : "f"}">${x.score >= C.PASS_MARK ? "PASS" : "FAIL"}</span>${x.pending ? ' <span class="pill s" title="Will sync when online">syncing</span>' : ""}</td>
      <td style="white-space:nowrap"><button class="linkbtn small" data-recs="${i}">Recommendations</button> · <button class="linkbtn small" data-full="${i}">Full analysis</button></td></tr>
      <tr class="hide" id="recs${i}"><td colspan="7"><div class="hist-recs">${((x.detail || {}).recs || []).map(r => `<div class="rec ${r.k}"><b>${esc(r.h)}</b>${esc(r.t)}</div>`).join("") || '<span class="small mut">No recommendations saved.</span>'}</div></td></tr>`).join("") + `</table></div>`;
  h += `</div>${footer()}`;
  render(h, "history");
  document.querySelectorAll("[data-recs]").forEach(b => b.onclick = () => $("#recs" + b.dataset.recs).classList.toggle("hide"));
  document.querySelectorAll("[data-full]").forEach(b => b.onclick = () => goResult(hs[+b.dataset.full]));
}

/* =====================================================================
   EXAM ENGINE (CBE)
   ===================================================================== */
let MOCK = null, ITEMS = [], SYL = null, PAPER = null, S = null, tick = null, lastSwitch = 0;
const strSeed = s => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 100000, 7);
function seededShuffle(arr, seed) {
  const a = arr.slice(); let s = seed;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
async function prepMock(code, key) {
  PAPER = await ensurePaper(code); SYL = window.SYLLABUS[code];
  window.MOCKS = window.MOCKS || {};
  const m = PAPER.mocks.find(x => x.key === key);
  if (!window.MOCKS[key]) {
    const before = new Set(Object.keys(window.MOCKS));
    await loadScript(m.file);
    if (!window.MOCKS[key]) {               // key mismatch (e.g. old config.js) – use the mock this file defines
      const added = Object.keys(window.MOCKS).find(k => !before.has(k));
      if (added) window.MOCKS[key] = window.MOCKS[added];
    }
  }
  MOCK = window.MOCKS[key];
  if (!MOCK) throw new Error("This mock could not be loaded. Please refresh the page (Ctrl + F5) and try again.");
  const A = MOCK.sectionA.map((q, i) => Object.assign({ id: "A" + (i + 1), sec: "A" }, q));
  const B = (MOCK.sectionB || []).map((q, i) => Object.assign({ id: "B" + (i + 1), sec: "B" }, q));
  ITEMS = seededShuffle(A, strSeed(key)).concat(B);
  ITEMS.forEach((it, i) => it.no = i + 1);
  return m;
}
const partsOf = it => it.sec === "B" ? it.parts : [it];
const nA = () => ITEMS.filter(i => i.sec === "A").length;

async function openIntro(code, key) {
  let m; try { m = await prepMock(code, key); } catch (e) { return modal("Error", `<p>${esc(e.message)}</p>`); }
  const total = PAPER.format.reduce((s, r) => s + r[2], 0);
  render(`<div class="card" style="max-width:780px;margin:0 auto"><h1>${code} – ${esc(m.title)}</h1><p class="mut" style="margin-top:0">Read the instructions before you start.</p>
    <table class="t"><tr><th>Section</th><th>Questions</th><th>Marks</th></tr>${PAPER.format.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${r[2]}</td></tr>`).join("")}
    <tr><td><b>Total</b></td><td><b>${ITEMS.length} questions · ${PAPER.minutes / 60} hours</b></td><td><b>${total}</b></td></tr></table>
    <ul class="tiplist" style="margin-top:1rem;line-height:1.7">
      <li>All questions are compulsory. There is <b>no negative marking</b>.</li>
      <li>Use <b>Next</b> / <b>Previous</b> or the <b>Navigator</b> to move between questions, and <b>Flag for review</b> to mark questions to revisit.</li>
      <li>A calculator and scratch pad are available in the toolbar${PAPER.formulaSheet ? ", along with the formula sheet" : ""}.</li>
      <li>The timer runs continuously and the exam ends automatically when time runs out.</li>
      <li><b>Marking:</b> Section A questions are all-or-nothing. In Section B, matching and multiple-response items earn marks for each correct item; single-choice parts are all-or-nothing.</li>
      <li>Your progress is saved on this device if the page is refreshed.</li></ul>
    <div style="display:flex;gap:.6rem;margin-top:1.2rem;flex-wrap:wrap"><button class="btn gold" id="startBtn">Start exam</button><button class="btn ghost" id="introBack">Back</button></div></div>`, "intro");
  $("#startBtn").onclick = () => startExam(code, key);
  $("#introBack").onclick = () => goPaper(code);
}
function startExam(code, key) {
  S = { paper: code, mockKey: key, userId: SES.user.userId, answers: {}, flags: {}, seen: {}, cur: 0, startAt: Date.now(), endAt: Date.now() + PAPER.minutes * 60000, tspent: {} };
  saveExam(); enterExam();
}
async function resumeExam() {
  S = store.get("ah_exam");
  try { await prepMock(S.paper, S.mockKey); } catch (e) { return modal("Error", `<p>${esc(e.message)}</p>`); }
  if (Date.now() >= S.endAt) return finishExam(true);
  enterExam();
}
const saveExam = () => store.set("ah_exam", S);
function enterExam() {
  closeLayer(); closeModal(); closeChat();
  const m = PAPER.mocks.find(x => x.key === S.mockKey);
  $("#app").classList.add("hide"); $("#scr-review").classList.add("hide"); $("#scr-exam").classList.remove("hide");
  $("#exTitle").textContent = `${PAPER.code} ${PAPER.name} – ${m.title}`;
  $("#exCand").textContent = "Candidate: " + SES.user.name;
  $("#formulaBtn").classList.toggle("hide", !PAPER.formulaSheet);
  lastSwitch = Date.now(); renderQ();
  clearInterval(tick); tick = setInterval(updTimer, 1000); updTimer();
}
function updTimer() {
  const left = S.endAt - Date.now(), t = $("#timer"), s = Math.max(0, Math.floor(left / 1000));
  t.textContent = "Time remaining " + [Math.floor(s / 3600), Math.floor(s % 3600 / 60), s % 60].map(n => String(n).padStart(2, "0")).join(":");
  t.classList.toggle("low", left < 10 * 60000);
  if (left <= 0) { clearInterval(tick); finishExam(true); }
}
function logTime() { const id = ITEMS[S.cur].id, now = Date.now(); S.tspent[id] = (S.tspent[id] || 0) + (now - lastSwitch); lastSwitch = now; }
function go(i) { if (i < 0 || i >= ITEMS.length) return; logTime(); S.cur = i; saveExam(); renderQ(); $("#qBody").scrollTop = 0; }
function getAns(it, pi) { const a = S.answers[it.id]; return it.sec === "B" ? (a || {})[pi] : a; }
function setAns(it, pi, val) {
  if (it.sec === "B") { S.answers[it.id] = S.answers[it.id] || {}; S.answers[it.id][pi] = val; } else S.answers[it.id] = val;
  saveExam();
}
function partAnswered(p, v) { if (v == null) return false; if (p.type === "mcq") return true; if (p.type === "multi") return v.length > 0; return v.some(x => x != null); }
function partComplete(p, v) { if (v == null) return false; if (p.type === "mcq") return true; if (p.type === "multi") return v.length === p.ans.length; return v.every(x => x != null); }
function itemState(it, ans) {
  const get = pi => it.sec === "B" ? (ans[it.id] || {})[pi] : ans[it.id];
  const ps = partsOf(it);
  return ps.every((p, pi) => partComplete(p, get(pi))) ? "cmp" : ps.some((p, pi) => partAnswered(p, get(pi))) ? "inc" : "none";
}

function partHTML(it, p, pi, mode, res) {
  const v = mode === "exam" ? getAns(it, pi) : res.val, nm = `${it.id}_${pi}`, ro = mode === "review" ? "disabled" : "";
  let h = "";
  if (p.type === "mcq" || p.type === "multi") {
    const multi = p.type === "multi";
    if (multi) h += `<div class="instr">Select ${["", "ONE", "TWO", "THREE", "FOUR", "FIVE"][p.ans.length] || p.ans.length} answers.</div>`;
    p.opts.forEach((o, oi) => {
      const chosen = multi ? (v || []).includes(oi) : v === oi, isCor = multi ? p.ans.includes(oi) : p.ans === oi;
      let cls = "opt" + (chosen && mode === "exam" ? " sel" : ""), badge = "";
      if (mode === "review") {
        if (isCor) { cls += " ok"; badge = `<span class="badge ok">✓ Correct answer${chosen ? " · your answer" : ""}</span>`; }
        else if (chosen) { cls += " bad"; badge = `<span class="badge bad">✗ Your answer</span>`; }
      }
      h += `<label class="${cls}"><input type="${multi ? "checkbox" : "radio"}" name="${nm}" data-pi="${pi}" data-oi="${oi}" ${chosen ? "checked" : ""} ${ro}><span class="L">${LETTERS[oi]}</span><span>${o}</span>${badge}</label>`;
    });
  } else if (p.type === "gap") {
    h += `<div class="qtext" style="line-height:2.1">` + p.text.replace(/\[\[(\d+)\]\]/g, (m, n) => {
      n = +n; const sel = v ? v[n] : null;
      if (mode === "review") {
        const cor = p.ans[n];
        if (sel === cor) return `<span class="gapans ok">${esc(p.gaps[n][cor])} ✓</span>`;
        return (sel != null ? `<span class="gapans bad">${esc(p.gaps[n][sel])}</span>` : `<span class="gapans bad">(blank)</span>`) + `<span class="gapans cor">${esc(p.gaps[n][cor])}</span>`;
      }
      return `<select class="gap" data-pi="${pi}" data-gi="${n}"><option value="">– select –</option>${p.gaps[n].map((g, k) => `<option value="${k}" ${sel === k ? "selected" : ""}>${esc(g)}</option>`).join("")}</select>`;
    }) + `</div>`;
  } else if (p.type === "matrix") {
    h += `<div class="mxwrap"><table class="mx"><tr><th></th>${p.cols.map(c => `<th>${esc(c)}</th>`).join("")}</tr>`;
    p.rows.forEach((r, ri) => {
      const sel = v ? v[ri] : null;
      h += `<tr><td>${r[0]}</td>` + p.cols.map((c, ci) => {
        let cls = "c", mark = "";
        if (mode === "review") { if (ci === r[1]) { cls += " ok"; mark = " ✓"; } else if (sel === ci) { cls += " bad"; mark = " ✗"; } }
        return `<td class="${cls}"><input type="radio" name="${nm}_${ri}" data-pi="${pi}" data-ri="${ri}" data-ci="${ci}" ${sel === ci ? "checked" : ""} ${ro}>${mark}</td>`;
      }).join("") + `</tr>`;
    });
    h += `</table></div>`;
  }
  return h;
}
function questionHTML(it, mode, sc) {
  let h = "";
  if (it.sec === "A") {
    h += `<div class="secbanner">Section A</div><div class="qtext"><span class="marks">(${it.marks} mark${it.marks > 1 ? "s" : ""})</span>${it.q || ""}</div>`;
    h += partHTML(it, it, 0, mode, sc && sc.parts[0]);
    if (mode === "review") h += explHTML(sc.parts[0]);
  } else {
    h += `<div class="secbanner">Section B – multi-task question (${it.parts.reduce((s, p) => s + p.marks, 0)} marks)</div>`;
    if (it.scenario) h += `<div class="scen">${it.scenario}</div>`;
    it.parts.forEach((p, pi) => {
      h += `<div class="part"><div class="qtext"><span class="marks">(${p.marks} mark${p.marks > 1 ? "s" : ""})</span><span class="plabel">(${"abcdef"[pi]})</span>${p.q || ""}</div>`;
      h += partHTML(it, p, pi, mode, sc && sc.parts[pi]);
      if (mode === "review") h += explHTML(sc.parts[pi]);
      h += `</div>`;
    });
  }
  return h;
}
function explHTML(pr) {
  const t = { correct: ["s", "Correct"], partial: ["a", "Partly correct"], wrong: ["w", "Incorrect"], unattempted: ["w", "Not attempted"] }[pr.status];
  return `<div class="expl"><div class="res-line"><span class="tag ${t[0]}">${t[1]}</span><b>${fmtM(pr.earned)} / ${pr.max} marks</b></div>${pr.exp || ""}</div>`;
}
function renderQ() {
  const it = ITEMS[S.cur]; S.seen[it.id] = 1;
  $("#qInner").innerHTML = questionHTML(it, "exam");
  $("#qNum").textContent = `Question ${it.no} of ${ITEMS.length}`;
  $("#prevBtn").disabled = S.cur === 0; $("#nextBtn").disabled = S.cur === ITEMS.length - 1;
  updFlag(); bindInputs(it);
}
function updFlag() { const f = !!S.flags[ITEMS[S.cur].id], b = $("#flagBtn"); b.classList.toggle("on", f); b.textContent = f ? "⚑ Flagged" : "⚑ Flag for review"; }
function bindInputs(it) {
  const box = $("#qInner");
  box.querySelectorAll("input[data-oi]").forEach(inp => inp.onchange = () => {
    const pi = +inp.dataset.pi, p = partsOf(it)[pi];
    if (p.type === "mcq") setAns(it, pi, +inp.dataset.oi);
    else {
      const checked = [...box.querySelectorAll(`input[name="${it.id}_${pi}"]:checked`)].map(x => +x.dataset.oi);
      if (checked.length > p.ans.length) { inp.checked = false; modal("Selection limit", `<p>You can select only ${p.ans.length} answers for this question. Deselect an answer first.</p>`, null, { cbe: true }); return; }
      setAns(it, pi, checked.sort());
    }
    box.querySelectorAll(`input[name="${it.id}_${pi}"]`).forEach(x => x.closest(".opt").classList.toggle("sel", x.checked));
  });
  box.querySelectorAll("select.gap").forEach(sel => sel.onchange = () => {
    const pi = +sel.dataset.pi, p = partsOf(it)[pi], cur = (getAns(it, pi) || p.gaps.map(() => null)).slice();
    cur[+sel.dataset.gi] = sel.value === "" ? null : +sel.value; setAns(it, pi, cur);
  });
  box.querySelectorAll("input[data-ri]").forEach(inp => inp.onchange = () => {
    const pi = +inp.dataset.pi, p = partsOf(it)[pi], cur = (getAns(it, pi) || p.rows.map(() => null)).slice();
    cur[+inp.dataset.ri] = +inp.dataset.ci; setAns(it, pi, cur);
  });
}
function openNavigator() {
  const a = nA();
  let h = `<div class="legend"><span><i style="background:#dbeafe;border-color:#3b6fd8"></i>Complete</span><span><i style="background:#fff7d6;border-color:#c99a06"></i>Incomplete</span><span><i></i>Not attempted</span><span style="color:#d97706">⚑ Flagged</span></div>
    <p class="small" style="margin:.5rem 0;color:#5c6675">Section A: 1–${a}${ITEMS.length > a ? ` · Section B: ${a + 1}–${ITEMS.length}` : ""}</p><div class="navgrid">`;
  ITEMS.forEach((it, i) => { const st = itemState(it, S.answers); h += `<button class="nv ${st === "none" ? "" : st} ${i === S.cur ? "cur" : ""}" data-go="${i}">${it.no}${S.flags[it.id] ? '<span class="fl">⚑</span>' : ""}</button>`; });
  const o = modal("Navigator – select a question", h + "</div>", [{ t: "Close", ghost: true }], { cbe: true, wide: true });
  o.querySelectorAll("[data-go]").forEach(b => b.onclick = () => { closeModal(); go(+b.dataset.go); });
}
function confirmEnd() {
  const c = { cmp: 0, inc: 0, none: 0 }; ITEMS.forEach(it => c[itemState(it, S.answers)]++);
  const fl = ITEMS.filter(it => S.flags[it.id]).length;
  modal("End exam", `<p>Are you sure you want to end the exam?</p><table class="t" style="color:#1d2430"><tr><td>Complete</td><td><b>${c.cmp}</b></td></tr><tr><td>Incomplete</td><td><b>${c.inc}</b></td></tr><tr><td>Not attempted</td><td><b>${c.none}</b></td></tr><tr><td>Flagged for review</td><td><b>${fl}</b></td></tr></table><p class="small" style="color:#5c6675">Once you end the exam you cannot change your answers.</p>`,
    [{ t: "Return to exam", ghost: true }, { t: "End exam", fn: () => finishExam(false) }], { cbe: true });
}

/* ---------- marking (ACCA rules) ---------- */
function scorePart(p, v, sec) {
  const max = p.marks; let earned = 0;
  const items = p.type === "multi" ? p.ans.length : p.type === "gap" ? p.gaps.length : p.type === "matrix" ? p.rows.length : 1;
  const perItem = sec === "B" && p.type !== "mcq" ? (p.markEach || max / items) : 0;   // Section B matching / multiple response only
  if (p.type === "mcq") earned = v === p.ans ? max : 0;
  else if (p.type === "multi") {
    const sel = v || [], right = sel.filter(x => p.ans.includes(x)).length;
    earned = perItem ? Math.min(max, right * perItem) : (sel.length === p.ans.length && right === p.ans.length ? max : 0);
  } else {
    const key = p.type === "gap" ? p.ans : p.rows.map(r => r[1]);
    const n = key.filter((k, i) => v && v[i] === k).length;
    earned = perItem ? Math.min(max, n * perItem) : (n === key.length ? max : 0);
  }
  earned = Math.round(earned * 100) / 100;
  const status = !partAnswered(p, v) ? "unattempted" : earned >= max ? "correct" : earned > 0 ? "partial" : "wrong";
  return { earned, max, status, val: v, exp: p.exp };
}
function typeLabel(p, sec) {
  if (sec === "B") return "Multi-task (Section B)";
  if (p.type === "multi") return "Multiple response";
  if (p.type === "gap") return "Fill in the gaps";
  if (p.marks === 1) return /^true$/i.test(p.opts[0]) ? "True / false" : "1-mark choice";
  return "4-option MCQ";
}
function compute(answers, flags, tspent, timeMs, timedOut) {
  const CH = SYL.chapters;
  const R = { total: 0, max: 0, items: {}, area: {}, ch: {}, grp: {}, type: {}, missed: {}, counts: { correct: 0, partial: 0, wrong: 0, unattempted: 0 }, flagged: 0, timeMs, timedOut };
  const add = (o, k, e, m) => { o[k] = o[k] || { e: 0, m: 0 }; o[k].e += e; o[k].m += m; };
  ITEMS.forEach(it => {
    const parts = partsOf(it).map((p, pi) => { const r = scorePart(p, it.sec === "B" ? (answers[it.id] || {})[pi] : answers[it.id], it.sec); r.ch = p.ch || it.ch; r.topic = p.topic || it.topic; return r; });
    const e = parts.reduce((s, r) => s + r.earned, 0), m = parts.reduce((s, r) => s + r.max, 0);
    const status = parts.every(r => r.status === "unattempted") ? "unattempted" : e >= m ? "correct" : e > 0 ? "partial" : "wrong";
    R.items[it.id] = { parts, earned: e, max: m, status, time: (tspent || {})[it.id] || 0 };
    R.counts[status]++; if ((flags || {})[it.id]) R.flagged++;
    R.total += e; R.max += m;
    add(R.grp, it.sec === "B" ? "Section B – multi-task" : it.marks === 2 ? "Section A – 2-mark questions" : "Section A – 1-mark questions", e, m);
    parts.forEach((r, pi) => {
      add(R.ch, r.ch, r.earned, r.max); add(R.area, (CH[r.ch] || {}).a || "?", r.earned, r.max);
      add(R.type, typeLabel(partsOf(it)[pi], it.sec), r.earned, r.max);
      if (r.earned < r.max && r.topic) { R.missed[r.ch] = R.missed[r.ch] || []; if (!R.missed[r.ch].includes(r.topic)) R.missed[r.ch].push(r.topic); }
    });
  });
  R.total = Math.round(R.total * 10) / 10;
  R.score = Math.round(R.total / R.max * 100);
  R.attempted = R.counts.correct + R.counts.partial + R.counts.wrong;
  R.recs = buildRecs(R);
  return R;
}
function buildRecs(R) {
  const recs = [], PM = C.PASS_MARK, CH = SYL.chapters, AR = SYL.areas;
  const weak = Object.keys(R.ch).filter(c => pct(R.ch[c]) < 50).sort((a, b) => pct(R.ch[a]) - pct(R.ch[b]));
  if (R.score >= 70) recs.push({ k: "g", h: "Strong performance", t: "You are exam-ready on this mock. Keep sitting full timed mocks and aim to keep every syllabus area above 60%." });
  else if (R.score >= PM) recs.push({ k: "g", h: "You passed – now build a safety margin", t: "Aim for 65%+ on mocks to be safe on exam day. Target your weakest areas below." });
  else if (R.score >= 40) recs.push({ k: "", h: "Close to the pass mark", t: `You need about ${PM - R.score} more marks to pass. Fixing your two weakest syllabus areas would close this gap.` });
  else recs.push({ k: "", h: "Rebuild the foundations", t: "Go back to the Study Text for your weak chapters, do the test-your-understanding questions, then practise Exam Kit questions topic by topic before another full mock." });
  const wa = Object.keys(R.area).filter(a => pct(R.area[a]) < 50).sort((a, b) => pct(R.area[a]) - pct(R.area[b]));
  if (wa.length) recs.push({ k: "", h: "Weakest syllabus areas", t: wa.map(a => `Area ${a} – ${AR[a]} (${pct(R.area[a])}%)`).join("; ") + ". Each area carries roughly 8–9 questions in the real exam." });
  weak.slice(0, 6).forEach(c => { const ch = CH[c] || { n: "Chapter " + c, tip: "" }, miss = (R.missed[c] || []).join(", "); recs.push({ k: "", h: `Ch ${c}: ${ch.n} – ${fmtM(R.ch[c].e)}/${R.ch[c].m} marks`, t: (miss ? `Weak points: ${miss}. ` : "") + ch.tip }); });
  if (R.counts.unattempted > 0) recs.push({ k: "b", h: "Never leave a question blank", t: `You left ${R.counts.unattempted} question(s) unanswered. There is no negative marking – always make an educated guess.` });
  const gA = R.grp["Section A – 2-mark questions"], gB = R.grp["Section B – multi-task"];
  if (gB && gA && pct(gB) + 15 < pct(gA)) recs.push({ k: "b", h: "Practise Section B multi-task questions", t: "Your Section B score is well below Section A. Practise Exam Kit multi-task questions and attempt every row/gap – matching items earn marks individually." });
  const mr = R.type["Multiple response"];
  if (mr && pct(mr) < 50) recs.push({ k: "b", h: "Multiple-response questions", t: "You lost marks on 'select TWO' questions, which need both answers right in Section A. Eliminate clearly wrong options first." });
  const mins = R.timeMs / 60000;
  if (R.timedOut && R.counts.unattempted > 0) recs.push({ k: "b", h: "Time management", t: "You ran out of time. Aim for about 1.5 min per 2-mark question, 1 min per 1-mark question and 7 min per multi-task question; flag hard questions and return later." });
  else if (mins < PAPER.minutes * 0.45 && R.score < PM) recs.push({ k: "b", h: "Slow down", t: `You finished in ${Math.round(mins)} minutes. Use the full time – re-read each question and check flagged ones before ending the exam.` });
  return recs;
}

/* ---------- finish ---------- */
function finishExam(timedOut) {
  clearInterval(tick); closeModal();
  ["#calcPanel", "#padPanel"].forEach(s => $(s).classList.add("hide")); $("#padTxt").value = "";
  if (ITEMS[S.cur]) logTime();
  const timeMs = Math.min(Date.now(), S.endAt) - S.startAt;
  const R = compute(S.answers, S.flags, S.tspent, timeMs, timedOut);
  const m = PAPER.mocks.find(x => x.key === S.mockKey);
  const at = new Date().toISOString(), attemptId = "A" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
  const detail = { mockKey: S.mockKey, answers: S.answers, flags: S.flags, tspent: S.tspent, timeMs, timedOut, areas: R.area, chapters: R.ch, groups: R.grp, counts: R.counts, recs: R.recs };
  const entry = { attemptId, submittedAt: at, paper: S.paper, mock: m.title, mockKey: S.mockKey, score: R.score, result: R.score >= C.PASS_MARK ? "PASS" : "FAIL", detail, pending: true };
  SES.history.push(entry); saveSes(); store.del("ah_exam");
  // ---- row for your Google Sheet (saved automatically) ----
  const result = {
    attemptId, submittedAt: at, paper: S.paper, mock: m.title, mockKey: S.mockKey, score: R.score, marks: `${R.total}/${R.max}`, result: entry.result,
    attempted: R.attempted, correct: R.counts.correct, partlyCorrect: R.counts.partial, wrong: R.counts.wrong, unattempted: R.counts.unattempted, flagged: R.flagged,
    timeTakenMin: Math.round(timeMs / 60000), timedOut: timedOut ? "Yes" : "No"
  };
  Object.keys(R.grp).forEach(g => result[g] = `${fmtM(R.grp[g].e)}/${R.grp[g].m}`);
  Object.keys(SYL.areas).forEach(a => result["Area " + a + " %"] = R.area[a] ? pct(R.area[a]) : "");
  result.weakChapters = Object.keys(R.ch).filter(c => pct(R.ch[c]) < 50).map(c => `Ch${c} ${(SYL.chapters[c] || {}).n} (${fmtM(R.ch[c].e)}/${R.ch[c].m})`).join("; ");
  result.weakTopics = Object.keys(R.missed).map(c => `Ch${c}: ${R.missed[c].join(", ")}`).join(" | ");
  result.recommendations = R.recs.map(r => `• ${r.h}: ${r.t}`).join("\n");
  saveResultToSheet(result, detail, attemptId);
  $("#scr-exam").classList.add("hide"); $("#app").classList.remove("hide"); refreshHeader(); startChat();
  showResult(entry, R);
}
async function saveResultToSheet(result, detail, attemptId) {
  const q = store.get("ah_queue", []); q.push({ action: "saveResult", data: { result, detail } }); store.set("ah_queue", q);
  await flushQueue();
  if (!store.get("ah_queue", []).some(x => x.data && x.data.result && x.data.result.attemptId === attemptId)) {
    const h = SES.history.find(x => x.attemptId === attemptId); if (h) { delete h.pending; saveSes(); }
  }
}

/* ---------- results / analysis ---------- */
let RES = null, RV = { i: 0, f: "all" };
async function goResult(entry) {
  if (!entry) return;
  try { await prepMock(entry.paper, entry.mockKey); } catch (e) { return modal("Error", `<p>${esc(e.message)}</p>`); }
  const d = entry.detail || {};
  showResult(entry, compute(d.answers || {}, d.flags || {}, d.tspent || {}, d.timeMs || 0, d.timedOut));
}
function showResult(entry, R) {
  RES = { entry, R };
  const pass = R.score >= C.PASS_MARK, col = pass ? "var(--ok)" : "var(--bad)", d = entry.detail || {};
  let h = `<div class="card"><div class="small mut">${esc(entry.paper)} · ${esc(entry.mock)} · performance analysis</div><div class="scorebox" style="margin-top:.6rem">
    <div class="ring" style="border:10px solid ${col};color:${col}"><b>${R.score}%</b><span class="small">${fmtM(R.total)} / ${R.max}</span></div>
    <div style="flex:1;min-width:240px"><h1 style="color:${col}">${pass ? "PASS" : "FAIL"} <span class="mut" style="font-size:.9rem;font-weight:400">· pass mark ${C.PASS_MARK}%</span></h1>
      <p class="mut small" style="margin:.1rem 0 .8rem">Time taken: ${Math.round((d.timeMs || 0) / 60000)} of ${PAPER.minutes} min${d.timedOut ? " (time ran out)" : ""} · ${new Date(entry.submittedAt).toLocaleString()}</p>
      <div class="grid g4" style="grid-template-columns:repeat(auto-fit,minmax(105px,1fr));gap:.6rem">
        <div class="stat"><b>${R.attempted}/${ITEMS.length}</b><span>Attempted</span></div>
        <div class="stat"><b style="color:var(--ok)">${R.counts.correct}</b><span>Fully correct</span></div>
        <div class="stat"><b style="color:var(--amb)">${R.counts.partial}</b><span>Partly correct</span></div>
        <div class="stat"><b style="color:var(--bad)">${R.counts.wrong}</b><span>Wrong</span></div>
        <div class="stat"><b>${R.counts.unattempted}</b><span>Not attempted</span></div>
        <div class="stat"><b style="color:var(--gold)">${R.flagged}</b><span>Flagged</span></div></div></div></div>
    <div style="margin-top:1.1rem;display:flex;gap:.6rem;flex-wrap:wrap"><button class="btn gold" data-review>Review questions &amp; answers ▶</button><button class="btn ghost" data-dash>Back to dashboard</button></div></div>`;
  h += `<div class="card" style="margin-top:1rem"><h2>Your recommendations</h2>${R.recs.map(r => `<div class="rec ${r.k}"><b>${esc(r.h)}</b>${esc(r.t)}</div>`).join("")}</div>`;
  h += `<div class="card" style="margin-top:1rem"><h2>Performance by syllabus area</h2>`;
  Object.keys(SYL.areas).forEach(a => { const o = R.area[a]; if (o) h += barHTML(`<b>${a}</b> ${esc(SYL.areas[a])}`, pct(o), `${pct(o)}% <span class="mut small">${fmtM(o.e)}/${o.m}</span>`); });
  h += `<p class="small mut" style="margin-bottom:0">Dashed line = 50% pass level</p></div>`;
  h += `<div class="grid g2" style="margin-top:1rem"><div class="card"><h3>By section</h3><table class="t"><tr><th>Section</th><th>Marks</th><th>%</th></tr>${Object.keys(R.grp).map(g => `<tr><td>${g}</td><td>${fmtM(R.grp[g].e)}/${R.grp[g].m}</td><td>${pct(R.grp[g])}%</td></tr>`).join("")}</table></div>
    <div class="card"><h3>By question type</h3><table class="t"><tr><th>Type</th><th>Marks</th><th>%</th></tr>${Object.keys(R.type).map(g => `<tr><td>${g}</td><td>${fmtM(R.type[g].e)}/${R.type[g].m}</td><td>${pct(R.type[g])}%</td></tr>`).join("")}</table></div></div>`;
  const chs = Object.keys(R.ch).sort((a, b) => pct(R.ch[a]) - pct(R.ch[b]) || a - b);
  h += `<div class="card" style="margin-top:1rem"><h2>Chapter-wise analysis</h2><div class="tscroll"><table class="t"><tr><th>Ch</th><th>Chapter</th><th>Area</th><th>Marks</th><th>%</th><th>Status</th><th>Weak points</th></tr>` +
    chs.map(c => { const p = pct(R.ch[c]), L = p >= 70 ? ["Strong", "s"] : p >= 50 ? ["Average", "a"] : ["Weak", "w"]; return `<tr><td>${c}</td><td>${esc((SYL.chapters[c] || {}).n)}</td><td>${(SYL.chapters[c] || {}).a}</td><td>${fmtM(R.ch[c].e)}/${R.ch[c].m}</td><td>${p}%</td><td><span class="tag ${L[1]}">${L[0]}</span></td><td class="small">${esc((R.missed[c] || []).join(", ")) || "–"}</td></tr>`; }).join("") + `</table></div></div>`;
  const slow = ITEMS.map(it => ({ it, t: R.items[it.id].time })).filter(x => x.t > 1000).sort((a, b) => b.t - a.t).slice(0, 5);
  if (slow.length) h += `<div class="card" style="margin-top:1rem"><h3>Questions where you spent the most time</h3><table class="t"><tr><th>Question</th><th>Chapter</th><th>Time</th><th>Marks</th></tr>${slow.map(x => { const r = R.items[x.it.id]; return `<tr><td>Q${x.it.no}</td><td>${esc((SYL.chapters[x.it.ch] || {}).n)}</td><td>${Math.floor(x.t / 60000)}m ${Math.round(x.t % 60000 / 1000)}s</td><td>${fmtM(r.earned)}/${r.max}</td></tr>`; }).join("")}</table></div>`;
  h += `<div style="text-align:center;margin-top:1.2rem"><button class="btn gold" data-review>Review questions &amp; answers ▶</button></div>` + footer();
  render(h, "result");
  document.querySelectorAll("[data-review]").forEach(b => b.onclick = openReview);
  document.querySelectorAll("[data-dash]").forEach(b => b.onclick = () => goPaper(entry.paper));
}

/* ---------- answer review ---------- */
function rvList() {
  return ITEMS.map((it, i) => i).filter(i => {
    const st = RES.R.items[ITEMS[i].id].status;
    if (RV.f === "all") return true;
    if (RV.f === "flag") return !!((RES.entry.detail || {}).flags || {})[ITEMS[i].id];
    return RV.f === "wrong" ? (st === "wrong" || st === "partial") : st === RV.f;
  });
}
function openReview() {
  $("#rvTitle").textContent = `Answer review – ${RES.entry.paper} ${RES.entry.mock}`;
  $("#rvCand").textContent = SES.user.name;
  RV = { i: 0, f: "all" };
  $("#app").classList.add("hide"); $("#scr-review").classList.remove("hide"); renderReview();
}
function renderReview() {
  const R = RES.R, list = rvList();
  $("#rvFilt").innerHTML = [["all", "All"], ["correct", "Correct"], ["wrong", "Wrong / partial"], ["unattempted", "Not attempted"], ["flag", "Flagged"]].map(f => `<button class="${RV.f === f[0] ? "on" : ""}" data-f="${f[0]}">${f[1]}</button>`).join("");
  $("#rvFilt").querySelectorAll("[data-f]").forEach(b => b.onclick = () => { RV.f = b.dataset.f; const l = rvList(); if (l.length) RV.i = l[0]; renderReview(); });
  $("#rvGrid").innerHTML = list.map(i => { const it = ITEMS[i], st = R.items[it.id].status; return `<button class="nv ${{ correct: "r-ok", wrong: "r-bad", partial: "r-part", unattempted: "r-un" }[st]} ${i === RV.i ? "cur" : ""}" data-i="${i}">${it.no}</button>`; }).join("") || `<p class="small" style="color:#5c6675">No questions in this filter.</p>`;
  $("#rvGrid").querySelectorAll("[data-i]").forEach(b => b.onclick = () => { RV.i = +b.dataset.i; renderReview(); });
  const it = ITEMS[RV.i], sc = R.items[it.id];
  $("#rvNum").textContent = `Question ${it.no} of ${ITEMS.length} · ${fmtM(sc.earned)}/${sc.max} marks`;
  $("#rvTag").textContent = [...new Set(partsOf(it).map(p => p.ch || it.ch))].map(c => `Ch ${c}: ${(SYL.chapters[c] || {}).n}`).join(" · ");
  $("#rvInner").innerHTML = questionHTML(it, "review", sc);
  $("#rvBody").scrollTop = 0;
  const pos = list.indexOf(RV.i);
  $("#rvPrev").disabled = pos <= 0; $("#rvNext").disabled = pos < 0 || pos >= list.length - 1;
  $("#rvPrev").onclick = () => { if (pos > 0) { RV.i = list[pos - 1]; renderReview(); } };
  $("#rvNext").onclick = () => { if (pos < list.length - 1) { RV.i = list[pos + 1]; renderReview(); } };
}

/* ---------- exam tools ---------- */
function initTools() {
  const keys = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "−", "0", ".", "=", "+", "C", "(", ")", "%"];
  const disp = $("#cDisp"); let expr = "";
  $("#cKeys").innerHTML = keys.map(k => `<button>${k}</button>`).join("");
  $("#cKeys").querySelectorAll("button").forEach(b => b.onclick = () => {
    const k = b.textContent;
    if (k === "C") expr = "";
    else if (k === "=") {
      try { const s = expr.replace(/÷/g, "/").replace(/×/g, "*").replace(/−/g, "-").replace(/%/g, "/100"); if (!/^[\d+\-*/.() ]*$/.test(s)) throw 0;
        expr = String(Math.round(Function('"use strict";return (' + s + ")")() * 1e10) / 1e10); } catch (e) { expr = ""; disp.value = "Error"; return; }
    } else expr += k;
    disp.value = expr || "0";
  });
  document.querySelectorAll("[data-close]").forEach(b => b.onclick = () => $("#" + b.dataset.close).classList.add("hide"));
  $("#calcBtn").onclick = () => $("#calcPanel").classList.toggle("hide");
  $("#padBtn").onclick = () => { $("#padPanel").classList.toggle("hide"); $("#padPanel").style.right = $("#calcPanel").classList.contains("hide") ? "1rem" : "290px"; };
  $("#formulaBtn").onclick = () => modal("Formula sheet", PAPER.formulaSheet || "", [{ t: "Close", ghost: true }], { cbe: true, wide: true });
  $("#helpBtn").onclick = () => modal("Help", `<ul class="tiplist" style="line-height:1.7"><li><b>Next / Previous</b> – move one question at a time.</li><li><b>Navigator</b> – jump to any question; shows complete, incomplete, not attempted and flagged questions.</li><li><b>Flag for review</b> – mark a question to revisit.</li><li><b>Select TWO</b> questions – choose exactly two answers.</li><li>Section B questions have several parts – scroll down to see them all.</li><li><b>End exam</b> – submits your answers for marking.</li></ul>`, null, { cbe: true });
  $("#flagBtn").onclick = () => { const id = ITEMS[S.cur].id; S.flags[id] = !S.flags[id]; saveExam(); updFlag(); };
  $("#prevBtn").onclick = () => go(S.cur - 1);
  $("#nextBtn").onclick = () => go(S.cur + 1);
  $("#navBtn").onclick = openNavigator;
  $("#endBtn").onclick = confirmEnd;
  $("#rvBack").onclick = () => { $("#scr-review").classList.add("hide"); $("#app").classList.remove("hide"); showResult(RES.entry, RES.R); };
  document.querySelector(".top .title .logo").outerHTML = logoImg("2.2rem");
  $("#menuBtn").innerHTML = ic("menu"); $("#hdrInsta").innerHTML = ic("insta"); $("#hdrYt").innerHTML = ic("yt");
  $("#hdrInsta").href = C.INSTAGRAM; $("#hdrYt").href = C.YOUTUBE;
  $("#menuBtn").onclick = openMenu;
  $("#setBtn").onclick = openSettings;
}

/* =====================================================================
   SUPPORT CHAT (student side)
   ===================================================================== */
const CHAT = { open: false, msgs: [], timer: null, utimer: null, photo: "" };
function setBadge(n) { const b = $("#chatBadge"); b.textContent = n; b.classList.toggle("hide", !n); }
async function pollUnread() {
  if (!SES || CHAT.open || document.hidden || $("#app").classList.contains("hide")) return;
  try { const j = await api("chatUnread", { token: SES.token }); setBadge(j.unread); } catch (e) {}
}
function startChat() {
  clearInterval(CHAT.utimer); CHAT.utimer = setInterval(pollUnread, 60000); pollUnread();
}
function stopChat() { clearInterval(CHAT.utimer); clearInterval(CHAT.timer); CHAT.open = false; CHAT.msgs = []; $("#chatBox").classList.add("hide"); $("#chatFab").classList.remove("hide"); setBadge(0); }
const chatWelcome = () => (C.CHAT_WELCOME || "").replace("{name}", (SES.user.name || "").split(" ")[0]);
const chatPhoto = id => api("chatPhoto", { token: SES.token, id }).then(j => j.data);
function drawChat() { ChatUI.render($("#chatBody"), CHAT.msgs, "student", chatPhoto, chatWelcome()); }
async function loadChat() {
  try { const j = await api("chatList", { token: SES.token }); const pend = CHAT.msgs.filter(m => m.pending); CHAT.msgs = j.messages.concat(pend); drawChat(); setBadge(0); } catch (e) {}
}
function openChat() {
  CHAT.open = true; $("#chatBox").classList.remove("hide"); $("#chatFab").classList.add("hide");
  $("#chatAv").innerHTML = logoImg("2.4rem"); $("#chatBody").dataset.first = "1";
  drawChat(); loadChat();
  clearInterval(CHAT.timer); CHAT.timer = setInterval(() => { if (!document.hidden) loadChat(); }, 12000);
  setTimeout(() => $("#chatTxt").focus(), 50);
}
function closeChat() { CHAT.open = false; clearInterval(CHAT.timer); $("#chatBox").classList.add("hide"); $("#chatFab").classList.remove("hide"); }
function setChatPhoto(data) {
  CHAT.photo = data; const p = $("#chatPrev");
  p.classList.toggle("hide", !data);
  p.innerHTML = data ? `<img src="${data}" alt=""><span style="flex:1">Photo attached</span><button class="linkbtn small" id="chatRm">Remove</button>` : "";
  if (data) $("#chatRm").onclick = () => setChatPhoto("");
}
async function sendChat() {
  const t = $("#chatTxt"), text = t.value.trim(), photo = CHAT.photo;
  if (!text && !photo) return;
  const tmp = { id: "tmp" + Date.now(), at: new Date().toISOString(), from: "student", text, localPhoto: photo, pending: true };
  CHAT.msgs.push(tmp); t.value = ""; t.style.height = ""; setChatPhoto(""); drawChat();
  try { const j = await api("chatSend", { token: SES.token, text, photo }); Object.assign(tmp, j.message, { pending: false }); }
  catch (e) { CHAT.msgs = CHAT.msgs.filter(m => m !== tmp); t.value = text; if (photo) setChatPhoto(photo); toast("Not sent: " + e.message); }
  drawChat();
}
function initChat() {
  $("#chatFab").onclick = openChat; $("#chatClose").onclick = closeChat; $("#chatSend").onclick = sendChat;
  $("#chatAtt").onclick = () => $("#chatFile").click();
  $("#chatFile").onchange = async e => { const f = e.target.files[0]; e.target.value = ""; if (!f) return; try { setChatPhoto(await ChatUI.compress(f)); } catch (err) { toast(err.message); } };
  const t = $("#chatTxt");
  t.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } });
  t.addEventListener("input", () => { t.style.height = "auto"; t.style.height = Math.min(110, t.scrollHeight) + "px"; });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) CHAT.open ? loadChat() : pollUnread(); });
}

/* =====================================================================
   BOOT
   ===================================================================== */
(async function boot() {
  document.title = C.SITE_TITLE;
  initTools(); initChat();
  if (!SES || !SES.token) return showAuth("login");
  SES.history = SES.history || [];
  const ex = store.get("ah_exam", null);
  if (ex && ex.userId === SES.user.userId) { $("#auth").classList.add("hide"); resumeExam(); }
  else enterApp();
  flushQueue();
  try { const j = await api("me", { token: SES.token }); setSession(j); if (CUR_VIEW === "paper" || CUR_VIEW === "home") { refreshHeader(); CUR_VIEW === "paper" ? goPaper(store.get("ah_lastPaper")) : goHome(); } else refreshHeader(); }
  catch (e) { if (e.auth) { modal("Session expired", "<p>Please log in again.</p>"); logout(); } }
})();
