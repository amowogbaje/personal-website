const WHATSAPP = '2347026305945'; /* swap for the client's number */
const f = document.getElementById('qf');
if (f) f.addEventListener('submit', e => {
  e.preventDefault(); const d = new FormData(f);
  const m = `Hello Ayo, I’d like to book a shoot.\nName: ${d.get('name')}\nShoot: ${d.get('type')}\nDate: ${d.get('date')}\nLocation: ${d.get('loc') || '-'}\nBudget: ${d.get('budget')}\nNotes: ${d.get('notes') || '-'}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(m)}`, '_blank', 'noopener');
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
