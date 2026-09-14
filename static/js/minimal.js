/**
 * ManakSetu Portal — Minimal Browser JavaScript (< 200 lines)
 * Provides essential DOM interactivity: Mobile menu, Chat AJAX, Verifier tabs, Live Calculator
 */

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
      // Basic markdown parser for headings, lists, bold, and paragraphs
      let html = text
        .replace(/### (.*?)\n/g, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '<br><br>');
      return html;
    }

    function appendBotResponse(data) {
      const loading = document.getElementById('botLoadingBubble');
      if (loading) loading.remove();

      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble chat-bubble-bot';

      let inner = formatBotMarkdown(data.answer);

      // Append referenced standards pills
      if (data.referenced_standards && data.referenced_standards.length > 0) {
        inner += '<div class="chat-references">';
        inner += '<span style="font-size:0.75rem; font-weight:700; color:var(--slate-600); margin-right:0.25rem;">Referenced Standards:</span>';
        data.referenced_standards.forEach(function (std) {
          inner += `<a href="/standards/${encodeURIComponent(std.is_number)}" class="badge badge-gov" style="text-decoration:none;">${std.is_number}</a>`;
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
