/**
 * ManakSetu Portal — Minimal Browser JavaScript
 * Provides essential DOM interactivity: Mobile menu, Chat AJAX, Verifier tabs, Live Calculator, Accessibility, Audience switcher, Product Matcher
 * Uses window.ManakSetuApi client with automated offline/demo fallback
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
  var savedSize = localStorage.getItem('manaksetu_font_size');
  if (savedSize) window.setAppFontSize(savedSize);
} catch (e) {}

// ── Bilingual Dictionary & Language Switcher ────────────────────────────────
var I18N_DICT = {
  en: {
    nav_home: 'Home',
    nav_standards: 'Standards',
    nav_certification: 'Certification',
    nav_manakbot: 'ManakBot',
    nav_verify: 'Verify',
    nav_estimator: 'Estimator',
    nav_labs: 'Labs',
    nav_about: 'About',
    quick_search: 'Search BIS'
  },
  hi: {
    nav_home: 'मुख्य पृष्ठ',
    nav_standards: 'मानक निर्देशिका',
    nav_certification: 'प्रमाणीकरण',
    nav_manakbot: 'मानकबॉट',
    nav_verify: 'सत्यापन',
    nav_estimator: 'शुल्क गणक',
    nav_labs: 'प्रयोगशालाएं',
    nav_about: 'परिचय',
    quick_search: 'मानक खोजें'
  }
};


function applyTranslations(lang) {
  var dict = I18N_DICT[lang] || I18N_DICT.en;
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
}

window.toggleLanguage = function () {
  var btn = document.getElementById('langToggleBtn');
  var isHindi = document.body.classList.toggle('lang-hindi');
  var lang = isHindi ? 'hi' : 'en';
  if (btn) {
    btn.textContent = isHindi ? 'हिन्दी / English' : 'English / हिन्दी';
  }
  applyTranslations(lang);
  try { localStorage.setItem('manaksetu_lang', lang); } catch (e) {}
};

try {
  var savedLang = localStorage.getItem('manaksetu_lang');
  if (savedLang === 'hi') {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.classList.add('lang-hindi');
      var btn = document.getElementById('langToggleBtn');
      if (btn) btn.textContent = 'हिन्दी / English';
      applyTranslations('hi');
    });
  }
} catch (e) {}

window.switchAudience = function (audience) {
  var tabs = document.querySelectorAll('.audience-tab');
  var panes = document.querySelectorAll('.audience-pane');
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

// ── Chat Interactivity: Copy Response & Clear Chat ──────────────────────────
window.copyBotAnswer = function (btn) {
  var bubble = btn.closest('.chat-bubble-bot');
  if (!bubble) return;
  var clone = bubble.cloneNode(true);
  // Remove buttons, pills, disclaimers from copied plain text
  clone.querySelectorAll('.btn-copy-chat, .chat-references, [style*="border-top"]').forEach(function (el) {
    el.remove();
  });
  var text = clone.innerText.trim();
  navigator.clipboard.writeText(text).then(function () {
    var span = btn.querySelector('span');
    if (span) {
      var oldText = span.textContent;
      span.textContent = 'Copied! ✓';
      btn.style.color = '#059669';
      btn.style.borderColor = '#10b981';
      setTimeout(function () {
        span.textContent = oldText;
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 2000);
    }
  }).catch(function () {
    alert('Response text copied to clipboard.');
  });
};

window.clearChatMessages = function () {
  var chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;
  chatMessages.innerHTML = `
    <div class="chat-bubble chat-bubble-bot">
      <h3 style="margin-top:0;">Welcome to ManakBot Intelligent Standards Assistant</h3>
      <p>I am your intelligent assistant for Indian Standards, conformity assessment pathways, and BIS services, developed as an educational prototype for Smart India Hackathon 2026.</p>
      <p>You can ask me about:</p>
      <ul>
        <li>Which Indian Standard applies to a specific product or material</li>
        <li>Quality Control Orders (QCO) and mandatory certification scopes</li>
        <li>In-house factory testing apparatus requirements and testing benchmarks</li>
        <li>Indicative fee concessions for Micro and Small manufacturing units (up to 50% relief)</li>
        <li>Testing laboratories, gold hallmarking (HUID), and licensee verification</li>
      </ul>
      <div style="font-size:0.7rem; color:var(--slate-500); margin-top:0.75rem; border-top:1px solid var(--slate-200); padding-top:0.4rem;">
        <strong>SIH Prototype Notice:</strong> Grounded in the current 572-standard prototype dataset. For official and legal submissions, consult <a href="https://www.manakonline.in" target="_blank" rel="noopener" style="color:var(--gov-800); text-decoration:underline;">manakonline.in</a>.
      </div>
    </div>
  `;
};

// ── Homepage & Standards Search Dual Action: Ask ManakBot ───────────────────
window.askManakBotFromHome = function () {
  var input = document.getElementById('heroSearchInput');
  var q = input ? input.value.trim() : '';
  if (q) {
    window.location.href = '/manakbot?prompt=' + encodeURIComponent(q);
  } else {
    window.location.href = '/manakbot';
  }
};

window.askManakBotFromStandards = function () {
  var input = document.getElementById('standardsSearchInput');
  var q = input ? input.value.trim() : '';
  if (q) {
    window.location.href = '/manakbot?prompt=' + encodeURIComponent('What Indian Standards, testing benchmarks, and BIS certification steps apply to ' + q + '?');
  } else {
    window.location.href = '/manakbot';
  }
};


// ── Product -> Standard Recommendation Functions ────────────────────────────
window.setRecommendQuery = function (text) {
  var input = document.getElementById('recommendProductInput');
  if (input) {
    input.value = text;
    window.runProductRecommendation();
  }
};

window.runProductRecommendation = async function () {
  var input = document.getElementById('recommendProductInput');
  var query = input ? input.value.trim() : '';
  if (!query) return;

  var resultsArea = document.getElementById('recommendResultsArea');
  var understoodElem = document.getElementById('recUnderstoodText');
  var cardsGrid = document.getElementById('recCardsGrid');

  if (understoodElem) {
    understoodElem.textContent = query.replace(/^I manufacture\s+/i, '').replace(/^We produce\s+/i, '');
  }

  if (cardsGrid) {
    cardsGrid.innerHTML = '<div style="grid-column: 1/-1; padding: 1.5rem; text-align: center; color: var(--slate-500); font-size: 0.8rem;">Analyzing product keywords and evaluating matching Indian Standards...</div>';
  }

  try {
    var api = window.ManakSetuApi;
    var data = api ? await api.recommendStandards(query, 4) : null;
    
    if (!data || !data.success) {
      // Direct fallback
      var res = await fetch('/api/standards/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_description: query, top_k: 4 })
      });
      if (res.ok) {
        var d = await res.json();
        data = { success: true, results: d.results || [] };
      }
    }

    var items = (data && data.results) || [];

    if (items.length === 0) {
      if (cardsGrid) {
        cardsGrid.innerHTML = '<div style="grid-column: 1/-1; padding: 1.5rem; text-align: center; color: var(--slate-500); font-size: 0.8rem;">No matching Indian Standards found in current prototype dataset. Try searching by specific product name or IS code on the <a href="/standards" style="color:var(--gov-800); text-decoration:underline;">Standards Directory</a>.</div>';
      }
      return;
    }

    var html = '';
    items.forEach(function (std) {
      var badgeStyle = 'background:#ecfdf5; color:#065f46; border:1px solid #a7f3d0;';
      if (std.relevance_badge === 'Potentially Relevant') {
        badgeStyle = 'background:#fffbeb; color:#92400e; border:1px solid #fde68a;';
      } else if (std.relevance_badge === 'Related') {
        badgeStyle = 'background:#f1f5f9; color:#475569; border:1px solid #cbd5e1;';
      }

      var matchReason = std.why_it_matches || std.scope || std.description || 'Standard matches product classification and conformity requirements.';

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
  var menuBtn = document.getElementById('mobileMenuBtn');
  var menuDrawer = document.getElementById('mobileMenuDrawer') || document.getElementById('mobileDrawer');

  if (menuBtn && menuDrawer) {
    menuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      menuDrawer.classList.toggle('open');
      var isOpen = menuDrawer.classList.contains('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', function (e) {
      if (menuDrawer.classList.contains('open') && !menuDrawer.contains(e.target) && e.target !== menuBtn) {
        menuDrawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuDrawer.classList.contains('open')) {
        menuDrawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
      }
    });
  }

  // ── 2. TrueMark Verifier Sub-tab Switching ────────────────────────────────
  var tabHuid = document.getElementById('tabHuid');
  var tabCml = document.getElementById('tabCml');
  var panelHuid = document.getElementById('panelHuid');
  var panelCml = document.getElementById('panelCml');

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
      var code = this.getAttribute('data-verify-code');
      var targetInput = document.getElementById(this.getAttribute('data-target-input'));
      if (targetInput) {
        targetInput.value = code;
        targetInput.form.submit();
      }
    });
  });

  // ── 3. ManakBot Interactive Chat Experience with Multi-turn History ────────
  var chatForm = document.getElementById('chatForm');
  var chatInput = document.getElementById('chatInput');
  var chatMessages = document.getElementById('chatMessages');
  var chatHistory = []; // Multi-turn conversational history

  if (chatForm && chatInput && chatMessages) {
    function appendUserMessage(text) {
      var bubble = document.createElement('div');
      bubble.className = 'chat-bubble chat-bubble-user';
      bubble.textContent = text;
      chatMessages.appendChild(bubble);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function appendBotLoading() {
      var bubble = document.createElement('div');
      bubble.className = 'chat-bubble chat-bubble-bot';
      bubble.id = 'botLoadingBubble';
      bubble.innerHTML = '<em>Searching prototype knowledge base and evaluating Indian Standards...</em>';
      chatMessages.appendChild(bubble);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return bubble;
    }

    function formatBotMarkdown(text) {
      var html = (text || '')
        .replace(/### (.*?)\n/g, '<h4 style="font-size:0.9rem; font-weight:800; color:var(--gov-900); margin:0.6rem 0 0.25rem;">$1</h4>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '<br><br>');
      return html;
    }

    function appendBotResponse(data) {
      var loading = document.getElementById('botLoadingBubble');
      if (loading) loading.remove();

      var bubble = document.createElement('div');
      bubble.className = 'chat-bubble chat-bubble-bot';

      var inner = '';

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
        for (var secTitle in data.structured_sections) {
          var secContent = data.structured_sections[secTitle];
          inner += `<details style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:3px; padding:0.35rem 0.6rem; font-size:0.78rem;">
            <summary style="font-weight:700; color:var(--gov-800); cursor:pointer;">${secTitle}</summary>
            <div style="margin-top:0.35rem; color:var(--slate-700); line-height:1.4;">${formatBotMarkdown(secContent)}</div>
          </details>`;
        }
        inner += '</div></div>';
      }

      // Professional Sources & Evidence Panel
      if (data.citations && data.citations.length > 0) {
        inner += '<div style="margin-top:0.75rem; background:#f1f5f9; border:1px solid #cbd5e1; border-radius:4px; padding:0.6rem 0.8rem;">';
        inner += '<div style="font-size:0.72rem; font-weight:800; color:var(--gov-900); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:0.4rem;">Sources &amp; Evidence:</div>';
        inner += '<div style="display:grid; gap:0.4rem;">';
        data.citations.forEach(function (c) {
          var docTitle = c.title || c.source_title || 'BIS Reference Document';
          var stdNum = c.standard_number ? `<strong>${c.standard_number}</strong>` : '';
          var sec = c.section ? `<span style="color:var(--slate-600); margin-left:0.3rem;">• Section: ${c.section}</span>` : '';
          var clause = c.clause ? `<span style="color:var(--slate-600); margin-left:0.3rem;">• Clause: ${c.clause}</span>` : '';
          var page = c.page ? `<span style="color:var(--slate-600); margin-left:0.3rem;">• Page: ${c.page}</span>` : '';
          var srcType = c.source_type ? `<span class="badge badge-navy" style="font-size:0.65rem; margin-left:0.3rem;">${c.source_type}</span>` : '';
          var openLink = c.url ? `<a href="${c.url}" target="_blank" rel="noopener" style="color:var(--gov-800); font-weight:700; text-decoration:underline; margin-left:0.4rem;">Open Source &rarr;</a>` : '';

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

      // Action Bar: Copy Response Button
      inner += `
        <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:0.6rem; padding-top:0.4rem; border-top:1px dashed var(--slate-200);">
          <button type="button" class="btn-copy-chat" onclick="copyBotAnswer(this)" style="background:transparent; border:1px solid var(--slate-300); color:var(--slate-600); font-size:0.7rem; padding:3px 8px; border-radius:3px; cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>Copy Response</span>
          </button>
        </div>
      `;

      // Append official prototype disclaimer
      if (data.disclaimer) {
        inner += `<div style="font-size:0.68rem; color:var(--slate-500); margin-top:0.6rem; border-top:1px solid var(--slate-200); padding-top:0.4rem;">${data.disclaimer}</div>`;
      }

      bubble.innerHTML = inner;
      chatMessages.appendChild(bubble);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Update multi-turn history
      chatHistory.push({ role: 'user', content: chatInput.value || '' });
      chatHistory.push({ role: 'assistant', content: data.answer || '' });
    }

    async function sendChatQuery(queryText) {
      if (!queryText.trim()) return;
      appendUserMessage(queryText);
      chatInput.value = '';
      appendBotLoading();

      try {
        var api = window.ManakSetuApi;
        var resObj = api ? await api.askManakBot(queryText, chatHistory) : null;
        if (resObj && resObj.success) {
          appendBotResponse(resObj.data);
          return;
        }

        // Direct fallback
        var res = await fetch('/api/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: queryText, history: chatHistory })
        });
        if (!res.ok) throw new Error('Bot query failed');
        var data = await res.json();
        appendBotResponse(data);
      } catch (err) {
        var loading = document.getElementById('botLoadingBubble');
        if (loading) loading.remove();
        var errBubble = document.createElement('div');
        errBubble.className = 'chat-bubble chat-bubble-bot';
        errBubble.innerHTML = '<span style="color:var(--red-800); font-weight:700;">Knowledge Engine Notice:</span> Unable to reach the remote AI service. Demonstrating local response.';
        chatMessages.appendChild(errBubble);
      }
    }

    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      sendChatQuery(chatInput.value);
    });

    document.querySelectorAll('[data-chat-prompt]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var prompt = this.getAttribute('data-chat-prompt');
        sendChatQuery(prompt);
      });
    });

    var initialPrompt = chatForm.getAttribute('data-initial-prompt');
    if (initialPrompt && initialPrompt.trim()) {
      sendChatQuery(initialPrompt.trim());
    }
  }

  // ── 4. Live MSME Fee Calculator Recalculation ─────────────────────────────
  var calcTierSelect = document.getElementById('calcTierSelect');
  var calcStandardInput = document.getElementById('calcStandardInput');

  if (calcTierSelect && calcStandardInput) {
    async function updateCalculation() {
      var tier = calcTierSelect.value;
      var stdCode = calcStandardInput.value.trim() || 'IS 1489';

      try {
        var api = window.ManakSetuApi;
        var resObj = api ? await api.calculateFees(stdCode, tier) : null;
        var data = resObj && resObj.success ? resObj.data : null;

        if (!data) {
          var res = await fetch(`/api/calculate?standard_code=${encodeURIComponent(stdCode)}&enterprise_type=${encodeURIComponent(tier)}`);
          if (res.ok) data = await res.json();
        }

        if (!data) return;

        var formatInr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
        var baseElem = document.getElementById('valBaseMarking');
        var concElem = document.getElementById('valConcession');
        var effElem = document.getElementById('valEffectiveMarking');
        var appElem = document.getElementById('valApplication');
        var auditElem = document.getElementById('valAudit');
        var totalElem = document.getElementById('valTotalEstimated');
        var savingsElem = document.getElementById('valTotalSavings');

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
