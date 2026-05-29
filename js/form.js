(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // === ENDPOINT À CONFIGURER ===
  // Pour activer l'envoi réel, créez un compte gratuit sur https://formspree.io
  // et remplacez la valeur ci-dessous par votre endpoint Formspree.
  // Tant que cette valeur n'est pas modifiée, le formulaire affiche la page
  // de confirmation sans envoyer réellement les données.
  const FORMSPREE_ENDPOINT = '';

  const FLOWS = {
    normal: ['objectifs', 'capital', 'epargne', 'age', 'residence', 'coordonnees'],
    fiscalite: ['objectifs', 'fiscalite', 'capital', 'epargne', 'age', 'residence', 'coordonnees'],
    succession: ['objectifs', 'succession', 'coordonnees'],
  };

  const state = {
    flow: FLOWS.normal,
    index: 0,
    answers: {
      objectifs: [],
    },
  };

  const slides = form.querySelectorAll('.form-slide');
  const progressBar = document.getElementById('form-progress-bar');

  function showSlide(name) {
    slides.forEach((s) => (s.hidden = s.dataset.slide !== name));
    updateProgress();
    window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
  }

  function updateProgress() {
    const total = state.flow.length + 1; // +1 pour le success
    const current = state.index + 1;
    const pct = Math.min(100, (current / total) * 100);
    if (progressBar) progressBar.style.width = pct + '%';
  }

  function currentSlideName() {
    return state.flow[state.index];
  }

  function determineFlow() {
    const objs = state.answers.objectifs || [];
    if (objs.length === 1) {
      if (objs[0] === 'fiscalite') return FLOWS.fiscalite;
      if (objs[0] === 'succession') return FLOWS.succession;
    }
    return FLOWS.normal;
  }

  function goNext() {
    if (state.index === 0) {
      // Après les objectifs : on recalcule le flow
      state.flow = determineFlow();
    }
    state.index++;
    if (state.index >= state.flow.length) {
      submitForm();
      return;
    }
    showSlide(currentSlideName());
  }

  function goBack() {
    if (state.index === 0) return;
    state.index--;
    showSlide(currentSlideName());
  }

  // === SÉLECTION DES OPTIONS ===
  form.addEventListener('click', function (e) {
    const opt = e.target.closest('.form-option');
    if (!opt) return;
    const slide = opt.closest('.form-slide');
    const slideName = slide.dataset.slide;
    const multi = slide.dataset.multi === 'true';
    const value = opt.dataset.value;

    if (multi) {
      // Multi-sélection (objectifs)
      opt.classList.toggle('is-selected');
      const allSelected = slide.querySelectorAll('.form-option.is-selected');
      state.answers[slideName] = Array.from(allSelected).map((b) => b.dataset.value);
    } else {
      // Sélection unique : on désélectionne les autres
      slide.querySelectorAll('.form-option').forEach((b) => b.classList.remove('is-selected'));
      opt.classList.add('is-selected');
      state.answers[slideName] = value;
    }

    // Activer / désactiver le bouton Continuer
    const nextBtn = slide.querySelector('.form-next');
    if (nextBtn) {
      const hasSelection = slide.querySelectorAll('.form-option.is-selected').length > 0;
      nextBtn.disabled = !hasSelection;
    }
  });

  // === NAVIGATION ===
  form.addEventListener('click', function (e) {
    if (e.target.classList.contains('form-next')) {
      e.preventDefault();
      const slide = e.target.closest('.form-slide');
      const slideName = slide.dataset.slide;
      // Pour les slides avec textarea (succession), capter la valeur
      const textarea = slide.querySelector('textarea');
      if (textarea) {
        state.answers[slideName] = textarea.value.trim();
        if (!state.answers[slideName]) return;
      }
      // Pour la slide coordonnées, capter les inputs
      if (slideName === 'coordonnees') {
        const fields = slide.querySelectorAll('input[name]');
        const data = {};
        for (const f of fields) {
          if (!f.value.trim()) {
            f.focus();
            return;
          }
          data[f.name] = f.value.trim();
        }
        state.answers.coordonnees = data;
      }
      goNext();
    }
    if (e.target.classList.contains('form-back')) {
      e.preventDefault();
      goBack();
    }
  });

  // === Validation textarea (succession) en temps réel ===
  form.addEventListener('input', function (e) {
    if (e.target.tagName === 'TEXTAREA') {
      const slide = e.target.closest('.form-slide');
      const nextBtn = slide.querySelector('.form-next');
      if (nextBtn) nextBtn.disabled = !e.target.value.trim();
    }
    if (e.target.tagName === 'INPUT') {
      const slide = e.target.closest('.form-slide');
      if (slide.dataset.slide === 'coordonnees') {
        const inputs = slide.querySelectorAll('input[name]');
        const allFilled = Array.from(inputs).every((i) => i.value.trim());
        const nextBtn = slide.querySelector('.form-next');
        if (nextBtn) nextBtn.disabled = !allFilled;
      }
    }
  });

  // === SOUMISSION ===
  function submitForm() {
    // Construire un message texte lisible pour Johan
    const message = formatMessage(state.answers);

    if (FORMSPREE_ENDPOINT) {
      // Envoi réel via Formspree
      const coords = state.answers.coordonnees || {};
      const payload = {
        prenom: coords.prenom || '',
        nom: coords.nom || '',
        email: coords.email || '',
        telephone: coords.telephone || '',
        code_postal: coords.code_postal || '',
        message: message,
        _subject: 'Nouvelle demande de contact Æther Gestion Privée',
      };
      fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then((r) => showSuccess())
        .catch(() => showSuccess()); // même en cas d'erreur, on confirme à l'utilisateur
    } else {
      // Mode démo : pas d'envoi réel, on affiche juste la confirmation
      console.log('=== Données collectées (démo, aucun envoi) ===');
      console.log(state.answers);
      console.log(message);
      showSuccess();
    }
  }

  function showSuccess() {
    slides.forEach((s) => (s.hidden = true));
    const successSlide = form.querySelector('[data-slide="success"]');
    if (successSlide) successSlide.hidden = false;
    if (progressBar) progressBar.style.width = '100%';
    window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
  }

  function formatMessage(answers) {
    const labels = {
      bilan: 'Faire un bilan de son patrimoine',
      developper: 'Investir et développer son patrimoine',
      retraite: 'Préparer sa retraite',
      projet: 'Financer un projet',
      fiscalite: 'Optimiser sa fiscalité',
      immobilier: 'Investir dans l\'immobilier',
      succession: 'Préparer sa succession et sa transmission',
      revenus: 'Générer des revenus complémentaires',
    };
    const lines = [];
    if (answers.objectifs && answers.objectifs.length) {
      lines.push('Objectifs : ' + answers.objectifs.map((o) => labels[o] || o).join(', '));
    }
    if (answers.fiscalite) lines.push('Impôts annuels : ' + answers.fiscalite);
    if (answers.succession) lines.push('Besoin succession : ' + answers.succession);
    if (answers.capital) lines.push('Capital disponible : ' + answers.capital);
    if (answers.epargne) lines.push('Épargne mensuelle : ' + answers.epargne);
    if (answers.age) lines.push('Âge : ' + answers.age);
    if (answers.residence) lines.push('Résidence principale : ' + answers.residence);
    return lines.join('\n');
  }

  // === INIT ===
  showSlide('objectifs');
})();
