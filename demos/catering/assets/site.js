const WHATSAPP = '2347026305945'; /* swap for the client's number */
const f = document.getElementById('qf');
if (f) {
  const p = new URLSearchParams(location.search).get('pkg');
  if (p) f.pkg.value = p;
  f.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(f);
    const msg = `Hello Labake, I’d like a catering quote.\nName: ${d.get('name')}\nCompany: ${d.get('company') || '-'}\nDate: ${d.get('date')}\nGuests: ${d.get('guests')}\nPackage: ${d.get('pkg')}\nNotes: ${d.get('notes') || '-'}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });
}
