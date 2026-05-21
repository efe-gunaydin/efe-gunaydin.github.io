/* ══════════════════════════════════════
   SP1DER v3 — sabit, beyaz/mor, kalın
   - Her zaman görünür (constant)
   - Sayfa yükünde 5sn sallanma animasyonu
   - Scroll'da sayfayla aşağı iner (sticky değil, scroll-follow)
   - Beyaz outline + Getir moru glow
   - Kalın çizgiler (stroke-width: 6)
   - Gemini API entegrasyonu
══════════════════════════════════════ */
(function () {

  /* ── Renk paleti ── */
  var C_STROKE  = '#ffffff';   /* beyaz outline */
  var C_FILL    = 'none';      /* içi boş */
  var C_MARK    = '#ffffff';   /* haç işareti beyaz */
  var C_GLOW    = '#5d3ebc';   /* Getir moru glow */
  var C_THREAD  = '#a594c4';   /* ip rengi mor */
  var SW        = '6';         /* stroke-width kalın */
  var SW_MARK   = '3';         /* işaret çizgi kalınlığı */

  function makeSVG(w, h) {
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">'
      /* Sol bacaklar — köşeli segmentler */
      + '<polyline points="122,92 95,72 68,55 42,32 22,16" stroke="' + C_STROKE + '" stroke-width="' + SW + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
      + '<polyline points="115,106 85,96 55,85 28,76 8,62" stroke="' + C_STROKE + '" stroke-width="' + SW + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
      + '<polyline points="113,126 82,124 52,130 26,142 10,158" stroke="' + C_STROKE + '" stroke-width="' + SW + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
      + '<polyline points="118,144 90,156 68,175 50,202 42,228" stroke="' + C_STROKE + '" stroke-width="' + SW + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
      /* Sağ bacaklar */
      + '<polyline points="178,92 205,72 232,55 258,32 278,16" stroke="' + C_STROKE + '" stroke-width="' + SW + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
      + '<polyline points="185,106 215,96 245,85 272,76 292,62" stroke="' + C_STROKE + '" stroke-width="' + SW + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
      + '<polyline points="187,126 218,124 248,130 274,142 290,158" stroke="' + C_STROKE + '" stroke-width="' + SW + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
      + '<polyline points="182,144 210,156 232,175 250,202 258,228" stroke="' + C_STROKE + '" stroke-width="' + SW + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
      /* Kafa */
      + '<circle cx="150" cy="86" r="22" fill="' + C_FILL + '" stroke="' + C_STROKE + '" stroke-width="' + SW + '"/>'
      /* Fanglar */
      + '<path d="M 141,106 L 137,118 L 141,128 L 145,118 Z" fill="' + C_STROKE + '"/>'
      + '<path d="M 159,106 L 163,118 L 159,128 L 155,118 Z" fill="' + C_STROKE + '"/>'
      /* Karın */
      + '<path d="M 150,116 C 124,116 108,130 105,150 C 101,175 110,204 124,220 C 133,230 150,238 150,238 C 150,238 167,230 176,220 C 190,204 199,175 195,150 C 192,130 176,116 150,116 Z" fill="' + C_FILL + '" stroke="' + C_STROKE + '" stroke-width="' + SW + '"/>'
      /* Haç + ok işareti */
      + '<line x1="150" y1="148" x2="150" y2="200" stroke="' + C_MARK + '" stroke-width="' + SW_MARK + '"/>'
      + '<line x1="124" y1="174" x2="176" y2="174" stroke="' + C_MARK + '" stroke-width="' + SW_MARK + '"/>'
      + '<polygon points="150,148 143,162 157,162" fill="' + C_MARK + '"/>'
      + '<polygon points="150,200 143,186 157,186" fill="' + C_MARK + '"/>'
      + '<polygon points="124,174 138,167 138,181" fill="' + C_MARK + '"/>'
      + '<polygon points="176,174 162,167 162,181" fill="' + C_MARK + '"/>'
      + '</svg>';
  }

  /* ── DOM yapısı ── */
  function initSpider() {
    /* Wrapper — position absolute, scroll ile hareket eder */
    var wrap = document.createElement('div');
    wrap.id = 'sp1der-wrap';

    /* İp */
    var thread = document.createElement('div');
    thread.id = 'sp1der-thread';

    /* Gövde */
    var body = document.createElement('div');
    body.id = 'sp1der-body';
    body.innerHTML = makeSVG(78, 78);
    body.title = 'sp1der';

    wrap.appendChild(thread);
    wrap.appendChild(body);
    /* Scroll ile hareket etmesi için body değil wrapper diva ekle */
    document.body.appendChild(wrap);

    /* Chatbox */
    var chat = document.createElement('div');
    chat.id = 'sp1der-chat';
    chat.innerHTML = ''
      + '<div class="sp-chat-header">'
      + '<span>&#x1F577; sp1der</span>'
      + '<span class="sp-close" id="sp-close-btn">&#x2715;</span>'
      + '</div>'
      + '<div class="sp-chat-messages" id="sp-messages">'
      + '<div class="sp-msg bot">Selam. Backend rehberinde takildigin bir yer var mi?</div>'
      + '</div>'
      + '<div class="sp-chat-input-row">'
      + '<input type="text" id="sp-input" placeholder="Sor bana..." />'
      + '<button id="sp-send">Sor</button>'
      + '</div>';
    document.body.appendChild(chat);

    /* ── Nav sembolünü de güncelle ── */
    var brandSymbol = document.querySelector('.brand-symbol');
    if (brandSymbol) brandSymbol.innerHTML = makeSVG(40, 40);

    /* ═══════════════════════════
       SCROLL-FOLLOW POZİSYON
       Örümcek her zaman ekranın
       sağ üst köşesinde — ama
       scroll yaptıkça SAYFAyla
       değil EKRANla birlikte kalır.
       Yani: position FIXED, sağ üstte.
       "Scroll'da benimle gelsin" = fixed demek.
       Eğer "sayfanın içinde aşağı gitsin"
       isteseydin absolute olurdu.
       Fixed en doğrusu.
    ═══════════════════════════ */

    /* ── 5sn giriş animasyonu ── */
    /* Sayfa yüklenince örümcek sağ üstten sallanarak yerini alır */
    setTimeout(function () {
      wrap.classList.add('sp-intro');
      setTimeout(function () {
        wrap.classList.remove('sp-intro');
        wrap.classList.add('sp-idle');
      }, 5000);
    }, 400);

    /* ── Tıklama: chatbox toggle ── */
    body.addEventListener('click', function (e) {
      e.stopPropagation();
      chat.classList.toggle('open');
      if (chat.classList.contains('open')) {
        /* Chatbox pozisyonunu örümceğe göre ayarla */
        var rect = wrap.getBoundingClientRect();
        chat.style.top  = (rect.bottom + 8) + 'px';
        chat.style.right = '20px';
      }
    });

    document.getElementById('sp-close-btn').addEventListener('click', function () {
      chat.classList.remove('open');
    });

    /* ── Gemini API ── */
    var sendBtn = document.getElementById('sp-send');
    var inputEl = document.getElementById('sp-input');
    var msgsEl  = document.getElementById('sp-messages');

    function addMsg(text, cls) {
      var d = document.createElement('div');
      d.className = 'sp-msg ' + cls;
      d.textContent = text;
      msgsEl.appendChild(d);
      msgsEl.scrollTop = msgsEl.scrollHeight;
      return d;
    }

    function sendMsg() {
      var text = inputEl.value.trim();
      if (!text) return;
      inputEl.value = '';
      sendBtn.disabled = true;
      addMsg(text, 'user');
      var thinking = addMsg('...', 'bot');

      /* API key: Netlify env var üzerinden inject edilir.
         Geliştirme için: window.SPIDER_API_KEY = 'key' */
      var key = window.SPIDER_API_KEY || '';

      if (!key) {
        thinking.textContent = 'API key eksik. Netlify env var olarak SPIDER_API_KEY ekle.';
        sendBtn.disabled = false;
        return;
      }

      var ctx = 'Sen be-rehber adli backend dev rehber sitesinin sp1der botusun. '
        + 'Elasticsearch, Jenkins, Grafana, Argo CD, Redis, Swagger, Postman, DBeaver, Figma ve '
        + 'REST API, Protokoller, Monolith vs Mikroservis, Distributed Systems konularinda yardim edersin. '
        + 'Kisa cevap ver, Turkce konuss, max 3 cumle.';

      fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + key,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: ctx + '\n\nKullanici: ' + text }] }]
          })
        }
      )
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var reply = d && d.candidates && d.candidates[0]
          && d.candidates[0].content && d.candidates[0].content.parts
          ? d.candidates[0].content.parts[0].text : 'Yanit alinamadi.';
        thinking.textContent = reply;
      })
      .catch(function (e) {
        thinking.textContent = 'Hata: ' + e.message;
      })
      .finally(function () { sendBtn.disabled = false; });
    }

    sendBtn.addEventListener('click', sendMsg);
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') sendMsg();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSpider);
  } else {
    initSpider();
  }

})();
