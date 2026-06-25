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
  { n: 'Camille L.', t: 'Voiture méconnaissable ! Les sièges étaient pleins de taches, tout est parti. Travail soigné et ponctuel.' },
  { n: 'Mehdi B.', t: 'Service au top, déplacement à domicile super pratique. Intérieur impeccable et parfumé. Je recommande à 100%.' },
  { n: 'Sophie R.', t: 'Très professionnel. Le coffre et les moquettes comme neufs. Rapport qualité/prix excellent.' },
  { n: 'Julien D.', t: 'J\'avais des poils de chien partout, plus aucune trace ! Matériel pro, vrai résultat. Merci MyClean.' },
  { n: 'Laura M.', t: 'Réactif, sympa et minutieux. Rendez-vous pris le jour même. Ma citadine n\'a jamais été aussi propre.' },
  { n: 'Antoine P.', t: 'Prestation Premium sur mon SUV : nickel. Désinfection vapeur impeccable, odeur fraîche garantie.' },
  { n: 'Nadia K.', t: 'Ils se déplacent chez vous, c\'est génial. Travail propre, sérieux et tarif honnête. Top !' },
  { n: 'Thomas G.', t: 'Injecteur-extracteur de pro, les sièges en tissu sont comme neufs. Je referai appel à eux sans hésiter.' },
];
const track = document.getElementById('reviewsTrack');
if (track) {
  const card = r => `
    <div class="review">
      <div class="stars">★★★★★</div>
      <p>"${r.t}"</p>
      <div class="who">
        <div class="av">${r.n.charAt(0)}</div>
        <div><div class="nm">${r.n}</div><div class="gg">Avis Google ✓</div></div>
      </div>
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
