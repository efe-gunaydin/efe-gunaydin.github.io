/* ══════════════════════════════════════
   SP1DER — scroll-safe, yeni tasarım
   Phantom Troupe outline stili
══════════════════════════════════════ */
(function () {

  var SPIDER_SVG = '<svg width="80" height="80" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">'
    + '<polyline points="122,92 95,72 68,55 42,32 22,16" stroke="#d4a574" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<polyline points="115,106 85,96 55,85 28,76 8,62" stroke="#d4a574" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<polyline points="113,126 82,124 52,130 26,142 10,158" stroke="#d4a574" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<polyline points="118,144 90,156 68,175 50,202 42,228" stroke="#d4a574" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<polyline points="178,92 205,72 232,55 258,32 278,16" stroke="#d4a574" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<polyline points="185,106 215,96 245,85 272,76 292,62" stroke="#d4a574" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<polyline points="187,126 218,124 248,130 274,142 290,158" stroke="#d4a574" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<polyline points="182,144 210,156 232,175 250,202 258,228" stroke="#d4a574" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<circle cx="150" cy="86" r="22" fill="#0d0d0d" stroke="#d4a574" stroke-width="3.5"/>'
    + '<path d="M 141,106 L 138,116 L 141,124 L 144,116 Z" fill="#d4a574"/>'
    + '<path d="M 159,106 L 162,116 L 159,124 L 156,116 Z" fill="#d4a574"/>'
    + '<path d="M 150,116 C 124,116 108,130 105,150 C 101,175 110,204 124,220 C 133,230 150,238 150,238 C 150,238 167,230 176,220 C 190,204 199,175 195,150 C 192,130 176,116 150,116 Z" fill="#0d0d0d" stroke="#d4a574" stroke-width="3.5"/>'
    + '<line x1="150" y1="148" x2="150" y2="200" stroke="#d4a574" stroke-width="2.5"/>'
    + '<line x1="124" y1="174" x2="176" y2="174" stroke="#d4a574" stroke-width="2.5"/>'
    + '<polygon points="150,148 144,160 156,160" fill="#d4a574"/>'
    + '<polygon points="150,200 144,188 156,188" fill="#d4a574"/>'
    + '<polygon points="124,174 136,168 136,180" fill="#d4a574"/>'
    + '<polygon points="176,174 164,168 164,180" fill="#d4a574"/>'
    + '</svg>';

  var NAV_SVG = '<svg width="40" height="40" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">'
    + '<polyline points="122,92 95,72 68,55 42,32 22,16" stroke="#d4a574" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<polyline points="115,106 85,96 55,85 28,76 8,62" stroke="#d4a574" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<polyline points="113,126 82,124 52,130 26,142 10,158" stroke="#d4a574" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<polyline points="118,144 90,156 68,175 50,202 42,228" stroke="#d4a574" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<polyline points="178,92 205,72 232,55 258,32 278,16" stroke="#d4a574" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<polyline points="185,106 215,96 245,85 272,76 292,62" stroke="#d4a574" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<polyline points="187,126 218,124 248,130 274,142 290,158" stroke="#d4a574" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<polyline points="182,144 210,156 232,175 250,202 258,228" stroke="#d4a574" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<circle cx="150" cy="86" r="22" fill="transparent" stroke="#d4a574" stroke-width="3.5"/>'
    + '<path d="M 141,106 L 138,116 L 141,124 L 144,116 Z" fill="#d4a574"/>'
    + '<path d="M 159,106 L 162,116 L 159,124 L 156,116 Z" fill="#d4a574"/>'
    + '<path d="M 150,116 C 124,116 108,130 105,150 C 101,175 110,204 124,220 C 133,230 150,238 150,238 C 150,238 167,230 176,220 C 190,204 199,175 195,150 C 192,130 176,116 150,116 Z" fill="transparent" stroke="#d4a574" stroke-width="3.5"/>'
    + '<line x1="150" y1="148" x2="150" y2="200" stroke="#d4a574" stroke-width="2.5"/>'
    + '<line x1="124" y1="174" x2="176" y2="174" stroke="#d4a574" stroke-width="2.5"/>'
    + '<polygon points="150,148 144,160 156,160" fill="#d4a574"/>'
    + '<polygon points="150,200 144,188 156,188" fill="#d4a574"/>'
    + '<polygon points="124,174 136,168 136,180" fill="#d4a574"/>'
    + '<polygon points="176,174 164,168 164,180" fill="#d4a574"/>'
    + '</svg>';

  function initSpider() {

    /* ── DOM: Ana wrapper (fixed, scroll'dan etkilenmez) ── */
    var root = document.createElement('div');
    root.id = 'sp1der-root';

    var thread = document.createElement('div');
    thread.id = 'sp1der-thread';

    var body = document.createElement('div');
    body.id = 'sp1der-body';
    body.innerHTML = SPIDER_SVG;
    body.title = 'sp1der';

    root.appendChild(thread);
    root.appendChild(body);
    document.body.appendChild(root);

    /* ── Chatbox (fixed, örümcekten bağımsız pozisyon) ── */
    var chat = document.createElement('div');
    chat.id = 'sp1der-chat';
    chat.innerHTML = ''
      + '<div class="sp-chat-header">'
      + '  <span>&#x1F577; sp1der &middot; be-rehber</span>'
      + '  <span class="sp-close" id="sp-close-btn">&#x2715;</span>'
      + '</div>'
      + '<div class="sp-chat-messages" id="sp-messages">'
      + '  <div class="sp-msg bot">Selam. Backend rehberinde takildigin bir yer var mi?</div>'
      + '</div>'
      + '<div class="sp-chat-input-row">'
      + '  <input type="text" id="sp-input" placeholder="Sor bana..." />'
      + '  <button id="sp-send">Sor</button>'
      + '</div>';
    document.body.appendChild(chat);

    /* ── Nav sembolünü güncelle ── */
    var brandSymbol = document.querySelector('.brand-symbol');
    if (brandSymbol) brandSymbol.innerHTML = NAV_SVG;

    /* ── State ── */
    var isDown = false;
    var swingTimer = null;
    var autoTimer = null;

    function getThreadDepth() {
      var nav = document.querySelector('.topnav');
      var navH = nav ? nav.offsetHeight : 60;
      return (navH + 160) + 'px';
    }

    function descend() {
      if (isDown) return;
      isDown = true;
      root.style.setProperty('--sp-thread-h', getThreadDepth());
      root.classList.add('is-down');
      swingTimer = setTimeout(function() {
        root.classList.add('is-swinging');
      }, 1100);
      autoTimer = setTimeout(ascend, 5000);
    }

    function ascend() {
      clearTimeout(swingTimer);
      clearTimeout(autoTimer);
      root.classList.remove('is-swinging');
      chat.classList.remove('open');
      setTimeout(function() {
        root.classList.remove('is-down');
        isDown = false;
      }, 200);
    }

    /* ── Örümceğe tıkla: inmemişse in, inmişse chatbox'ı aç/kapat ── */
    body.addEventListener('click', function(e) {
      e.stopPropagation();
      if (!isDown) {
        descend();
      } else {
        chat.classList.toggle('open');
      }
    });

    /* ── Chatbox kapat ── */
    document.getElementById('sp-close-btn').addEventListener('click', function() {
      chat.classList.remove('open');
    });

    /* ── Mesaj gönder ── */
    var sendBtn = document.getElementById('sp-send');
    var inputEl = document.getElementById('sp-input');
    var messagesEl = document.getElementById('sp-messages');

    function addMsg(text, cls) {
      var div = document.createElement('div');
      div.className = 'sp-msg ' + cls;
      div.textContent = text;
      messagesEl.appendChild(div);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return div;
    }

    function sendMessage() {
      var text = inputEl.value.trim();
      if (!text) return;
      inputEl.value = '';
      sendBtn.disabled = true;
      addMsg(text, 'user');
      var thinking = addMsg('...', 'bot');

      var apiKey = window.SPIDER_API_KEY || '';
      if (!apiKey) {
        thinking.textContent = 'API key ayarli degil. Simdilik hangi konuda takkaldin soyle, bakalim.';
        sendBtn.disabled = false;
        return;
      }

      var systemCtx = 'Sen be-rehber adli backend developer rehber sitesinde yardimci olan sp1der botusun. '
        + 'Elasticsearch, Jenkins, Grafana, Argo CD, Redis, Swagger, Postman, DBeaver, Figma araclari ve '
        + 'REST API, Protokoller, Monolith vs Mikroservis, Distributed Systems konularini anlatiyorsun. '
        + 'Kisa ve net cevap ver. Turkce konuss. 2-3 cumle yeter.';

      fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemCtx + '\n\nKullanici: ' + text }] }]
          })
        }
      ).then(function(res) {
        return res.json();
      }).then(function(data) {
        var reply = data && data.candidates && data.candidates[0]
          && data.candidates[0].content && data.candidates[0].content.parts
          && data.candidates[0].content.parts[0]
          ? data.candidates[0].content.parts[0].text
          : 'Cevap alinamadi.';
        thinking.textContent = reply;
      }).catch(function(err) {
        thinking.textContent = 'Baglanti hatasi: ' + err.message;
      }).finally(function() {
        sendBtn.disabled = false;
      });
    }

    sendBtn.addEventListener('click', sendMessage);
    inputEl.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') sendMessage();
    });

    /* ── İlk iniş: 2.5sn sonra ── */
    setTimeout(descend, 2500);

    /* ── Rastgele iniş: 60-120sn arası ── */
    function scheduleRandom() {
      var delay = 60000 + Math.random() * 60000;
      setTimeout(function() {
        if (!isDown) descend();
        scheduleRandom();
      }, delay);
    }
    setTimeout(scheduleRandom, 8000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSpider);
  } else {
    initSpider();
  }

})();
