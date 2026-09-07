/* ==========================================================================
   Зул-Эрдэнэ — 렌더링 + 스크롤 연출 + 캐로셀 + 영상 + BGM 플레이리스트
   문구를 바꾸려면 data/scenes.js 만 고치면 됩니다. 이 파일은 건드릴 일이 없습니다.
   ========================================================================== */

(function () {
  'use strict';

  var DATA = window.SCENES;
  if (!DATA || !DATA.scenes) {
    document.getElementById('story').textContent = 'data/scenes.js 를 읽지 못했습니다.';
    return;
  }

  var story = document.getElementById('story');

  /* --- 작은 도우미 ------------------------------------------------------ */

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  // 사진 프레임. 파일이 없으면 onerror 로 플레이스홀더가 됩니다.
  function figure(media, label, lazy) {
    var frame = el('div', 'photo-frame');
    frame.setAttribute('data-label', label || '');

    // 사진의 실제 비율을 틀에 그대로 씁니다. 고정 비율로 잘라내면
    // 가로 사진에서 사람 얼굴이 화면 밖으로 나갑니다.
    // 비율을 미리 알고 있으므로 로딩 중 화면이 튀지도 않습니다.
    if (media.w && media.h) frame.style.aspectRatio = media.w + ' / ' + media.h;

    var img = el('img');
    img.src = media.src;
    if (media.w) img.width = media.w;
    if (media.h) img.height = media.h;
    img.alt = media.alt_mn || '';
    img.decoding = 'async';
    if (lazy !== false) img.loading = 'lazy';
    img.addEventListener('error', function () { frame.classList.add('is-empty'); });

    frame.appendChild(img);
    return frame;
  }

  function verseBlock(lines) {
    var v = el('p', 'verse');
    lines.forEach(function (line) { v.appendChild(el('span', 'line', line)); });
    return v;
  }

  /* --- 캐로셀 -----------------------------------------------------------
     라이브러리 없이 CSS scroll-snap 으로 구현합니다. 터치 스와이프가
     브라우저 기본 동작이라 저사양 기기에서도 부드럽습니다.
     -------------------------------------------------------------------- */

  function carousel(items, label) {
    var wrap = el('div', 'carousel');
    var track = el('div', 'carousel-track');

    items.forEach(function (m) {
      var slide = el('div', 'carousel-slide');
      slide.appendChild(figure(m, label, true));
      track.appendChild(slide);
    });
    wrap.appendChild(track);

    if (items.length > 1) {
      // 몇 번째 사진인지 알려주는 점
      var dots = el('div', 'carousel-dots');
      var dotList = [];
      items.forEach(function (_, i) {
        var d = el('button', 'carousel-dot');
        d.type = 'button';
        d.setAttribute('aria-label', (i + 1) + ' / ' + items.length);
        d.addEventListener('click', function () {
          track.scrollTo({ left: track.children[i].offsetLeft, behavior: 'smooth' });
        });
        dots.appendChild(d);
        dotList.push(d);
      });
      wrap.appendChild(dots);

      var counter = el('div', 'carousel-count', '1 / ' + items.length);
      wrap.appendChild(counter);

      function setActive(i) {
        dotList.forEach(function (d, j) { d.classList.toggle('is-on', j === i); });
        counter.textContent = (i + 1) + ' / ' + items.length;
      }
      setActive(0);

      // 스크롤 위치로 현재 슬라이드를 판정. scroll 이벤트는 rAF 로 묶습니다.
      var ticking = false;
      track.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          var i = Math.round(track.scrollLeft / track.clientWidth);
          if (i < 0) i = 0;
          if (i > items.length - 1) i = items.length - 1;
          setActive(i);
          ticking = false;
        });
      }, { passive: true });

      // 넓은 화면용 좌우 버튼 (모바일에서는 CSS 로 숨김)
      ['prev', 'next'].forEach(function (dir) {
        var b = el('button', 'carousel-arrow carousel-arrow--' + dir);
        b.type = 'button';
        b.setAttribute('aria-label', dir === 'prev' ? 'өмнөх' : 'дараах');
        b.addEventListener('click', function () {
          var d = dir === 'prev' ? -1 : 1;
          track.scrollBy({ left: d * track.clientWidth, behavior: 'smooth' });
        });
        wrap.appendChild(b);
      });
    }

    return wrap;
  }

  /* --- 영상 -------------------------------------------------------------
     음소거 자동재생만 모바일에서 허용됩니다. BGM 과 소리가 겹치지 않도록
     영상은 무음으로 인코딩되어 있습니다.
     -------------------------------------------------------------------- */

  var videos = [];

  function videoBlock(media) {
    var frame = el('div', 'video-frame');
    var v = document.createElement('video');
    v.src = media.src;
    v.muted = true;
    v.defaultMuted = true;
    v.loop = true;
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.setAttribute('muted', '');
    v.preload = 'metadata';
    if (media.poster) v.poster = media.poster;
    v.setAttribute('aria-label', media.alt_mn || '');
    v.addEventListener('error', function () { frame.classList.add('is-empty'); });
    frame.appendChild(v);
    videos.push(v);
    return frame;
  }

  /* --- 씬 렌더링 -------------------------------------------------------- */

  function renderScene(s, index) {
    var sec = el('section', 'scene scene--' + s.layout);
    sec.id = s.id;

    var isDark = s.theme === 'dark';
    if (isDark) {
      sec.classList.add('scene--dark', 'reveal');
      sec.setAttribute('data-enter', 'fade');
    }

    function add(node, enter) {
      if (!isDark) {
        node.classList.add('reveal');
        node.setAttribute('data-enter', enter || s.enter || 'fade-up');
      }
      sec.appendChild(node);
      return node;
    }

    var label = (s.date_display || '').split(' · ')[0];

    // 표지·전면사진·영상은 이미지가 먼저
    if (s.media && (s.layout === 'cover' || s.layout === 'photo-full')) {
      var f0 = el('figure', 'figure');
      f0.appendChild(figure(s.media, label, index > 1));
      add(f0, 'image-settle');
    }

    if (s.eyebrow_mn) add(el('p', 'eyebrow', s.eyebrow_mn));
    else if (s.date_display) add(el('p', 'eyebrow', s.date_display));

    if (s.headline_mn) add(el('h2', 'headline', s.headline_mn));
    if (s.body_mn) add(el('p', 'body', s.body_mn));

    // 인용 씬 — 아내분이 쓰신 원본 시
    if (s.verse_mn && s.layout === 'quote') {
      var wrap = el('div', 'verse-wrap');
      wrap.appendChild(verseBlock(s.verse_mn));
      if (s.verse_caption_mn) wrap.appendChild(el('p', 'verse-caption', s.verse_caption_mn));
      add(wrap, 'fade-up-lg');
    }

    // 절정 씬 — 답시
    if (s.verse_mn && s.layout === 'center-verse') {
      sec.appendChild(verseBlock(s.verse_mn));
      if (s.verse_caption_mn) sec.appendChild(el('p', 'verse-caption', s.verse_caption_mn));
    }

    if (s.after_mn) add(el('p', 'after', s.after_mn));

    // 일반 연표 씬은 텍스트 다음에 사진
    if (s.media && s.layout === 'photo-split') {
      var f1 = el('figure', 'figure');
      f1.appendChild(figure(s.media, label, true));
      add(f1, 'image-settle');
    }

    if (s.media && s.layout === 'video') {
      var f2 = el('figure', 'figure');
      f2.appendChild(videoBlock(s.media));
      add(f2, 'image-settle');
    }

    if (s.gallery && s.gallery.length) {
      add(carousel(s.gallery, label), 'fade-up');
    }

    if (s.signature_mn) add(el('p', 'signature', s.signature_mn));
    if (s.scroll_hint_mn) add(el('p', 'scroll-hint', s.scroll_hint_mn), 'fade');

    if (!isDark && index < DATA.scenes.length - 1 && s.layout !== 'cover') {
      sec.appendChild(el('hr', 'rule'));
    }

    return sec;
  }

  DATA.scenes.forEach(function (s, i) { story.appendChild(renderScene(s, i)); });

  /* --- 스크롤 연출 ------------------------------------------------------ */

  var targets = document.querySelectorAll('.reveal');

  function revealAll() {
    Array.prototype.forEach.call(targets, function (t) { t.classList.add('in'); });
  }

  if (!('IntersectionObserver' in window)) {
    revealAll();
    videos.forEach(function (v) { v.play().catch(function () {}); });
  } else {
    // threshold 0 을 씁니다. 12% 처럼 비율로 잡으면 화면보다 훨씬 긴 사진은
    // 그 비율만큼 보이는 순간이 오지 않아 영영 나타나지 않습니다.
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });

    Array.prototype.forEach.call(targets, function (t) { io.observe(t); });

    // 안전망: 어떤 이유로든 등장 처리가 안 된 요소가 화면 근처에 있으면
    // 그냥 보여줍니다. 연출이 조금 덜 예쁜 것보다 사진이 안 보이는 게 훨씬 나쁩니다.
    function sweep() {
      var vh = window.innerHeight || 800;
      Array.prototype.forEach.call(targets, function (t) {
        if (t.classList.contains('in')) return;
        var r = t.getBoundingClientRect();
        if (r.top < vh * 1.2 && r.bottom > -vh * 0.2) {
          t.classList.add('in');
          io.unobserve(t);
        }
      });
    }
    window.addEventListener('load', function () {
      window.setTimeout(sweep, 400);
      window.setTimeout(sweep, 2000);
    });

    // 스크롤 중에도 확인합니다. 전부 나타나면 스스로 떨어져 나가므로
    // 끝까지 읽고 나면 남는 부담이 없습니다.
    var sweeping = false;
    function onScroll() {
      if (sweeping) return;
      sweeping = true;
      window.setTimeout(function () {
        sweep();
        sweeping = false;
        var left = 0;
        Array.prototype.forEach.call(targets, function (t) {
          if (!t.classList.contains('in')) left++;
        });
        if (left === 0) window.removeEventListener('scroll', onScroll);
      }, 300);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // 화면에 보일 때만 영상을 재생합니다. 안 보이는 영상이 계속 돌면
    // 데이터와 배터리를 낭비합니다.
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.play().catch(function () {}); }
        else { e.target.pause(); }
      });
    }, { threshold: 0.35 });

    videos.forEach(function (v) { vio.observe(v); });
  }

  /* --- BGM 플레이리스트 --------------------------------------------------
     두 곡을 순서대로 재생하고, 마지막 곡이 끝나면 처음으로 돌아가
     무한히 반복합니다. loop 속성은 한 곡만 반복하므로 쓰지 않습니다.
     -------------------------------------------------------------------- */

  var bgm = document.getElementById('bgm');
  var toggle = document.getElementById('audio-toggle');
  var intro = document.getElementById('intro');
  var btnMusic = document.getElementById('start-music');

  var playlist = (DATA.meta && DATA.meta.playlist) || [];
  var trackIndex = 0;
  var hasAudio = playlist.length > 0;

  function loadTrack(i) {
    trackIndex = (i + playlist.length) % playlist.length;
    bgm.src = playlist[trackIndex];
    bgm.load();
  }

  function playCurrent() {
    var p = bgm.play();
    if (p && p.catch) p.catch(function () { toggle.classList.add('is-muted'); });
  }

  if (hasAudio) {
    bgm.volume = 0.35;
    loadTrack(0);

    // 한 곡이 끝나면 다음 곡. 마지막이면 다시 첫 곡으로.
    bgm.addEventListener('ended', function () {
      loadTrack(trackIndex + 1);
      playCurrent();
    });

    // 한 곡이 깨져 있어도 멈추지 않고 다음 곡으로 넘어갑니다.
    bgm.addEventListener('error', function () {
      if (playlist.length > 1) {
        loadTrack(trackIndex + 1);
        if (!bgm.paused) playCurrent();
      } else {
        hasAudio = false;
        toggle.hidden = true;
      }
    });
  }

  // 음악 파일이 없거나 깨졌을 때도 들어갈 버튼은 남아 있어야 합니다.
  // 시작 버튼이 하나뿐이므로, 이 버튼이 사라지면 페이지에 들어갈 방법이 없어집니다.
  if (DATA.meta && DATA.meta.audio_label_mn) btnMusic.textContent = DATA.meta.audio_label_mn;
  if (!hasAudio) btnMusic.textContent = 'Үзэж эхлэх';

  function closeIntro() {
    intro.classList.add('is-hidden');
    document.body.classList.remove('is-locked');
    window.setTimeout(function () { intro.style.display = 'none'; }, 950);
  }

  document.body.classList.add('is-locked');

  btnMusic.addEventListener('click', function () {
    if (hasAudio) {
      playCurrent();
      toggle.hidden = false;
    }
    closeIntro();
  });

  // 음소거 버튼은 항상 화면에 있습니다 — 공공장소에서 열릴 수 있으니까요.
  toggle.addEventListener('click', function () {
    if (bgm.paused) {
      playCurrent();
      toggle.classList.remove('is-muted');
    } else {
      bgm.pause();
      toggle.classList.add('is-muted');
    }
  });
})();
