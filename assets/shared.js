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
// --- PHANTOM TROUPE SPIDER BOT INTEGRATION ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Bot Elementlerini Dinamik Olarak Sayfaya Ekle
    const spiderBotHTML = `
        <div class="phantom-spider-container" id="phantomSpiderBot">
            <div class="spider-thread"></div>
            <img src="image_704f8f.png" alt="Phantom Troupe Spider" class="phantom-spider">
        </div>
        <div class="spider-chatbox" id="spiderChatbox">
            <div class="chat-header">🕷️ <span>Phantom Troupe AI Agent</span></div>
            <div class="chat-messages" id="spiderChatMessages">
                <div class="chat-msg bot">Örümcek ağına takıldın. Bu backend sistemleri veya mimari hakkında ne bilmek istiyorsun? Sor, ama vaktimi çalma.</div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="spiderChatInput" placeholder="Sistem veya mimari hakkında bir şey sor...">
                <button id="spiderSendBtn">Sor</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", spiderBotHTML);

    // Element Seçiciler
    const spiderContainer = document.getElementById("phantomSpiderBot");
    const chatbox = document.getElementById("spiderChatbox");
    const chatInput = document.getElementById("spiderChatInput");
    const sendBtn = document.getElementById("spiderSendBtn");
    const messagesContainer = document.getElementById("spiderChatMessages");

    // Tıklanınca Chatbox Görünürlüğünü Değiştir
    spiderContainer.addEventListener("click", () => {
        if (chatbox.style.display === "none" || chatbox.style.display === "") {
            chatbox.style.display = "flex";
            chatInput.focus();
        } else {
            chatbox.style.display = "none";
        }
    });

    // Mesaj Gönderme Tetikleyicileri
    sendBtn.addEventListener("click", sendSpiderMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendSpiderMessage();
    });

    function sendSpiderMessage() {
        const messageText = chatInput.value.trim();
        if (!messageText) return;

        // Kullanıcı mesajını ekrana bas
        appendSpiderMessage("user", messageText);
        chatInput.value = "";

        // Yükleniyor durumunu göster
        const loadingDiv = appendSpiderMessage("bot", "Düşünüyor...");

        // Gemini Flash API Entegrasyonu
        callGeminiFlash(messageText, loadingDiv);
    }

    function appendSpiderMessage(sender, text) {
        const msg = document.createElement("div");
        msg.className = `chat-msg ${sender}`;
        msg.innerText = text;
        messagesContainer.appendChild(msg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return msg; // Yükleniyor mesajını güncelleyebilmek için elementi döndürüyoruz
    }

    async function callGeminiFlash(prompt, loadingElement) {
        // --- ADAPTE EDİLECEK ALAN (BACKEND ENDPOINT VEYA DİREKT API CALL) ---
        // Not: API Key'i frontend'de ham olarak açıkta bırakmak güvenlik açığı oluşturur. 
        // Gerçek projede bunu kendi mini backend (Node.js/Spring Boot vb.) endpoint'inden geçirmen en sağlıklısıdır.
        
        const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // Eğer test için direkt kullanacaksan buraya yazabilirsin.
        const SYSTEM_INSTRUCTION = "Sen Hunter x Hunter animesindeki Phantom Troupe (Örümcek Takımı) çetesinin gizli bir yapay zeka ajanısın. Görevin, kullanıcının bu web sitesinde bulunan backend mimarileri (BFF, Microservices, Dağıtık Sistemler, REST API, Redis, Grafana vb.) hakkındaki teknik sorularını yanıtlamaktır. Tarzın: Net, ciddi, hafif gizemli, elit ve doğrudan amaca yöneliktir. Gereksiz kibarlık formüllerinden kaçın, bir yazılım dehası gibi konuş.";

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 250 // Kontür ve maliyet yememesi için yanıtı kısa tutuyoruz
                    }
                })
            });

            const data = await response.json();
            const botResponse = data.candidates[0].content.parts[0].text;
            
            // "Düşünüyor..." yazısını gerçek cevapla değiştir
            loadingElement.innerText = botResponse;
        } catch (error) {
            console.error("Gemini Hatası:", error);
            loadingElement.innerText = "Bağlantı koptu. Ağları kontrol et.";
        }
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});