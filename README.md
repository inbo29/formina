# Зул-Эрдэнэ минь

아내에게 보내는 기념 스토리 페이지. 스크롤하면 2019년 첫 만남(9/18)부터 2026년 생일까지 이어집니다.

- 공개 주소: **https://inbo29.github.io/formina/**
- 화면 언어: **몽골어** (한국어는 화면에 안 나옵니다)
- 한국어 검수표: [`_workspace/05_qa_review_ko.md`](_workspace/05_qa_review_ko.md)

**구성:** 씬 27개 · 사진 56장 · 영상 1개 · 배경음악 2곡(연속 무한 반복)

---

## 1. 로컬에서 확인

`index.html`을 **더블클릭**하면 열립니다. 서버나 설치가 필요 없습니다.

---

## 2. 문구 고치기

**`data/scenes.js` 하나만** 고치면 됩니다. HTML·CSS·JS는 건드리지 마세요.

- `headline_mn` / `body_mn` → **화면에 실제로 나오는 몽골어**
- `headline_ko` / `body_ko` → 검수용 한국어 (화면에 안 나옴)

고친 뒤 브라우저 새로고침. 그리고 검수표를 다시 만듭니다:

```bash
node _workspace/gen-review.js
```

> **씬이 통째로 사라졌다면** 쉼표나 따옴표가 빠진 것입니다. 되돌린 뒤 다시 고치세요.
> 줄바꿈은 `\n`, 빈 줄은 `\n\n`.

**씬 순서는 시간순입니다.** 순서를 바꾸면 이야기 흐름이 무너집니다.

---

## 3. 사진 추가·교체

원본은 [`_originals/`](_originals/)에 그대로 있습니다 (git에는 안 올라갑니다).

새 사진을 넣으려면 **반드시 리사이즈**하세요. 원본은 한 장에 3~8MB라 그대로 넣으면 휴대폰에서 안 열립니다.

```bash
# 파일명·씬 매핑을 _workspace/01_archivist_assets.tsv 에 추가한 뒤
powershell -NoProfile -ExecutionPolicy Bypass -File _workspace/convert-images.ps1
```

이 스크립트가 긴 변 1600px·품질 82로 줄이고, EXIF 회전을 적용하고, 원본을 `_originals/`로 옮깁니다.

**주의**
- 파일명은 **소문자 `.jpg`**. `.JPG`는 GitHub Pages에서 404
- `.HEIC`(아이폰), `.DNG`(RAW)는 브라우저가 못 엽니다 → JPG로 내보내기
- `data/scenes.js`의 `w`/`h`를 실제 픽셀 크기로 맞추세요 (다르면 스크롤 중 화면이 튑니다)

파일이 없으면 자동으로 플레이스홀더가 되므로, 사진이 빠져도 페이지는 정상입니다.

---

## 4. 배경음악

`assets/audio/` 의 `bgm-01.mp3` → `bgm-02.mp3` 순서로 재생되고, 끝나면 처음으로 돌아가 무한 반복합니다.
곡을 바꾸려면 `data/scenes.js`의 `meta.playlist` 배열을 고치세요.

- 자동 재생은 하지 않습니다 (모바일 브라우저가 차단). 첫 화면에서 눌러야 시작됩니다
- 음소거 버튼이 오른쪽 위에 항상 떠 있습니다 — 아내분이 지하철이나 사무실에서 열 수도 있으니까요
- 영상(S17)은 **무음**으로 인코딩돼 있어 배경음악과 겹치지 않습니다
- **저작권**: 공개 링크이므로 상업 음원은 피하세요

---

## 5. 배포

```bash
git add -A
git commit -m "메시지"
git push
```

1~2분 뒤 https://inbo29.github.io/formina/ 에 반영됩니다.

**최초 1회 설정:** 저장소 **Settings → Pages → Source: Deploy from a branch → main / (root)**

### 공개 범위 ⚠

공개 저장소의 GitHub Pages는 **인터넷 전체에 공개**됩니다. 아이들 이름·생년월일·얼굴 사진이 들어 있습니다.

검색 차단은 걸어뒀습니다 (`noindex` + `robots.txt Disallow`). 하지만 **링크를 아는 사람은 누구나 볼 수 있습니다.**

더 확실히 막으려면 Netlify나 Cloudflare Pages로 옮겨 비밀번호를 걸 수 있습니다.

**내리고 싶을 때:** Settings → Pages → Source를 `None`으로. 또는 저장소를 Private으로 전환하면 Pages가 즉시 내려갑니다.

---

## 6. 파일 구조

```
index.html              페이지 뼈대 (거의 고칠 일 없음)
data/scenes.js          ← 문구·사진 목록은 전부 여기
assets/css/main.css     색·글꼴·여백 (맨 위 :root 에서 조정)
assets/js/main.js       렌더링·스크롤 연출·캐로셀·영상·음악
assets/img/             웹용 사진 56장 + 영상 1개 + og.jpg
assets/audio/           배경음악 2곡
robots.txt              검색 차단
.nojekyll               GitHub Pages 설정 (지우지 마세요)
_originals/             원본 사진·영상 (git 제외, 275MB)
_workspace/             원본 자료·검수표·변환 스크립트
```

색을 바꾸려면 `assets/css/main.css` 맨 위 `:root` 블록의 색상값만 바꾸면 전체에 반영됩니다.
팔레트 후보 3종은 `.claude/skills/invitation-art-direction/references/motif-and-palette.md`에 있습니다.

---

## 7. 내년에 다시 쓰기

`_workspace/`와 `_originals/`를 지우지 마세요. Claude Code에서:

```
memory-site-orchestrator 로 2027년 버전 만들어줘
```
