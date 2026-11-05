const WHATSAPP = '2347026305945'; /* swap for the client's number */
const q = new URLSearchParams(location.search);
const f = document.getElementById('qf');
if (f) {
  ['date', 'guests', 'space'].forEach(k => { if (q.get(k)) f[k].value = q.get(k); });
  f.addEventListener('submit', e => {
    e.preventDefault(); const d = new FormData(f);
    const m = `Hello Halcyon, I’d like to enquire about a venue.\nName: ${d.get('name')}\nEvent: ${d.get('type')}\nDate: ${d.get('date')}\nGuests: ${d.get('guests')}\nSpace: ${d.get('space')}\nNotes: ${d.get('notes') || '-'}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(m)}`, '_blank', 'noopener');
  });
}
const g = document.getElementById('guests');
if (g) g.addEventListener('input', () => {
  const n = +g.value;
  document.querySelectorAll('.space').forEach(s => {
    const ok = !n || (n >= +s.dataset.min && n <= +s.dataset.max);
    s.classList.toggle('dim', !ok); s.classList.toggle('fit', !!n && ok);
  });
});
const chips = document.querySelectorAll('.chip');
chips.forEach(c => c.addEventListener('click', () => {
  chips.forEach(x => x.setAttribute('aria-pressed', String(x === c)));
  document.querySelectorAll('[data-cat]').forEach(s => s.hidden = !(c.dataset.f === 'all' || s.dataset.cat === c.dataset.f));
}));
const lb = document.getElementById('lb');
if (lb) {
  document.querySelectorAll('.mason .slot').forEach(s => {
    const open = () => { const i = s.querySelector('img'); if (i) { lb.querySelector('img').src = i.src; lb.showModal(); } };
    s.tabIndex = 0; s.addEventListener('click', open); s.addEventListener('keydown', e => { if (e.key === 'Enter') open(); });
  });
  lb.addEventListener('click', () => lb.close());
}
