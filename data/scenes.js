/* 이 파일의 내용만 고치면 화면 문구가 바뀝니다. HTML/CSS/JS는 건드리지 마세요.
   씬은 반드시 시간순입니다. 순서를 바꾸면 이야기 흐름이 무너집니다. */
window.SCENES =
{
  "meta": {
    "title_mn": "Зул-Эрдэнэ",
    "subtitle_mn": "Долоон жилийн тэмдэглэл",
    "og_title": "Зул-Эрдэнэ · Төрсөн өдрийн мэнд хүргэе",
    "og_description": "Долоон жилийн тэмдэглэл · 2019 – 2026",
    "og_image": "assets/img/og.jpg",
    "playlist": ["assets/audio/bgm-01.mp3", "assets/audio/bgm-02.mp3"],
    "audio_label_mn": "Хөгжимтэй үзэх"
  },
  "scenes": [
    {
      "id": "S00",
      "layout": "cover",
      "intensity": 3,
      "eyebrow_mn": "1989 · 09 · 07",
      "headline_mn": "Зул-Эрдэнэ",
      "body_mn": "Долоон жилийн тэмдэглэл",
      "headline_ko": "줄-에르데네",
      "body_ko": "7년의 기록",
      "media": { "src": "assets/img/2026-flower-01.jpg", "w": 1200, "h": 1600, "alt_mn": "Хоёр үр чамд зэрлэг цэцэг барьж байна" },
      "scroll_hint_mn": "доош гүйлгэнэ үү"
    },
    {
      "id": "S01",
      "layout": "photo-split",
      "intensity": 2,
      "enter": "fade-up",
      "date_display": "2019 · 09 · 18",
      "headline_mn": "Анх уулзсан өдөр",
      "body_mn": "Тэр өдөр онцгой юм болоогүй мэт санагдсан ч, миний бүх амьдрал үнэндээ тэр өдрөөс эхэлсэн юм.",
      "headline_ko": "처음 만난 날",
      "body_ko": "그날은 특별할 것 없는 날처럼 느껴졌지만, 사실 내 모든 인생은 그날부터 시작되었어.",
      "media": { "src": "assets/img/2019-couple-01.jpg", "w": 1599, "h": 1600, "alt_mn": "2019 он" }
    },
    {
      "id": "S02",
      "layout": "photo-split",
      "intensity": 2,
      "enter": "fade-up",
      "date_display": "2020 · 09 · 18",
      "headline_mn": "Нэг дэх жил",
      "body_mn": "Хоёулаа л байсан үе. Хаашаа ч явсан хамаагүй, чамтай хамт байхад л хангалттай байлаа.",
      "headline_ko": "첫 번째 해",
      "body_ko": "둘뿐이던 시절. 어디를 가든 상관없었어, 너와 함께면 그걸로 충분했어.",
      "media": { "src": "assets/img/2020-date-01.jpg", "w": 720, "h": 960, "alt_mn": "Хоёулаа" }
    },
    {
      "id": "S03",
      "layout": "text-only",
      "intensity": 2,
      "enter": "fade-up",
      "date_display": "2021 · 09 · 18",
      "headline_mn": "Хоёр дахь жил",
      "body_mn": "Хоёр дахь намар. Бид хоёулаа л байсан сүүлчийн жил байсныг тэр үед мэдээгүй.",
      "headline_ko": "두 번째 해",
      "body_ko": "두 번째 가을. 우리 둘만이었던 마지막 해라는 걸 그때는 몰랐어.",
      "media": null
    },
    {
      "id": "S03b",
      "layout": "quote",
      "intensity": 3,
      "enter": "fade-up-lg",
      "date_display": "2021 · 09 · 29",
      "headline_mn": "Миний төрсөн өдөр",
      "body_mn": "Тэр өдөр чи надад ийм мэндчилгээ бичиж өгсөн.",
      "verse_mn": [
        "Бүрэнхий байсан хорвоо гэрэлтэж",
        "Бүүдгэр байсан наран мишээж",
        "Гундаж удсан цэцгүүд өндийж",
        "Гэрэл гэгээтэй хамт чи минь ирсэн билээ"
      ],
      "verse_caption_mn": "— миний төрсөн өдөрт чиний бичсэн, 2021",
      "after_mn": "Би энэ үгсийг таван жил хадгалсан.",
      "headline_ko": "내 생일",
      "body_ko": "그날 너는 나에게 이런 축하 인사를 써주었어.",
      "after_ko": "나는 이 말들을 5년간 간직했어.",
      "media": null
    },
    {
      "id": "S04",
      "layout": "carousel",
      "intensity": 2,
      "enter": "fade-up",
      "date_display": "2022 · хавар",
      "headline_mn": "Хүлээлт",
      "body_mn": "Анхны үр маань. Хоёулаа юу ч мэдэхгүй байсан ч өдөр бүр хамтдаа бэлдэж байлаа. Амьдралдаа ийм их тэсэн ядан хүлээсэн зүйл байгаагүй.",
      "headline_ko": "기다림",
      "body_ko": "우리의 첫아이. 둘 다 아무것도 몰랐지만 매일 함께 준비했어. 살면서 이렇게까지 애타게 기다려본 건 없었어.",
      "gallery": [
        { "src": "assets/img/2022-pregnant-01.jpg", "w": 1242, "h": 828, "alt_mn": "Хүлээлт" },
        { "src": "assets/img/2022-pregnant-02.jpg", "w": 1067, "h": 1600, "alt_mn": "Хүлээлт" },
        { "src": "assets/img/2022-pregnant-03.jpg", "w": 1067, "h": 1600, "alt_mn": "Хүлээлт" }
      ]
    },
    {
      "id": "S05",
      "layout": "carousel",
      "intensity": 4,
      "enter": "image-settle",
      "date_display": "2022 · 05 · 05",
      "headline_mn": "Эрмүүн ирлээ",
      "body_mn": "Чи биднийг гурав болгосон өдөр. Тэр өдрөөс хойш чиний нүдэнд урьд байгаагүй нэгэн гэрэл асав.",
      "headline_ko": "에르뭉이 왔다",
      "body_ko": "네가 우리를 셋으로 만든 날. 그날 이후 네 눈에 전에 없던 빛이 켜졌어.",
      "gallery": [
        { "src": "assets/img/2022-ermuun-01.jpg", "w": 1600, "h": 1200, "alt_mn": "Эрмүүн ээжийнхээ хуруунаас атгаж байна" },
        { "src": "assets/img/2022-ermuun-02.jpg", "w": 1200, "h": 1600, "alt_mn": "Эрмүүн" }
      ]
    },
    {
      "id": "S06",
      "layout": "carousel",
      "intensity": 2,
      "enter": "fade-up",
      "date_display": "2022 · 09 · 18",
      "headline_mn": "Гурав дахь жил",
      "body_mn": "Гурвуулаа болсон анхны намар. Нойргүй шөнүүд олон байсан ч, инээд нь бүр илүү байсан жил.",
      "headline_ko": "세 번째 해",
      "body_ko": "셋이 된 첫 가을. 잠 못 이룬 밤이 많았지만, 웃음이 더 많았던 해.",
      "gallery": [
        { "src": "assets/img/2022-autumn-01.jpg", "w": 1200, "h": 1600, "alt_mn": "Эрмүүнтэй хамт" },
        { "src": "assets/img/2022-autumn-02.jpg", "w": 1200, "h": 1600, "alt_mn": "Хоёулаа" },
        { "src": "assets/img/2022-autumn-03.jpg", "w": 910, "h": 1600, "alt_mn": "Эрмүүн" },
        { "src": "assets/img/2022-autumn-04.jpg", "w": 1200, "h": 1600, "alt_mn": "Эмээтэйгээ" }
      ]
    },
    {
      "id": "S07",
      "layout": "photo-split",
      "intensity": 2,
      "enter": "fade-up",
      "date_display": "2023 · 09 · 18",
      "headline_mn": "Дөрөв дэх жил",
      "body_mn": "Эрмүүнтэйгээ хамт анх удаа хол аялсан жил. Онцгой юм болоогүй ч, энгийн өдрүүдийг аз жаргалтай болгодог хүн нь үргэлж чи байсан.",
      "headline_ko": "네 번째 해",
      "body_ko": "에르뭉과 함께 처음으로 멀리 떠난 해. 특별한 일은 없었지만, 평범한 날들을 행복하게 만드는 사람은 언제나 너였어.",
      "media": { "src": "assets/img/2023-trip-01.jpg", "w": 1200, "h": 1600, "alt_mn": "Анхны аялал" }
    },
    {
      "id": "S08",
      "layout": "carousel",
      "intensity": 2,
      "enter": "fade-up",
      "date_display": "2024 · хавар",
      "headline_mn": "Дахин хүлээлт",
      "body_mn": "Хоёр дахь удаагаа. Энэ удаад Эрмүүн ч бидэнтэй хамт хүлээсэн.",
      "headline_ko": "다시 기다림",
      "body_ko": "두 번째 기다림. 이번에는 에르뭉도 우리와 함께 기다렸어.",
      "gallery": [
        { "src": "assets/img/2024-pregnant-01.jpg", "w": 1200, "h": 1600, "alt_mn": "Хүлээлт" },
        { "src": "assets/img/2024-pregnant-02.jpg", "w": 1200, "h": 1600, "alt_mn": "Эрмүүнтэй хамт хүлээж байна" }
      ]
    },
    {
      "id": "S09",
      "layout": "carousel",
      "intensity": 4,
      "enter": "image-settle",
      "date_display": "2024 · 03 · 22",
      "headline_mn": "Есүлэн ирлээ",
      "body_mn": "Манай гэрт бяцхан гүнж мэндэллээ. Чи дахин нэг удаа өөрийнхөө бүхнийг өгсөн.",
      "headline_ko": "예술렝이 왔다",
      "body_ko": "우리 집에 작은 공주가 태어났어. 너는 다시 한번 네 모든 것을 주었어.",
      "gallery": [
        { "src": "assets/img/2024-yesulen-01.jpg", "w": 1200, "h": 1600, "alt_mn": "Есүлэнтэй анх уулзсан нь" },
        { "src": "assets/img/2024-yesulen-02.jpg", "w": 1200, "h": 1600, "alt_mn": "Эрмүүн дүүгээ үнсэж байна" },
        { "src": "assets/img/2024-yesulen-03.jpg", "w": 1200, "h": 1600, "alt_mn": "Эрмүүний инээд" }
      ]
    },
    {
      "id": "S10",
      "layout": "carousel",
      "intensity": 3,
      "enter": "fade-up",
      "date_display": "2024 · зун",
      "headline_mn": "Дөрвүүлээ",
      "body_mn": "Хоёр үр минь гар нийлүүлэн унтдаг болов. Чи биднийг ийм гэр бүл болгосон юм.",
      "headline_ko": "넷이서",
      "body_ko": "두 아이가 손을 맞잡고 잠들게 되었어. 네가 우리를 이런 가족으로 만들었어.",
      "gallery": [
        { "src": "assets/img/2024-four-01.jpg", "w": 1285, "h": 1600, "alt_mn": "Дөрвүүлээ гудамжаар" },
        { "src": "assets/img/2024-four-02.jpg", "w": 1200, "h": 1600, "alt_mn": "Гар нийлүүлэн унтаж байна" },
        { "src": "assets/img/2024-studio-01.jpg", "w": 1600, "h": 1067, "alt_mn": "Ах дүү хоёр" },
        { "src": "assets/img/2024-studio-02.jpg", "w": 1600, "h": 1067, "alt_mn": "Ах дүү хоёр" },
        { "src": "assets/img/2024-studio-03.jpg", "w": 1600, "h": 1067, "alt_mn": "Есүлэн" },
        { "src": "assets/img/2024-studio-04.jpg", "w": 1600, "h": 1067, "alt_mn": "Есүлэн" },
        { "src": "assets/img/2024-studio-05.jpg", "w": 1600, "h": 1067, "alt_mn": "Есүлэн" },
        { "src": "assets/img/2024-studio-06.jpg", "w": 1600, "h": 1067, "alt_mn": "Есүлэн" }
      ]
    },
    {
      "id": "S11",
      "layout": "carousel",
      "intensity": 3,
      "enter": "fade-up",
      "date_display": "2024 · 09 · 18",
      "headline_mn": "Тав дахь жил",
      "body_mn": "Дөрвүүлээ болов. Гэрийн маань гал голомт улам дулаан болсон жил.",
      "headline_ko": "다섯 번째 해",
      "body_ko": "넷이 되었어. 우리 집 화덕(가정)이 더 따뜻해진 해.",
      "gallery": [
        { "src": "assets/img/2024-winter-01.jpg", "w": 1200, "h": 1600, "alt_mn": "Дөрвүүлээ" },
        { "src": "assets/img/2024-winter-03.jpg", "w": 1315, "h": 1600, "alt_mn": "Есүлэнгийн инээмсэглэл" }
      ]
    },
    {
      "id": "S12",
      "layout": "carousel",
      "intensity": 2,
      "enter": "fade-up",
      "date_display": "2025 · цагаан сар",
      "headline_mn": "Дөрвүүлээ угтсан анхны цагаан сар",
      "body_mn": "Бүх бэлтгэлийг чи хийсэн. Баяр өнгөрч ядарсан хэрнээ инээмсэглэж байсан чинь одоо ч санаанд байна.",
      "headline_ko": "넷이서 맞은 첫 차강사르",
      "body_ko": "모든 준비는 네가 했어. 명절이 끝나고 지쳤으면서도 웃던 네 모습이 지금도 기억에 남아.",
      "gallery": [
        { "src": "assets/img/2025-jan-01.jpg", "w": 1200, "h": 1600, "alt_mn": "Хоёр үр" },
        { "src": "assets/img/2025-winter-01.jpg", "w": 1278, "h": 1600, "alt_mn": "Дөрвүүлээ өвөл" },
        { "src": "assets/img/2025-tsagaansar-02.jpg", "w": 1600, "h": 1200, "alt_mn": "Цагаан сар" },
        { "src": "assets/img/2025-tsagaansar-01.jpg", "w": 1600, "h": 1200, "alt_mn": "Цагаан сар" }
      ]
    },
    {
      "id": "S13",
      "layout": "carousel",
      "intensity": 3,
      "enter": "fade-up",
      "date_display": "2025 · 03 · 22",
      "headline_mn": "Есүлэнгийн анхны төрсөн өдөр",
      "body_mn": "Нэг нас хүрэв. Удалгүй охин маань чамд амьдралдаа анх удаа бэлэг барив. Юу ч хэлэлгүй, зүгээр л гараа сунган.",
      "headline_ko": "예술렝의 첫 생일",
      "body_ko": "한 살이 되었어. 얼마 뒤 우리 딸이 태어나서 처음으로 너에게 선물을 건넸어. 아무 말 없이, 그냥 손을 내밀고.",
      "gallery": [
        { "src": "assets/img/2025-yesulen-bday-01.jpg", "w": 1600, "h": 1600, "alt_mn": "Есүлэнгийн нэг нас" },
        { "src": "assets/img/2025-yesulen-bday-02.jpg", "w": 1600, "h": 1600, "alt_mn": "Сарнай" },
        { "src": "assets/img/2025-gift-01.jpg", "w": 1200, "h": 1600, "alt_mn": "Охин ээждээ бэлэг барьж байна" },
        { "src": "assets/img/2025-cap-01.jpg", "w": 900, "h": 1600, "alt_mn": "Есүлэн" },
        { "src": "assets/img/2025-cap-02.jpg", "w": 900, "h": 1600, "alt_mn": "Ах дүү хоёр" }
      ]
    },
    {
      "id": "S14",
      "layout": "photo-split",
      "intensity": 2,
      "enter": "fade-up",
      "date_display": "2025 · зун",
      "headline_mn": "Есүлэнгийн анхны аялал",
      "body_mn": "Есүлэн анх удаа хол замд гарсан өдөр. Дөрвүүлээ сэрүүн байж, нар мандахыг хамт харлаа.",
      "headline_ko": "예술렝의 첫 여행",
      "body_ko": "예술렝이 처음으로 먼 길을 나선 날. 넷 다 깨어 있었고, 해가 뜨는 걸 함께 봤어.",
      "media": { "src": "assets/img/2025-sunrise-01.jpg", "w": 1200, "h": 1600, "alt_mn": "Нар мандаж байна" }
    },
    {
      "id": "S15",
      "layout": "photo-split",
      "intensity": 3,
      "enter": "fade-up",
      "date_display": "2025 · 09 · 18",
      "headline_mn": "Зургаа дахь жил",
      "body_mn": "Долоо хоног бүр адилхан өнгөрдөг мэт. Гэвч тэр бүх өдрийг чи ганцаараа зохион байгуулж байсныг би мэднэ.",
      "headline_ko": "여섯 번째 해",
      "body_ko": "매주가 똑같이 지나가는 것 같았어. 하지만 그 모든 날을 네가 혼자 꾸려왔다는 걸 나는 알아.",
      "media": { "src": "assets/img/2025-summerhouse-01.jpg", "w": 1600, "h": 1200, "alt_mn": "Зуслангийн өмнө" }
    },
    {
      "id": "S16",
      "layout": "carousel",
      "intensity": 2,
      "enter": "fade-up",
      "date_display": "2025 · өвөл",
      "headline_mn": "Гар барин алхсан өвөл",
      "body_mn": "Охиноо хөтлөөд алхаж байсан чинь. Тэр зургийг би утсандаа удаан хадгалж явсан.",
      "headline_ko": "손잡고 걸었던 겨울",
      "body_ko": "딸의 손을 잡고 걷던 너. 그 사진을 나는 한참 휴대폰에 담아두고 있었어.",
      "gallery": [
        { "src": "assets/img/2025-walk-01.jpg", "w": 1200, "h": 1600, "alt_mn": "Гар барин алхаж байна" },
        { "src": "assets/img/2025-walk-02.jpg", "w": 1200, "h": 1600, "alt_mn": "Өвлийн алхалт" },
        { "src": "assets/img/2025-christmas-01.jpg", "w": 1200, "h": 1600, "alt_mn": "Гацуур модны дэргэд" }
      ]
    },
    {
      "id": "S17",
      "layout": "video",
      "intensity": 3,
      "enter": "fade-up",
      "date_display": "2025 · 12",
      "headline_mn": "Бүжиг",
      "body_mn": "Дуу тавихад чи хүүхдүүдтэйгээ бүжиглэдэг. Би хажуугаас нь хараад инээж суудаг.",
      "headline_ko": "춤",
      "body_ko": "음악을 틀면 너는 아이들과 춤을 춰. 나는 옆에서 보며 웃고 있어.",
      "media": { "src": "assets/img/2025-dance.mp4", "poster": null, "alt_mn": "Ээж хоёр үртэйгээ бүжиглэж байна" }
    },
    {
      "id": "S18",
      "layout": "carousel",
      "intensity": 2,
      "enter": "fade-up",
      "date_display": "2026 · хавар",
      "headline_mn": "Эрмүүн дөрвөн нас хүрэв",
      "body_mn": "Бяцхан хүү маань одоо гэрэл зураг ч авдаг болжээ. Зуслан дээрх нэг зургийг тэр өөрөө дарсан юм.",
      "headline_ko": "에르뭉이 네 살이 되었다",
      "body_ko": "우리 작은 아들이 이제 사진도 찍을 줄 알아. 여름집에서 찍은 사진 한 장은 그 애가 직접 누른 거야.",
      "gallery": [
        { "src": "assets/img/2026-winter-01.jpg", "w": 1600, "h": 1200, "alt_mn": "Ээж хоёр үртэйгээ" },
        { "src": "assets/img/2026-summerhouse-01.jpg", "w": 1200, "h": 1600, "alt_mn": "Эрмүүний дарсан зураг" },
        { "src": "assets/img/2026-ermuun-bday-01.jpg", "w": 1200, "h": 1600, "alt_mn": "Дөрвөн насны бялуу" },
        { "src": "assets/img/2026-summerhouse-02.jpg", "w": 1600, "h": 1200, "alt_mn": "Зуслангийн амар хором" }
      ]
    },
    {
      "id": "S19",
      "layout": "carousel",
      "intensity": 3,
      "enter": "fade-up",
      "date_display": "2026 · 05",
      "headline_mn": "Зэрлэг цэцэг",
      "body_mn": "Хоёр үр чинь чамд зэрлэг цэцэг түүж өгсөн. Тэднийг ийм зантай болгосон хүн чи гэдгийг би мэднэ.",
      "headline_ko": "들꽃",
      "body_ko": "두 아이가 너에게 들꽃을 꺾어 주었어. 아이들을 그런 마음씨로 키운 사람이 너라는 걸 나는 알아.",
      "gallery": [
        { "src": "assets/img/2026-lake-01.jpg", "w": 1200, "h": 1600, "alt_mn": "Нуурын эрэг" },
        { "src": "assets/img/2026-food-01.jpg", "w": 1600, "h": 1200, "alt_mn": "Хоол хүлээж байна" },
        { "src": "assets/img/2026-flower-01.jpg", "w": 1200, "h": 1600, "alt_mn": "Зэрлэг цэцэг" },
        { "src": "assets/img/2026-wish-01.jpg", "w": 1600, "h": 1200, "alt_mn": "Салхитай өдөр" },
        { "src": "assets/img/2026-car-01.jpg", "w": 1600, "h": 1200, "alt_mn": "Машинд" }
      ]
    },
    {
      "id": "S20",
      "layout": "photo-full",
      "intensity": 4,
      "enter": "image-settle",
      "date_display": "2026 · 07",
      "headline_mn": "Хоёулаа",
      "body_mn": "Хүүхдүүд ч хамт явсан. Гэвч зам эгц бартаатай байсан тул манай аав ээж тэднийг түр хараад өгсөн юм.\n\nТэгээд олон жилийн дараа анх удаа дахин хоёулаа. Тэр өдөр чи анх уулзсан өдрийнх шигээ инээж байлаа.\n\nХүүхдүүд маань арай томроход дахиад дөрвүүлээ энд ирье.",
      "headline_ko": "둘이서",
      "body_ko": "아이들도 같이 갔어. 그런데 길이 가파르고 험해서 우리 부모님이 잠깐 봐주셨지.\n\n그래서 오랜만에 처음으로 다시 둘이서. 그날 너는 처음 만난 날처럼 웃고 있었어.\n\n아이들이 좀 더 크면 넷이서 다시 여기 오자.",
      "media": { "src": "assets/img/2026-horse-01.jpg", "w": 1600, "h": 1200, "alt_mn": "Таван богд, хоёулаа" }
    },
    {
      "id": "S21",
      "layout": "carousel",
      "intensity": 2,
      "enter": "fade-up",
      "date_display": "2026 · 08",
      "headline_mn": "Бороотой өдрүүд",
      "body_mn": "Гадаа бороо орж, дотор дулаахан. Ийм өдрүүд юугаараа ч онцгүй мэт атал хамгийн их санагддаг.",
      "headline_ko": "비 오는 날들",
      "body_ko": "밖에는 비가 오고, 안은 따뜻했어. 이런 날들은 아무것도 아닌 것 같은데 가장 많이 생각나.",
      "gallery": [
        { "src": "assets/img/2026-rainy-01.jpg", "w": 1600, "h": 1200, "alt_mn": "Хамтдаа хооллож байна" },
        { "src": "assets/img/2026-rainy-02.jpg", "w": 1600, "h": 1200, "alt_mn": "Тагтан дээрх цэцэг" },
        { "src": "assets/img/2026-lake-02.jpg", "w": 1600, "h": 1200, "alt_mn": "Нуур, наймдугаар сар" }
      ]
    },
    {
      "id": "S22",
      "layout": "photo-split",
      "intensity": 3,
      "enter": "fade-up",
      "date_display": "2026 · 09 · 01",
      "headline_mn": "Цэцэрлэгийн хоёр дахь жил",
      "body_mn": "Эрмүүн маань цэцэрлэгтээ хоёр дахь жилээ эхэллээ. Чи түүнийг хөтлөөд явахыг би хараад удтал зогсов.\n\nЦаг хэтэрхий хурдан өнгөрч байна. Удахгүй сургуульд ч орох байх. Тэр өдөр хүртэл хамтдаа сайн бэлдье.",
      "headline_ko": "유치원 두 번째 해",
      "body_ko": "우리 에르뭉이 유치원 두 번째 해를 시작했어. 네가 그 애 손을 잡고 걸어가는 걸 나는 한참 서서 봤어.\n\n시간이 너무 빨리 가. 곧 학교에도 가겠지. 그날까지 함께 잘 준비하자.",
      "media": { "src": "assets/img/2026-kindergarten-01.jpg", "w": 1200, "h": 1600, "alt_mn": "Цэцэрлэгийн хоёр дахь жил" }
    },
    {
      "id": "S23",
      "layout": "text-only",
      "intensity": 4,
      "enter": "fade-up-lg",
      "headline_mn": "Уучлаарай",
      "body_mn": "Чи бүхнийг дуугүйхэн даадаг. Би түүнийг чинь эрхбиш гэж боддог байлаа.\n\nХамгийн ойрын хүн минь болохоор нь хамгийн хайхрамжгүй хандсан нь би.",
      "headline_ko": "미안해",
      "body_ko": "너는 모든 걸 말없이 감당해. 나는 그걸 당연한 걸로 여겼어.\n\n가장 가까운 사람이라서 가장 함부로 했던 건 나야.",
      "media": null
    },
    {
      "id": "S24",
      "layout": "center-verse",
      "intensity": 5,
      "enter": "verse-cascade",
      "theme": "dark",
      "eyebrow_mn": "Чиний мэндчилгээнд, таван жилийн дараа",
      "verse_mn": [
        "Бүрэнхий байсан гэдгийг би мэдээгүй",
        "Бүхнийг чи гэрэлтүүлсэн юм байна",
        "Гэрлийг авчирсан хүн би биш",
        "Гэрэл нь чи өөрөө байсан юм"
      ],
      "verse_caption_mn": "— Энхболд, 2026",
      "headline_ko": "5년 전 네 축하 글에 대한 답",
      "body_ko": "어스름했다는 걸 나는 몰랐어 / 모든 걸 밝힌 건 너였구나 / 빛을 데려온 사람은 내가 아니라 / 빛은 너 자신이었어",
      "media": null
    },
    {
      "id": "S25",
      "layout": "letter",
      "intensity": 4,
      "enter": "fade-up",
      "date_display": "2026 · 09 · 07",
      "headline_mn": "Төрсөн өдрийн мэнд хүргэе,\nЗул-Эрдэнэ минь",
      "body_mn": "Гучин долоон жилийн өмнө энэ хорвоод чи мэндэлсэнд баярлалаа.\n\nӨнөөдөр чиний өдөр. Гэрийн ажлаа март, өнөөдөр зүгээр л амраарай.",
      "headline_ko": "생일 축하해, 나의 줄-에르데네",
      "body_ko": "37년 전 이 세상에 네가 태어나줘서 고마워.\n\n오늘은 네 날이야. 집안일은 잊고, 오늘만큼은 그냥 쉬어.",
      "media": null
    },
    {
      "id": "S26",
      "layout": "letter",
      "intensity": 4,
      "enter": "fade-up",
      "date_display": "2026 · 09 · 18",
      "headline_mn": "Арван нэгэн хоногийн дараа",
      "body_mn": "Арван нэгэн хоногийн дараа бид анх уулзсаны долоон жил болно.\n\nОдооноос хойш чиний ачааг би хуваалцъя. Чамайг ядрахад түшиг тулгуур нь чинь би байя.\n\nДараагийн долоон жил, түүний дараагийн долоон жилийг ч хамт өнгөрүүлье.\n\nХайртай шүү. Үүрд.",
      "signature_mn": "— Энхболд",
      "headline_ko": "11일 뒤에",
      "body_ko": "11일 뒤면 우리가 처음 만난 지 7년이 돼.\n\n이제부터는 네 짐을 내가 나눠 질게. 네가 지칠 때 버팀목은 내가 될게.\n\n다음 7년도, 그 다음 7년도 함께 보내자.\n\n사랑해. 영원히.",
      "media": null
    }
  ]
}
;
