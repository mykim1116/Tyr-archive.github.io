import { Booklet, TYRProduct } from './types';

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
        content: `■ 셰티르 (Shetyr)
- 종족: 수리부엉이 인수 (남)
- 핵심 속성: 기존의 마법 체제 체계를 뛰어넘은 고위 '빛의 마네' 각성자.
- 프로필: 라리스 아카데미아 학우. 과거 국제 물류업 가문이었으나 기사 토너먼트 이권 세력의 정치적 모략으로 전 재산과 작위를 강탈당한 아픈 과거를 지녔습니다. 이성과 이타적 성정이 공존하나, 스스로를 가문에 구속하며 다소 자존감이 미약한 심리 궤도를 지닙니다. 어느 날 돌연 불타오르는 날개 깃털과 함께 각성 편지를 수령한 후 마법의 진실을 향한 구도 여행을 선언합니다.

■ 라스 (Las)
- 종족: 여우 인수 (여)
- 핵심 속성: 극소 공학 영창 마법 최적화 및 극후반 '시간 결속 지탱'의 절대자.
- 프로필: 기사 제국 유나의 극빈 정책 구호 아래 자라난 고아 소녀. 자신을 돌봐준 셰티르에 대해 깊이 신뢰하면서도 다소 퉁명스럽게 구는 극단적 츤데레(여동생형) 성정을 지녔습니다. 훗날 차원 붕괴 한계선에서 동료들을 존속시키기 위해 스스로를 시간선의 궤적 속에 동결시키는 위업을 완수합니다.

■ 모어 이트니르 (More Uitnir)
- 종족: 평민 대장장이 가문 (남)
- 프로필: 하급 영주이자 뛰어난 금속 재질 세공사인 부모의 피를 이어받은 아카데미아 친구. 마법 재능에 자괴감을 느끼고 검술에 편중 전향했으나 단 한 자루의 날카로운 무구로 마법 방벽을 찢는 특출난 무력을 이룩하며, 훗날 셰티르에게 고유 검식을 전수하는 인물입니다.

■ 마코 테레피스 (Maco Terepeace)
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
  {
    id: 'b3',
    title: 'Alive',
    subtitle: '단편 서브컬처 판타지 소설 및 세계관 설정집',
    author: 'ZERO',
    year: '2026 Edition',
    category: 'Character',
    coverColor: 'bg-teal-950 border-teal-500',
    themeColor: '#0f766e',
    description: '인간과 인수 사이의 대전쟁 "대대적인 충돌" 이후, 무한 에너지 영구기관인 ‘파워락(Power Rack)’의 역장이 지탱하는 치열하고도 쓸쓸한 세상에 던져진 두 소녀의 이야기.',
    image: '/src/assets/images/b3_white_bg_1780578850230.png',
    pages: [
      {
        title: '세계관 설정 (World Config)',
        content: `■ 치유 및 서사 중심 판타지
과거에는 동물적 형상을 띤 강인한 신체 능력의 '인수'들이 세상을 지배하며 인간들을 하등하게 억압하고 착취하던 시대였습니다. 그러나 인간 측이 불가사의한 광석형 소형 동력기관 ‘파워락’을 조종·안정화하는 데 성공하며 전세가 일변, 최후의 승리와 새로운 역학 관계가 정립되었습니다.

■ 무한동력기관 : 파워락 (Power Rack)
- 역학적 본질: 파워락은 자체적인 '역장(Force Field)'을 형성하는 신비로운 고유 에너지를 투사합니다. 크기와 동력 강도에 따라 함선, 기동 장갑차, 스포츠 오토바이, 경비행기 등의 고압 동력 체계로 활용되는 핵심 군사 영구기관입니다.
- 위험성과 변수: 작동 중 마력적 과부하, 공간 소멸, 신체의 과접촉 시 급속 강화 작용과 더불어 시한부성 생체 거동 장애를 유발하는 극도의 양면성을 띱니다.

■ 역사 구분 : 4시론 (전조기 / 대전기 / 소강기 / 전후기)
- 전조기 (Ratio 5): 인간과 인수 쌍방 극단주의 단체의 우월설 대두 및 무력 배치 가열기.
- 대전기 (Ratio 11): 정권 찬탈과 대대적인 전란, 침략과 강탈, 그리고 이 시기 파워락의 본격 야전 기용.
- 소강기 (Ratio 7): 경제 파탄으로 대규모 국가 전면전은 소강 국면을 맞으나 국지 전란의 영속.
- 전후기 (Ratio 3): 생존 국가 단위의 소규모 연구 지탱기 및 파워락 상용 응용화 단계.`
      },
      {
        title: '주요 캐릭터 분석 (Key Characters)',
        content: `■ 에티야 (Etiya / 엘리나)
'적극적이고 사이코패스 같은 본성'에서 절망적인 파멸을 거친 뒤 '소극적이고 철저한 이성'으로 생존해 나가는 입체적 전생자 여우인수.
과거 세계에서 메타버스 촉각 슈트 및 VR 테스트 도중 전기 사고로 사망한 여대생의 자아를 지녔으며, 대충돌 소강기 시절 북방의 완충 무역국 최연소 제1왕녀로 환생했습니다. 파워락에 회의적인 국가 이념으로 인해 침략당해 동생 '리카'와 생이별한 채 잔인한 전란에 던져졌고, 토피 황실 기사단의 소탕 지시로부터 위화감을 인지해 생존 본능으로 루미나를 뒤따르게 됩니다.

■ 루미나 (Lumina)
'츤데레적인 흑백 레이어 투톤 설계'의 백색 설표 무인. 
대혼란기를 군림했던 전설적인 용병 부모의 수양딸로, 소탕 부대에 부모를 잃고 대인 기피 및 적의가 뼈에 사무쳐 전장 중심에 거센 피바람을 몰고 다녔습니다. 토피 대제국의 마케팅용 영웅(인수 회유책 광고판)으로 이용되어 오다 일순간 기시감과 공포를 느끼고 '명예 기사'로 은퇴, 감시의 눈을 피하기 위해 밤마다 미등록 빈민지대에서 기사 신분을 숨긴 채 장막 'The Shroud'의 흑막으로 비공식 암행 의적 생활을 영속하고 있습니다.`
      },
      {
        title: '스토리 콘티 & 타임라인 (Timeline)',
        content: `■ 제1막: 리카 시점의 균열과 종말
1. 다과회: 왕관의 무게를 힘겨워하던 언니 에티야와 그녀를 연민하면서도 차츰 권력욕과 두려움에 사로잡혀 언니를 끊임없이 경계하는 동생 리카의 쓸쓸한 정치 공방.
2. 멸망하는 무덤: 완충 거래로 자존하던 북방 완충지에 파워락 기반 고화력 보병 장갑 차량들이 침투하여 불꽃으로 물드는 왕궁. 리카와 약혼자는 에티야와 이별하여 동방 기류로 휩쓸리고, 약속만을 남긴 채 흩어지게 됩니다.

■ 제2막: 에티야 시점의 방황과 조우
1. 잔혹한 샛길: 노예 마차에 채워진 채 압송을 버티다 숲에 도적단과 토피 변경 군사들의 추가 기습을 겪고 본능적으로 전투에 돌입. 무표정 속에서 자아를 잃던 에티야 앞에 달빛처럼 백색 검을 휘두르던 기사 루미나가 난입하여 살육과 해방을 완수합니다.
2. 위험한 서약: 루미나의 압도적 기백을 알아챈 에티야는 타국 전생자임을 함구한 채 살아남기 위해 자진 추종을 결정, 소속 없는 망명 전사들의 비밀 결사 장막(The Shroud)의 비밀스러운 세계와 긴밀히 얽힙니다.`
      },
      {
        title: '소설 본문 1화 : 달빛 속의 붉은 검성',
        content: `“끽… 끼… 끼기이이익…. 쿵!! 가자, 이놈들아!!”
세찬 매서운 바람이 우리의 잔등을 난폭하게 밀어대는 적색 황야. 
붉은 핏빛으로 서서히 가라앉는 서쪽 지평선. 이런 날에 몇 사람의 인생이 송두리째 바뀌는 것은 그리 화려한 기적이 아니었다.

늘 그렇듯 자원이 한계선에 조여들 무렵 시작하는 습격질. 내일은 계산해 두지 않은 채 오늘 하루 벌어 삼켜 넘기는 이 쓰레기 같은 부락 무리.
그들은 노예 이송 마차를 습격하여 전리품을 취합하느라 도망친 호위 용병들의 시신을 밟으며 야비한 음성을 지르고 있었다.

그 자욱한 모닥불과 쾌락의 학살극 속, 마차 깊은 구석에서 사슬을 지탱하던 한 백안의 여우 소녀가 반항적인 잿빛 동공으로 그 난장판을 조용히 관조 중이었다.
소리가 완전히 지워지고 가늘게 가로지르는 은빛 선이 공중에 펄럭였다. 
순간 보스의 목덜미에서 뜨거워서 불쾌한 선홍빛 줄기가 솟아났고, 한 걸음 뒤에서 비웃던 도적의 시야가 기우뚱 꼬꾸라졌다.

그것은 찬란하리만치 차가운 월광 밑에서 피어오른 참수의 군무.
흰색 가죽 코트와 칠흑처럼 어두운 바지를 무심히 조율해 입은 은빛 머리칼의 설표 여성. 루미나였다.

“날 기억하지 마라, 멍청이들아. 난 선택권을 던진 거지, 동정을 보탠 게 아니니까.”
그녀는 붉어질 대로 붉어진 검신을 마른 가죽 면포에 슬쩍 훑어 닦은 후, 보따리를 동여맨 채 어둠이 가득한 숲 너머로 스산하게 스며들 듯 발걸음을 지워 나갔다.`
      },
      {
        title: '소설 본문 2화 : 제국의 관문과 임무',
        content: `“좋은 아침이네요, 루나 씨.”
“……적당히 해라.”
오늘도 여전히 어디서 얻어온 지 모를 호화로운 군용 배식빵을 입에 문 채 나를 '루나'라는 익명의 애칭으로 넉살스레 반기는 꼬리 달린 요물, 에티야.
자기는 본래 고귀한 대무역국의 일망타진된 왕녀였느니, 계승권을 제 발로 밀쳐 냈느니 하며 끝없이 나불대는 그녀의 수다를 가만히 듣고 있자면 머리가 다 아파 올 지경이다.

기사 은퇴 후 몸을 숨겨둔 오두막에서 기사 시절 걸쳤던 무거운 융단 코트로 갈아입은 뒤, 그녀의 손목을 가볍게 낚아채 토피 대제국의 외곽 성문 초소로 여정을 지속했다.

철기 통행 게이트의 명예 기사단을 향해 헐렁하게 경례를 날린 뒤 중앙 기사단 군사 종합부 청사로 이어지는 석재 계단.
“어라, 명예 단장님 아니쇼? 오늘은 웬 정식 브리핑입니까?”

세 줄 정렬의 기동 분대를 훈련하던 전 동료 기사단장, 은빛 날개 삼각별 세 개를 찬 찬란한 은광 제복이 시선에 가로막혀 온다.
“장막(The Shroud) 조사를 나가기 싫으면 이걸 해야지. 거리에 설치된 파워락들의 오동작을 다 가린 것뿐이다.”

그는 구겨져 말린 비밀 기동 명단을 내밀며 시선을 에티야의 새하얀 여우 귀에 고정했다.
“이 녀석은 정체가 뭔데 항상 뒤꽁무니에 달고 다니시는지?”
“마차 습격 현장에서 흘린 가공 전리품 하부 파츠 중 하나다. 신경 끄고 검술이나 보강해.”

나는 기사 명단 보를 다시 기사단장의 은가슴팍에 사정없이 팽개치듯 내던지며, 본격적으로 도성 지하에 뿌리내린 자경 조직 ‘장막’에 관한 기습 수사를 역기획하기 위해 발을 들였다.`
      }
    ],
    specifications: [
      { label: '세계관 장르', value: '서사형 판타지 (치유물)' },
      { label: '주요 메트릭', value: '영구기관 파워락 (Power Rack)' },
      { label: '전란 시대', value: '대전쟁 이후 전후기 3단계' },
      { label: '중심 세력', value: '토피 제국 & 자경단 장막 (Shroud)' }
    ]
  },
  {
    id: 'b4',
    title: '기반 캐릭터',
    subtitle: '스토리텔링과 캐릭터 설계 방법론 및 3대 게임 기반 신규 자아 창작',
    author: 'ZERO',
    year: '2026 Edition',
    category: 'Media',
    coverColor: 'bg-indigo-950 border-indigo-500',
    themeColor: '#4f46e5',
    description: '유저의 대표작인 "발송자 표시 제한"과 "Alive(everyday alive)"의 서사 작법을 입체적으로 해부하고, 그 특징적인 대칭적 내면 갈등과 고해상도 비주얼 묘사방식을 학습했습니다. 이를 토대로 명일방주, 블루 아카이브, 리버스: 1999의 세계관을 관통하는 독보적인 신규 캐릭터 6인을 창조했습니다.',
    image: '/src/assets/images/b4_white_bg_1780578868134.png',
    pages: [
      {
        title: '서사 및 캐릭터 창작 방법론 분석 (Methodology)',
        content: `■ '발송자 표시 제한' 및 'Alive' 데이터 분석 결과
1. 대칭형/반전형 내면 갈등 (Contrastive Psychological Conflict):
   - 주인공들은 명확한 양면성을 지닙니다. 예컨대 셰티르는 학문적 호기심과 무거운 가문 작학 속 자존감 미약이 얽히며, 에티야는 전생의 ‘적극적·사이코패스 본성’과 멸망 후 전생인으로서의 ‘소극적·극단적 이성’이 충돌합니다.
   
2. 감각적이고 고해상도인 비주얼/복식 묘사 (Cinematic Appearance Design):
   - 대충 얼버무리는 외모 대신 특유의 생생한 색상 대비(호박동색 눈동자, 흑백 레이어드 투톤 은발 머리, 등황색 불꽃 무늬 귀 끝)와 세계 정세가 투영된 고전 및 하이테크 하이브리드 제복(남청 기사 제복 조끼 코트, 가죽 벨티드 코르셋 자경단 보호 장구, 판금 은백색 갑옷)을 입혀 시각적 상질감을 자아냅니다.

3. 중심 오동작 역작/마법 연동 (System Mechanic Synergies):
   - 캐릭터의 서사는 장르의 중심 동력원(빛의 마네 마법 에너지, 영구기관인 파워락 역장 오동작)과 깊게 결합하며 기동전이나 은신 암행의 구체적 전술로 투입됩니다.`
      },
      {
        title: '명일방주 (Arknights) 기반 창작 캐릭터',
        content: `■ 아르카 (Arka) - 우르사스(Ursa) 종족의 위생 대원
- 소속: 로도스 아일랜드 (Rhodes Island) 외과 의료 팀
- 성격과 갈등: 과거 참혹한 제국 국경 전쟁터에서 본능적인 살육 전사로서 두각을 나타냈으나, 누군가를 베어넘기는 스스로의 피비린내 나는 폭력성을 저주하며 극단적으로 정밀하고 온화한 아츠 의무관으로 자신을 자호한 청년. 가벼운 외상 뒤에 감춰진 적들의 죽음과 삶을 제어하려는 통제 강박을 지님.
- 복식과 무장: 층이 곱게 잡힌 반수형 검은 곰 귀와 서늘한 얼음의 은청색 눈동자. 소독약 냄새가 묻어나는 백색 의무병 롱코트 안에 마그네틱 메디컬 실린더와 고농축 주사 앰플 가죽 허리 띠를 체결.
- 오리지늄 아츠: 인지 세포의 순간적인 융해와 수복 가속을 자아내는 세포 결속 아츠.

■ 리엔 (Lien) - 루포(Lupo) 종족의 유기병 사수
- 소속: 시라쿠사 마피아 잔존 세력 귀순자 / 현 로도스 아일랜드 일선 저격대
- 성격과 갈등: ‘차가운 총신 뒤에서 심장을 꿰뚫는 사형 집행자’의 업보를 걸머진 은발 소녀. 마피아 내 분쟁 소용돌이에서 낙오자로서 수많은 죄책감을 묵음으로 삼켰으며, 로도스에 안착한 뒤에는 수비 작전의 아군을 엄호하는 마지막 생명줄로 자임함.
- 복식과 무장: 날카로운 다크 그레이 늑대 귀와 매혹적인 진홍빛 홍안. 시라쿠사 테일러 피트 트렌치 블랙 롱코트에 튼튼한 어깨 전술 가드를 덧댔으며, 반동 방지용 기밀 탄창 조끼를 착용.
- 장비: 격발 시 주변 마력과 빛의 궤적을 억제해 궤적이 남지 않는 고압 추진 저격 소총인 '발터-9 (V-9 Sniper)'.`
      },
      {
        title: '블루 아카이브 (Blue Archive) 기반 창작 캐릭터',
        content: `■ 유리조노 카나데 (Yurizono Kanade)
- 소속: 트리니티 종합학원 구호기사단 소속 서포터
- 성격과 갈등: "세상의 고독한 생명들을 껴안겠다"는 구도의 천사적 선언 뒤에, 아군을 해치려는 이들에게는 소형 기관총을 주저 없이 난사하여 잔등을 벌집으로 만드는 거친 트리니티식 청정 광기와 내면의 기사도적 충동을 지닌 총학도.
- 복식과 무장: 머리에 위생병용 하얀 패브릭 헤어밴드 가드를 수놓았고, 머리 위엔 투명한 분홍빛 하트 형상의 헤일로가 반짝임. 깃 높은 백색 세일러 원피스에 튼튼한 크루세이더 더블 레더 매치 탄띠 벨레트를 입체 장착.
- 장비: 약학 앰플 발사용 소형 팩으로 기만 배치한 9mm 커스텀 서브머신건 "Sanctus Remedium".

■ 쿠로사키 시즈쿠 (Kurosaki Shizuku)
- 소속: 밀레니엄 사이언스 스쿨 세미나 산하 전술 해석 모듈실
- 성격과 갈등: 감정이 결여된 이진법 계산기 같은 사무적 시선 속에, 밤이 되면 아리우스 소대나 황무지 구역의 낙오 전력들에게 몰래 따뜻한 정제 칼로리바와 무선 전술 지도를 무상 전송하는 츤데레적 천재 학도.
- 복식과 무장: 귀밑에 스카이 블루 크리스털 통신 헤어핀 키트를 꽂았으며 뒤편으로 푸른 사각 입체 그리드 형태의 정밀 디지털 헤일로를 생성. 기동 편의성을 고려한 오버사이즈 텍스타일 롱 패딩 점퍼와 카본 견갑을 매치.
- 장비: 고화력 유도 마탄 및 좌표 감시용 초소형 광학 레이더 중계 드론 "Aegis-v4".`
      },
      {
        title: '리버스: 1999 (Reverse: 1999) 기반 창작 캐릭터',
        content: `■ 메리 엘리어트 (Mary Eliot)
- 속성/시대: 1960년대 런던 안개 지대 / 지성형 아르카니스트 (Arcanist)
- 성격과 갈등: 지극히 우아한 신사적 독서 생활과 비천한 음성 정화 사상을 고수하지만, 격노 시 촉각적 마력 수묵화를 소환해 상대를 삼켜 격리하는 대담하고 위험천만한 소유욕. 재단 조사원으로서 폭풍우(Storm) 속 실각한 문학 장서들의 고유 에너지를 복원하려 함.
- 복식과 무장: 차고 맑은 남빛의 동공에 중세풍 클래식 레이스 보닛 보닛 모자를 쓰고, 체크무늬 에드워디안 롱 벨벳 코트를 착용. 마력이 동조된 태엽식 아르카늄 충전 만년필을 소지.
- 마도술: 종이 위에 쓴 문장의 문맥을 물리 법칙으로 현현시키는 아르카늄 영창술 "묵염 장막 (Ink-Spill Tapestry)".

■ 알리스테어 (Alistair)
- 속성/시대: 19세기 말 파리 몽마르트르 극장 / 기벽 예술가
- 성격과 갈등: 타인을 비웃고 조소형 사극에 탐닉하는 사기꾼 극단장이지만, 정체는 폭풍우 속에 조용히 분해되는 길거리 광대 및 어린 배우들의 마지막 영혼 조각과 연기 대사를 가죽 보따리에 보존해 구출하려는 속정 깊은 영혼 연금술사.
- 복식과 무장: 안면 왼쪽을 비대칭으로 덮은 금속 세공 상아빛 해골 탈과 나른하게 점화되는 황금 야수안. 빅토리아 스타일의 주름진 크라바트 셔츠 카라와 자색 연미복 슈트웨어, 영혼 파동을 가두는 마도 봉인용 대형 트렁크 배낭을 가죽 줄로 동여맴.
- 마도술: 과거 죽어간 무대 위 외침들을 실체화하는 환영 음파 대사 "망령 독백 (Ghost Soliloquy) 회중시계".`
      }
    ],
    specifications: [
      { label: '설계 방법론 (Philosophy)', value: '대칭형 내면과 비주얼 폭식' },
      { label: '창작 세력 (Factions)', value: '로도스 / 트리니티 / 런던파' },
      { label: '동력 연동 (Source)', value: '아츠 / 헤일로 / 아르카눔' },
      { label: '주변 기류 (Core Sync)', value: '주변 인물 관계망 중심 설계' }
    ]
  }
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
