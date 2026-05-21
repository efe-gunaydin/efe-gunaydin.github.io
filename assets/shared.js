/* be-rehber — shared.js */

/* ── Tema ── */
(function () {
  const theme = localStorage.getItem('theme');
  const getir = localStorage.getItem('getir');
  const classes = [];
  if (theme === 'light') classes.push('light-mode');
  if (getir === 'on') classes.push('getir-mode');
  if (classes.length) {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.className = (document.body.className + ' ' + classes.join(' ')).trim();
    });
  }
})();

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
}
function toggleGetir() {
  document.body.classList.toggle('getir-mode');
  localStorage.setItem('getir', document.body.classList.contains('getir-mode') ? 'on' : 'off');
}

/* ── Scroll animasyonları ── */
document.addEventListener('DOMContentLoaded', () => {

  /* Fade-in + slide-up */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.card, .concept-block, .callout, .diagram, .content-block, .compare-card, .fade-in')
    .forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 40, 300)}ms`;
      el.classList.add('anim-ready');
      observer.observe(el);
    });

  /* Sayfa giriş fade */
  document.body.classList.add('page-enter');
  requestAnimationFrame(() => {
    document.body.classList.add('page-entered');
  });

  /* Reading progress bar */
  const bar = document.getElementById('progress-bar');
  if (bar) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';
    }, { passive: true });
  }
});
// ══════════════════════════════════════════════
// PHANTOM TROUPE SPIDER BOT INTEGRATION
// ══════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
    // Brand sembolünü mor örümcek SVG'ye çevir (tüm sayfalar)
    const brandSymbol = document.querySelector('.brand-symbol');
    if (brandSymbol) {
        brandSymbol.innerHTML = `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="sp-glow">
      <feGaussianBlur stdDeviation="1.1" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <line x1="20" y1="0" x2="20" y2="11" stroke="#9b7fb5" stroke-width="0.9" opacity="0.5"/>
  <polyline points="16,13 11,8 7,5" stroke="#9b7fb5" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.85"/>
  <polyline points="16,15.5 9,14.5 3,13.5" stroke="#9b7fb5" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.8"/>
  <polyline points="16,17.5 9,18.5 3,20" stroke="#9b7fb5" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.75"/>
  <polyline points="16.5,19.5 12,23 8,28" stroke="#9b7fb5" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.75"/>
  <polyline points="24,13 29,8 33,5" stroke="#9b7fb5" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.85"/>
  <polyline points="24,15.5 31,14.5 37,13.5" stroke="#9b7fb5" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.8"/>
  <polyline points="24,17.5 31,18.5 37,20" stroke="#9b7fb5" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.75"/>
  <polyline points="23.5,19.5 28,23 32,28" stroke="#9b7fb5" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.75"/>
  <line x1="20" y1="19" x2="20" y2="20" stroke="#9b7fb5" stroke-width="2" opacity="0.65"/>
  <ellipse cx="20" cy="15" rx="4.5" ry="4" fill="#9b7fb5" opacity="0.9" filter="url(#sp-glow)"/>
  <ellipse cx="20" cy="25.5" rx="5.5" ry="6" fill="#9b7fb5" opacity="0.85" filter="url(#sp-glow)"/>
  <circle cx="18.5" cy="14" r="0.9" fill="#1a1b1e"/>
  <circle cx="21.5" cy="14" r="0.9" fill="#1a1b1e"/>
</svg>`;
    }

    // 1. Görsel Yolunu Dinamik Hesapla (Alt klasörlerdeki kırılmaları önler)
    const isSubPage = window.location.pathname.includes('/deep/') || window.location.pathname.split('/').length > 2;
    const imgPath = isSubPage ? "../gf-spider.png" : "gf-spider.png";

    // 2. Elementleri DOM'a Enjekte Et
    const spiderBotHTML = `
        <div class="phantom-spider-container" id="phantomSpiderBot">
            <div class="spider-thread"></div>
            <img src="${imgPath}" alt="Phantom Troupe Spider" class="phantom-spider" id="spiderImg">
        </div>
        <div class="spider-chatbox" id="spiderChatbox">
            <div class="chat-header">🕷️ <span>[gf_spider_agent_1.5_flash]</span></div>
            <div class="chat-messages" id="spiderChatMessages">
                <div class="chat-msg bot">Örümcek ağına yaklaştın. Sistem mimarisi veya backend araçları hakkında bir şey mi soracaksın? Hızlı ol, token harcama.</div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="spiderChatInput" placeholder="Sorunu buraya bırak...">
                <button id="spiderSendBtn">SOR</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", spiderBotHTML);

    const spiderContainer = document.getElementById("phantomSpiderBot");
    const chatbox = document.getElementById("spiderChatbox");
    const chatInput = document.getElementById("spiderChatInput");
    const sendBtn = document.getElementById("spiderSendBtn");
    const messagesContainer = document.getElementById("spiderChatMessages");
    const spiderThread = spiderContainer.querySelector(".spider-thread");

    // --- RAPPEL ANİMASYONU (İNİP ÇIKMA) ---
    // swingIn tamamlandıktan (2.2s) sonra periyodik rappel başlat
    setTimeout(() => {
        spiderThread.style.animation = "spiderRappel 15s cubic-bezier(0.45,0,0.55,1) infinite";
    }, 2400);

    // --- SCROLL ANIMASYON MANTIĞI (YAYLANMA EFEKTİ) ---
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollTimeout;

    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            spiderContainer.classList.remove("scrolling-up");
            spiderContainer.classList.add("scrolling-down");
        } else if (scrollTop < lastScrollTop) {
            spiderContainer.classList.remove("scrolling-down");
            spiderContainer.classList.add("scrolling-up");
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            spiderContainer.classList.remove("scrolling-down", "scrolling-up");
        }, 150); 
    }, { passive: true });

    // --- UI ETKİLEŞİMLERİ ---
    spiderContainer.addEventListener("click", () => {
        if (chatbox.style.display === "none" || chatbox.style.display === "") {
            chatbox.style.display = "flex";
            chatInput.focus();
        } else {
            chatbox.style.display = "none";
        }
    });

    sendBtn.addEventListener("click", sendSpiderMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendSpiderMessage();
    });

    function sendSpiderMessage() {
        const messageText = chatInput.value.trim();
        if (!messageText) return;

        appendSpiderMessage("user", messageText);
        chatInput.value = "";

        const loadingDiv = appendSpiderMessage("bot", "Düşünülüyor...");
        callGeminiFlash(messageText, loadingDiv);
    }

    function appendSpiderMessage(sender, text) {
        const msg = document.createElement("div");
        msg.className = `chat-msg ${sender}`;
        msg.innerText = text;
        messagesContainer.appendChild(msg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return msg;
    }

    // --- GEMINI FLASH API ÇAĞRISI ---
    async function callGeminiFlash(prompt, loadingElement) {
        const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; 
        const SYSTEM_INSTRUCTION = "Sen Hunter x Hunter evrenindeki Phantom Troupe çetesinin siber veri tabanısın. Görevin bu web sitesindeki mimariler (BFF, Microservices vb.) hakkında teknik cevaplar vermektir. Ciddi, mesafeli, akıllıca ve direkt sonuca odaklı konuş.";

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
                    generationConfig: { temperature: 0.6, maxOutputTokens: 200 }
                })
            });

            const data = await response.json();
            const botResponse = data.candidates[0].content.parts[0].text;
            loadingElement.innerText = botResponse;
        } catch (error) {
            console.error(error);
            loadingElement.innerText = "Ağ hatası. Sinyal kesildi.";
        }
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});