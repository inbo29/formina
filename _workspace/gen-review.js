/* data/scenes.js 에서 한국어 검수 대조표를 생성합니다.
   문구를 고친 뒤 다시 실행하면 검수표가 최신 상태로 갱신됩니다.
       node _workspace/gen-review.js
*/
var fs = require('fs');
var path = require('path');

var ROOT = path.join(__dirname, '..');
global.window = {};
require(path.join(ROOT, 'data', 'scenes.js'));
var D = global.window.SCENES;

// 씬별 의도 메모 — 사람이 관리하는 부분
var NOTES = {
  S00: '표지. 이름만 남겼습니다(минь 제거).',
  S01: '기념일 9/18 확정 반영. 첫 만남의 장소·상황은 아직 모르기 때문에 정서로만 썼습니다.',
  S03: '2021년은 두 분만 있던 마지막 해였습니다(첫아이가 2022년 5월 출생). 그 사실을 씬으로 세웠습니다.',
  S03b: '**S24(절정)의 복선입니다.** 2021년 형님 생일(9/29)에 아내분이 써주신 축하 글을 원문 그대로 먼저 보여드려야, 나중에 답이 나올 때 알아보십니다. "시"가 아니라 **생일 축하 글**임을 반영해 `мэндчилгээ`(축하 인사)로 표현했습니다.',
  S04: '두 분이 함께 준비하며 몹시 기대하던 시기로 썼습니다. 첫아이니까요.',
  S05: '`гэрэл`(빛)을 여기서 심습니다. 작년에 형님이 아내분을 "내 삶의 빛"이라 부르신 그 단어이고, S24 답의 핵심어입니다.',
  S09: '말씀하신 "공주님"을 `бяцхан гүнж`(작은 공주)로 그대로 살렸습니다.',
  S11: '`гал голомт`(가정의 화덕)은 몽골어에서 **가정 그 자체**를 뜻합니다. 불을 지키는 사람이 곧 가정을 지키는 사람이라는 함의가 있어, 아내·어머니에게 쓸 수 있는 최고 수준의 헌사입니다.',
  S12: '차강사르(설) 준비를 아내분이 도맡으셨다는 전제로 썼습니다. 사실과 다르면 알려주세요.',
  S13: '딸이 처음 선물을 건넨 장면. 생일(3/22)과 선물(4/11)은 다른 날이라 "얼마 뒤"로 이었습니다.',
  S14: '예술렝의 첫 장거리 여행이었고 온 가족이 깨어 있었다는 확인 반영. 처음엔 "아이들이 자는 동안 둘이서"로 잘못 썼던 부분입니다.',
  S16: '"그 사진을 휴대폰에 담아두고 있었다"는 표현은 사실 확인이 필요합니다. 아니면 빼겠습니다.',
  S17: '영상입니다. 소리는 뺐습니다 — 배경음악과 겹치면 둘 다 망가집니다. 화면에 보일 때만 자동 재생됩니다.',
  S18: '"여름집 사진 한 장은 에르뭉이 직접 찍었다"는 파일 설명에 있던 내용입니다. 맞는지 확인해 주세요.',
  S20: '**S01(첫 만남)과 이어지는 장면입니다.** "처음 만난 날처럼 웃고 있었다"로 7년을 한 바퀴 돌립니다.<br>아이들도 함께 갔지만 길이 험해 부모님이 잠깐 봐주셨다는 사정과, "아이들이 크면 넷이서 다시 오자"는 약속을 넣었습니다. 부모님은 `манай аав ээж`(우리 부모님)로 썼습니다 — 어느 쪽 부모님인지 정확히 하려면 알려주세요.',
  S22: '다음 씬(사과)으로 넘어가는 다리입니다. 형님이 서서 지켜보는 장면이 사과의 전제가 됩니다.<br>첫 등원이 아니라 **두 번째 해**임을 반영했고, "시간이 너무 빨리 간다 / 곧 학교에 갈 것 같다 / 그날까지 함께 잘 준비하자"를 넣었습니다. 마지막 한 줄이 S26의 약속으로 이어집니다.',
  S23: '**사과는 여기 한 곳에만, 두 문장으로 끝냅니다.** 길면 생일 선물이 참회록이 되고, 받는 분이 오히려 위로해야 하는 부담이 생깁니다. `дуугүйхэн даадаг`(말없이 감당한다)는 작년에 형님이 쓰신 `ухаалаг дуугүйхэн дааж`를 그대로 이어받은 표현이라, 아내분이 알아보실 겁니다.',
  S24: '⭐ **절정.** 자세한 설명은 문서 맨 아래를 보세요.',
  S25: '오늘(9/7) 생일 편지.',
  S26: '9/18 기념일을 향한 마무리. 작년에 형님이 아내분을 `түшиг тулгуур`(버팀목)이라 부르셨는데, 여기서는 **그 말을 뒤집어** 내가 버팀목이 되겠다고 약속합니다.'
};

var out = [];
out.push('# 한국어 검수 대조표');
out.push('');
out.push('> 이 문서는 `node _workspace/gen-review.js` 로 자동 생성됩니다. 문구를 고친 뒤 다시 실행하세요.');
out.push('');
out.push('**화면에는 몽골어만 나옵니다.** 왼쪽이 아내분이 실제로 읽게 될 문장, 오른쪽이 그 뜻입니다.');
out.push('뜻풀이는 일부러 예쁘게 다듬지 않고 **직역에 가깝게** 적었습니다. 그래야 실제로 뭐라고 썼는지 확인하실 수 있습니다.');
out.push('');
out.push('수정하실 곳은 씬 번호로 말씀해 주세요.');
out.push('');
out.push('---');
out.push('');

var photoCount = 0;
var videoCount = 0;

D.scenes.forEach(function (s) {
  var title = s.id;
  if (s.date_display) title += ' · ' + s.date_display;
  if (s.headline_ko) title += ' · ' + s.headline_ko.replace(/\n/g, ' ');
  out.push('## ' + title);
  out.push('');

  var mn = [];
  if (s.eyebrow_mn) mn.push(s.eyebrow_mn);
  if (s.headline_mn) mn.push(s.headline_mn);
  if (s.body_mn) mn.push(s.body_mn);
  if (s.verse_mn) mn.push(s.verse_mn.join('\n'));
  if (s.verse_caption_mn) mn.push(s.verse_caption_mn);
  if (s.after_mn) mn.push(s.after_mn);
  if (s.signature_mn) mn.push(s.signature_mn);

  var ko = [];
  if (s.headline_ko) ko.push(s.headline_ko);
  if (s.body_ko) ko.push(s.body_ko);
  if (s.after_ko) ko.push(s.after_ko);

  out.push('| | |');
  out.push('|---|---|');
  out.push('| **화면에 뜨는 몽골어** | ' + mn.join('\n\n').replace(/\n/g, '<br>') + ' |');
  out.push('| **정확한 뜻** | ' + ko.join('\n\n').replace(/\n/g, '<br>') + ' |');

  // 미디어
  var media = [];
  if (s.media && s.media.src) {
    var f = s.media.src.split('/').pop();
    if (/\.mp4$/.test(f)) { media.push(f + ' (영상)'); videoCount++; }
    else { media.push(f); photoCount++; }
  }
  if (s.gallery) {
    s.gallery.forEach(function (m) { media.push(m.src.split('/').pop()); photoCount++; });
  }
  if (media.length) {
    var lbl = media.length > 1 ? '**사진 (캐로셀 ' + media.length + '장, 좌우로 넘김)**' : '**사진**';
    out.push('| ' + lbl + ' | ' + media.join('<br>') + ' |');
  } else {
    out.push('| **사진** | 없음 (글이 주인공인 씬입니다) |');
  }

  if (NOTES[s.id]) out.push('| **의도 / 확인 요청** | ' + NOTES[s.id] + ' |');

  out.push('');
});

out.push('---');
out.push('');
out.push('# ⭐ S24 — 이 페이지의 절정');
out.push('');
out.push('화면이 여기서 딱 한 번 검게 바뀌고, 4행이 한 줄씩 차례로 떠오릅니다.');
out.push('');
out.push('2021년 형님 생일에 **아내분이 써주신 축하 글**:');
out.push('');
out.push('| 아내분의 축하 글 (2021.09.29) | 두운 |');
out.push('|---|---|');
out.push('| **Бү**рэнхий байсан хорвоо гэрэлтэж | Бү |');
out.push('| **Бү**үдгэр байсан наран мишээж | Бү |');
out.push('| **Гу**ндаж удсан цэцгүүд өндийж | Гу |');
out.push('| **Гэ**рэл гэгээтэй хамт чи минь ирсэн билээ | Гэ |');
out.push('');
out.push('몽골 전통 운문은 유럽 시처럼 행의 끝을 맞추지 않고 **첫머리를 맞춥니다**(толгой холбох, 두운). 아내분의 글은 정확한 **Бү-Бү-Гу-Гэ** 구조입니다.');
out.push('');
out.push('형님의 답은 **같은 음절을 되받습니다**:');
out.push('');
out.push('| 형님의 답 (2026.09.07) | 두운 |');
out.push('|---|---|');
out.push('| **Бү**рэнхий байсан гэдгийг би мэдээгүй | Бү |');
out.push('| **Бү**хнийг чи гэрэлтүүлсэн юм байна | Бү |');
out.push('| **Гэ**рлийг авчирсан хүн би биш | Гэ |');
out.push('| **Гэ**рэл нь чи өөрөө байсан юм | Гэ |');
out.push('');
out.push('- 첫 행이 아내분 글의 첫 단어 `Бүрэнхий`로 시작합니다 → **아내분이 즉시 알아채는 지점**');
out.push('- 아내분은 "빛과 함께 **네가** 왔다"고 쓰셨고, 형님의 답은 "빛을 데려온 건 내가 아니라 **너 자신이 빛이었다**"로 주어를 뒤집습니다');
out.push('- 작년에 형님이 아내분을 `Амьдралын минь гэрэл`(내 삶의 빛)이라 부르신 것과 이어집니다');
out.push('');
out.push('---');
out.push('');
out.push('# 확인 요청');
out.push('');
out.push('### 1. 몽골어 원어민 확인 권장 ⚠');
out.push('');
out.push('제가 쓴 몽골어는 문법과 두운을 맞춰 작성했지만 **저는 원어민이 아닙니다.** 다음 두 곳만은 한 번 확인받으시길 권합니다:');
out.push('');
out.push('| 위치 | 이유 |');
out.push('|---|---|');
out.push('| **S24 답 4행** | 이 페이지에서 가장 중요한 문장입니다. 어미 하나가 어색하면 효과가 반감됩니다 |');
out.push('| **S23 사과문** | `эрхбиш гэж боддог байлаа`(당연하게 여겼다), `хайхрамжгүй хандсан`(소홀히 대했다) — 어감의 세기가 의도대로인지 |');
out.push('');
out.push('### 2. 사실 확인이 필요한 곳');
out.push('');
out.push('사진 파일명의 영어 설명을 근거로 쓴 문장들입니다. 틀렸으면 알려주세요:');
out.push('');
out.push('- **S12** — 차강사르 준비를 아내분이 도맡으셨다');
out.push('- **S16** — 그 사진을 휴대폰에 오래 담아두고 있었다');
out.push('- **S18** — 여름집 사진 한 장을 에르뭉이 직접 찍었다');
out.push('');
out.push('### 3. 아직 비어 있는 것');
out.push('');
out.push('- **첫 만남 이야기** (S01) — 어디서 어떻게 만나셨는지. 이것만 채우면 1장이 완전히 달라집니다');
out.push('- **결혼식 날짜** — 연표에 통째로 빠져 있습니다');
out.push('- 둘째가 처음 일어서던 사진(2025-01) — 원본이 RAW(.DNG)라 브라우저가 못 엽니다. 휴대폰에서 JPG로 내보내 주시면 넣겠습니다');
out.push('');

out.push('---');
out.push('');
out.push('**현황:** 씬 ' + D.scenes.length + '개 · 사진 ' + photoCount + '장 · 영상 ' + videoCount + '개 · 배경음악 ' + (D.meta.playlist || []).length + '곡 (연속 무한 반복)');
out.push('');

fs.writeFileSync(path.join(ROOT, '_workspace', '05_qa_review_ko.md'), out.join('\n'), 'utf8');
console.log('검수표 생성 완료 — _workspace/05_qa_review_ko.md');
console.log('씬 ' + D.scenes.length + ' / 사진 ' + photoCount + ' / 영상 ' + videoCount);
