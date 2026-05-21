(function () {

  var C = '#ffffff', SW = '6';

  function svg(w, h) {
    var s = '<svg width="'+w+'" height="'+h+'" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">';
    var L = function(pts) { return '<polyline points="'+pts+'" stroke="'+C+'" stroke-width="'+SW+'" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'; };
    s += L('122,92 95,72 68,55 42,32 22,16');
    s += L('115,106 85,96 55,85 28,76 8,62');
    s += L('113,126 82,124 52,130 26,142 10,158');
    s += L('118,144 90,156 68,175 50,202 42,228');
    s += L('178,92 205,72 232,55 258,32 278,16');
    s += L('185,106 215,96 245,85 272,76 292,62');
    s += L('187,126 218,124 248,130 274,142 290,158');
    s += L('182,144 210,156 232,175 250,202 258,228');
    s += '<circle cx="150" cy="86" r="22" fill="none" stroke="'+C+'" stroke-width="'+SW+'"/>';
    s += '<path d="M141,106L137,118L141,128L145,118Z" fill="'+C+'"/>';
    s += '<path d="M159,106L163,118L159,128L155,118Z" fill="'+C+'"/>';
    s += '<path d="M150,116C124,116 108,130 105,150C101,175 110,204 124,220C133,230 150,238 150,238C150,238 167,230 176,220C190,204 199,175 195,150C192,130 176,116 150,116Z" fill="none" stroke="'+C+'" stroke-width="'+SW+'"/>';
    s += '<line x1="150" y1="148" x2="150" y2="200" stroke="'+C+'" stroke-width="3"/>';
    s += '<line x1="124" y1="174" x2="176" y2="174" stroke="'+C+'" stroke-width="3"/>';
    s += '<polygon points="150,148 143,162 157,162" fill="'+C+'"/>';
    s += '<polygon points="150,200 143,186 157,186" fill="'+C+'"/>';
    s += '<polygon points="124,174 138,167 138,181" fill="'+C+'"/>';
    s += '<polygon points="176,174 162,167 162,181" fill="'+C+'"/>';
    s += '</svg>';
    return s;
  }

  function init() {

    /* Nav sembolü */
    var sym = document.querySelector('.brand-symbol');
    if (sym) sym.innerHTML = svg(40, 40);

    /* Wrapper — tüm stil inline, CSS'e bağımlı değil */
    var wrap = document.createElement('div');
    Object.assign(wrap.style, {
      position: 'fixed',
      top: '10px',
      right: '18px',
      zIndex: '99999',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pointerEvents: 'none',
      filter: 'drop-shadow(0 0 10px rgba(192,57,43,0.6))'
    });

    /* İp */
    var thread = document.createElement('div');
    Object.assign(thread.style, {
      width: '2px',
      height: '20px',
      background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.1))',
      margin: '0 auto',
      flexShrink: '0'
    });

    /* Gövde */
    var body = document.createElement('div');
    body.innerHTML = svg(72, 72);
    Object.assign(body.style, {
      pointerEvents: 'auto',
      cursor: 'pointer',
      flexShrink: '0',
      transformOrigin: 'top center'
    });

    wrap.appendChild(thread);
    wrap.appendChild(body);
    document.body.appendChild(wrap);

    /* Chatbox */
    var chat = document.createElement('div');
    Object.assign(chat.style, {
      position: 'fixed',
      top: '110px',
      right: '20px',
      width: '300px',
      maxHeight: '380px',
      background: '#0d0d0d',
      border: '1px solid #1e1e1e',
      borderTop: '2px solid #c0392b',
      borderRadius: '12px',
      boxShadow: '0 12px 40px rgba(0,0,0,.85)',
      display: 'none',
      flexDirection: 'column',
      zIndex: '99998',
      overflow: 'hidden',
      fontFamily: "'JetBrains Mono', monospace"
    });
    chat.innerHTML = ''
      + '<div style="background:#111;padding:10px 14px;border-bottom:1px solid #1e1e1e;font-size:12px;font-weight:700;color:#c0392b;display:flex;align-items:center;justify-content:space-between;">'
      + '<span>&#x1F577; sp1der</span>'
      + '<span id="sp-x" style="cursor:pointer;color:#555;font-size:14px;">&#x2715;</span>'
      + '</div>'
      + '<div id="sp-msgs" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;background:#080808;">'
      + '<div style="padding:8px 12px;border-radius:8px;font-size:12px;line-height:1.55;background:#111;color:#bbb;border:1px solid #1e1e1e;">Selam. Backend rehberinde takildigin bir yer var mi?</div>'
      + '</div>'
      + '<div style="display:flex;padding:8px 10px;gap:8px;background:#0d0d0d;border-top:1px solid #1a1a1a;">'
      + '<input id="sp-in" type="text" placeholder="Sor bana..." style="flex:1;background:#111;border:1px solid #1e1e1e;border-radius:7px;padding:7px 10px;font-size:12px;color:#ddd;font-family:inherit;outline:none;"/>'
      + '<button id="sp-btn" style="background:#c0392b;border:none;border-radius:7px;padding:7px 12px;font-size:11px;font-weight:700;color:#fff;cursor:pointer;">Sor</button>'
      + '</div>';
    document.body.appendChild(chat);

    /* ── Sallanma animasyonu — requestAnimationFrame, CSS transform yok ── */
    var angle = 0, dir = 1, speed = 0.025, max = 4;
    var introStart = null, introDone = false;

    function swingLoop() {
      angle += speed * dir;
      if (Math.abs(angle) >= max) dir *= -1;
      body.style.transform = 'rotate(' + angle + 'deg)';
      requestAnimationFrame(swingLoop);
    }

    function introLoop(ts) {
      if (!introStart) introStart = ts;
      var t = Math.min((ts - introStart) / 4000, 1);
      /* Sağdan gelir */
      var x = 70 * Math.pow(1 - t, 3);
      /* İp uzar-kısalır */
      var th = 20 + 60 * Math.sin(t * Math.PI);
      body.style.transform = 'translateX(' + x + 'px)';
      thread.style.height = th + 'px';
      if (t < 1) {
        requestAnimationFrame(introLoop);
      } else {
        body.style.transform = 'none';
        thread.style.height = '20px';
        introDone = true;
        requestAnimationFrame(swingLoop);
      }
    }

    setTimeout(function () { requestAnimationFrame(introLoop); }, 500);

    /* ── Tıklama: chatbox aç/kapat ── */
    body.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = chat.style.display === 'flex';
      chat.style.display = open ? 'none' : 'flex';
    });
    document.getElementById('sp-x').addEventListener('click', function () {
      chat.style.display = 'none';
    });
    document.addEventListener('click', function (e) {
      if (!chat.contains(e.target) && !body.contains(e.target)) {
        chat.style.display = 'none';
      }
    });

    /* ── Groq API ── */
    var btn = document.getElementById('sp-btn');
    var inp = document.getElementById('sp-in');
    var msgs = document.getElementById('sp-msgs');

    function addMsg(txt, bot) {
      var d = document.createElement('div');
      d.style.cssText = 'padding:8px 12px;border-radius:8px;font-size:12px;line-height:1.55;max-width:90%;word-break:break-word;'
        + (bot ? 'background:#111;color:#bbb;border:1px solid #1e1e1e;'
               : 'background:#c0392b;color:#fff;font-weight:600;align-self:flex-end;');
      d.textContent = txt;
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
      return d;
    }

    function ask() {
      var txt = inp.value.trim();
      if (!txt) return;
      inp.value = '';
      btn.disabled = true;
      addMsg(txt, false);
      var t = addMsg('...', true);
      var key = window.SPIDER_API_KEY || '';
      if (!key) { t.textContent = 'API key yok.'; btn.disabled = false; return; }
      fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            { role: 'system', content: 'Sen be-rehber backend dev rehber sitesinin sp1der botusun. Elasticsearch, Jenkins, Grafana, Argo CD, Redis, Swagger, Postman, DBeaver, Figma ve REST API, Protokoller, Monolith vs Mikroservis, Distributed Systems konularinda yardim et. Kisa cevap, Turkce, max 3 cumle.' },
            { role: 'user', content: txt }
          ],
          max_tokens: 200
        })
      })
      .then(function(r){return r.json();})
      .then(function(d){
        t.textContent = d.choices && d.choices[0] ? d.choices[0].message.content : (d.error ? d.error.message : 'Yanit yok.');
      })
      .catch(function(e){t.textContent='Hata: '+e.message;})
      .finally(function(){btn.disabled=false;});
    }

    btn.addEventListener('click', ask);
    inp.addEventListener('keydown', function(e){ if(e.key==='Enter') ask(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
