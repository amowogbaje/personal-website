const WHATSAPP = '2347026305945'; /* swap for the client's number */
const f = document.getElementById('qf');
if (f) {
  const s = new URLSearchParams(location.search).get('service');
  if (s) f.service.value = s;
  f.addEventListener('submit', e => {
    e.preventDefault(); const d = new FormData(f);
    const m = `Hello Kestrel, I’d like to discuss a project.\nName: ${d.get('name')}\nCompany: ${d.get('company') || '-'}\nService: ${d.get('service')}\nBudget: ${d.get('budget')}\nTimeline: ${d.get('time')}\nDetails: ${d.get('notes') || '-'}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(m)}`, '_blank', 'noopener');
  });
}
