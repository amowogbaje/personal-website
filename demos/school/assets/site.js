const WHATSAPP = '2347026305945'; /* swap for the school's number */
if (location.search.includes('labels')) document.body.classList.add('labels');
const f = document.getElementById('qf');
if (f) f.addEventListener('submit', e => {
  e.preventDefault(); const d = new FormData(f);
  const m = `Hello Hillcrest, I’d like to book a school tour.\nParent: ${d.get('name')}\nChild’s name: ${d.get('child')}\nClass applying for: ${d.get('level')}\nPreferred date: ${d.get('date')}\nQuestions: ${d.get('notes') || '-'}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(m)}`, '_blank', 'noopener');
});
const tabs = document.querySelectorAll('.tab');
const show = id => { tabs.forEach(t => t.setAttribute('aria-pressed', String(t.dataset.t === id))); document.querySelectorAll('.lv').forEach(l => l.hidden = l.id !== id); };
if (tabs.length) { tabs.forEach(t => t.addEventListener('click', () => show(t.dataset.t))); show(location.hash.slice(1) || 'nursery'); }
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

/* ===== Parent self-service ===== */
const wa = t => window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`, '_blank', 'noopener');
const naira = n => '₦' + Math.round(n).toLocaleString('en-NG');
/* EDIT THESE: school calendar (date is YYYY-MM-DD) and fees per term */
const EVENTS = [
  { d: '2026-11-14', t: '10:00', title: 'Open Day', type: 'events', place: 'Main hall', rsvp: true, info: 'Tour the school, meet teachers and ask questions.' },
  { d: '2026-11-20', t: '09:00', title: 'Inter-house Sports Day', type: 'sports', place: 'Sports field', rsvp: false, info: 'Races, relays and house pride. Parents welcome.' },
  { d: '2026-11-26', t: '16:00', title: 'Parent-teacher meeting', type: 'parents', place: 'Classrooms', rsvp: true, info: 'Meet your child’s class teacher about progress.' },
  { d: '2026-12-03', t: '17:00', title: 'Christmas concert', type: 'events', place: 'Main hall', rsvp: true, info: 'Music, drama and carols from every class.' },
  { d: '2026-12-11', t: '12:00', title: 'First term ends', type: 'academic', place: 'School', rsvp: false, info: 'Early closure at 12 noon.' },
  { d: '2027-01-11', t: '08:00', title: 'Second term begins', type: 'academic', place: 'School', rsvp: false, info: 'Resumption for all classes.' },
  { d: '2027-02-13', t: '10:00', title: 'Open Day', type: 'events', place: 'Main hall', rsvp: true, info: 'Tour the school and meet the team.' },
  { d: '2027-03-05', t: '10:00', title: 'Science fair', type: 'academic', place: 'Science lab', rsvp: true, info: 'Pupils present their projects.' }
];
const TUITION = { nursery: ['Nursery', 650000], primary: ['Primary', 850000], jss: ['JSS1 to JSS3', 1050000], sss: ['SS1 to SS3', 1200000] };
const EXTRAS = { bus: ['School bus', 150000], lunch: ['Lunch plan', 120000], club: ['After-school club', 60000] };
(function () {
  /* parent message form */
  const mf = document.getElementById('mf');
  if (mf) {
    const t = new URLSearchParams(location.search).get('type'); if (t) mf.elements.type.value = t;
    mf.addEventListener('submit', e => { e.preventDefault(); const d = new FormData(mf);
      wa(`Hello Hillcrest, ${d.get('type')}.\nParent: ${d.get('name')}\nChild and class: ${d.get('child')}\nDate: ${d.get('date') || '-'}\nMessage: ${d.get('msg')}`); });
  }
  /* FAQ search */
  const fs = document.getElementById('faqs');
  if (fs) fs.addEventListener('input', () => {
    const q = fs.value.toLowerCase().trim(); let n = 0;
    document.querySelectorAll('#answers details').forEach(x => { const ok = !q || x.textContent.toLowerCase().includes(q); x.hidden = !ok; if (ok) n++; });
    document.getElementById('none').hidden = n > 0;
  });
  /* application form */
  const af = document.getElementById('af');
  if (af) {
    const steps = [...af.querySelectorAll('fieldset')], bar = document.getElementById('pbar'), lab = document.getElementById('slab'), KEY = 'hillcrest-application';
    let i = 0;
    try { const s = JSON.parse(localStorage.getItem(KEY) || '{}'); for (const k in s) if (af.elements[k] && af.elements[k].type !== 'checkbox') af.elements[k].value = s[k]; } catch (e) {}
    af.addEventListener('input', () => { try { localStorage.setItem(KEY, JSON.stringify(Object.fromEntries(new FormData(af)))); } catch (e) {} });
    const lines = () => [...af.elements].filter(el => el.name && el.name !== 'ok' && el.value).map(el => [el.closest('label').firstChild.textContent.trim(), el.value]);
    const go = n => {
      i = n; steps.forEach((s, j) => s.hidden = j !== n);
      bar.style.width = ((n + 1) / steps.length * 100) + '%'; lab.textContent = `Step ${n + 1} of ${steps.length}`;
      if (n === steps.length - 1) document.getElementById('rev').innerHTML = lines().map(([a, b]) => `<li><span>${a}</span><b>${b.replace(/</g, '&lt;')}</b></li>`).join('');
      window.scrollTo({ top: af.getBoundingClientRect().top + scrollY - 90, behavior: 'smooth' });
    };
    const valid = () => [...steps[i].querySelectorAll('input,select,textarea')].every(el => el.reportValidity());
    af.querySelectorAll('.nx').forEach(b => b.addEventListener('click', () => valid() && go(i + 1)));
    af.querySelectorAll('.bk').forEach(b => b.addEventListener('click', () => go(i - 1)));
    const text = () => 'Hello Hillcrest, I’d like to submit an application.\n' + lines().map(([a, b]) => `${a}: ${b}`).join('\n');
    af.addEventListener('submit', e => { e.preventDefault(); if (i < steps.length - 1) { valid() && go(i + 1); return; } wa(text()); try { localStorage.removeItem(KEY); } catch (x) {} });
    document.getElementById('cp').addEventListener('click', e => { navigator.clipboard.writeText(text()).then(() => e.target.textContent = 'Copied'); });
    go(0);
  }
  /* calendar */
  const cal = document.getElementById('cal');
  if (cal) {
    const fmt = (d, o) => new Date(d + 'T00:00:00').toLocaleDateString('en-GB', o);
    const today = new Date().toISOString().slice(0, 10);
    const nx = EVENTS.filter(e => e.d >= today).sort((a, b) => a.d.localeCompare(b.d))[0];
    if (nx) { const days = Math.round((new Date(nx.d) - new Date(today)) / 864e5); document.getElementById('nxt').textContent = `Next: ${nx.title}, ${days === 0 ? 'today' : days === 1 ? 'tomorrow' : 'in ' + days + ' days'}`; } else document.getElementById('nxt').hidden = true;
    const ics = e => { const s = e.d.replace(/-/g, '') + 'T' + e.t.replace(':', '') + '00', h = String(+e.t.slice(0, 2) + 2).padStart(2, '0') + e.t.slice(3);
      const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', 'DTSTART:' + s, 'DTEND:' + e.d.replace(/-/g, '') + 'T' + h + '00', 'SUMMARY:' + e.title + ' - Hillcrest', 'LOCATION:' + e.place, 'DESCRIPTION:' + e.info, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([body], { type: 'text/calendar' })); a.download = e.title.replace(/\W+/g, '-').toLowerCase() + '.ics'; a.click(); };
    const draw = f => {
      cal.innerHTML = ''; let m = '';
      EVENTS.filter(e => e.d >= today && (f === 'all' || e.type === f)).sort((a, b) => a.d.localeCompare(b.d)).forEach(e => {
        const mo = fmt(e.d, { month: 'long', year: 'numeric' });
        if (mo !== m) { m = mo; cal.insertAdjacentHTML('beforeend', `<h2 class="mo">${mo}</h2>`); }
        const el = document.createElement('div'); el.className = 'evt';
        el.innerHTML = `<div class="d"><b>${fmt(e.d, { day: 'numeric' })}</b>${fmt(e.d, { month: 'short' })}</div><div><h3>${e.title}</h3><p>${fmt(e.d, { weekday: 'long' })}, ${e.t}. ${e.place}. ${e.info}</p></div><div class="a"></div>`;
        const a = el.querySelector('.a');
        const add = document.createElement('button'); add.className = 'btn sm out'; add.textContent = 'Add to calendar'; add.onclick = () => ics(e); a.append(add);
        if (e.rsvp) { const r = document.createElement('button'); r.className = 'btn sm'; r.textContent = 'RSVP'; r.onclick = () => wa(`Hello Hillcrest, I’d like to RSVP for ${e.title} on ${fmt(e.d, { day: 'numeric', month: 'long' })}.\nParent name:\nNumber of guests:`); a.append(r); }
        cal.append(el);
      });
      if (!cal.children.length) cal.innerHTML = '<p>No upcoming events in this category.</p>';
    };
    document.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => draw(c.dataset.f))); draw('all');
  }
  /* fees calculator */
  const fc = document.getElementById('fc');
  if (fc) {
    const calc = () => {
      const lv = TUITION[fc.elements.level.value]; let t = lv[1]; const ex = [];
      Object.keys(EXTRAS).forEach(k => { if (fc.elements[k].checked) { t += EXTRAS[k][1]; ex.push(EXTRAS[k][0]); } });
      document.getElementById('term').textContent = naira(t); document.getElementById('year').textContent = naira(t * 3);
      document.getElementById('pay').onclick = () => wa(`Hello Hillcrest, I’d like to confirm the fees.\nClass: ${lv[0]}\nExtras: ${ex.join(', ') || 'none'}\nPer term: ${naira(t)}`);
    };
    fc.addEventListener('input', calc); calc();
    const tb = document.getElementById('tuition'); if (tb) tb.innerHTML = Object.values(TUITION).map(v => `<tr><td>${v[0]}</td><td>${naira(v[1])}</td></tr>`).join('');
  }
})();
