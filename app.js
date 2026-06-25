/* ===== Burger / mobile menu ===== */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open'); mobileMenu.classList.remove('open');
  }));
}

/* ===== Scroll reveal ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ===== Before / After sliders ===== */
document.querySelectorAll('[data-ba]').forEach(slider => {
  const before = slider.querySelector('.ba-before');
  const handle = slider.querySelector('.ba-handle');
  let active = false;
  const move = (clientX) => {
    const r = slider.getBoundingClientRect();
    let pct = ((clientX - r.left) / r.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left = pct + '%';
  };
  slider.addEventListener('mousedown', e => { active = true; move(e.clientX); });
  window.addEventListener('mousemove', e => { if (active) move(e.clientX); });
  window.addEventListener('mouseup', () => active = false);
  slider.addEventListener('touchstart', e => { active = true; move(e.touches[0].clientX); }, { passive: true });
  slider.addEventListener('touchmove', e => { if (active) move(e.touches[0].clientX); }, { passive: true });
  slider.addEventListener('touchend', () => active = false);
});

/* ===== Reviews carousel ===== */
const reviews = [
  { n: 'Camille L.', d: '18/06/2026', t: 'Voiture méconnaissable ! Les sièges étaient pleins de taches, tout est parti. Travail soigné et ponctuel.' },
  { n: 'Mehdi B.', d: '11/06/2026', t: 'Service au top, déplacement à domicile super pratique. Intérieur impeccable et parfumé. Je recommande à 100%.' },
  { n: 'Sophie R.', d: '03/06/2026', t: 'Très professionnel. Le coffre et les moquettes comme neufs. Rapport qualité/prix excellent.' },
  { n: 'Julien D.', d: '26/05/2026', t: 'J\'avais des poils de chien partout, plus aucune trace ! Matériel pro, vrai résultat. Merci MyClean.' },
  { n: 'Laura M.', d: '17/05/2026', t: 'Réactif, sympa et minutieux. Rendez-vous pris le jour même. Ma citadine n\'a jamais été aussi propre.' },
  { n: 'Antoine P.', d: '08/05/2026', t: 'Prestation Premium sur mon SUV : nickel. Désinfection vapeur impeccable, odeur fraîche garantie.' },
  { n: 'Nadia K.', d: '28/04/2026', t: 'Ils se déplacent chez vous, c\'est génial. Travail propre, sérieux et tarif honnête. Top !' },
  { n: 'Thomas L.', d: '19/04/2026', t: 'Injecteur-extracteur de pro, les sièges en tissu sont comme neufs. Je referai appel à eux sans hésiter.' },
];
const track = document.getElementById('reviewsTrack');
if (track) {
  const GLOGO = '<svg class="g-logo-sm" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';
  const CHECK = '<svg class="verified" width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#4285F4"/><path d="M7 12.5l3 3 7-7" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const card = r => `
    <div class="review">
      <div class="review-top">
        ${GLOGO}
        <div class="review-id"><div class="nm">${r.n}</div><div class="dt">${r.d}</div></div>
      </div>
      <div class="stars">★★★★★ ${CHECK}</div>
      <p>"${r.t}"</p>
    </div>`;
  track.innerHTML = [...reviews, ...reviews].map(card).join('');
}

/* ===== Devis multi-step form ===== */
const devisForm = document.getElementById('devisForm');
if (devisForm) {
  const state = { vehicles: 1, formule: 'express', formulePrice: 20, type: 'citadine', premium: 60, options: {} };
  let currentStep = 1;
  const totalSteps = 5;
  const steps = document.querySelectorAll('.step');
  const dots = document.querySelectorAll('#stepsBar .sdot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  const compute = () => {
    let base = state.formule === 'premium' ? state.premium : state.formulePrice;
    let opts = 0; Object.values(state.options).forEach(v => opts += v);
    return (base + opts) * state.vehicles;
  };
  const refresh = () => {
    const v = compute() + '€';
    const e1 = document.getElementById('estimateVal');
    const e2 = document.getElementById('estimateVal2');
    if (e1) e1.textContent = v;
    if (e2) e2.textContent = v;
  };

  document.querySelectorAll('[data-single]').forEach(group => {
    const key = group.dataset.single;
    group.querySelectorAll('.choice').forEach(choice => {
      choice.addEventListener('click', () => {
        group.querySelectorAll('.choice').forEach(c => c.classList.remove('selected'));
        choice.classList.add('selected');
        if (key === 'vehicles') state.vehicles = parseInt(choice.dataset.val);
        if (key === 'formule') { state.formule = choice.dataset.val; state.formulePrice = parseInt(choice.dataset.price); }
        if (key === 'type') { state.type = choice.dataset.val; state.premium = parseInt(choice.dataset.premium); }
        refresh();
      });
    });
  });

  document.querySelectorAll('[data-multi="options"] .check-row').forEach(row => {
    row.addEventListener('click', () => {
      row.classList.toggle('selected');
      const val = row.dataset.val, price = parseInt(row.dataset.price);
      if (row.classList.contains('selected')) state.options[val] = price; else delete state.options[val];
      refresh();
    });
  });

  const showStep = n => {
    steps.forEach(s => s.classList.toggle('active', parseInt(s.dataset.step) === n));
    dots.forEach((d, i) => d.classList.toggle('active', i < n));
    prevBtn.style.visibility = n === 1 ? 'hidden' : 'visible';
    nextBtn.textContent = n === totalSteps ? 'Envoyer ✓' : 'Continuer →';
    if (n === totalSteps) refresh();
  };

  nextBtn.addEventListener('click', () => {
    if (currentStep < totalSteps) { currentStep++; showStep(currentStep); }
    else {
      const nom = document.getElementById('f_nom').value.trim();
      const tel = document.getElementById('f_tel').value.trim();
      if (!nom || !tel) { alert('Merci de renseigner au moins votre nom et votre téléphone.'); return; }
      devisForm.style.display = 'none';
      document.getElementById('stepsBar').style.display = 'none';
      document.getElementById('successName').textContent = nom;
      document.getElementById('devisOk').classList.add('show');
    }
  });
  prevBtn.addEventListener('click', () => { if (currentStep > 1) { currentStep--; showStep(currentStep); } });
  refresh();
}

/* ===== Carrousel formules (indicateur de défilement) ===== */
const fTrack = document.getElementById('formulesTrack');
const fThumb = document.getElementById('fcardsThumb');
if (fTrack && fThumb) {
  const updateThumb = () => {
    const max = fTrack.scrollWidth - fTrack.clientWidth;
    const visible = fTrack.clientWidth / fTrack.scrollWidth;
    const ratio = max > 0 ? fTrack.scrollLeft / max : 0;
    fThumb.style.width = (visible * 100) + '%';
    fThumb.style.left = (ratio * (100 - visible * 100)) + '%';
  };
  fTrack.addEventListener('scroll', updateThumb, { passive: true });
  window.addEventListener('resize', updateThumb);
  updateThumb();
}

/* ===== FAQ accordion ===== */
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight = null; });
    if (!open) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
  });
});
