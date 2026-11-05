const WHATSAPP = '2347026305945'; /* swap for the client's number */
const q = new URLSearchParams(location.search);
const naira = n => '₦' + Math.round(n).toLocaleString('en-NG');
/* contact form */
const f = document.getElementById('qf');
if (f) {
  [['hamper', 'hamper'], ['qty', 'qty'], ['budget', 'budget'], ['date', 'date']].forEach(([k, n]) => { if (q.get(k)) f[n].value = q.get(k); });
  f.addEventListener('submit', e => {
    e.preventDefault(); const d = new FormData(f);
    const m = `Hello Bow & Co., I’d like a corporate gifting quote.\nName: ${d.get('name')}\nCompany: ${d.get('company')}\nQuantity: ${d.get('qty')}\nBudget per gift: ${d.get('budget') || '-'}\nNeeded by: ${d.get('date')}\nHamper: ${d.get('hamper') || '-'}\nBranding: ${d.get('brand')}\nNotes: ${d.get('notes') || '-'}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(m)}`, '_blank', 'noopener');
  });
}
/* hamper filters */
const chips = document.querySelectorAll('.chip');
chips.forEach(c => c.addEventListener('click', () => {
  chips.forEach(x => x.setAttribute('aria-pressed', String(x === c)));
  document.querySelectorAll('[data-cat]').forEach(s => s.hidden = !(c.dataset.f === 'all' || s.dataset.cat === c.dataset.f));
}));
/* hamper builder */
const b = document.getElementById('build');
if (b) {
  const out = id => document.getElementById(id), go = out('go');
  const calc = () => {
    const box = +b.box.value, items = [...b.querySelectorAll('.it:checked')];
    const unit = box + items.reduce((s, i) => s + +i.value, 0) + (b.brand.checked ? 1000 : 0);
    const qty = Math.max(1, +b.qty.value || 1), disc = qty >= 250 ? .12 : qty >= 100 ? .08 : qty >= 50 ? .05 : 0;
    out('unit').textContent = naira(unit); out('disc').textContent = disc ? Math.round(disc * 100) + '% off' : 'None';
    out('total').textContent = naira(unit * qty * (1 - disc));
    const names = items.map(i => i.dataset.n).join(', ') || 'box only';
    go.href = 'contact.html?qty=' + qty + '&hamper=' + encodeURIComponent(b.box.selectedOptions[0].dataset.n + ': ' + names + (b.brand.checked ? ', branded' : ''));
  };
  b.addEventListener('input', calc); calc();
}
