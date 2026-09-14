/**
 * ManakSetu Portal — Minimal Browser JavaScript
 * Provides essential DOM interactivity: Mobile menu, Chat AJAX, Verifier tabs, Live Calculator, Accessibility, Audience switcher
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

document.addEventListener('DOMContentLoaded', function () {
  // ── 1. Mobile Menu Drawer Toggle ──────────────────────────────────────────
  const menuBtn = document.getElementById('mobileMenuBtn');
  const menuDrawer = document.getElementById('mobileMenuDrawer');

  if (menuBtn && menuDrawer) {
    menuBtn.addEventListener('click', function () {
      menuDrawer.classList.toggle('open');
      const isOpen = menuDrawer.classList.contains('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
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
      bubble.innerHTML = '<em>Evaluating Indian Standards compendium and generating grounded statutory response...</em>';
      chatMessages.appendChild(bubble);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return bubble;
    }

    function formatBotMarkdown(text) {
      let html = (text || '')
        .replace(/### (.*?)\n/g, '<h4 style="font-size:0.9rem; font-weight:800; color:var(--gov-900); margin:0.6rem 0 0.25rem;">$1</h4>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '<br><br>');
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
          Safe Refusal Notice: This consultation query is outside the statutory scope of Indian Standards and BIS Conformity Assessment schemes.
        </div>`;
      }

      // Main answer text
      inner += formatBotMarkdown(data.answer);

      // Structured 7-section breakdown
      if (data.structured_sections && Object.keys(data.structured_sections).length > 0) {
        inner += '<div style="margin-top:1rem; border-top:1px solid var(--slate-200); padding-top:0.75rem;">';
        inner += '<div style="font-size:0.75rem; font-weight:800; color:var(--gov-900); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:0.5rem;">Statutory Roadmap &amp; Benchmarks</div>';
        inner += '<div style="display:grid; grid-template-columns:1fr; gap:0.4rem;">';
        for (const [secTitle, secContent] of Object.entries(data.structured_sections)) {
          inner += `<details style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:3px; padding:0.35rem 0.6rem; font-size:0.78rem;">
            <summary style="font-weight:700; color:var(--gov-800); cursor:pointer;">${secTitle}</summary>
            <div style="margin-top:0.35rem; color:var(--slate-700); line-height:1.4;">${formatBotMarkdown(secContent)}</div>
          </details>`;
        }
        inner += '</div></div>';
      }

      // Statutory Citations / Evidence Box
      if (data.citations && data.citations.length > 0) {
        inner += '<div style="margin-top:0.75rem; background:#f1f5f9; border:1px solid #cbd5e1; border-radius:4px; padding:0.5rem 0.75rem;">';
        inner += '<div style="font-size:0.72rem; font-weight:800; color:var(--gov-900); text-transform:uppercase; margin-bottom:0.25rem;">Statutory Evidence &amp; Citations:</div>';
        inner += '<ul style="margin:0; padding-left:1.1rem; font-size:0.72rem; color:var(--slate-700);">';
        data.citations.forEach(function (c) {
          const title = c.title || c.citation_text || 'BIS Document';
          const link = c.source_id ? `<a href="/api/sources/${encodeURIComponent(c.source_id)}" target="_blank" style="color:var(--gov-800); font-weight:600; text-decoration:underline;">[Source ${c.source_id}]</a>` : '';
          inner += `<li>${title} ${link}</li>`;
        });
        inner += '</ul></div>';
      }

      // Append referenced standards pills
      if (data.referenced_standards && data.referenced_standards.length > 0) {
        inner += '<div class="chat-references" style="margin-top:0.75rem;">';
        inner += '<span style="font-size:0.75rem; font-weight:700; color:var(--slate-600); margin-right:0.25rem;">Referenced Standards:</span>';
        data.referenced_standards.forEach(function (std) {
          inner += `<a href="/standards/${encodeURIComponent(std.is_number)}" class="badge badge-gov" style="text-decoration:none;">${std.is_number}</a> `;
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
        errBubble.innerHTML = '<span style="color:var(--red-800); font-weight:700;">Statutory Knowledge Engine Offline:</span> Unable to reach the retrieval engine. Please try again.';
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
  const calcForm = document.getElementById('calcForm');

  if (calcTierSelect && calcStandardInput) {
    async function updateCalculation() {
      const tier = calcTierSelect.value;
      const stdCode = calcStandardInput.value.trim() || 'IS 1489';

      try {
        const res = await fetch(`/api/calculate?standard_code=${encodeURIComponent(stdCode)}&enterprise_type=${encodeURIComponent(tier)}`);
        if (!res.ok) return;
        const data = await res.json();

        // Update DOM elements if present
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
