import { Booklet, TYRProduct } from './types';
import { bookletB3 } from './booklet_b3';
import { bookletB4 } from './booklet_b4';
import { bookletB5 } from './booklet_b5';

export const bookletData: Booklet[] = [
  {
    id: 'b1',
    title: '분석',
    subtitle: 'Principles of Fluid Resistance & Fabric Dynamics',
    author: 'Dr. Evelyn Carter',
    year: '2026 Edition',
    category: 'Who is?',
    coverColor: 'bg-blue-900 border-blue-400',
    themeColor: '#1e40af',
    description: 'An advanced exploration of modern marine hull friction and the design of high-altitude athletic fibers with reduced hydraulic resistivity. This volume summarizes key discoveries in hydro-tech fabric engineering.',
    image: '/src/assets/images/booklet_analysis_1780237424834.png',
    pages: [
      {
        title: 'Introduction to Hydro-Tactiles',
        content: 'Frictional resistance of dense polymers remains a primary bottleneck in both deep-sea yacht hull design and Olympic-grade performance sportswear. TYR Research Division presents empirical telemetry demonstrating a 12% reduction in surface boundary layer drag through hyper-microgroove patterns.'
      },
      {
        title: 'Boundary Layer Manipulation',
        content: 'Using biomimetic configurations inspired by shark dermal denticles, our latest weave optimizes kinetic water flow. Controlled turbulence in the micro-scale actually reduces overall skin friction drag when velocity exceeds 4.2 meters per second.'
      },
      {
        title: 'The Blue Fabric Matrix',
        content: 'Constructed from recycled deep-marine plastics and reinforced with titanium-plated thread, the Tyr-Hydro weave achieves unparalleled thermal stability while weighing 30% less than standard neoprene derivatives.'
      }
    ],
    specifications: [
      { label: 'Document Code', value: 'TYR-HP-2026' },
      { label: 'Classification', value: 'Technical Whitepaper' },
      { label: 'Optimal Fluid Temp', value: '12°C - 28°C' },
      { label: 'Dermal Drag Reduction', value: '-14.2%' }
    ]
  },
  {
    id: 'b2',
    title: '발송자 표시 제한',
    subtitle: '의문의 봉인 인장과 빛의 상위 마법',
    author: 'ZERO',
    year: '2026 Edition',
    category: 'Character',
    coverColor: 'bg-zinc-900 border-zinc-650',
    themeColor: '#18181b',
    description: '어느 날 우편함에 당도한 "발송자 표시 제한"의 마법 서한. 심장을 불사르는 강렬한 각성과 함께, 기사의 나라 유나와 국립 제4 무제투드를 떠나 세계의 진실에 마주하려는 소년 셰티르와 동료들의 대마법 서사시.',
    image: '/src/assets/images/b2_white_bg_1780578834806.png',
    pages: [
      {
        title: '세계관 설정 (World Config)',
        content: `■ 행성 시아 (Xiai)와 위성 체계
- 행성 시아 (Xiai): 지구의 수배에 달하는 거대한 행성으로, 광활한 영토로 인해 실질 지배권이 닿지 않아 통제 범위를 벗어난 '가변지대'가 존재합니다.
- 위성 궤도: 먼 비대칭 타원형 궤도를 도는 '뮤제(Meuige)'와 가까운 위성인 '피아테(Fiatei)', 그리고 '테사(Texa)'가 자전 주기를 장식합니다.
- 화폐 단위: 시아(가장 거대한 국가 예산 단위) > 피아테(고급품) > 테사(일반품) > 뮤제(대생활비) > 레이(일상 최소 단위)로 철저 연동됩니다.

■ 유에와 초자연 마법 공학 체계
- 유에 (Uie): 세상 삼라만상에 내포된 무속성 순수 마력 에너지 그 자체. 기초 의무 보급 교육을 받은 자라면 누구나 쉽게 탐지하고 운용할 수 있습니다.
- 아네 (Aene): 유에를 가공 및 변성한 실질적 마력. 기본적으로 구체적인 '이미지'를 투영하여 발현하나 제어 실패 시 역류 리스크가 따르기에 영창, 스크롤(마법서), 마법진이 주요 상용 매체로 통용됩니다.
  - 티아모 (Tiamo): 제한 연동 공간 내 임의의 물체를 지정 속도로 부양 및 운동시킴.
  - 티폰 (Tipon): 근거리 통신 전파 파동을 투사하여 복수의 개체에 전언 대뇌 전달.
  - 플레이트 (Plate): 고농도로 응집된 전 마력 갑옷을 몸체 외곽에 즉각적인 투사.
  - 슬라 (Sla): 마력 입자를 인계 응축하여 한순간에 지상 연쇄 폭발을 자아냄.
  - 포사주 (Fosaju): 근섬유 한계치를 보존 및 해제시켜 비정상적인 체력 강화를 증진.
  - 콘티네 (Contine): 무구에 일정량 유에를 지속 주입해 공격 한계 및 지속을 강화하는 버프.
- 마네 (Mane): 아네를 정교하게 복합 응용한 초자연 상위 계위 마법. 학술 마법 길드와 연합 등에서 연구 및 이론 축적이 진행 중인 미개척 장벽입니다.

■ 유에 총기 분류 및 탄약 역학
- 폭발식 작약탄: 탄환 후미에 유에를 가공 유입해 작약 폭파 반동으로 격발. 격발 반동이 거센 만큼 돌격 소총이나 저격총 등에 주로 사용. 날아가는 궤적에 마력 잔향이 남지 않아 감지가 불가능해 저점이 낮고 숙련가에 의존함.
- 추진식 뇌관탄: 총탄 내주에 유에를 직접 응압하여 점진식 제트 추진을 도모함. 격발 화염은 가시적이나 반동이 없으며, 비행 궤적에 뚜렷한 유에 마력 잔향이 남아 초심자 저격용에 애용.
- 유도식 마탄: 탄알에 극도로 동기화된 유에 의사를 이식해 공중 궤적을 임의 가이드. 시전자의 무마공 조작 실력에 의해 극단적인 전술 지배 속성을 보유.`
      },
      {
        title: '주요 캐릭터 분석 (Key Characters)',
        content: `■ 셰티르 (Cietyr)
- 종족: 수리부엉이 인수 (남)
- 핵심 속성: 기존의 마법 체제 체계를 뛰어넘은 고위 '빛의 마네' 각성자.
- 프로필: 라리스 아카데미아 학우. 과거 국제 물류업 가문이었으나 기사 토너먼트 이권 세력의 정치적 모략으로 전 재산과 작위를 강탈당한 아픈 과거를 지녔습니다. 이성과 이타적 성정이 공존하나, 스스로를 가문에 구속하며 다소 자존감이 미약한 심리 궤도를 지닙니다. 어느 날 돌연 불타오르는 날개 깃털과 함께 각성 편지를 수령한 후 마법의 진실을 향한 구도 여행을 선언합니다.

■ 라스 (Las)
- 종족: 여우 인수 (여)
- 핵심 속성: 극소 공학 영창 마법 최적화 및 극후반 '시간 결속 지탱'의 절대자.
- 프로필: 기사 제국 유나의 극빈 정책 구호 아래 자라난 고아 소녀. 자신을 돌봐준 셰티르에 대해 깊이 신뢰하면서도 다소 퉁명스럽게 구는 극단적 츤데레(여동생형) 성정을 지녔습니다. 훗날 차원 붕괴 한계선에서 동료들을 존속시키기 위해 스스로를 시간선의 궤적 속에 동결시키는 위업을 완수합니다.

■ 모어 이트니르 (Mor Uitnir)
- 종족: 평민 대장장이 가문 (남)
- 프로필: 하급 영주이자 뛰어난 금속 재질 세공사인 부모의 피를 이어받은 아카데미아 친구. 마법 재능에 자괴감을 느끼고 검술에 편중 전향했으나 단 한 자루의 날카로운 무구로 마법 방벽을 찢는 특출난 무력을 이룩하며, 훗날 셰티르에게 고유 검식을 전수하는 인물입니다.

■ 마코 테레피스 (Mecot Terapeace)
- 종족: 명문 기사 가문 (여)
- 프로필: 정치가 부친과 코치 모친을 둔 명사 가문 태생의 소꿉친구. 가문의 거대한 정치적 지위를 동경하면서도 한편으로 압박감에서 탈출하고 싶어 아카데미아에 입문하였으며, 셰티르의 은폐된 빛 마네 연구를 외곽에서 가장 강력하게 비호해 줍니다.`
      },
      {
        title: '스토리 콘티 및 연대기 (Story Plots)',
        content: `■ 제1화: 무제투드에서의 고뇌와 각성
- 평범한 일과 하교 후 봉인된 붉은 인장의 서한 수령. 편지는 인지 즉시 소진되고 수리부엉이 셰티르의 날개 죽지 끝에 고열의 눈부신 빛의 날개가 발흥.
- 2개월 동안 가문 연구진의 철저히 비공개 격리 감호 분석 속에서 마력 구조가 '빛 마네'로 전환되는 경향을 검출.
- 무제투드(중학교) 등교를 허가받았으나 가위표와 같은 마법 이단 시비와 차가운 배척의 시선을 극복하며 학내 검술 실전 단련에만 치중.

■ 제2화: 고아 소녀 라스와의 가변지대 여정
- 15세의 문턱, 아버지의 기나긴 추적 끝에 변두리 소가문 은둔지에서 기억의 끈을 가린 가엾은 고아 라스를 발견 및 구직 합류.
- 중등 과정의 중간고사 시기, 셰티르의 이단 마법 유무에 대한 동급생들의 강압적인 결투 압박 발흥. 마력 제어 제약기 스크롤을 활용해 상성에 얽매이지 않는 우월한 검기 무예로 이들을 압도함.
- 18세, 기사 명문 자제 테레를 고향에 배웅하고 자유를 꿈꾸는 라스와 함께 기사 제국 유나 국경 전선을 돌파.

■ 제3화: 연구 도시 익스티리와 마스베르크 도서관
- 국경 산맥 가변지대에서 무소속 '이름 없는 자' 모임과 합류해 빛의 전설적 실체 힌트를 입수.
- 삼각 세 줄기 입체 강줄기를 낀 국책 연구 도시 '익스티리 (Ixtiri)' 도서관에서 은둔형 서기 연구원 '마스베르크' 및 낙천적 다기능 학도 '에스델린'과 전설 고서를 번역하며 우주 위상 궤도설을 해설.`
      },
      {
        title: '제1화: 하늘의 장막과 인지의 불씨',
        content: `하늘의 장막이 푸르게 걷어지고, 대지를 무겁게 뒤덮던 은빛 안개가 아득히 자취를 감출 때, 여타 시아 행성의 아침 풍광이 늘 그렇듯 셰티르는 눈을 떴다.
수리부엉이의 잿빛 깃털 이식 귀가 햇살의 입사에 약동하며 기분 좋은 경련을 일으켰다.

“흐아아아…… 암…….”

셰티르는 가볍게 온몸의 관절을 늘려 스트레칭하며 단단한 목재 침상에서 내려왔다.
서둘러 고전주의 창살 창문을 밀자, 성채 물류 보관 시설 근처에서 부지런히 화물 상자를 나르는 가문 시종들이 시야각에 영입되었다.

어머니는 이른 새벽 아침부터 기사 리그 토너먼트 코칭 자리를 엄단하기 위해 길을 떠나셨고, 전임 마법 이사회 장벽을 연구하시던 아버지는 작년에 집을 나선 뒤 소식이 묘연했다.
은은한 버터 향기가 감도는 시종의 정성 어린 수프와 고기 빵 조각으로 비좁은 허기를 달랜 셰티르는, 이윽고 이단의 학림이라 표기된 '글라니우스 국립 제4 무제투드 교육 인프라' 로브 교복을 어깨에 가로질렀다.

교문을 향하는 산책로 끝에서, 어깨 위의 은색 가죽 가방 속에 깊숙이 내장되어 있던 가죽 편지 봉투가 무겁게 부딪히는 소리값을 인지함과 동시에, 그것이 발송인을 증명하는 어떤 마력 실링 왁스도 도색되어 있지 않은 완전한 밀봉 서한임을 알고 전율하기 시작했다.`
      }
    ],
    specifications: [
      { label: '세계관 무대 (World)', value: '행성 시아 (Xiai)' },
      { label: '마력 에너지 (Source)', value: '순수 마력 유에 (Uie)' },
      { label: '주요 학림 (Academy)', value: '라리스 아카데미아 (Laris)' },
      { label: '각성 계통 (Special)', value: '의문의 빛 마네 (Light)' }
    ]
  },
  bookletB5,
  bookletB3,
  bookletB4
];

export const tyrProducts: TYRProduct[] = [
  {
    id: 'p1',
    name: 'TYR Ocean Explorer Chrono',
    category: 'Who is?',
    price: '$1,450',
    description: 'Designed to merge technical deep-ocean resistance with an elegant, executive form factor. The blue and white layout on an abyssal black steel dial creates high legibility.',
    specs: ['600m Depth Rating', 'Anti-magnetic Outer Shielding', 'Titanium Grade-5 Shell', 'Super-LumiNova Dials'],
    colorVariants: [
      { name: 'Azure Marine', hex: '#2563eb' },
      { name: 'Glacier Silver', hex: '#e2e8f0' },
      { name: 'Abyssal Black', hex: '#09090b' }
    ],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600'
    ],
    features: [
      { title: 'Extreme Rigidity', desc: 'Serrated outer rotatable ring crafted from reinforced ceramic.' },
      { title: 'Zero Friction Strap', desc: 'Crafted with premium fluoroelastomer engineered directly with water drainage vents.' }
    ]
  },
  {
    id: 'p2',
    name: 'TYR Aero Shield Pro-Shell',
    category: 'Comics',
    price: '$680',
    description: 'A light-weight technical outer shell utilizing our trademark blue & white geometric weave. Completely windproof, water-repellent, and engineered for fast-paced marine expeditions.',
    specs: ['100% Recycled Ocean Polymers', 'Micro-grid Dynamic Venting', 'Graphene Core Insulation', 'Packable Compression Tech'],
    colorVariants: [
      { name: 'Ocean Aqua', hex: '#38bdf8' },
      { name: 'Pristine White', hex: '#ffffff' },
      { name: 'Cobalt Shield', hex: '#1d4ed8' }
    ],
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600'
    ],
    features: [
      { title: 'Hydro-repellent Barrier', desc: 'Water droplets roll off instantly without soaking into outer textile weave.' },
      { title: '360° Reflective Trim', desc: 'Glows clearly under emergency search beams or ambient vessel lights.' }
    ]
  },
  {
    id: 'p3',
    name: 'TYR Hydro-Sprint Hydrothermal Suit',
    category: 'Character',
    price: '$890',
    description: 'Crafted specifically to assist long-distance swimmers in chilly currents. Tailored lines of high-tech blue and gleaming white patterns stabilize posture and minimize muscular drag.',
    specs: ['Super-stretch Yamamoto Neoprene', '1.5mm Shoulder Agility Zones', 'Inner Heat-Retention Tech Lining', 'Heavy Duty Marine Zipper'],
    colorVariants: [
      { name: 'Deep Cobalt', hex: '#1e40af' },
      { name: 'Pure Ice White', hex: '#f8fafc' }
    ],
    images: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=600'
    ],
    features: [
      { title: 'Agility Panels', desc: 'Seamless compound shoulder cuts maximize reach and stroke force.' },
      { title: 'Thermal Guard Core', desc: 'Traps a microscopically thin warm border of water next to the skin.' }
    ]
  },
  {
    id: 'p4',
    name: 'TYR Media Synthesis Deck',
    category: 'Media',
    price: '$1,200',
    description: 'A pure media production deck optimized for extreme weather, designed following strict minimalist blue, white, and black guidelines.',
    specs: ['IPX7 Waterproof casing', 'Ultra-low latencies', 'Tactile faders', 'Ambient backlights'],
    colorVariants: [
      { name: 'Gloss White', hex: '#ffffff' },
      { name: 'Abyssal Blue', hex: '#1d4ed8' },
      { name: 'Midnight Black', hex: '#0a0a0c' }
    ],
    images: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600'
    ],
    features: [
      { title: 'Minimalist Controls', desc: 'Optimized touch strips for seamless manual tracking.' },
      { title: 'High Contrast Interface', desc: 'Designed purely in cobalt and absolute ivory tones.' }
    ]
  }
];
