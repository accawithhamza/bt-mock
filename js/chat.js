/* Shared chat helpers (used by the student portal and the admin panel) */
"use strict";
window.ChatUI = (function () {
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const linkify = t => esc(t).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  const photoCache = {};

  // shrink a photo to max 1280px JPEG before upload
  async function compress(file, max = 1280) {
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error("Could not read this image. Try a JPG or PNG.")); i.src = URL.createObjectURL(file); });
    const k = Math.min(1, max / Math.max(img.width, img.height));
    const cv = document.createElement("canvas"); cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k);
    const ctx = cv.getContext("2d"); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, cv.width, cv.height); ctx.drawImage(img, 0, 0, cv.width, cv.height);
    let q = .82, data = cv.toDataURL("image/jpeg", q);
    while (data.length > 1400000 && q > .4) { q -= .12; data = cv.toDataURL("image/jpeg", q); }
    return data;
  }

  const fmtT = iso => new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const fmtD = iso => { const d = new Date(iso), t = new Date(); const y = new Date(); y.setDate(t.getDate() - 1);
    return d.toDateString() === t.toDateString() ? "Today" : d.toDateString() === y.toDateString() ? "Yesterday" : d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }); };

  // msgs: [{id, at, from:"student"|"admin", text, photo, pending, localPhoto}]
  function render(box, msgs, mySide, loadPhoto, welcome) {
    const stick = box.scrollHeight - box.scrollTop - box.clientHeight < 80 || box.dataset.first !== "0";
    let h = welcome ? `<div class="bub them sys">${linkify(welcome)}</div>` : "", lastDay = "";
    msgs.forEach(m => {
      const day = fmtD(m.at); if (day !== lastDay) { h += `<div class="daysep">${day}</div>`; lastDay = day; }
      const img = m.localPhoto ? `<img src="${m.localPhoto}" alt="Photo">` : m.photo ? `<img data-pid="${esc(m.id)}" alt="Photo (loading…)">` : "";
      h += `<div class="bub ${m.from === mySide ? "me" : "them"}">${img}${m.text ? linkify(m.text) : ""}<span class="tm">${m.pending ? "sending…" : fmtT(m.at)}</span></div>`;
    });
    box.innerHTML = h;
    box.querySelectorAll("img[data-pid]").forEach(async el => {
      const id = el.dataset.pid;
      el.addEventListener("load", () => { if (stick) box.scrollTop = box.scrollHeight; });
      try { if (!photoCache[id]) photoCache[id] = loadPhoto(id); el.src = await photoCache[id]; } catch (e) { delete photoCache[id]; el.alt = "Photo unavailable"; }
    });
    box.querySelectorAll(".bub img[src]").forEach(el => el.addEventListener("load", () => { if (stick) box.scrollTop = box.scrollHeight; }));
    box.querySelectorAll(".bub img").forEach(el => el.onclick = () => { const w = window.open(); if (w) w.document.write(`<img src="${el.src}" style="max-width:100%">`); });
    if (stick) { box.scrollTop = box.scrollHeight; box.dataset.first = "0"; }
  }
  return { compress, render, esc };
})();
