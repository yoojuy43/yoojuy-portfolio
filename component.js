window.__buildComponent = function (DCLogic) {
  class Component extends DCLogic {
    constructor(props) {
      super(props);
      this.setRoot = (el) => {
        this._root = el;
      };
      this.setFollower = (el) => {
        this._follower = el;
      };
      this.setDot = (el) => {
        this._dot = el;
      };
      this.setProjectsSwiper = (el) => {
        this._swiperEl = el;
      };
      this.setModalSwiper = (el) => {
        this._modalSwiperEl = el;
        if (el) {
          requestAnimationFrame(() => this._initModalSwiper());
        } else if (this._modalSwiper) {
          this._modalSwiper.destroy(true, true);
          this._modalSwiper = null;
        }
      };
      this.CLOSE_DELAY = 260;
      this.MASONRY_CLOSE_DELAY = 300;
      this.state = {
        activeId: null,
        closing: false,
        activeTab: 0,
        masonryOpen: false,
        masonryClosing: false,
      };
      this._swiper = null;
      this._modalSwiper = null;
      this._lastTab = 0;
      this._masonryCloseT = null;
      this._m = { tx: 0, ty: 0, x: 0, y: 0, dx: 0, dy: 0 };

      this.SUB_PROJECTS = [
        {
          id: 101,
          title: "업무일지 관리 페이지",
          category: "퍼블리싱",
          year: "'26",
          color: "#FFE4EE",
          rotate: -2,
          grad: "linear-gradient(135deg,#FFB3CC,#FF7FA8)",
          img: "./img/main/p101.jpg",
          images: [
            "./img/main/p101.jpg",
            "./img/main/p101-1.jpg",
            "./img/main/p101-2.jpg",
            "./img/main/p101-3.jpg",
          ],
          role: "UI/UX DESIGNER · 화면디자인 및 퍼블리싱",
          summary: "자사 업무일지 관리 페이지 제작",
          problem: "브랜드가 없어 주변 경쟁 카페 사이에서 인지도가 낮았습니다.",
          approach: [
            "컨셉 인터뷰 및 무드보드 작성",
            "로고·타이포그래피·컬러 시스템 정의",
            "컵홀더·명함·패키지 굿즈 디자인 3종",
          ],
          results: [
            { value: "+40%", label: "재방문율" },
            { value: "3종", label: "굿즈 출시" },
            { value: "★4.9", label: "브랜드 평가" },
          ],
          tags: ["UI", "UX", "퍼블리싱"],
        },
        {
          id: 102,
          title: "한수원 ICT 재해복구센터",
          category: "웹",
          year: "'22",
          color: "#FFD6E8",
          rotate: 1.5,
          grad: "linear-gradient(135deg,#FFD1E0,#FFA6C4)",
          img: "./img/main/p102.jpg",
          images: [
            "./img/main/p102.png",
            "./img/main/p102-1.png",
            "./img/main/p102-2.png",
            "./img/main/p102-3.png",
            "./img/main/p102-4.png",
          ],
          role: "그래픽디자인 · 화면 디자인 및 3D디자인",
          summary: "재해복구센터 관제 모니터링 화면 디자인",
          problem: "기존 명상 앱들이 복잡한 UI로 사용자 집중을 방해했습니다.",
          approach: [
            "사용자 심층 인터뷰 8명 진행",
            "미니멀한 온보딩과 세션 플로우 재설계",
            "편안한 컬러·타이포 시스템 정의",
          ],
          results: [
            { value: "-52%", label: "UI 요소 수" },
            { value: "+38%", label: "세션 완료율" },
            { value: "92%", label: "만족도" },
          ],
          tags: ["그래픽", "3D", "설비"],
        },
        {
          id: 103,
          title: "고등기술연구원 환경플랜트",
          category: "3d",
          year: "'19",
          color: "#FFDDE8",
          rotate: -1,
          grad: "linear-gradient(135deg,#FFC9DD,#FF8FB3)",
          img: "./img/main/p103.png",
          images: [
            "./img/main/p103.png",
            "./img/main/p103-1.png",
            "./img/main/p103-2.png",
            "./img/main/p103-3.png",
            "./img/main/p103-4.png",
          ],
          role: "3D디자인 · 환경플랜트 디자인",
          summary: "환경플랜트 설비 화면 3D 디자인",
          problem:
            "방대한 레시피가 나열만 되어 있어 원하는 것을 찾기 어려웠습니다.",
          approach: [
            "AI 추천 알고리즘 기반 큐레이션 플로우 설계",
            "재료 기반 필터 UX 개선",
            "반응형 카드 레이아웃 시스템 구축",
          ],
          results: [
            { value: "+44%", label: "탐색 완료율" },
            { value: "-30%", label: "검색 시간" },
            { value: "2.1배", label: "재방문" },
          ],
          tags: ["3D", "그래픽", "플랜트"],
        },
      ];

      // ─────────────────────────────────────────────────────────────
      // 마소닉 그리드 이미지 데이터
      // ※ 이미지 추가: 각 배열에 { src, alt } 객체를 추가하면 됩니다 (최대 50개 지원)
      // ─────────────────────────────────────────────────────────────
      this.MASONRY_IMAGES = [
        // ── Tab 0 : UX/UI 디자인 ──────────────────────────────────
        [
          { src: "./img/p1001.jpg", alt: "모바일 앱 UX 리뉴얼", category: "UX" },
          { src: "./img/1111.png", alt: "웹 대시보드 UI 설계", category: "UI" },
          { src: "./img/p1003.jpg", alt: "관리자 페이지 리디자인", category: "UI" },
          { src: "./img/p1004.jpg", alt: "전환율 최적화", category: "UX" },
          { src: "./img/p1005.jpg", alt: "검색 UX 최적화", category: "UX" },
          { src: "./img/p1006.jpg", alt: "디자인 가이드라인 수립", category: "Brand" },
          { src: "./img/p1111.png", alt: "사용성 테스트 및 개선", category: "UX" },
          { src: "./img/p1008.jpg", alt: "데이터 시각화 대시보드", category: "UI" },
          { src: "./img/p1009.jpg", alt: "UI 컴포넌트 라이브러리", category: "UI" },
          { src: "./img/p1010.jpg", alt: "와이어프레임 시스템", category: "UX" },
          { src: "./img/p1001.jpg", alt: "모바일 앱 UX 리뉴얼", category: "UX" },
          { src: "./img/1111.png", alt: "웹 대시보드 UI 설계", category: "UI" },
          { src: "./img/p1003.jpg", alt: "관리자 페이지 리디자인", category: "UI" },
          { src: "./img/p1004.jpg", alt: "전환율 최적화", category: "UX" },
          { src: "./img/p1005.jpg", alt: "검색 UX 최적화", category: "UX" },
          { src: "./img/p1006.jpg", alt: "디자인 가이드라인 수립", category: "Brand" },
          { src: "./img/p1111.png", alt: "사용성 테스트 및 개선", category: "UX" },
          { src: "./img/p1008.jpg", alt: "데이터 시각화 대시보드", category: "UI" },
          { src: "./img/p1009.jpg", alt: "UI 컴포넌트 라이브러리", category: "UI" },
          { src: "./img/p1010.jpg", alt: "와이어프레임 시스템", category: "UX" },
          { src: "./img/p1001.jpg", alt: "모바일 앱 UX 리뉴얼", category: "UX" },
          { src: "./img/1111.png", alt: "웹 대시보드 UI 설계", category: "UI" },
          { src: "./img/p1003.jpg", alt: "관리자 페이지 리디자인", category: "UI" },
          { src: "./img/p1004.jpg", alt: "전환율 최적화", category: "UX" },
          { src: "./img/p1005.jpg", alt: "검색 UX 최적화", category: "UX" },
          { src: "./img/p1006.jpg", alt: "디자인 가이드라인 수립", category: "Brand" },
          { src: "./img/p1111.png", alt: "사용성 테스트 및 개선", category: "UX" },
          { src: "./img/p1008.jpg", alt: "데이터 시각화 대시보드", category: "UI" },
          { src: "./img/p1009.jpg", alt: "UI 컴포넌트 라이브러리", category: "UI" },
          { src: "./img/p1010.jpg", alt: "와이어프레임 시스템", category: "UX" },
          { src: "./img/p1001.jpg", alt: "모바일 앱 UX 리뉴얼", category: "UX" },
          { src: "./img/1111.png", alt: "웹 대시보드 UI 설계", category: "UI" },
          { src: "./img/p1003.jpg", alt: "관리자 페이지 리디자인", category: "UI" },
          { src: "./img/p1004.jpg", alt: "전환율 최적화", category: "UX" },
          { src: "./img/p1005.jpg", alt: "검색 UX 최적화", category: "UX" },
          { src: "./img/p1006.jpg", alt: "디자인 가이드라인 수립", category: "Brand" },
          { src: "./img/p1111.png", alt: "사용성 테스트 및 개선", category: "UX" },
          { src: "./img/p1008.jpg", alt: "데이터 시각화 대시보드", category: "UI" },
          { src: "./img/p1009.jpg", alt: "UI 컴포넌트 라이브러리", category: "UI" },
          { src: "./img/p1010.jpg", alt: "와이어프레임 시스템", category: "UX" },
          { src: "./img/p1001.jpg", alt: "모바일 앱 UX 리뉴얼", category: "UX" },
          { src: "./img/1111.png", alt: "웹 대시보드 UI 설계", category: "UI" },
          { src: "./img/p1003.jpg", alt: "관리자 페이지 리디자인", category: "UI" },
          { src: "./img/p1004.jpg", alt: "전환율 최적화", category: "UX" },
          { src: "./img/p1005.jpg", alt: "검색 UX 최적화", category: "UX" },
          { src: "./img/p1006.jpg", alt: "디자인 가이드라인 수립", category: "Brand" },
          { src: "./img/p1111.png", alt: "사용성 테스트 및 개선", category: "UX" },
          { src: "./img/p1008.jpg", alt: "데이터 시각화 대시보드", category: "UI" },
          { src: "./img/p1009.jpg", alt: "UI 컴포넌트 라이브러리", category: "UI" },
          { src: "./img/p1010.jpg", alt: "와이어프레임 시스템", category: "UX" },
        ],
        // ── Tab 1 : 산업/환경디자인 ───────────────────────────────
        [
          { src: "./img/p2001.jpg", alt: "기업 SI 시스템 UI", category: "SI" },
          { src: "./img/p2002.jpg", alt: "건물 자동화 대시보드", category: "BAS" },
          { src: "./img/p2003.jpg", alt: "BEM 관리 시스템 UI", category: "BEM" },
          { src: "./img/p2004.jpg", alt: "사이니지 시스템 설계", category: "사이니지" },
          { src: "./img/p2005.jpg", alt: "전시관 인터랙티브 UI", category: "전시" },
          { src: "./img/p2006.jpg", alt: "공공기관 시스템 디자인", category: "공공" },
          { src: "./img/p2007.jpg", alt: "문서 관리 시스템 UI", category: "SI" },
          { src: "./img/p2008.jpg", alt: "BAS 모니터링 화면", category: "BAS" },
          { src: "./img/p2009.jpg", alt: "시설 관리 앱 설계", category: "BAS" },
          { src: "./img/p2010.jpg", alt: "스마트빌딩 컨트롤 UI", category: "BEM" },
        ],
        // ── Tab 2 : 공간디자인 ────────────────────────────────────
        [
          { src: "./img/p3001.jpg", alt: "리빙룸 인테리어 제안", category: "실내" },
          { src: "./img/p3002.jpg", alt: "소형 아파트 공간 기획", category: "실내" },
          { src: "./img/p3003.jpg", alt: "그린 오피스 환경 설계", category: "오피스" },
          { src: "./img/p3004.jpg", alt: "조명 컨셉 디자인", category: "조명" },
          { src: "./img/p3005.jpg", alt: "카페 인테리어 디자인", category: "상업" },
          { src: "./img/p3006.jpg", alt: "호텔 객실 리뉴얼", category: "상업" },
          { src: "./img/p3007.jpg", alt: "레스토랑 공간 기획", category: "상업" },
          { src: "./img/p3008.jpg", alt: "욕실 공간 리모델링", category: "실내" },
          { src: "./img/p3009.jpg", alt: "사무공간 환경 개선", category: "오피스" },
          { src: "./img/p3010.jpg", alt: "갤러리 전시 공간 디자인", category: "전시" },
        ],
        // ── Tab 3 : 브랜드디자인 ─────────────────────────────────
        [
          { src: "./img/p4001.jpg", alt: "친환경 패키지 디자인", category: "패키지" },
          { src: "./img/p4002.jpg", alt: "시즌 기프트 패키지", category: "패키지" },
          { src: "./img/p4003.jpg", alt: "쇼핑백 브랜딩 디자인", category: "브랜딩" },
          { src: "./img/p4004.jpg", alt: "음료 용기 제품 디자인", category: "패키지" },
          { src: "./img/p4005.jpg", alt: "뷰티 패키지 디자인", category: "패키지" },
          { src: "./img/p4006.jpg", alt: "라벨 및 태그 디자인", category: "브랜딩" },
          { src: "./img/p4007.jpg", alt: "식품 용기 패키지", category: "패키지" },
          { src: "./img/p4008.jpg", alt: "프리미엄 메일러 박스", category: "패키지" },
          { src: "./img/p4009.jpg", alt: "리본·포장지 디자인", category: "브랜딩" },
          { src: "./img/p4010.jpg", alt: "어린이 음료 패키지", category: "패키지" },
        ],
      ];

      const g = (a, b) => `linear-gradient(135deg,${a},${b})`;
      this.TAB_LABELS = [
        "UX/UI디자인 (50+)",
        "산업/환경디자인 (200+)",
        "공간디자인(20+)",
        "브랜드디자인(20+)",
      ];
      this.TAB_PROJECTS = [
        [
          {
            id: 1001,
            title: "모바일 앱 UX 리뉴얼",
            category: "UX/UI",
            year: "'24",
            icon: "📱",
            grad: g("#FFB3CC", "#FF7FA8"),
            img: "./img/p1001.jpg",
            images: ["./img/p1001-1.jpg", "./img/p1001-2.jpg"],
            role: "UX/UI Designer · 리서치, 프로토타이핑",
            summary: "모바일 앱 전반의 UX를 재설계한 프로젝트입니다.",
            problem: "복잡한 네비게이션으로 이탈률이 높았습니다.",
            approach: [
              "사용자 인터뷰 진행",
              "화면 흐름 간소화",
              "프로토타입 테스트",
            ],
            results: [
              { value: "+30%", label: "전환율" },
              { value: "-25%", label: "이탈률" },
              { value: "4.5★", label: "평점" },
            ],
            tags: ["UX", "모바일"],
          },
          {
            id: 1002,
            title: "웹 대시보드 UI 설계",
            category: "UX/UI",
            year: "'24",
            icon: "💻",
            grad: g("#FFD1E0", "#FFA6C4"),
            img: "./img/p1002.jpg",
            images: ["./img/p1002-1.jpg", "./img/p1002-2.jpg"],
            role: "UI Designer · 정보구조, UI",
            summary: "데이터 기반 대시보드 UI 설계 프로젝트입니다.",
            problem: "복잡한 데이터를 한눈에 파악하기 어려웠습니다.",
            approach: [
              "정보 위계 재설계",
              "차트 컴포넌트 표준화",
              "사용성 테스트",
            ],
            results: [
              { value: "+40%", label: "업무효율" },
              { value: "-35%", label: "조회시간" },
              { value: "92%", label: "만족도" },
            ],
            tags: ["UI", "대시보드"],
          },
          {
            id: 1003,
            title: "관리자 페이지 리디자인",
            category: "UX/UI",
            year: "'23",
            icon: "🖥️",
            grad: g("#FFC9DD", "#FF8FB3"),
            img: "./img/p1003.jpg",
            images: ["./img/p1003-1.jpg", "./img/p1003-2.jpg"],
            role: "UX/UI Designer · 어드민 UX",
            summary: "내부 관리자 페이지 전면 리디자인 프로젝트입니다.",
            problem: "사용 빈도 높은 기능이 숨겨져 비효율이 발생했습니다.",
            approach: [
              "워크플로우 분석",
              "핵심 기능 우선 배치",
              "반응형 레이아웃 적용",
            ],
            results: [
              { value: "-40%", label: "작업시간" },
              { value: "+22%", label: "처리량" },
              { value: "88%", label: "만족도" },
            ],
            tags: ["어드민", "리디자인"],
          },
        ],
        [
          {
            id: 2001,
            title: "기업 SI 시스템 UI",
            category: "SI",
            year: "'24",
            icon: "🏢",
            grad: g("#FFB3CC", "#FF7FA8"),
            img: "./img/p2001.jpg",
            images: ["./img/p2001-1.jpg", "./img/p2001-2.jpg"],
            role: "UI Designer · SI 시스템",
            summary: "대기업 SI 시스템 전체 UI를 설계했습니다.",
            problem: "레거시 UI로 업무 효율이 낮았습니다.",
            approach: [
              "현행 업무 흐름 분석",
              "UI 구조 재설계",
              "파일럿 테스트",
            ],
            results: [
              { value: "+35%", label: "업무효율" },
              { value: "-30%", label: "오류율" },
              { value: "90%", label: "만족도" },
            ],
            tags: ["SI", "엔터프라이즈"],
          },
          {
            id: 2002,
            title: "건물 자동화 대시보드",
            category: "BAS",
            year: "'24",
            icon: "🏗️",
            grad: g("#FFD1E0", "#FFA6C4"),
            img: "./img/p2002.jpg",
            images: ["./img/p2002-1.jpg", "./img/p2002-2.jpg"],
            role: "UX/UI Designer · BAS",
            summary: "빌딩 자동화 시스템 모니터링 대시보드를 설계했습니다.",
            problem: "시스템 상태를 한 화면에서 파악하기 어려웠습니다.",
            approach: [
              "현장 관리자 인터뷰",
              "실시간 데이터 시각화",
              "알림 우선순위 체계",
            ],
            results: [
              { value: "-45%", label: "대응 시간" },
              { value: "+28%", label: "에너지 절감" },
              { value: "93%", label: "만족도" },
            ],
            tags: ["BAS", "대시보드"],
          },
          {
            id: 2003,
            title: "BEM 관리 시스템 UI",
            category: "BEM",
            year: "'23",
            icon: "📋",
            grad: g("#FFC9DD", "#FF8FB3"),
            img: "./img/p2003.jpg",
            images: ["./img/p2003-1.jpg", "./img/p2003-2.jpg"],
            role: "UI Designer · BEM",
            summary: "건물 에너지 관리 시스템 UI를 재설계했습니다.",
            problem: "에너지 소비 데이터 파악에 시간이 오래 걸렸습니다.",
            approach: [
              "에너지 지표 우선순위화",
              "실시간 알림 시스템",
              "리포트 자동화",
            ],
            results: [
              { value: "+20%", label: "에너지절감" },
              { value: "-50%", label: "보고 시간" },
              { value: "88%", label: "만족도" },
            ],
            tags: ["BEM", "에너지"],
          },
        ],
        [
          {
            id: 3001,
            title: "리빙룸 인테리어 제안",
            category: "실내",
            year: "'24",
            icon: "🛋️",
            grad: g("#FFB3CC", "#FF7FA8"),
            img: "./img/p3001.jpg",
            images: ["./img/p3001-1.jpg", "./img/p3001-2.jpg"],
            role: "Interior Designer · 주거",
            summary: "모던 미니멀 컨셉의 리빙룸 인테리어를 제안했습니다.",
            problem: "넓지만 활용도가 낮고 어수선한 공간이었습니다.",
            approach: [
              "라이프스타일 인터뷰",
              "공간 동선 재구성",
              "소재·컬러 컨셉 제안",
            ],
            results: [
              { value: "+40%", label: "공간 활용" },
              { value: "✓", label: "미니멀 구현" },
              { value: "★5.0", label: "만족도" },
            ],
            tags: ["리빙", "미니멀"],
          },
          {
            id: 3002,
            title: "소형 아파트 공간 기획",
            category: "실내",
            year: "'24",
            icon: "🏠",
            grad: g("#FFD1E0", "#FFA6C4"),
            img: "./img/p3002.jpg",
            images: ["./img/p3002-1.jpg", "./img/p3002-2.jpg"],
            role: "Interior Designer · 주거",
            summary: "25평 아파트의 공간 효율을 극대화한 기획안입니다.",
            problem: "좁은 면적으로 수납과 생활 공간이 부족했습니다.",
            approach: [
              "빌트인 수납 설계",
              "복합 기능 가구 제안",
              "컬러로 공간 확장감 연출",
            ],
            results: [
              { value: "+60%", label: "수납 공간" },
              { value: "✓", label: "개방감 확보" },
              { value: "★4.9", label: "만족도" },
            ],
            tags: ["소형", "공간기획"],
          },
          {
            id: 3003,
            title: "그린 오피스 환경 설계",
            category: "실내",
            year: "'23",
            icon: "🪴",
            grad: g("#FFC9DD", "#FF8FB3"),
            img: "./img/p3003.jpg",
            images: ["./img/p3003-1.jpg", "./img/p3003-2.jpg"],
            role: "Interior Designer · 오피스",
            summary: "자연 친화적 오피스 환경을 설계했습니다.",
            problem: "삭막한 사무 환경으로 직원 만족도가 낮았습니다.",
            approach: [
              "바이오필릭 디자인 적용",
              "그린월·식물 배치 계획",
              "자연채광 극대화",
            ],
            results: [
              { value: "+32%", label: "직원 만족" },
              { value: "-15%", label: "결근율" },
              { value: "✓", label: "그린 인증" },
            ],
            tags: ["오피스", "바이오필릭"],
          },
        ],
        [
          {
            id: 4001,
            title: "친환경 패키지 디자인",
            category: "패키지",
            year: "'24",
            icon: "📦",
            grad: g("#FFB3CC", "#FF7FA8"),
            img: "./img/p4001.jpg",
            images: ["./img/p4001-1.jpg", "./img/p4001-2.jpg"],
            role: "Package Designer · 친환경",
            summary: "100% 재활용 가능한 친환경 패키지를 디자인했습니다.",
            problem: "기존 패키지가 환경 기준을 충족하지 못했습니다.",
            approach: [
              "대체 소재 리서치",
              "구조 경량화 설계",
              "인증 취득 절차",
            ],
            results: [
              { value: "-80%", label: "플라스틱" },
              { value: "FSC", label: "인증 취득" },
              { value: "+30%", label: "브랜드 호감" },
            ],
            tags: ["친환경", "지속가능"],
          },
          {
            id: 4002,
            title: "시즌 기프트 패키지",
            category: "패키지",
            year: "'24",
            icon: "🎁",
            grad: g("#FFD1E0", "#FFA6C4"),
            img: "./img/p4002.jpg",
            images: ["./img/p4002-1.jpg", "./img/p4002-2.jpg"],
            role: "Package Designer · 기프트",
            summary: "연말 시즌 한정 프리미엄 패키지를 디자인했습니다.",
            problem: "시즌 한정 제품의 차별성이 부족했습니다.",
            approach: [
              "시즌 컨셉 무드보드",
              "특수 인쇄·후가공 적용",
              "세트 구성 기획",
            ],
            results: [
              { value: "+120%", label: "기프트 매출" },
              { value: "완판", label: "한정판" },
              { value: "★4.9", label: "만족도" },
            ],
            tags: ["기프트", "시즌한정"],
          },
          {
            id: 4003,
            title: "쇼핑백 브랜딩 디자인",
            category: "패키지",
            year: "'23",
            icon: "🛍️",
            grad: g("#FFC9DD", "#FF8FB3"),
            img: "./img/p4003.jpg",
            images: ["./img/p4003-1.jpg", "./img/p4003-2.jpg"],
            role: "Brand/Package Designer",
            summary: "리테일 브랜드의 쇼핑백 패키지를 디자인했습니다.",
            problem: "볼품없는 쇼핑백으로 브랜드 이미지가 저하됐습니다.",
            approach: [
              "브랜드 아이덴티티 반영",
              "소재·구조 최적화",
              "대량 생산 적용",
            ],
            results: [
              { value: "+50%", label: "브랜드 인지" },
              { value: "+25%", label: "재사용률" },
              { value: "✓", label: "광고 효과" },
            ],
            tags: ["쇼핑백", "브랜딩"],
          },
        ],
      ];
    }

    componentDidMount() {
      this._raf = requestAnimationFrame(this.tick);
      window.addEventListener("mousemove", this.onMouse);
      requestAnimationFrame(() => this._initSwiper());
    }

    componentDidUpdate() {
      const shouldHide = this.state.activeId != null;
      if (document.body.style.overflow !== (shouldHide ? "hidden" : "")) {
        document.body.style.overflow = shouldHide ? "hidden" : "";
      }
      if (this._lastTab !== this.state.activeTab) {
        this._lastTab = this.state.activeTab;
        requestAnimationFrame(() => this._initSwiper());
      }
    }

    componentWillUnmount() {
      cancelAnimationFrame(this._raf);
      window.removeEventListener("mousemove", this.onMouse);
      clearTimeout(this._closeT);
      clearTimeout(this._masonryCloseT);
      document.body.style.overflow = "";
      if (this._swiper) {
        this._swiper.destroy(true, true);
        this._swiper = null;
      }
      if (this._modalSwiper) {
        this._modalSwiper.destroy(true, true);
        this._modalSwiper = null;
      }
    }

    _initModalSwiper() {
      if (this._modalSwiper) {
        this._modalSwiper.destroy(true, true);
        this._modalSwiper = null;
      }
      const el = this._modalSwiperEl;
      if (!el || typeof Swiper === "undefined") return;
      this._modalSwiper = new Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        navigation: {
          prevEl: ".modal-thumb-prev",
          nextEl: ".modal-thumb-next",
        },
        pagination: { el: ".modal-thumb-pagination", clickable: true },
        observer: true,
        observeParents: true,
      });
    }

    _initSwiper() {
      if (this._swiper) {
        this._swiper.destroy(true, true);
        this._swiper = null;
      }
      const el = this._swiperEl;
      if (!el || typeof Swiper === "undefined") return;
      this._swiper = new Swiper(el, {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 24,
        loop: false,
        navigation: {
          prevEl: ".projects-btn-prev",
          nextEl: ".projects-btn-next",
        },
        pagination: {
          el: ".projects-pagination",
          clickable: true,
          dynamicBullets: false,
        },
        breakpoints: {
          0: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 20 },
          960: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 24 },
        },
        observer: true,
        observeParents: true,
      });
    }

    onMouse = (e) => {
      this._m.tx = e.clientX;
      this._m.ty = e.clientY;
    };

    tick = () => {
      const m = this._m;
      m.x += (m.tx - m.x) * 0.2;
      m.y += (m.ty - m.y) * 0.2;
      m.dx += (m.tx - m.dx) * 0.09;
      m.dy += (m.ty - m.dy) * 0.09;
      const f = this._follower;
      if (f)
        f.style.transform = `translate(${m.x}px,${m.y}px) translate(-50%,-50%)`;
      const d = this._dot;
      if (d)
        d.style.transform = `translate(${m.dx}px,${m.dy}px) translate(-50%,-50%)`;
      this._raf = requestAnimationFrame(this.tick);
    };

    setTab = (i) => {
      clearTimeout(this._masonryCloseT);
      this.setState({
        activeTab: i,
        masonryOpen: false,
        masonryClosing: false,
      });
    };

    openMasonry = () =>
      this.setState({ masonryOpen: true, masonryClosing: false });

    closeMasonry = () => {
      if (this.state.masonryClosing) return;
      this.setState({ masonryClosing: true });
      this._masonryCloseT = setTimeout(
        () => this.setState({ masonryOpen: false, masonryClosing: false }),
        this.MASONRY_CLOSE_DELAY,
      );
    };

    closeModal = () => {
      if (this.state.closing) return;
      this.setState({ closing: true });
      this._closeT = setTimeout(
        () => this.setState({ activeId: null, closing: false }),
        this.CLOSE_DELAY,
      );
    };

    stop = (e) => e.stopPropagation();

    renderVals() {
      const accent = this.props.primaryColor || "#FF4D8D";
      const activeTab = this.state.activeTab;
      const tabProjects = this.TAB_PROJECTS[activeTab] || [];

      const open = (id) => () => {
        clearTimeout(this._closeT);
        this.setState({ activeId: id, closing: false });
      };

      const tabs = this.TAB_LABELS.map((label, i) => ({
        label,
        click: () => this.setTab(i),
        style:
          i === activeTab
            ? `background:${accent};color:#fff;box-shadow:0 8px 20px rgba(255,77,141,.35);`
            : `background:#fff;color:#7a5867;box-shadow:0 4px 14px rgba(255,77,141,.13);`,
      }));

      const projects = tabProjects.slice(0, 3).map((p) => ({
        ...p,
        open: open(p.id),
        img: p.img || "./1.jpg",
        kpi: (p.results && p.results[0]) || { value: "", label: "" },
      }));
      const subProjects = this.SUB_PROJECTS.map((p) => ({
        ...p,
        open: open(p.id),
        img: p.img || "./1.jpg",
        kpi: (p.results && p.results[0]) || { value: "", label: "" },
      }));

      const allPool = this.SUB_PROJECTS.concat(
        this.TAB_PROJECTS.reduce((acc, arr) => acc.concat(arr), []),
      );
      const foundProject =
        allPool.find((p) => p.id === this.state.activeId) || null;
      const activeProject = foundProject
        ? {
            ...foundProject,
            img: foundProject.img || "./1.jpg",
            images:
              foundProject.images && foundProject.images.length
                ? foundProject.images
                : [foundProject.img || "./1.jpg"],
          }
        : null;

      const masonryImages = this.MASONRY_IMAGES[activeTab] || [];
      const masonryTabLabel = this.TAB_LABELS[activeTab] || "";

      return {
        setRoot: this.setRoot,
        setFollower: this.setFollower,
        setDot: this.setDot,
        setProjectsSwiper: this.setProjectsSwiper,
        setModalSwiper: this.setModalSwiper,
        closeModal: this.closeModal,
        stop: this.stop,
        accent,
        ownerName: this.props.ownerName || "유주연",
        role: this.props.role || "UX/UI 디자이너",
        tagline:
          this.props.tagline || "UI/UX 디자인 경험을 갖춘 8년차 디자이너",
        email: this.props.email || "yoojuy43@gmail.com",
        tabs,
        projects,
        subProjects,
        modalOpen: this.state.activeId != null,
        activeProject,
        modalAnim: this.state.closing
          ? "popOut .26s ease forwards"
          : "popBounce .5s cubic-bezier(0.34,1.56,0.64,1)",
        backdropAnim: this.state.closing
          ? "fadeOut .26s ease forwards"
          : "fadeIn .25s ease",
        masonryOpen: this.state.masonryOpen,
        masonryImages,
        masonryTabLabel,
        openMasonry: this.openMasonry,
        closeMasonry: this.closeMasonry,
        masonryAnim: this.state.masonryClosing
          ? "masonrySlideDown .3s ease forwards"
          : "masonrySlideUp .42s cubic-bezier(0.34,1.56,0.64,1) both",
        backdropMasonryAnim: this.state.masonryClosing
          ? "fadeOut .3s ease forwards"
          : "fadeIn .25s ease",
      };
    }
  }

  return Component;
};
