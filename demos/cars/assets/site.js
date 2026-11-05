const WHATSAPP = '2347026305945'; /* swap for the client's number */
const q = new URLSearchParams(location.search);
/* booking bar tabs on the home page */
const bar = document.getElementById('bar');
if (bar) {
  const tabs = bar.querySelectorAll('.tab'), t = bar.querySelector('[name=type]'), a = bar.querySelector('[name=area]'), lab = bar.querySelector('#alab');
  tabs.forEach(b => b.addEventListener('click', () => {
    tabs.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    t.value = b.dataset.t; lab.firstChild.textContent = b.dataset.t === 'car' ? 'Pickup area' : 'Stay area';
  }));
}
/* enquiry form */
const f = document.getElementById('qf');
if (f) {
  if (q.get('type')) f.type.value = q.get('type') === 'stay' ? 'Shortlet' : 'Car hire';
  ['from', 'to', 'item'].forEach(k => { if (q.get(k)) f[k].value = q.get(k); });
  if (!f.item.value && q.get('area')) f.item.value = q.get('area');
  f.addEventListener('submit', e => {
    e.preventDefault(); const d = new FormData(f);
    const m = `Hello Tunde, I’d like to book.\nName: ${d.get('name')}\nService: ${d.get('type')}\nFrom: ${d.get('from')}\nTo: ${d.get('to')}\nCar or apartment: ${d.get('item') || '-'}\nDriver: ${d.get('driver')}\nNotes: ${d.get('notes') || '-'}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(m)}`, '_blank', 'noopener');
  });
}
/* filters */
const chips = document.querySelectorAll('.chip');
chips.forEach(c => c.addEventListener('click', () => {
  chips.forEach(x => x.setAttribute('aria-pressed', String(x === c)));
  document.querySelectorAll('[data-cat]').forEach(s => s.hidden = !(c.dataset.f === 'all' || s.dataset.cat === c.dataset.f));
}));
