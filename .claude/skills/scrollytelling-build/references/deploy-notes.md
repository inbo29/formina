# GitHub Pages 배포 노트

## 절차

```bash
git init
git add -A
git commit -m "feat: 기념 스토리 페이지"
git branch -M main
git remote add origin https://github.com/{user}/{repo}.git
git push -u origin main
```

이후 저장소 **Settings → Pages → Source: Deploy from a branch → main / (root)** 선택. 1~2분 뒤 `https://{user}.github.io/{repo}/`에서 열린다.

## 함정

| 함정 | 증상 | 해결 |
|------|------|------|
| 절대 경로 | CSS/이미지 전부 404, 페이지가 벌거벗은 텍스트로 보임 | `/assets/...` → `assets/...` |
| `.nojekyll` 없음 | `_`로 시작하는 폴더/파일이 서빙되지 않음 | 루트에 빈 `.nojekyll` 생성 |
| `og:image` 상대 경로 | 링크 미리보기에 썸네일 없음 | 절대 URL로 지정 |
| 대소문자 | 로컬은 되는데 배포하면 이미지 404 | GitHub Pages는 대소문자를 구분한다. `.JPG`와 `.jpg`는 다른 파일 |
| 캐시 | 수정했는데 반영 안 됨 | 강력 새로고침. CSS/JS에 `?v=2` 쿼리 |
| 사진 파일 크기 | 푸시가 느리고 모바일에서 안 열림 | 푸시 **전에** 리사이즈 |
| 공개 저장소 | 가족 사진이 검색에 노출 | 아래 참조 |

## 프라이버시

**공개 저장소의 GitHub Pages는 인터넷 전체에 공개된다.** 가족 사진과 아이들 얼굴, 실명, 생년월일이 담기는 페이지라면 이 사실을 의뢰인에게 반드시 알리고 확인받는다.

선택지:

| 방식 | 공개 범위 | 비용 |
|------|----------|------|
| 공개 저장소 + Pages | 링크를 아는 누구나. 검색 엔진에도 노출 가능 | 무료 |
| 비공개 저장소 + Pages | GitHub Pro 이상에서 접근 제한 가능 | 유료 |
| Netlify / Cloudflare Pages | 비밀번호 보호 가능 | 무료 티어 있음 |

공개로 가더라도 최소한 검색 엔진 색인은 막는다:

```html
<meta name="robots" content="noindex, nofollow">
```

```
# robots.txt
User-agent: *
Disallow: /
```

URL 자체는 추측하기 어렵게 짓는다(`for-zul-2026-0907` 같은). 이것은 보안이 아니라 최소한의 장벽이다.

## 사진 교체 (의뢰인용)

1. `assets/img/`에 같은 파일명으로 덮어쓴다. 파일명이 다르면 `data/scenes.js`의 `media.src`도 함께 수정한다
2. 새 사진의 실제 픽셀 크기를 `w`/`h`에 반영한다 (다르면 레이아웃이 튄다)
3. `git add -A && git commit -m "사진 교체" && git push`
4. 1~2분 뒤 반영

## 텍스트 수정 (의뢰인용)

`data/scenes.js`만 열어 해당 씬의 `body_ko` / `body_mn`을 고친다. HTML·CSS·JS는 건드리지 않는다. 쉼표와 따옴표에 민감하므로 수정 후 브라우저에서 페이지가 정상적으로 뜨는지 확인한다 — 씬이 통째로 사라졌다면 문법 오류다.
