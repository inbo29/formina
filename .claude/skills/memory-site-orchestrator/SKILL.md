---
name: memory-site-orchestrator
description: "가족·부부의 기념 스토리텔링 웹사이트를 만드는 에이전트 팀 오케스트레이터. 연표 정리 → 서사 집필 → 몽골어 재창작 → 아트 디렉션 → 스크롤 사이트 구현 → 이중언어 검수 → GitHub Pages 배포까지 전 과정을 조율한다. 아내/남편/가족을 위한 생일·기념일 축하 페이지, 청첩장 스타일 스크롤 사이트, 연표 회고 페이지를 만들 때 반드시 이 스킬을 사용할 것. 후속 작업 — 사이트 수정, 특정 씬만 다시, 문구 수정, 사진 추가, 재실행, 업데이트, 보완, 내년 버전 만들기, 이전 결과 개선 요청에도 반드시 이 스킬을 사용한다."
---

# Memory Site Orchestrator

한 사람에게 보내는 기념 사이트를 만드는 팀을 조율한다.

## 실행 모드: 에이전트 팀 (Phase 간 팀 재구성)

세션당 한 팀만 활성화되므로, 성격이 다른 두 국면을 **콘텐츠 팀 → 빌드 팀** 순으로 교체 운영한다. 두 국면 모두 팀원 간 실시간 조율이 결과 품질을 좌우하므로 서브 에이전트로 대체하지 않는다.

| Phase | 팀 | 팀원 | 패턴 |
|-------|----|------|------|
| Phase 2 | 콘텐츠 팀 | memory-archivist, story-writer, mongolian-copywriter, visual-designer | 파이프라인 + 왕복 |
| Phase 3 | 빌드 팀 | frontend-engineer, qa-reviewer | 생성-검증 루프 |

## 에이전트 구성

| 팀원 | 타입 | 역할 | 스킬 | 출력 |
|------|------|------|------|------|
| memory-archivist | memory-archivist | 사실·연표·미디어 정규화 | timeline-archiving | `01_archivist_timeline.json`, `01_archivist_assets.json`, `01_archivist_questions.md` |
| story-writer | story-writer | 감정 아크 설계 + 한국어 원고 | emotional-storytelling | `02_writer_arc.md`, `02_writer_script_ko.json` |
| mongolian-copywriter | mongolian-copywriter | 몽골어 재창작 + 한국어 검수문 | mongolian-copywriting | `03_copy_bilingual.json` |
| visual-designer | visual-designer | 아트 디렉션 + 씬 연출 스펙 | invitation-art-direction | `04_design_artdirection.md`, `04_design_scenes.json` |
| frontend-engineer | frontend-engineer | 정적 사이트 구현 + 배포 | scrollytelling-build | 프로젝트 루트 사이트 일체 |
| qa-reviewer | qa-reviewer | 교차 검증 + 의뢰인 검수표 | bilingual-qa | `05_qa_report.md`, `05_qa_review_ko.md` |

모든 Agent/TeamCreate 호출에 `model: "opus"`를 명시한다.

## 워크플로우

### Phase 0: 컨텍스트 확인

1. `_workspace/` 존재 여부를 확인한다
2. 실행 모드를 결정한다:

| 상황 | 모드 | 행동 |
|------|------|------|
| `_workspace/` 없음 | 초기 실행 | Phase 1로 진행 |
| 있음 + 부분 수정 요청 | **부분 재실행** | 해당 팀원만 재호출. 나머지 산출물 보존 |
| 있음 + 새 입력(다른 기념일/연도) | 새 실행 | `_workspace/`를 `_workspace_{YYYYMMDD_HHMMSS}/`로 이동 후 Phase 1 |

3. 부분 재실행 시 이전 산출물 경로를 팀원 프롬프트에 포함해, 기존 결과를 읽고 **해당 부분만** 고치게 한다. 씬 ID는 절대 재배치하지 않는다 — 다른 산출물이 ID로 서로를 참조한다.

**부분 재실행 라우팅:**

| 사용자 요청 | 재호출 대상 |
|------------|-----------|
| "문구를 바꿔줘" | mongolian-copywriter (+ 의미 변경이면 story-writer) |
| "사진을 추가/교체" | memory-archivist → frontend-engineer |
| "색/분위기를 바꿔줘" | visual-designer → frontend-engineer |
| "특정 씬만 다시" | story-writer → mongolian-copywriter → frontend-engineer |
| "검수만 다시" | qa-reviewer |
| "내년 버전" | 새 실행 (연표에 새 이벤트 추가) |

### Phase 1: 준비

1. 사용자 입력에서 인물·연표·감정 목표·언어 정책·배포 대상을 파악한다
2. `_workspace/00_input/raw-brief.md`에 **원문을 무손실로** 보존한다. 사용자가 직접 쓴 글(과거 편지·시·메시지)은 특히 그대로 남긴다 — 문체의 기준선이자 서사의 재료다
3. 이 시점에 사진·음원이 없어도 진행한다. 미디어는 대개 마지막에 도착한다

**공개 범위를 반드시 확인한다.** 공개 저장소의 GitHub Pages는 인터넷 전체에 공개된다. 가족 사진·아이 이름·생년월일이 담기므로, 사용자에게 이 사실을 알리고 확인받은 뒤 진행한다. 확인 없이 공개 배포하지 않는다.

### Phase 2: 콘텐츠 팀

```
TeamCreate(team_name: "memory-content", members: [
  { name: "memory-archivist",      agent_type: "memory-archivist",      model: "opus", prompt: "..." },
  { name: "story-writer",          agent_type: "story-writer",          model: "opus", prompt: "..." },
  { name: "mongolian-copywriter",  agent_type: "mongolian-copywriter",  model: "opus", prompt: "..." },
  { name: "visual-designer",       agent_type: "visual-designer",       model: "opus", prompt: "..." }
])
```

작업 등록:

| 작업 | 담당 | depends_on |
|------|------|-----------|
| 연표·미디어 정규화 | memory-archivist | — |
| 사용자 질문지 작성 | memory-archivist | — |
| 감정 아크 설계 | story-writer | 연표 |
| 씬별 한국어 원고 | story-writer | 아크 |
| 절정 씬 회답시 집필 | mongolian-copywriter | 아크 |
| 전 씬 몽골어 재창작 | mongolian-copywriter | 원고 |
| 한국어 검수문 | mongolian-copywriter | 몽골어 |
| 아트 디렉션 확정 | visual-designer | 아크 |
| 씬 연출 스펙 | visual-designer | 몽골어 (실제 길이) |

**통신 규칙:**
- 아키비스트는 완벽한 연표를 기다리지 않고 **확정된 씬부터 배포**한다. 상류가 멈추면 팀 전체가 멈춘다
- 작가는 씬 단위로 완성 즉시 카피라이터에게 넘긴다. 전체 완성을 기다리지 않는다
- 작가 ↔ 카피라이터는 **왕복**한다. 몽골어에서 죽는 표현이 발견되면 한국어 원본을 함께 고친다
- 디자이너는 텍스트 확정 전에 레이아웃 골격을 먼저 확정해 다음 Phase를 대기시키지 않는다
- 사실이 없는 씬은 **여백으로 처리한다.** 아무도 없는 사실을 만들지 않는다

**절정 씬은 팀 전체가 합의한다.** 이 사이트에서 가장 중요한 한 덩어리이므로, 작가·카피라이터·디자이너가 위치와 형식에 합의한 뒤 착수한다.

완료 후 `TeamDelete`. 산출물은 `_workspace/`에 남아 다음 팀이 읽는다.

### Phase 3: 빌드 팀

```
TeamCreate(team_name: "memory-build", members: [
  { name: "frontend-engineer", agent_type: "frontend-engineer", model: "opus", prompt: "..." },
  { name: "qa-reviewer",       agent_type: "qa-reviewer",       model: "opus", prompt: "..." }
])
```

**생성-검증 루프. 최대 3회.**

1. 엔지니어가 골격(HTML/CSS/JS + `data/scenes.js`) 구현 → QA 1차 (구조·경계면)
2. 엔지니어가 전 씬 구현 → QA 2차 (렌더링·성능·언어 대조)
3. 결함 수정 → QA 3차 (회귀 확인)

**차단 등급 결함은 QA가 보고서에만 적지 않고 즉시 SendMessage로 알린다.** 3회 내에 해결되지 않은 결함은 은폐하지 않고 최종 보고에 남긴다.

완료 후 `TeamDelete`.

### Phase 4: 통합 보고

사용자에게 다음을 함께 전달한다:

1. 로컬 확인 방법 (`index.html`을 브라우저로 열기)
2. **한국어 검수 대조표** (`05_qa_review_ko.md`) — 승인 요청
3. 미해결 결함 목록 (있으면)
4. `needs_native_check`로 표시된 몽골어 항목 — 원어민 확인 권장
5. 아직 답이 오지 않은 질문지 항목
6. 사진·음원 투입 방법과 파일명 규칙

### Phase 5: 배포

사용자 승인 후에만 배포한다. 공개 범위를 다시 확인하고, `noindex` 적용 여부를 확인받는다. `_workspace/`는 삭제하지 않고 보존한다 — 내년에 다시 쓴다.

## 데이터 흐름

```
raw-brief.md
     ↓
[memory-archivist] → timeline.json ─┬→ [story-writer] → script_ko.json
                     assets.json    │         ↕ (왕복)
                     questions.md   │  [mongolian-copywriter] → bilingual.json
                                    │                                 │
                                    └→ [visual-designer] ←────────────┘
                                              ↓
                                    artdirection.md + design_scenes.json
                                              ↓
                                    [frontend-engineer] ⇄ [qa-reviewer]
                                              ↓
                                   index.html + data/scenes.js
                                              ↓
                                        GitHub Pages
```

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| 사진·음원 미도착 | 플레이스홀더로 전체를 완성한다. 파일명 규칙을 확정해 배포하고, 파일만 넣으면 나타나도록 만든다 |
| 사용자 질문에 답이 없음 | 해당 씬을 여백으로 처리하고 최종 보고에 명시한다. **사실을 지어내지 않는다** |
| 몽골어 확신 부족 | `needs_native_check`로 표시하고 사용자에게 나열한다. 숨기고 통과시키지 않는다 |
| 두운시가 안 나옴 | 억지로 맞추지 않고 산문으로 전환. 그 사실을 검수문에 명시 |
| 팀원 1명 실패 | 리더가 상태 확인 → 재시작. 실패 시 해당 산출물 없이 진행하고 누락을 명시 |
| QA 결함 3회 미해결 | 남은 결함을 정직하게 보고. 무한 루프에 빠지지 않는다 |
| 폰트 키릴 미지원 | 즉시 교체. 협상하지 않는다 — 글리프 깨짐은 차단 사유 |
| 마감이 촉박 | 절정 씬 1개 + 사진 없는 텍스트 버전을 **먼저 완성**하고, 나머지를 채운다. 미완성으로 마감을 넘기지 않는다 |

## 테스트 시나리오

### 정상 흐름
1. 사용자가 인물·연표·과거 편지 원문·감정 목표를 제공
2. Phase 1에서 `raw-brief.md` 보존, 공개 범위 확인
3. Phase 2에서 콘텐츠 팀 4명이 12개 내외 씬의 이중언어 카피와 연출 스펙 생성
4. Phase 3에서 빌드 팀이 구현·검수 (3회 루프)
5. Phase 4에서 한국어 검수표 제출, 사용자 승인
6. Phase 5에서 GitHub Pages 배포
7. 결과: 브라우저에서 열리는 반응형 스크롤 사이트 + 검수표

### 에러 흐름
1. Phase 2에서 사진이 하나도 제공되지 않음
2. 아키비스트가 전체를 플레이스홀더 모드로 선언, 파일명 규칙 확정 후 팀에 배포
3. 디자이너가 플레이스홀더 스펙(비율·배경·연도 표기)을 설계
4. 엔지니어가 사진 없이 완성 — 파일을 넣으면 코드 수정 없이 나타나는 구조
5. QA가 "사진 도착 후 재검증 필요"를 명시
6. Phase 4 보고에 파일명 규칙과 투입 방법을 안내
7. 결과: 사진 없이도 완결된 페이지 + 사진만 넣으면 되는 상태
