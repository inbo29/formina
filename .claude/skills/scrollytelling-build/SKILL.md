---
name: scrollytelling-build
description: "빌드 도구 없는 정적 스크롤 스토리텔링 사이트를 구현하고 GitHub Pages로 배포한다. IntersectionObserver 기반 씬 연출, 데이터 주도 렌더링, 이중언어 전환, BGM 제스처 게이트, 이미지 최적화, OG 태그, 상대 경로 배포를 다룬다. 시네마틱 스크롤 페이지·청첩장 페이지·기념 사이트를 실제로 만들거나 GitHub Pages에 올릴 때 반드시 사용할 것. 사진 교체·텍스트 수정·재배포 등 후속 작업에도 사용한다."
---

# Scrollytelling Build — 정적 구현과 배포

## 빌드 도구를 쓰지 않는다

`index.html`을 더블클릭하면 그대로 동작해야 한다. 이유는 기술적 취향이 아니라 **수명**이다. 의뢰인은 내년에도 이 페이지를 쓸 것이고, 그때 사진 한 장을 바꾸려고 `npm install`을 되살리게 만들면 안 된다. 1년 뒤 깨져 있는 빌드 파이프라인보다 그냥 열리는 HTML이 낫다.

프레임워크도 쓰지 않는다. 이 페이지는 상태 관리가 필요 없다. 스크롤에 반응해 클래스를 붙이는 것이 전부다.

## 콘텐츠와 코드를 분리한다

모든 텍스트는 `data/scenes.js` 한 곳에 있고 JS가 렌더링한다. HTML에 문장을 하드코딩하면 오타 하나 고치는 데 마크업을 뒤져야 하고, 의뢰인이 직접 손댈 수 없다.

**데이터 파일은 `.json`이 아니라 `.js`로 둔다.** `fetch("data/scenes.json")`은 `file://`에서 CORS로 차단되어, 의뢰인이 `index.html`을 더블클릭하면 빈 화면이 뜬다. 로컬 서버를 띄우라고 안내하는 순간 "빌드 도구를 쓰지 않는다"는 원칙이 무너진다. 대신 데이터 파일을 `window.SCENES = { ... };` 형태의 스크립트로 만들어 `<script src="data/scenes.js">`로 먼저 로드하면, 더블클릭과 GitHub Pages 양쪽에서 동일하게 동작한다. 편집 경험은 JSON과 같다.

```json
{
  "meta": {
    "title_mn": "...", "title_ko": "...",
    "og_image": "assets/img/og.jpg",
    "audio": "assets/audio/bgm.mp3"
  },
  "scenes": [
    {
      "id": "S01",
      "layout": "photo-split",
      "date_display": "2019.09",
      "headline_mn": "...", "body_mn": "...",
      "verse_mn": null,
      "headline_ko": "...", "body_ko": "...",
      "media": { "src": "assets/img/2019-first-01.jpg", "w": 1600, "h": 2000, "alt_mn": "..." },
      "intensity": 2,
      "enter": "fade-up"
    }
  ]
}
```

`media.src` 파일이 없으면 플레이스홀더로 렌더링한다. 파일을 넣으면 코드 수정 없이 나타난다.

## 스크롤 연출

`IntersectionObserver`만 쓴다. 스크롤 이벤트에서 `getBoundingClientRect()`를 매 프레임 호출하면 저사양 안드로이드에서 즉시 끊긴다.

```js
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);           // 한 번 나타나면 관찰 해제
    }
  }
}, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
```

한 번 나타난 요소는 `unobserve`한다. 되돌아갈 때 다시 사라지면 산만하고, 관찰 대상이 계속 쌓이면 느려진다.

애니메이션은 `transform`과 `opacity`만 쓴다. `top`, `height`, `margin` 애니메이션은 매 프레임 레이아웃을 다시 계산하게 만든다.

운문 씬의 행별 순차 등장은 `transition-delay`를 인덱스로 주면 JS 없이 해결된다.

```css
.verse.in .line { opacity: 1; transform: none; }
.verse .line { opacity: 0; transform: translateY(14px);
  transition: opacity .8s var(--ease), transform .8s var(--ease); }
.verse .line:nth-child(1) { transition-delay: 0ms; }
.verse .line:nth-child(2) { transition-delay: 220ms; }
```

`prefers-reduced-motion: reduce`에서는 모든 transition을 `none`으로 덮어쓴다.

## BGM: 자동재생은 불가능하다

모든 모바일 브라우저가 사용자 제스처 없는 오디오 재생을 차단한다. `autoplay` 속성은 동작하지 않으므로 시도하지 않는다.

첫 화면에 "음악과 함께 보기" 버튼을 두고 거기서 재생을 시작한다. 버튼을 누르지 않아도 페이지는 완전히 동작해야 한다.

```js
btn.addEventListener('click', async () => {
  try { await audio.play(); } catch { /* 실패해도 페이지는 계속 동작 */ }
});
```

**음소거 토글은 화면에 항상 떠 있어야 한다.** 받는 사람이 사무실이나 지하철에서 링크를 열 수 있다. 소리가 갑자기 나서 당황하게 만드는 것은 선물이 아니다. 오디오 파일이 없으면 버튼 자체를 숨긴다.

`loop`를 켜고 볼륨은 0.35 근처에서 시작한다. 배경음악은 배경이어야 한다.

## 이미지가 최대 위험이다

원본 사진은 대개 3~5MB다. 10장이면 40MB가 되고, 모바일 데이터로는 열리지 않는다. **반드시 리사이즈한다.**

```bash
# ImageMagick
mogrify -path assets/img/ -resize '1600x1600>' -quality 82 -strip *.jpg

# HEIC(아이폰 기본) → JPEG. 브라우저는 HEIC를 열지 못한다
magick input.HEIC -resize '1600x1600>' -quality 82 output.jpg
```

목표: 장당 400KB 이하, 전체 5MB 이하.

첫 화면 외 모든 이미지에 `loading="lazy"`를 걸고, `width`/`height`를 명시해 레이아웃 시프트를 막는다. 스크롤 도중 이미지가 로드되며 화면이 튀면 시네마틱 연출이 전부 무너진다.

```html
<img src="assets/img/2019-first-01.jpg" width="1600" height="2000"
     loading="lazy" decoding="async" alt="...">
```

## 이중언어 렌더링

몽골어가 주, 한국어가 종이다. 두 방식 중 하나를 택한다:

- **병기**: 몽골어 아래 한국어를 작고 옅게 항상 표시. 단순하고 실패하지 않는다
- **토글**: 상단 `MN / KO` 버튼으로 전환. 화면이 깨끗하다. 기본값은 반드시 **MN**

토글을 쓰면 `localStorage`에 선택을 저장하되, 실패해도 동작하도록 `try/catch`로 감싼다.

```html
<html lang="mn">
<meta charset="utf-8">
```

`lang="mn"`을 빠뜨리면 브라우저가 잘못된 폰트로 폴백해 키릴이 이상하게 렌더링될 수 있다.

폰트는 반드시 `Өө Үү` 글리프를 포함해야 한다(Noto 계열 권장). `font-display: swap`을 지정해 폰트 로딩 전에도 텍스트가 보이게 한다 — 몽골에서의 CDN 지연을 가정한다.

## 공유 링크의 첫인상

받는 사람은 메신저로 링크를 받는다. OG 태그가 없으면 벌거벗은 URL이 뜬다. 미리보기 카드까지가 이 선물의 포장지다.

```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="https://{user}.github.io/{repo}/assets/img/og.jpg">
<meta property="og:type" content="website">
```

**`og:image`는 절대 URL이어야 한다.** 상대 경로는 무시된다. 권장 크기 1200×630.

## GitHub Pages 배포

배포 절차와 함정은 `references/deploy-notes.md` 참조. 핵심 두 가지만 먼저:

1. **절대 경로 금지.** 저장소 하위 경로(`https://user.github.io/repo/`)로 서빙되므로 `/assets/...`는 404가 된다. 반드시 `assets/...` 상대 경로를 쓴다
2. **`.nojekyll` 파일을 둔다.** Jekyll이 `_`로 시작하는 경로를 무시한다

## 산출물

```
index.html
assets/css/main.css
assets/js/main.js
assets/img/
assets/audio/
data/scenes.js
.nojekyll
README.md          배포·사진 교체 방법 (의뢰인 언어로)
```

`README.md`는 의뢰인이 혼자 사진을 교체하고 재배포할 수 있는 수준으로 쓴다. 이 페이지는 한 번 쓰고 버려지지 않는다.
