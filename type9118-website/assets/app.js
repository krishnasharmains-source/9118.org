/* Type9118 demo logic (no backend required) */
(function () {
  const qs = (s, r=document) => r.querySelector(s);
  const qsa = (s, r=document) => Array.from(r.querySelectorAll(s));

  const codeInput = qs('#code');
  const btnJoin = qs('#btnJoin');
  const btnSample = qs('#btnSample');
  const notice = qs('#notice');
  const btnCreate = qs('#btnCreate');
  const btnClear = qs('#btnClear');
  const sessionsGrid = qs('#sessionsGrid');
  const emptyState = qs('#emptyState');
  const modal = qs('#modal');
  const newCodeEl = qs('#newCode');
  const btnCopy = qs('#btnCopy');
  const year = qs('#year');

  year.textContent = String(new Date().getFullYear());

  const codeRegex = /^[A-Za-z0-9]{6,10}$/;

  function generateCode() {
    return Math.random().toString(36).slice(2, 10).toUpperCase();
  }

  function validateAndJoin() {
    const value = (codeInput.value || '').trim().toUpperCase();
    if (!codeRegex.test(value)) {
      notice.textContent = 'Enter a valid code (6–10 letters/numbers).';
      return;
    }
    notice.textContent = 'Attempting to join session: ' + value;
  }

  function addPublicSession(id) {
    const card = document.createElement('article');
    card.className = 'session-card';
    card.innerHTML = [
      '<p class=\"session-head\">Session</p>',
      '<div class=\"session-row\">',
      '<p class=\"session-code\">', id, '</p>',
      '<button class=\"btn\" data-use=\"', id, '\">Use</button>',
      '</div>'
    ].join('');
    sessionsGrid.prepend(card);
    updateEmpty();
  }

  function updateEmpty() {
    emptyState.style.display = sessionsGrid.children.length ? 'none' : 'grid';
  }

  // Events
  btnJoin.addEventListener('click', validateAndJoin);
  codeInput.addEventListener('input', () => {
    codeInput.value = codeInput.value.toUpperCase();
    notice.textContent = '';
  });
  btnSample.addEventListener('click', () => {
    codeInput.value = generateCode();
    notice.textContent = '';
  });

  btnCreate.addEventListener('click', () => {
    const c = generateCode();
    // pretend API delay
    setTimeout(() => {
      newCodeEl.textContent = c;
      if (typeof modal.showModal === 'function') modal.showModal();
      addPublicSession(c);
    }, 350);
  });

  btnClear.addEventListener('click', () => {
    sessionsGrid.innerHTML = '';
    updateEmpty();
  });

  sessionsGrid.addEventListener('click', (e) => {
    const t = e.target;
    if (t.matches('button[data-use]')) {
      codeInput.value = t.getAttribute('data-use') || '';
      notice.textContent = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  btnCopy.addEventListener('click', (e) => {
    e.preventDefault();
    const text = (newCodeEl.textContent || '').trim();
    if (!text) return;
    navigator.clipboard && navigator.clipboard.writeText(text);
  });

  updateEmpty();
})();
