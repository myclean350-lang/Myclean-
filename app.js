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

/* ===== Carrousel Avant/Après (Zone) ===== */
const baCar = document.getElementById('baCarousel');
if (baCar) {
  const slides = baCar.querySelectorAll('.ba-slide');
  const dots = document.querySelectorAll('.ba-dots button');
  let idx = 0;
  const show = i => {
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('active', n === idx));
    dots.forEach((d, n) => d.classList.toggle('active', n === idx));
  };
  const prev = document.querySelector('.ba-prev');
  const next = document.querySelector('.ba-next');
  if (prev) prev.addEventListener('click', () => show(idx - 1));
  if (next) next.addEventListener('click', () => show(idx + 1));
  dots.forEach((d, n) => d.addEventListener('click', () => show(n)));
}

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
  // Tarifs : prix par formule ET par modèle de véhicule
  const PRICE = {
    express: { citadine: 20, suv: 20, van: 20 },
    sieges:  { citadine: 40, suv: 40, van: 40 },
    premium: { citadine: 60, suv: 70, van: 80 }
  };
  const CAT_LABEL = { citadine: 'Citadine / Berline', suv: 'SUV / 4x4', van: 'Van / Monospace' };
  const FORM_LABEL = { express: 'Express', sieges: 'Sièges', premium: 'Premium' };
  const OPT_LABEL = { coffre: 'Nettoyage coffre', deplacement: 'Déplacement', poils: 'Poils / sable' };

  const state = { vehicles: 1, categories: [], formule: null, options: {} };
  let step = 1;
  const total = 5;
  const steps = document.querySelectorAll('.step');
  const segs = document.querySelectorAll('#progress .seg');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // Construit le détail du devis (une ligne par véhicule + options)
  const buildLines = () => {
    const lines = [];
    if (!state.formule) return lines;
    const cats = state.categories.length ? state.categories : ['citadine'];
    const fl = FORM_LABEL[state.formule];
    if (cats.length <= 1) {
      const c = cats[0], qty = state.vehicles;
      lines.push({ label: `Formule ${fl} — ${CAT_LABEL[c]}${qty > 1 ? ' ×' + qty : ''}`, price: PRICE[state.formule][c] * qty });
    } else {
      // Plusieurs modèles : on additionne un véhicule de chaque type
      cats.forEach(c => lines.push({ label: `Formule ${fl} — ${CAT_LABEL[c]}`, price: PRICE[state.formule][c] }));
    }
    Object.keys(state.options).forEach(k => lines.push({ label: OPT_LABEL[k] || k, price: state.options[k], opt: true }));
    return lines;
  };
  const refreshEstimate = () => {
    const lines = buildLines();
    const box = document.getElementById('recapLines');
    if (box) box.innerHTML = lines.map(l =>
      `<div class="recap-line${l.opt ? ' opt' : ''}"><span>${l.label}</span><b>${l.opt ? '+' : ''}${l.price}€</b></div>`
    ).join('');
    const sum = lines.reduce((a, l) => a + l.price, 0);
    const el = document.getElementById('estimateVal');
    if (el) el.textContent = state.formule ? sum + '€' : '—';
  };

  // Choix unique (véhicules, prestation)
  document.querySelectorAll('[data-single]').forEach(group => {
    const key = group.dataset.single;
    group.querySelectorAll('.num, .srow').forEach(opt => {
      opt.addEventListener('click', () => {
        group.querySelectorAll('.num, .srow').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        if (key === 'vehicles') state.vehicles = parseInt(opt.dataset.val);
        if (key === 'formule') state.formule = opt.dataset.val;
        refreshEstimate(); updateNav();
      });
    });
  });

  // Choix multiple (catégories, options)
  document.querySelectorAll('[data-multi]').forEach(group => {
    const key = group.dataset.multi;
    group.querySelectorAll('.srow').forEach(opt => {
      opt.addEventListener('click', () => {
        opt.classList.toggle('selected');
        if (key === 'categories') {
          state.categories = [...group.querySelectorAll('.srow.selected')].map(o => o.dataset.val);
        } else {
          const val = opt.dataset.val, price = parseInt(opt.dataset.price || 0);
          if (opt.classList.contains('selected')) state.options[val] = price; else delete state.options[val];
        }
        refreshEstimate(); updateNav();
      });
    });
  });

  const stepValid = () => {
    if (step === 2) return state.categories.length > 0;
    if (step === 3) return !!state.formule;
    if (step === 4) {
      const v = id => (document.getElementById(id).value || '').trim();
      return v('f_prenom') && v('f_nom') && v('f_tel');
    }
    return true;
  };
  const updateNav = () => { nextBtn.classList.toggle('is-disabled', !stepValid()); };

  const show = n => {
    step = n;
    steps.forEach(s => s.classList.toggle('active', parseInt(s.dataset.step) === n));
    segs.forEach((s, i) => s.classList.toggle('active', i < n));
    prevBtn.classList.toggle('is-disabled', n === 1);
    nextBtn.textContent = n === total ? 'Envoyer ma demande' : 'Suivant →';
    if (n === total) refreshEstimate();
    updateNav();
  };

  ['f_prenom', 'f_nom', 'f_tel', 'f_email', 'f_cp'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateNav);
  });

  nextBtn.addEventListener('click', () => {
    if (nextBtn.classList.contains('is-disabled')) return;
    if (step < total) { show(step + 1); }
    else {
      devisForm.style.display = 'none';
      document.getElementById('progress').style.display = 'none';
      document.getElementById('successName').textContent = document.getElementById('f_prenom').value.trim();
      document.getElementById('devisOk').classList.add('show');
    }
  });
  prevBtn.addEventListener('click', () => { if (step > 1) show(step - 1); });
  show(1);
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

/* ===== Carrousels auto-défilants avec contrôle manuel ===== */
function autoScroller(wrap, speed) {
  if (!wrap) return;
  speed = speed || 0.5;
  let paused = false, drag = false, sx = 0, sl = 0, resumeT;
  // Accumulateur flottant : scrollLeft est arrondi a l'entier par le navigateur,
  // donc on ne peut pas lui ajouter 0,45 px/frame directement (ca resterait bloque).
  let pos = wrap.scrollLeft || 0;
  const half = () => (wrap.scrollWidth / 2) || 1;
  const wrapPos = () => { const h = half(); if (pos >= h) pos -= h; else if (pos < 0) pos += h; };
  const tick = () => {
    if (!paused && wrap.scrollWidth > wrap.clientWidth + 4) {
      pos += speed;
      wrapPos();
      wrap.scrollLeft = pos;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  const softResume = () => { clearTimeout(resumeT); resumeT = setTimeout(() => { if (!drag) paused = false; }, 1400); };
  // Survol souris : pause
  wrap.addEventListener('mouseenter', () => { paused = true; });
  wrap.addEventListener('mouseleave', () => { if (!drag) paused = false; });
  // Glisser a la souris (desktop)
  wrap.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse') return;
    drag = true; paused = true; sx = e.clientX; sl = wrap.scrollLeft;
    wrap.classList.add('grabbing'); wrap.setPointerCapture(e.pointerId);
  });
  wrap.addEventListener('pointermove', e => { if (drag) { wrap.scrollLeft = sl - (e.clientX - sx); } });
  const endDrag = () => { if (drag) { drag = false; wrap.classList.remove('grabbing'); softResume(); } };
  wrap.addEventListener('pointerup', endDrag);
  wrap.addEventListener('pointercancel', endDrag);
  // Tactile + molette : defilement natif, on met juste en pause
  wrap.addEventListener('touchstart', () => { paused = true; }, { passive: true });
  wrap.addEventListener('touchend', softResume);
  wrap.addEventListener('wheel', () => { paused = true; softResume(); }, { passive: true });
  // Resynchronise l'accumulateur quand l'utilisateur fait defiler manuellement
  wrap.addEventListener('scroll', () => { if (paused) pos = wrap.scrollLeft; }, { passive: true });
}
window.addEventListener('load', () => {
  autoScroller(document.querySelector('.why-wrap'), 0.5);
  autoScroller(document.querySelector('.reviews-wrap'), 0.45);
});

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
