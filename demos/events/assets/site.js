const WHATSAPP = '2347026305945'; /* swap for the client's number */
const f = document.getElementById('qf');
if (f) {
  const p = new URLSearchParams(location.search).get('pkg');
  if (p) f.pkg.value = p;
  f.addEventListener('submit', e => {
    e.preventDefault(); const d = new FormData(f);
    const m = `Hello Temi, I’d like to plan an event.\nName: ${d.get('name')}\nEvent: ${d.get('type')}\nDate: ${d.get('date')}\nGuests: ${d.get('guests')}\nVenue: ${d.get('venue') || '-'}\nPackage: ${d.get('pkg')}\nNotes: ${d.get('notes') || '-'}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(m)}`, '_blank', 'noopener');
  });
}
const chips = document.querySelectorAll('.chip');
chips.forEach(c => c.addEventListener('click', () => {
  chips.forEach(x => x.setAttribute('aria-pressed', String(x === c)));
  document.querySelectorAll('[data-cat]').forEach(s => s.hidden = !(c.dataset.f === 'all' || s.dataset.cat === c.dataset.f));
}));
