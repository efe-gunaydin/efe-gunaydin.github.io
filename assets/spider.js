(function () {
  var C = 'currentColor', SW = '7';

  function svg(w, h) {
    var s = '<svg width="'+w+'" height="'+h+'" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style="color:inherit;">';
    var L = function(p){ return '<polyline points="'+p+'" stroke="'+C+'" stroke-width="'+SW+'" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'; };
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
    var container = document.body;
    container.style.position = container.style.position || 'relative';

    /* ── 1. WRAP (örümcek + ip) ── */
    var wrap = document.createElement('div');
    wrap.id = 'sp1der-wrap';
    Object.assign(wrap.style, {
      position: 'absolute',
      top: '10px',
      right: '18px',
      zIndex: '99999',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pointerEvents: 'none',
      color: 'var(--text-secondary)',
      opacity: '0.7',
      transition: 'opacity 0.25s ease, filter 0.25s ease'
    });

    var thread = document.createElement('div');
    Object.assign(thread.style, {
      width: '1px',
      height: '20px',
      background: 'linear-gradient(to bottom,currentColor,transparent)',
      margin: '0 auto',
      flexShrink: '0',
      opacity: '0.5'
    });

    var spBody = document.createElement('div');
    spBody.innerHTML = svg(72, 72);
    Object.assign(spBody.style, {
      pointerEvents: 'auto',
      cursor: 'pointer',
      flexShrink: '0',
      transformOrigin: 'top center'
    });

    wrap.appendChild(thread);
    wrap.appendChild(spBody);
    container.appendChild(wrap);

    /* ── 2. SORU BALONU ── */
    var bubble = document.createElement('div');
    Object.assign(bubble.style, {
      position: 'absolute',
      right: '10px',
      top: '95px',
      background: 'var(--bg-elevated)',
      border: '1px solid var(--accent-amber)',
      borderRadius: '8px',
      padding: '7px 12px',
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      color: 'var(--accent-amber)',
      whiteSpace: 'nowrap',
      opacity: '0',
      pointerEvents: 'none',
      transition: 'opacity 0.4s ease, transform 0.4s ease',
      transform: 'translateY(-4px)',
      zIndex: '99998',
      boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
    });
    bubble.textContent = 'Yardım lazım mı?';
    container.appendChild(bubble);

    /* ── 3. CHATBOX ── */
    var chat = document.createElement('div');
    chat.id = 'sp1der-chat';
    chat.innerHTML = ''
      + '<div class="sp-chat-header">'
      + '<span>&#x25C6; sp1der</span>'
      + '<span id="sp-x" class="sp-close">&#x2715;</span>'
      + '</div>'
      + '<div id="sp-msgs" class="sp-chat-messages">'
      + '<div class="sp-msg bot">Selam. Backend rehberinde takildigin bir yer var mi?</div>'
      + '</div>'
      + '<div class="sp-chat-input-row">'
      + '<input id="sp-in" type="text" placeholder="Sor bana..."/>'
      + '<button id="sp-btn">Sor</button>'
      + '</div>';
    container.appendChild(chat);

    /* ── 4. SCROLL TAKİBİ — tüm elementler hazır olduktan sonra ── */
    function updatePos() {
      var scrollY = window.scrollY || window.pageYOffset;
      wrap.style.top = (scrollY + 10) + 'px';
      bubble.style.top = (scrollY + 95) + 'px';
      chat.style.top = (scrollY + 110) + 'px';
    }
    window.addEventListener('scroll', updatePos, { passive: true });
    updatePos();

    /* ── 5. ANİMASYONLAR ── */
    var angle = 0, dir = 1;
    var introStart = null;

    function swing() {
      angle += 0.025 * dir;
      if (Math.abs(angle) >= 4) dir *= -1;
      spBody.style.transform = 'rotate(' + angle + 'deg)';
      requestAnimationFrame(swing);
    }

    function intro(ts) {
      if (!introStart) introStart = ts;
      var t = Math.min((ts - introStart) / 4000, 1);
      var x = 70 * Math.pow(1 - t, 3);
      thread.style.height = (20 + 60 * Math.sin(t * Math.PI)) + 'px';
      spBody.style.transform = 'translateX(' + x + 'px)';
      if (t < 1) {
        requestAnimationFrame(intro);
      } else {
        spBody.style.transform = 'none';
        thread.style.height = '20px';
        requestAnimationFrame(swing);
        /* Animasyon bitince balon */
        setTimeout(function() {
          bubble.style.opacity = '1';
          bubble.style.transform = 'translateY(0)';
          setTimeout(function() {
            bubble.style.opacity = '0';
            bubble.style.transform = 'translateY(-4px)';
          }, 4000);
        }, 300);
      }
    }

    setTimeout(function(){ requestAnimationFrame(intro); }, 500);

    /* ── 6. HOVER PARLAMA ── */
    spBody.addEventListener('mouseenter', function() {
      wrap.style.opacity = '1';
      wrap.style.filter = 'drop-shadow(0 0 8px var(--accent-amber))';
    });
    spBody.addEventListener('mouseleave', function() {
      wrap.style.opacity = '0.7';
      wrap.style.filter = 'none';
    });

    /* ── 7. TIKLAMA ── */
    spBody.addEventListener('click', function(e) {
      e.stopPropagation();
      bubble.style.opacity = '0';
      chat.classList.toggle('open');
    });
    document.getElementById('sp-x').addEventListener('click', function(){
      chat.classList.remove('open');
    });
    document.addEventListener('click', function(e){
      if (!chat.contains(e.target) && !spBody.contains(e.target))
        chat.classList.remove('open');
    });

    /* ── 8. CHAT API ── */
    var btn = document.getElementById('sp-btn');
    var inp = document.getElementById('sp-in');
    var msgs = document.getElementById('sp-msgs');

    function addMsg(txt, bot) {
      var d = document.createElement('div');
      d.className = 'sp-msg ' + (bot ? 'bot' : 'user');
      d.textContent = txt;
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
      return d;
    }

    function ask() {
      var txt = inp.value.trim();
      if (!txt) return;
      inp.value = ''; btn.disabled = true;
      addMsg(txt, false);
      var t = addMsg('...', true);
      fetch('https://sp1derstatic.efegunaydin354.workers.dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: txt })
      })
      .then(function(r){ return r.json(); })
      .then(function(d){ t.textContent = d.answer || 'Yanit yok.'; })
      .catch(function(e){ t.textContent = 'Hata: ' + e.message; })
      .finally(function(){ btn.disabled = false; });
    }
    btn.addEventListener('click', ask);
    inp.addEventListener('keydown', function(e){ if(e.key==='Enter') ask(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
