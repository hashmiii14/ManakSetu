/**
 * ManakSetu Portal — Minimal Browser JavaScript
 * Provides essential DOM interactivity: Mobile menu, Chat AJAX, Verifier tabs, Live Calculator, Accessibility, Audience switcher, Product Matcher
 */

// ── Global Accessibility & Portal Functions ────────────────────────────────
window.setAppFontSize = function (size) {
  document.body.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg');
  if (size === 'sm') document.body.classList.add('font-size-sm');
  else if (size === 'lg') document.body.classList.add('font-size-lg');
  else document.body.classList.add('font-size-md');
  try { localStorage.setItem('manaksetu_font_size', size); } catch (e) {}
};

try {
  const savedSize = localStorage.getItem('manaksetu_font_size');
  if (savedSize) window.setAppFontSize(savedSize);
} catch (e) {}

window.toggleLanguage = function () {
  const btn = document.getElementById('langToggleBtn');
  const isHindi = document.body.classList.toggle('lang-hindi');
  if (btn) {
    btn.textContent = isHindi ? 'हिन्दी / English' : 'English / हिन्दी';
  }
  try { localStorage.setItem('manaksetu_lang', isHindi ? 'hi' : 'en'); } catch (e) {}
};

window.switchAudience = function (audience) {
  const tabs = document.querySelectorAll('.audience-tab');
  const panes = document.querySelectorAll('.audience-pane');
  tabs.forEach(function (t) {
    if (t.getAttribute('data-audience') === audience) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });
  panes.forEach(function (p) {
    if (p.getAttribute('data-pane') === audience) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });
};

// ── Homepage Dual Action: Ask ManakBot ───────────────────────────────────────
window.askManakBotFromHome = function () {
  const input = document.getElementById('heroSearchInput');
  const q = input ? input.value.trim() : '';
  if (q) {
    window.location.href = '/chatbot?prompt=' + encodeURIComponent(q);
  } else {
    window.location.href = '/chatbot';
  }
};

// ── Product -> Standard Recommendation Functions ────────────────────────────
window.setRecommendQuery = function (text) {
  const input = document.getElementById('recommendProductInput');
  if (input) {
    input.value = text;
    window.runProductRecommendation();
  }
};

window.runProductRecommendation = async function () {
  const input = document.getElementById('recommendProductInput');
  const query = input ? input.value.trim() : '';
  if (!query) return;

  const resultsArea = document.getElementById('recommendResultsArea');
  const understoodElem = document.getElementById('recUnderstoodText');
  const cardsGrid = document.getElementById('recCardsGrid');

  if (understoodElem) {
    understoodElem.textContent = query.replace(/^I manufacture\s+/i, '').replace(/^We produce\s+/i, '');
  }

  if (cardsGrid) {
    cardsGrid.innerHTML = '<div style="grid-column: 1/-1; padding: 1.5rem; text-align: center; color: var(--slate-500); font-size: 0.8rem;">Analyzing product keywords and evaluating matching Indian Standards...</div>';
  }

  try {
    const res = await fetch('/api/standards/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_description: query, top_k: 4 })
    });

    if (!res.ok) throw new Error('Recommendation API returned ' + res.status);
    const data = await res.json();
    const items = data.results || [];

    if (items.length === 0) {
      if (cardsGrid) {
        cardsGrid.innerHTML = '<div style="grid-column: 1/-1; padding: 1.5rem; text-align: center; color: var(--slate-500); font-size: 0.8rem;">No matching Indian Standards found in current prototype dataset. Try searching by specific product name or IS code on the <a href="/standards" style="color:var(--gov-800); text-decoration:underline;">Standards Directory</a>.</div>';
      }
      return;
    }

    let html = '';
    items.forEach(function (std) {
      let badgeStyle = 'background:#ecfdf5; color:#065f46; border:1px solid #a7f3d0;';
      if (std.relevance_badge === 'Potentially Relevant') {
        badgeStyle = 'background:#fffbeb; color:#92400e; border:1px solid #fde68a;';
      } else if (std.relevance_badge === 'Related') {
        badgeStyle = 'background:#f1f5f9; color:#475569; border:1px solid #cbd5e1;';
      }

      const matchReason = std.why_it_matches || std.scope || std.description || 'Standard matches product classification and conformity requirements.';

      html += `
        <div class="p-3 bg-white border border-slate-300 rounded-sm">
          <div class="flex items-center justify-between mb-1">
            <span class="badge text-2xs" style="${badgeStyle}">${std.relevance_badge || 'Relevant'}</span>
            <span class="text-2xs font-mono text-slate-500">${std.is_number}</span>
          </div>
          <h4 class="text-xs font-bold text-gov-900 mb-1">${std.is_number} — ${std.title}</h4>
          <p class="text-2xs text-slate-600 mb-2"><strong>Why it matches:</strong> ${matchReason}</p>
          <div class="text-2xs text-slate-500 flex justify-between items-center pt-2 border-t border-slate-100">
            <span>Source: ${std.source || 'BIS Reference Catalogue'}</span>
            <a href="/standards?q=${encodeURIComponent(std.is_number)}" class="text-gov-800 font-bold hover:underline">View Standard &rarr;</a>
          </div>
        </div>
      `;
    });

    if (cardsGrid) cardsGrid.innerHTML = html;
  } catch (err) {
    if (cardsGrid) {
      cardsGrid.innerHTML = '<div style="grid-column: 1/-1; padding: 1rem; color: var(--red-800); font-size: 0.8rem;">Unable to complete automated recommendation. Please try again or search directly in the Standards Directory.</div>';
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {
  // ── 1. Mobile Menu Drawer Toggle & Accessible Click Outside ───────────────
  const menuBtn = document.getElementById('mobileMenuBtn');
  const menuDrawer = document.getElementById('mobileMenuDrawer') || document.getElementById('mobileDrawer');

  if (menuBtn && menuDrawer) {
    menuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      menuDrawer.classList.toggle('open');
      const isOpen = menuDrawer.classList.contains('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close on click outside
    document.addEventListener('click', function (e) {
      if (menuDrawer.classList.contains('open') && !menuDrawer.contains(e.target) && e.target !== menuBtn) {
        menuDrawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuDrawer.classList.contains('open')) {
        menuDrawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
      }
    });
  }

  // ── 2. TrueMark Verifier Sub-tab Switching ────────────────────────────────
  const tabHuid = document.getElementById('tabHuid');
  const tabCml = document.getElementById('tabCml');
  const panelHuid = document.getElementById('panelHuid');
  const panelCml = document.getElementById('panelCml');

  if (tabHuid && tabCml && panelHuid && panelCml) {
    tabHuid.addEventListener('click', function () {
      tabHuid.classList.add('active');
      tabCml.classList.remove('active');
      panelHuid.style.display = 'block';
      panelCml.style.display = 'none';
    });

    tabCml.addEventListener('click', function () {
      tabCml.classList.add('active');
      tabHuid.classList.remove('active');
      panelCml.style.display = 'block';
      panelHuid.style.display = 'none';
    });
  }

  // Preset code buttons for verifier
  document.querySelectorAll('[data-verify-code]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const code = this.getAttribute('data-verify-code');
      const targetInput = document.getElementById(this.getAttribute('data-target-input'));
      if (targetInput) {
        targetInput.value = code;
        targetInput.form.submit();
      }
    });
  });

  // ── 3. ManakBot Interactive Chat Experience ───────────────────────────────
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');

  if (chatForm && chatInput && chatMessages) {
    function appendUserMessage(text) {
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble chat-bubble-user';
      bubble.textContent = text;
      chatMessages.appendChild(bubble);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function appendBotLoading() {
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble chat-bubble-bot';
      bubble.id = 'botLoadingBubble';
      bubble.innerHTML = '<em>Searching prototype knowledge base and evaluating Indian Standards...</em>';
      chatMessages.appendChild(bubble);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return bubble;
    }

    function formatBotMarkdown(text) {
      let html = (text || '')
        .replace(/### (.*?)
/g, '<h4 style="font-size:0.9rem; font-weight:800; color:var(--gov-900); margin:0.6rem 0 0.25rem;">$1</h4>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/

/g, '<br><br>');
      return html;
    }

    function appendBotResponse(data) {
      const loading = document.getElementById('botLoadingBubble');
      if (loading) loading.remove();

      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble chat-bubble-bot';

      let inner = '';

      // Language detection pill
      if (data.detected_language && (data.detected_language === 'hi' || data.detected_language === 'hinglish')) {
        inner += `<div style="margin-bottom:0.5rem;"><span class="badge badge-navy" style="font-size:0.68rem;">Language: ${data.detected_language.toUpperCase()} Query Detected</span></div>`;
      }

      // Safe refusal banner
      if (data.is_refusal) {
        inner += `<div style="background:#fef3c7; border:1px solid #f59e0b; border-radius:4px; padding:0.6rem 0.8rem; margin-bottom:0.75rem; font-size:0.78rem; color:#92400e; font-weight:600;">
          Safe Refusal Notice: This query is outside the current scope of Indian Standards and BIS Conformity Assessment schemes.
        </div>`;
      }

      // Main answer text
      inner += formatBotMarkdown(data.answer);

      // Structured breakdown
      if (data.structured_sections && Object.keys(data.structured_sections).length > 0) {
        inner += '<div style="margin-top:1rem; border-top:1px solid var(--slate-200); padding-top:0.75rem;">';
        inner += '<div style="font-size:0.75rem; font-weight:800; color:var(--gov-900); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:0.5rem;">Conformity Requirements &amp; Benchmarks</div>';
        inner += '<div style="display:grid; grid-template-columns:1fr; gap:0.4rem;">';
        for (const [secTitle, secContent] of Object.entries(data.structured_sections)) {
          inner += `<details style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:3px; padding:0.35rem 0.6rem; font-size:0.78rem;">
            <summary style="font-weight:700; color:var(--gov-800); cursor:pointer;">${secTitle}</summary>
            <div style="margin-top:0.35rem; color:var(--slate-700); line-height:1.4;">${formatBotMarkdown(secContent)}</div>
          </details>`;
        }
        inner += '</div></div>';
      }

      // Professional Sources & Evidence Panel (per Prompt Section 6)
      if (data.citations && data.citations.length > 0) {
        inner += '<div style="margin-top:0.75rem; background:#f1f5f9; border:1px solid #cbd5e1; border-radius:4px; padding:0.6rem 0.8rem;">';
        inner += '<div style="font-size:0.72rem; font-weight:800; color:var(--gov-900); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:0.4rem;">Sources &amp; Evidence:</div>';
        inner += '<div style="display:grid; gap:0.4rem;">';
        data.citations.forEach(function (c) {
          const docTitle = c.title || c.source_title || 'BIS Reference Document';
          const stdNum = c.standard_number ? `<strong>${c.standard_number}</strong>` : '';
          const sec = c.section ? `<span style="color:var(--slate-600); margin-left:0.3rem;">• Section: ${c.section}</span>` : '';
          const clause = c.clause ? `<span style="color:var(--slate-600); margin-left:0.3rem;">• Clause: ${c.clause}</span>` : '';
          const page = c.page ? `<span style="color:var(--slate-600); margin-left:0.3rem;">• Page: ${c.page}</span>` : '';
          const srcType = c.source_type ? `<span class="badge badge-navy" style="font-size:0.65rem; margin-left:0.3rem;">${c.source_type}</span>` : '';
          const openLink = c.url ? `<a href="${c.url}" target="_blank" rel="noopener" style="color:var(--gov-800); font-weight:700; text-decoration:underline; margin-left:0.4rem;">Open Source &rarr;</a>` : '';

          inner += `
            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:3px; padding:0.4rem 0.6rem; font-size:0.72rem;">
              <div>${stdNum} — ${docTitle} ${srcType}</div>
              <div style="font-size:0.68rem; color:var(--slate-500); margin-top:0.2rem;">${sec} ${clause} ${page} ${openLink}</div>
            </div>
          `;
        });
        inner += '</div></div>';
      }

      // Append referenced standards pills
      if (data.referenced_standards && data.referenced_standards.length > 0) {
        inner += '<div class="chat-references" style="margin-top:0.75rem;">';
        inner += '<span style="font-size:0.75rem; font-weight:700; color:var(--slate-600); margin-right:0.25rem;">Referenced Standards:</span>';
        data.referenced_standards.forEach(function (std) {
          inner += `<a href="/standards?q=${encodeURIComponent(std.is_number)}" class="badge badge-gov" style="text-decoration:none;">${std.is_number}</a> `;
        });
        inner += '</div>';
      }

      // Append official prototype disclaimer
      if (data.disclaimer) {
        inner += `<div style="font-size:0.68rem; color:var(--slate-500); margin-top:0.6rem; border-top:1px solid var(--slate-200); padding-top:0.4rem;">${data.disclaimer}</div>`;
      }

      bubble.innerHTML = inner;
      chatMessages.appendChild(bubble);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function sendChatQuery(queryText) {
      if (!queryText.trim()) return;
      appendUserMessage(queryText);
      chatInput.value = '';
      appendBotLoading();

      try {
        const res = await fetch('/api/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: queryText, history: [] })
        });
        if (!res.ok) throw new Error('Bot query failed');
        const data = await res.json();
        appendBotResponse(data);
      } catch (err) {
        const loading = document.getElementById('botLoadingBubble');
        if (loading) loading.remove();
        const errBubble = document.createElement('div');
        errBubble.className = 'chat-bubble chat-bubble-bot';
        errBubble.innerHTML = '<span style="color:var(--red-800); font-weight:700;">Knowledge Engine Offline:</span> Unable to reach the retrieval engine. Please try again.';
        chatMessages.appendChild(errBubble);
      }
    }

    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      sendChatQuery(chatInput.value);
    });

    // Handle suggested quick prompts
    document.querySelectorAll('[data-chat-prompt]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const prompt = this.getAttribute('data-chat-prompt');
        sendChatQuery(prompt);
      });
    });

    // Auto-send if initial prompt prefilled from URL query
    const initialPrompt = chatForm.getAttribute('data-initial-prompt');
    if (initialPrompt && initialPrompt.trim()) {
      sendChatQuery(initialPrompt.trim());
    }
  }

  // ── 4. Live MSME Fee Calculator Recalculation ─────────────────────────────
  const calcTierSelect = document.getElementById('calcTierSelect');
  const calcStandardInput = document.getElementById('calcStandardInput');

  if (calcTierSelect && calcStandardInput) {
    async function updateCalculation() {
      const tier = calcTierSelect.value;
      const stdCode = calcStandardInput.value.trim() || 'IS 1489';

      try {
        const res = await fetch(`/api/calculate?standard_code=${encodeURIComponent(stdCode)}&enterprise_type=${encodeURIComponent(tier)}`);
        if (!res.ok) return;
        const data = await res.json();

        const formatInr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
        const baseElem = document.getElementById('valBaseMarking');
        const concElem = document.getElementById('valConcession');
        const effElem = document.getElementById('valEffectiveMarking');
        const appElem = document.getElementById('valApplication');
        const auditElem = document.getElementById('valAudit');
        const totalElem = document.getElementById('valTotalEstimated');
        const savingsElem = document.getElementById('valTotalSavings');

        if (baseElem) baseElem.textContent = formatInr(data.base_marking_fee);
        if (concElem) concElem.textContent = data.concession_percent + '% Concession';
        if (effElem) effElem.textContent = formatInr(data.effective_marking_fee);
        if (appElem) appElem.textContent = formatInr(data.application_fee);
        if (auditElem) auditElem.textContent = formatInr(data.inspection_fee);
        if (totalElem) totalElem.textContent = formatInr(data.total_estimated_cost);
        if (savingsElem) savingsElem.textContent = formatInr(data.total_savings);
      } catch (e) {
        console.warn('Live calculation update error', e);
      }
    }

    calcTierSelect.addEventListener('change', updateCalculation);
    calcStandardInput.addEventListener('change', updateCalculation);
  }
});
