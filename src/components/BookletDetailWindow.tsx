import React, { useState, useRef } from 'react';
import { Booklet } from '../types';
import { ChevronLeft, X, ArrowLeft, ArrowRight, BookOpen, Sparkles, Target, Layers, Shield, Users, Compass, Bookmark, Settings, Palette, Play, Flame, Music, Volume2, VolumeX, Heart, MessageSquare, Share2, RotateCcw, Radio, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const getJapaneseSubtitle = (text: string): string => {
  const dict: Record<string, string> = {
    '셰티르: "정문으로 가자."': 'セティル「正面から行こう。」',
    '라스: "비효율적."': 'ラス「非効率的。」',
    '셰티르: "설마 또..."': 'セティル「まさか、また…」',
    '라스: (창문 가리킴)': 'ラス（窓を指差す）',
    '셰티르: "여긴 4층이야."': 'セティル「ここは４階だよ。」',
    '라스: "착지하면 1층."': 'ラス「着地すれば１階。」',
    '셰티르: \'학림 사람들은 여전히 나를 고립된 배척의 시선으로 바라보고 있어요. 이단 마법 원리를 품었다면서요.\'': 'セティル「学林の人々は相変わらず僕を疎外された視선で見つめています。」',
    '셰티르: \'하지만 내 날개 끝에서 부유하는 이 황금빛 마네 입자들은... 세상에서 가장 따뜻하게 나를 보호합니다.\'': 'セティル「でも、僕の羽の先で浮遊するこの黄金色のマナ粒子は、僕을一番温かく守ってくれます。」',
    '시스템: \'수리부엉이 청각 수용체 동기화. 무성음 주파수 [Tipon]의 영창 파동 감지 완료.\'': 'システム「ミミズク聴覚受容体同期化。無声音周波数【ティポン】の詠唱波動感知完了」',
    '셰티르: \'들려요... 공기의 진동과 한계령 너머에서 우릴 기다리는 가변지대의 깊은 침묵들이...\'': 'セティル「聞こえます…空気の振動と、可変地帯の深い沈黙が…」',
    '셰티르: \'편지를 은밀히 전송한 사람을 끝끝내 조우하는 날까지, 제 날개짓의 유도는 영원히 멈추지 않을 겁니다.\'': 'セティル「手紙を密かに伝送した人に会いに行くまで、僕の誘導は永遠に終わりません。」',
    '셰티르: \'서한의 봉인면... 발송인의 실체를 증명하는 어떤 가문 인장도, 점성도 흐르지 않아. 기이할 따름이야.\'': 'セティル「王家の封印…差出人の実体を表す家紋の印章が、何一つ流れていない。」',
    '라스: \'조심해, 셰티르! 대기의 질량이 급변하고 있어... 편지가 네 잠재 의장과 교호하며 각성하고 있단 말이야!\'': 'ラス「気を付けて、セティル！大気の質量が急変している…手紙が目覚めている！」',
    '시스템: \'봉인 마법 [Tiamo] 해제. 전방 10미터 연동 고유 질량의 무부하 부유 및 물리 질서 왜곡 시작.\'': 'システム「封印魔法【ティアモ】解除。前方10メートル固有質量の無負荷浮遊及び物理秩序歪曲開始」',
    '라스: \'가구들과 벽면의 장식들이 황금빛 은하의 흐름처럼 공중으로 부상하고 있어... 이 타오르는 광채는 도대체 뭐지?\'': 'ラス「家具と壁の装飾が、黄金の銀河のよう宙へ浮上している…この輝きは一体何？」',
    '셰티르: \'내 날개에서 뿜어져 나오는 이 마네의 빛무리가... 우리 앞에 펼쳐진 머나먼 구도의 진실을 가리키고 있어.\'': 'セティル「僕の羽から吹き出るマナの光群が…僕たちの行くべき真実を指し示している。」',
    "루미나: '오늘의 야전 보급 물자는 고강도 제련 주석 장갑 캔으로 보호되고 있군. 다급한 기로다.'": 'ルミナ「今日の野戦補給物資は高強度に製錬された錫のグローブ缶で保護されているな」',
    "루미나: '전용 개폐 도구가 손상되었다 하여 물러설 자는 아닐 터. 기사단장의 격식을 이 장갑에 실어 보이겠다.'": 'ル미나「専用器械が損傷したとて、退く者ではない。騎士団長の格式をこのグローブに乗せてみせよう」',
    "시스템: '기사용 풀플레이트 아머 내장 악력 보존 시스템 가동. 마력 임계치 초고압 도립.'": 'システム「騎士用フルプレートアーマー内蔵握力保存システム稼働。魔力臨界値超高圧突入」',
    "루미나: '포사주(Fosaju) 한계 한정 해제! 은백의 힘이여 기사의 장막을 뚫어다오! 대수합!!'": 'ル미나「フォサジュ限界完全解除！銀白の力よ、騎士の帳を貫け！大樹魂！！」',
    "에티야 공주: '...루미나. 무력은 훌륭하나 군용 식량이 사방에 영창 폭파되어 대파되었군. 손수건이나 받게나.'": 'エティヤ「…ルミナ。武力は素晴らしいが、軍用食糧が四方に吹き飛んで大破したな。ハンカチでも受け取れ」',
    "에티야: '북방 제국 최연소 왕녀의 신분은 화려한 영광이자 동시에 보이지 않는 위협이 가득한 유리 가시관입니다.'": 'エティヤ「最年少王女の身分は、華やかな栄光であり同時に見えない脅威に満ちたガラスの棘冠です」',
    "에티야: '가상의 긴 꿈에서 전생하여 터득한 장막 마법은, 나를 시기하여 독을 타는 그림자들의 배신을 드러내지요.'": 'エティヤ「仮想の長い夢から転生して体得した帳魔法は、私を裏切る影の裏切りを浮かび上がらせます」',
    "에티야: '오직 기품을 인증받은 은빛 성각 수레들과 등황빛 찻잎만이 내 식도에 들어설 가치가 있습니다.'": 'エティヤ「気品を認証された銀の聖角と、橙赤の茶葉だけが私の喉を通る価値があります」',
    "시스템: '식기 표면의 금속 반응 역추출 감지. 유독 마력 원자 동시 분해 개시.'": 'システム「食器表面の金属反応逆抽出感知。有毒魔力原子同時分解開始」',
    "에티야: '왕녀의 차스푼을 까맣게 태우다니 어리석은 암습이군요. 루미나 단장! 즉시 반역 역도의 영지를 영창 격벽하라.'": 'エティヤ「王女のティースプーンを黒焦げにするとは愚かな暗殺ですね。ル미ナ団長！直ちに反逆の領地を詠唱隔壁せよ」'
  };
  return dict[text] || text;
};

interface BookletDetailWindowProps {
  booklet: Booklet;
  onClose: () => void;
}

export default function BookletDetailWindow({ booklet, onClose }: BookletDetailWindowProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);

  const handleMainScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop > 305) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };
  const prevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };
  const nextPage = () => {
    setCurrentPage(prev => Math.min(booklet.pages.length - 1, prev + 1));
  };
  const [aliveTab, setAliveTab] = useState<'settings' | 'characters' | 'timeline' | 'novels' | 'cartoon' | 'comics' | 'mediamix'>('settings');
  const [aliveEpisode, setAliveEpisode] = useState<number>(0);

  const mainScrollRef = useRef<HTMLDivElement>(null);
  const blueArchiveSectionRef = useRef<HTMLDivElement>(null);
  const arknightsSectionRef = useRef<HTMLDivElement>(null);

  const b2Videos = [
    {
      id: "b2-v1",
      title: "공식 캐릭터 영화 | 라스 - 침묵의 인도자 🦅",
      sub: "소리굽쇠 동조식 // 기획 비주얼",
      desc: "라리스 아카데미아의 험준한 외벽 정벽. 공학 수리부엉이의 청각 수용체 동기화 및 무성음 영창 파동 [Tipon]의 신비로운 실체화를 묘사한 단편 필름. 칠흑투성이 밤하늘 속, 흩어지는 황금빛 마네 입자 연출을 극강의 프레임으로 가동합니다.",
      character: "라스 및 셰티르",
      avatar: "/src/assets/images/las_concept_art_1780826548721.png",
      coverImage: "/src/assets/images/las_concept_art_1780826548721.png",
      isAmberTheme: true,
      duration: 15,
      subtitles: [
        { time: 0, text: '셰티르: "정문으로 가자."', speaker: "셰티르" },
        { time: 3, text: '라스: "비효율적."', speaker: "라스" },
        { time: 6, text: '셰티르: "설마 또..."', speaker: "셰티르" },
        { time: 9, text: '라스: (창문 가리킴)', speaker: "라스" },
        { time: 12, text: '셰티르: "여긴 4층이야."', speaker: "셰티르" },
        { time: 15, text: '라스: "착지하면 1층."', speaker: "라스" }
      ],
      initialComments: []
    },
    {
      id: "b2-v2",
      title: "캐릭터 트레일러 | 셰티르 - 잿빛 우수(憂愁) 🦉",
      sub: "소리굽쇠 수명 기전 // 셰티르 프로필 요약",
      desc: "라리스 아카데미아의 버려진 정원. 수리부엉이의 미세한 귓깃 떨림과 비박동성 유에(Uie) 파동을 감지하는 정교한 시퀀스. 현실에 덧씌워진 고밀도 마력 주파수의 변화를 시각적으로 실체화하여 은폐된 이단의 내면을 슬프고 투명하게 담아냈습니다.",
      character: "셰티르",
      avatar: "/src/assets/images/shetyr_cover_art_1780299676615.png",
      coverImage: "/src/assets/images/shetyr_anime_shorts_2_1780485340337.png",
      isAmberTheme: true,
      duration: 15,
      subtitles: [
        { time: 0, text: "셰티르: '학림 사람들은 여전히 나를 고립된 배척의 시선으로 바라보고 있어요. 이단 마법 원리를 품었다면서요.'", speaker: "셰티르" },
        { time: 3, text: "셰티르: '하지만 내 날개 끝에서 부유하는 이 황금빛 마네 입자들은... 세상에서 가장 따뜻하게 나를 보호합니다.'", speaker: "셰티르" },
        { time: 6, text: "시스템: '수리부엉이 청각 수용체 동기화. 무성음 주파수 [Tipon]의 영창 파동 감지 완료.'", speaker: "시스템" },
        { time: 9, text: "셰티르: '들려요... 공기의 진동과 한계령 너머에서 우릴 기다리는 가변지대의 깊은 침묵들이...'", speaker: "셰티르" },
        { time: 12, text: "셰티르: '편지를 은밀히 전송한 사람을 끝끝내 조우하는 날까지, 제 날개짓의 유도는 영원히 멈추지 않을 겁니다.'", speaker: "셰티르" }
      ],
      initialComments: []
    },
    {
      id: "b2-v3",
      title: "메인 트레일러 | 붉은 인장의 서한 - Tiamo ✉️",
      sub: "붉은 밀랍 인장 개봉 // 불가사의한 일화",
      desc: "붉은 실링 왁스로 견고하게 보호된 발송인 미상의 마법 서한. 밀동 해제되는 찰나, 심장을 관통하는 고열의 눈부신 빛과 함께 무중력 공간 부진 마법 [Tiamo]이 대폭발하는 명장면을 구현했습니다. 가구들과 주위 연동 공간들이 소리 없이 우주로 부상하는 초고화질 연출.",
      character: "라스 및 셰티르",
      avatar: "/src/assets/images/las_concept_art_1780826548721.png",
      coverImage: "/src/assets/images/tiamo_anime_shorts_3_1780485357041.png",
      isAmberTheme: true,
      duration: 15,
      subtitles: [
        { time: 0, text: "셰티르: '서한의 봉인면... 발송인의 실체를 증명하는 어떤 가문 인장도, 점성도 흐르지 않아. 기이할 따름이야.'", speaker: "셰티르" },
        { time: 3, text: "라스: '조심해, 셰티르! 대기의 질량이 급변하고 있어... 편지가 네 잠재 의장과 교호하며 각성하고 있단 말이야!'", speaker: "라스" },
        { time: 6, text: "시스템: '봉인 마법 [Tiamo] 해제. 전방 10미터 연동 고유 질량의 무부하 부유 및 물리 질서 왜곡 시작.'", speaker: "라스" },
        { time: 9, text: "라스: '가구들과 벽면의 장식들이 황금빛 은하의 흐름처럼 공중으로 부상하고 있어... 이 타오르는 광채는 도대체 뭐지?'", speaker: "라스" },
        { time: 12, text: "셰티르: '내 날개에서 뿜어져 나오는 이 마네의 빛무리가... 우리 앞에 펼쳐진 머나먼 구도의 진실을 가리키고 있어.'", speaker: "셰티르" }
      ],
      initialComments: []
    }
  ];

  const b3Videos = [
    {
      id: "b3-v1",
      title: "공식 4컷 극장 | 판금 갑옷의 괴력 소동 💥",
      sub: "마네 주파수 // 에브리데이 애니메이션",
      desc: "품위 넘치는 황실 드레스를 입은 채 배고픔에 굶주린 에티야 공주와, 정교한 은백색 판금 아머를 걸친 츤데레 설표 기사 루미나의 엉뚱하고 귀여운 중세 비상 공급 소동극입니다.",
      character: "에티야 및 루미나",
      avatar: "/src/assets/images/etiya_lightnovel_1780244566911.png",
      coverImage: "/src/assets/images/etiya_lightnovel_1780244566911.png",
      isAmberTheme: false,
      duration: 15,
      subtitles: [
        { time: 0, text: '에티야: "루미나, 우리 비상식량 캔은 어디 있어?"', speaker: "에티야" },
        { time: 3, text: '루미나: "여기 있습니다만, 캔 오프너가 고장 났습니다."', speaker: "루미나" },
        { time: 6, text: '에티야: "그럼 어떻게 열라는... 잠깐만, 손으로?!"', speaker: "에티야" },
        { time: 9, text: '루미나: "콰직! (맨손으로 캔을 파쇄해 내용물을 쏟아냄)"', speaker: "루미나" },
        { time: 12, text: '에티야: "...이걸 먹으라고 준 거야, 아니면 머리에 피도 안 마른 애 장난이야?"', speaker: "에티야" },
        { time: 15, text: '루미나: "최선을 다했습니다!"', speaker: "루미나" }
      ],
      initialComments: []
    },
    {
      id: "b3-v2",
      title: "정치 트레일러 | 장막 속의 위장 게이트 🌌",
      sub: "장막 마법 // 삼엄한 정치 시나리오",
      desc: "왕녀가 부딪치는 정치가들의 가식과 위협을, 장막 마법이라는 고유 메커니즘으로 방어하는 지극히 차분하면서도 삼엄한 정치 시나리오의 핵심입니다.",
      character: "에티야 및 제국 정치가들",
      avatar: "/src/assets/images/lumina_lightnovel_1780244584807.png",
      coverImage: "/src/assets/images/lumina_lightnovel_1780244584807.png",
      isAmberTheme: false,
      duration: 15,
      subtitles: [
        { time: 0, text: '제국 인사: "황실 생존자 에티야 공주님이시군요. 협상에 응하십시오."', speaker: "제국 정치가" },
        { time: 3, text: '에티야: "당신들의 제안은 단순한 협박일 뿐이에요."', speaker: "에티야" },
        { time: 6, text: '루미나: "공주님, 뒤로 물러서십시오. 장막 마법 장벽을 전개합니다."', speaker: "루미나" },
        { time: 9, text: '시스템: "장막 배리어 필드 활성화 완료. 외부 영창 역탐지 보정 장치 가동."', speaker: "시스템" },
        { time: 12, text: '제국 인사: "말도 안 돼! 우리 마도 신호가 전혀 닿지 않아...!"', speaker: "제국 정치가" },
        { time: 15, text: '에티야: "이게 우리의 대답이에요."', speaker: "에티야" }
      ],
      initialComments: []
    }
  ];

  const isAnalysisBooklet = booklet.id === 'b1';
  const isB2 = booklet.id === 'b2';
  const isB3 = booklet.id === 'b3';
  const isB4 = booklet.id === 'b4';
  const isStoryBooklet = isB2 || isB3;

  const videosList = isB2 ? b2Videos : b3Videos;

  const [selectedVideoId, setSelectedVideoId] = useState<string>(booklet.id === 'b3' ? 'b3-v1' : 'b2-v1');
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [b4GameTab, setB4GameTab] = useState<'methodology' | 'arknights' | 'bluearchive' | 'reverse1999'>('methodology');

  const activeVideo = isB2 
    ? (b2Videos.find(v => v.id === selectedVideoId) || b2Videos[0])
    : (b3Videos.find(v => v.id === selectedVideoId) || b3Videos[0]);

  const currentSecond = (videoProgress / 100) * (activeVideo?.duration || 15);
  const activeSubtitle = activeVideo?.subtitles?.find((s, idx) => {
    const nextS = activeVideo.subtitles[idx + 1];
    const endTime = nextS ? nextS.time : activeVideo.duration;
    return currentSecond >= s.time && currentSecond < endTime;
  }) || activeVideo?.subtitles?.[0];

  const gradientClass = isB2 
    ? 'from-amber-600 via-zinc-900 to-zinc-950 font-sans'
    : 'from-teal-600 via-zinc-900 to-zinc-950 font-sans';

  const textHighlight = isB2 ? 'text-amber-400' : 'text-teal-400';
  const accentMetric = isB2 ? 'COSMIC ENERGY' : 'POWER RACK ENERGY';
  const accentBorderB = isB2 ? 'border-amber-500 text-amber-500' : 'border-teal-500 text-teal-500';

  const [userLikedVideos, setUserLikedVideos] = useState<Record<string, boolean>>({});
  const [videoLikes, setVideoLikes] = useState<Record<string, number>>({
    "b2-v1": 342,
    "b2-v2": 194,
    "b2-v3": 512,
    "b3-v1": 841,
    "b3-v2": 629
  });
  const [videoComments, setVideoComments] = useState<Record<string, any[]>>({});

  const handleLike = (videoId: string) => {
    setUserLikedVideos(prev => {
      const isLiked = !prev[videoId];
      setVideoLikes(likes => ({
        ...likes,
        [videoId]: (likes[videoId] || 0) + (isLiked ? 1 : -1)
      }));
      return {
        ...prev,
        [videoId]: isLiked
      };
    });
  };

  const getCommentsForVideo = (videoId: string, initialComments: any[] = []) => {
    return videoComments[videoId] || initialComments || [];
  };

  const handleScrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  React.useEffect(() => {
    let intervalId: any;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 1;
        });
      }, 150);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying]);

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 150 }}
      className="absolute inset-0 z-30 flex bg-white select-none text-zinc-900 overflow-hidden"
    >
      {/* 1. Left Spine/Blue Band: Larger and beautifully styled in white text, vertical title */}
      <div 
        onClick={onClose}
        className="w-20 sm:w-24 md:w-28 bg-blue-600 hover:bg-blue-500 flex flex-col items-center justify-between py-10 shrink-0 cursor-pointer transition-all duration-300 relative border-r border-blue-700/25 group shadow-lg"
        title="책자 닫기 (클릭하여 축소)"
      >
        <div className="flex flex-col items-center gap-1 opacity-60 group-hover:opacity-100 transition duration-300 text-white">
          <ChevronLeft className="w-6 h-6" />
          <span className="font-mono text-[9px] tracking-widest font-black uppercase">CLOSE</span>
        </div>

        {/* 75% Scale matching the booklet waterfalls title font size */}
        <h3 
          className="font-sans font-black text-base sm:text-xl md:text-2xl lg:text-[25px] text-white tracking-widest text-center uppercase whitespace-nowrap select-none px-1"
          style={{ writingMode: 'vertical-rl' }}
        >
          {booklet.title}
        </h3>

        <div className="text-[10px] font-mono tracking-widest text-blue-200/60 uppercase font-black group-hover:text-white transition duration-300">
          {booklet.id} // IN
        </div>
      </div>

      {/* 2. Main White Plate with native scroll support */}
      <div 
        ref={mainScrollRef}
        onScroll={handleMainScroll}
        className="flex-1 bg-white p-6 sm:p-10 md:p-12 flex flex-col justify-between overflow-y-auto relative text-zinc-900 scroll-smooth"
      >
        
        {/* Simple header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-155 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="font-black uppercase tracking-widest text-zinc-700">{booklet.category}</span>
          </div>

          <button 
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-zinc-400 hover:text-blue-600 hover:bg-zinc-100 rounded-lg transition duration-300"
          >
            <span>COLLAPSE</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* CUSTOM LAYOUT FOR ANALYSIS BOOKLET */}
        {isAnalysisBooklet ? (
          <div className="flex-1 mt-8 flex flex-col gap-12">
            {/* Intro Header & Dynamic Brand Trigger Buttons */}
            <div className="p-8 sm:p-10 bg-zinc-50 border border-zinc-150 rounded-2xl flex flex-col xl:flex-row items-center justify-between gap-8 shadow-sm">
              <div className="space-y-4 max-w-2xl">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-black bg-blue-100 text-blue-700 uppercase tracking-widest shadow-xs">
                  <Sparkles className="w-4 h-4" /> Core Game Architecture
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-zinc-950 leading-tight tracking-tight">
                  서브컬처 게임 기획 분석 책자
                </h2>
                <p className="font-sans text-sm sm:text-base text-zinc-650 font-normal leading-relaxed">
                  국내 및 글로벌 서브컬처 시장의 핵심 양대 축을 이루는 대표작, <strong className="text-blue-600 font-extrabold">'블루아카이브'</strong>와 <strong className="text-zinc-900 font-extrabold">'명일방주'</strong>의 시스템 설계 및 기획적 강점을 심도있게 분석합니다. 아래 버튼을 클릭하면 메인 화면이 아래로 부드럽게 스크롤되며 상세 분석 영역으로 안내합니다.
                </p>
              </div>

              {/* Two highly stylised CTA scroll-trigger buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto shrink-0 justify-end">
                <button
                  onClick={() => handleScrollToSection(blueArchiveSectionRef)}
                  className="px-8 py-5 rounded-xl font-sans font-black text-sm sm:text-base tracking-wider uppercase text-white bg-sky-500 hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-500/20 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                  블루아카이브 기획 분석
                </button>
                <button
                  onClick={() => handleScrollToSection(arknightsSectionRef)}
                  className="px-8 py-5 rounded-xl font-sans font-black text-sm sm:text-base tracking-wider uppercase text-white bg-zinc-900 hover:bg-zinc-850 hover:shadow-lg hover:shadow-black/20 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
                  명일방주 기획 분석
                </button>
              </div>
            </div>

            {/* Quick specifications banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y-2 border-zinc-100 bg-zinc-50/30 rounded-lg px-4">
              <div className="text-center md:border-r border-zinc-200 py-2">
                <span className="block text-xs font-mono text-zinc-400 font-black tracking-widest uppercase mb-1">TARGET SYSTEM</span>
                <span className="text-sm sm:text-base font-sans font-black text-zinc-800">모바일 Gacha RPG</span>
              </div>
              <div className="text-center md:border-r border-zinc-200 py-2">
                <span className="block text-xs font-mono text-zinc-400 font-black tracking-widest uppercase mb-1 flex items-center justify-center">RESEARCH METHOD</span>
                <span className="text-sm sm:text-base font-sans font-black text-zinc-800">역기획 및 UX 분석</span>
              </div>
              <div className="text-center md:border-r border-zinc-200 py-2">
                <span className="block text-xs font-mono text-zinc-400 font-black tracking-widest uppercase mb-1">DATA INSIGHTS</span>
                <span className="text-sm sm:text-base font-sans font-black text-zinc-800">유저 리텐션 및 BM</span>
              </div>
              <div className="text-center py-2">
                <span className="block text-xs font-mono text-zinc-400 font-black tracking-widest uppercase mb-1">LAST UPDATED</span>
                <span className="text-sm sm:text-base font-sans font-black text-zinc-800">2026 Season 1</span>
              </div>
            </div>

            {/* Content Segment 1: Blue Archive design analysis section */}
            <div 
              ref={blueArchiveSectionRef}
              className="pt-12 border-t border-zinc-150 scroll-mt-6"
            >
              <div className="p-8 md:p-12 rounded-3xl border border-sky-100 bg-sky-50/40 space-y-8 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-600 shrink-0 shadow-inner">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-mono text-xs text-sky-600 font-extrabold tracking-widest uppercase mb-0.5">NEXON GAMES // ADORABLE CHIBI</span>
                    <h3 className="font-sans font-black text-xl sm:text-2xl md:text-3xl text-zinc-950 tracking-tight leading-normal">
                      블루아카이브 기획 및 우수 시스템 분석
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-4 p-6 bg-white rounded-2xl border border-sky-100/60 shadow-xs">
                    <h4 className="font-sans font-black text-base sm:text-lg text-sky-800 uppercase tracking-tight flex items-center gap-2 border-b border-sky-50 pb-2">
                      <span className="text-xs font-mono bg-sky-100 text-sky-700 px-2.5 py-0.5 rounded-md">POINT 1</span>
                      소구 및 감성 기획 (Story & MomoTalk)
                    </h4>
                    <p className="font-sans text-sm sm:text-base leading-relaxed text-zinc-700 font-normal">
                      블루아카이브는 무겁고 어두운 포스트 아포칼립스적 클리셰를 기획적으로 정반대로 타개하고, <strong className="text-sky-600 font-bold">'청량함 넘치는 학원 밀리터리 일상물'</strong>이라는 독창적인 영역을 공략했습니다. 전형적으로 일방향적인 연출에서 벗어나, 메신저 형태의 '모모톡(MomoTalk)' 시스템을 핵심 UX로 전면에 배치하여 플레이어와 캐릭터 간의 양방향 인터랙션 연출을 극대화했습니다. 캐릭터가 보낸 메시지에 플레이어가 선택지로 답을 하고, 그에 대응해 호감도가 상승하거나 고유의 '인연 스토리(Memorial Lobby)'가 해금되는 구도는 유저로 하여금 메인 시나리오 외적으로 강력한 가상 현실적 몰입감을 형성하게 만듭니다.
                    </p>
                  </div>

                  <div className="space-y-4 p-6 bg-white rounded-2xl border border-sky-200/60 shadow-xs">
                    <h4 className="font-sans font-black text-base sm:text-lg text-sky-850 uppercase tracking-tight flex items-center gap-2 border-b border-sky-50 pb-2">
                      <span className="text-xs font-mono bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-md">POINT 2</span>
                      전투 시스템 및 SD 3D Chibi 연출
                    </h4>
                    <p className="font-sans text-sm sm:text-base leading-relaxed text-zinc-750 font-normal">
                      엄밀한 3D 전술 시뮬레이션 환경 위에 로우폴리곤 기반의 매우 귀여운 Chibi(꼬마) 캐릭터들을 영리하게 연출했습니다. 엄폐물(Cover)을 활용한 사격 물리 연출과 각 캐릭터 고유의 EX 스킬 컷인 카드 사용 구조는 기획적으로 간결하면서도 액션 연출의 저변 깊이를 획기적으로 상승시켰습니다.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Content Segment 2: Arknights design analysis section */}
            <div 
              ref={arknightsSectionRef}
              className="pt-12 border-t border-zinc-150 scroll-mt-6"
            >
              <div className="p-8 md:p-12 rounded-3xl border border-yellow-100 bg-yellow-50/20 space-y-8 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-600 shrink-0 shadow-inner">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-mono text-xs text-yellow-650 font-extrabold tracking-widest uppercase mb-0.5">HYPERGRYPH // STRATEGIC TOWER DEFENSE</span>
                    <h3 className="font-sans font-black text-xl sm:text-2xl md:text-3xl text-zinc-950 tracking-tight leading-normal">
                      명일방주 기획 및 우수 시스템 분석
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-4 p-6 bg-white rounded-2xl border border-yellow-100/60 shadow-xs">
                    <h4 className="font-sans font-black text-base sm:text-lg text-yellow-800 uppercase tracking-tight flex items-center gap-2 border-b border-yellow-50 pb-2">
                      <span className="text-xs font-mono bg-yellow-100 text-yellow-700 px-2.5 py-0.5 rounded-md">POINT 1</span>
                      하드코어 아포칼립스 세계관 및 UI 디자인
                    </h4>
                    <p className="font-sans text-sm sm:text-base leading-relaxed text-zinc-700 font-normal">
                      명일방주는 어둡고 세련된 포스트 아포칼립스 세계관을 중심에 세웠습니다. 불사적인 오리지늄 재앙과 광석병을 앓는 감염자들의 계급 갈등을 차갑고 매끄러운 텍스트 디자인과 극미니멀리즘 흑백 UI 아키텍처로 투영하여, 게임 전반의 비주얼을 하이엔드 테크 감성으로 극대화했습니다.
                    </p>
                  </div>

                  <div className="space-y-4 p-6 bg-white rounded-2xl border border-yellow-105/60 shadow-xs">
                    <h4 className="font-sans font-black text-base sm:text-lg text-yellow-850 uppercase tracking-tight flex items-center gap-2 border-b border-yellow-50 pb-2">
                      <span className="text-xs font-mono bg-yellow-100 text-yellow-700 px-2.5 py-0.5 rounded-md">POINT 2</span>
                      심도 깊은 수학적 레벨 디자인 및 장르 극복
                    </h4>
                    <p className="font-sans text-sm sm:text-base leading-relaxed text-zinc-700 font-normal">
                      고착화되었던 클래식 타워 디펜스(Tower Defense) 장르의 한계를 한 방향 흐름 제어, 고유 오리진 아츠 스킬, 저지수(Block) 시스템을 통해 완벽하게 극복했습니다. 저성 등급(3~4성) 캐릭터만으로도 영리한 배치와 타이밍 분석을 통해 고난이도의 보스 탐색 및 요격을 설계할 수 있도록 정교한 수학적 레벨 디자인을 완성했습니다.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        ) : isStoryBooklet ? (
          <div className="flex-1 mt-6 sm:mt-8 flex flex-col gap-8">
            {/* Header / Intro Box */}
            <div className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${gradientClass} text-white relative overflow-hidden border border-zinc-500/25 shadow-xl`}>
              <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-5 pointer-events-none scale-150 select-none">
                <Compass className={`w-64 h-64 ${textHighlight} rotate-12`} />
              </div>
              
              <div className="relative space-y-3 max-w-4xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 text-zinc-100 rounded-full text-[10px] font-mono font-black uppercase tracking-widest shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" /> SUB-CULTURE STORY ARCHIVE
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight">
                  {booklet.title} <span className={`${textHighlight} text-lg sm:text-xl font-medium font-serif italic`}>단편 소설 & 설정집</span>
                </h2>
                <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  {booklet.description}
                </p>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-[11px] font-mono text-zinc-400 border-t border-zinc-850/40">
                  <div>AUTHOR: <span className={`font-black ${textHighlight} text-xs`}>{booklet.author}</span></div>
                  <div>EDITION: <span className={`font-black ${textHighlight} text-xs`}>{booklet.year}</span></div>
                  <div>METRIC: <span className={`font-black ${textHighlight} text-xs`}>{accentMetric}</span></div>
                </div>
              </div>
            </div>

            {/* Custom Tab Bar */}
            <div className="flex border-b border-zinc-200 px-1 gap-2 overflow-x-auto scrollbar-none shrink-0">
              <button
                onClick={() => setAliveTab('settings')}
                className={`px-5 py-3 font-sans font-black text-[12px] uppercase tracking-wider flex items-center gap-2 border-b-2 transition duration-300 cursor-pointer ${
                  aliveTab === 'settings' 
                    ? accentBorderB 
                    : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Settings className="w-4 h-4" />
                세계관 설정 (LORE)
              </button>
              <button
                onClick={() => setAliveTab('characters')}
                className={`px-5 py-3 font-sans font-black text-[12px] uppercase tracking-wider flex items-center gap-2 border-b-2 transition duration-300 cursor-pointer ${
                  aliveTab === 'characters' 
                    ? accentBorderB 
                    : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Users className="w-4 h-4" />
                등장인물 분석 (CHARS)
              </button>
              <button
                onClick={() => setAliveTab('timeline')}
                className={`px-5 py-3 font-sans font-black text-[12px] uppercase tracking-wider flex items-center gap-2 border-b-2 transition duration-300 cursor-pointer ${
                  aliveTab === 'timeline' 
                    ? accentBorderB 
                    : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Compass className="w-4 h-4" />
                스토리 콘티 (PLOT)
              </button>
              <button
                onClick={() => setAliveTab('novels')}
                className={`px-5 py-3 font-sans font-black text-[12px] uppercase tracking-wider flex items-center gap-2 border-b-2 transition duration-300 cursor-pointer ${
                  aliveTab === 'novels' 
                    ? accentBorderB 
                    : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                소설 본문 단편 (NOVELS)
              </button>
              <button
                onClick={() => setAliveTab('cartoon')}
                className={`px-5 py-3 font-sans font-black text-[12px] uppercase tracking-wider flex items-center gap-2 border-b-2 transition duration-305 cursor-pointer ${
                  aliveTab === 'cartoon' 
                    ? accentBorderB 
                    : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Palette className="w-4 h-4" />
                {isB2 ? '공식 숏폼 (SHORTS)' : '만화/일러스트 (COMIC)'}
              </button>
              {isB2 && (
                <button
                  onClick={() => setAliveTab('comics')}
                  className={`px-5 py-3 font-sans font-black text-[12px] uppercase tracking-wider flex items-center gap-2 border-b-2 transition duration-305 cursor-pointer ${
                    aliveTab === 'comics' 
                      ? accentBorderB 
                      : 'border-transparent text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  코믹스 (COMICS)
                </button>
              )}
            </div>

            {/* Tab Contents with animations */}
            <div className="flex-1 overflow-visible">
              <AnimatePresence mode="wait">
                {aliveTab === 'settings' && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-8"
                  >
                    {isB2 ? (
                      /* b2 Settings */
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left: Uie Info */}
                        <div className="p-6 rounded-2xl bg-amber-50/40 border border-amber-100 flex flex-col gap-4">
                          <div className="flex items-center gap-3 border-b border-amber-100 pb-3 font-sans">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center animate-pulse">
                              <Shield className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="block font-mono text-[9px] uppercase tracking-widest text-amber-600 font-extrabold">ENERGY CLASS SYSTEM</span>
                              <h3 className="font-sans font-black text-base text-zinc-900">공학 마법 체계 : 유에, 아네, 마네</h3>
                            </div>
                          </div>
                          <ul className="space-y-3 font-sans text-xs sm:text-sm text-zinc-730 leading-relaxed font-light">
                            <li>
                              <strong className="text-amber-800 font-bold">● 유에 마력 원형:</strong> 세상 만류에 은은하게 내포된 순수 에너지 원형 자체입니다. 아주 기본적 아카데미아 의무 공교육 소양을 갖춘 사람이라면 대뇌로 즉각 유에 탐지와 기초 응집 발현이 가능합니다.
                            </li>
                            <li>
                              <strong className="text-amber-800 font-bold">● 아네 상용 마도:</strong> 영창을 고정시키고 오발 폭발과 역류 리스크를 완벽 완충하는 서판, 스크롤, 마법진 기하학이 고도로 발달되어 상업용 마법의 주류를 장비합니다.
                            </li>
                            <li>
                              <strong className="text-amber-800 font-bold">● 마네 최고 계위:</strong> 고차원 비행 및 물질 자체의 결합식을 완전 변형시키는 궁극의 학술 비술입니다. 학 길드 총연합에서마저도 미지의 구개 장벽으로 규정된 수수께끼 분야입니다.
                            </li>
                          </ul>
                        </div>

                        {/* Right: Planet Xiai Info */}
                        <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col gap-4">
                          <div className="flex items-center gap-3 border-b border-zinc-250 pb-3 font-sans">
                            <div className="w-10 h-10 rounded-xl bg-zinc-950/10 text-zinc-900 flex items-center justify-center">
                              <Layers className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="block font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-extrabold">COSMIC TRACK LAYERS</span>
                              <h3 className="font-sans font-black text-base text-zinc-900">행성 시아와 위성 궤도</h3>
                            </div>
                          </div>
                          <ul className="space-y-3 font-sans text-xs sm:text-sm text-zinc-730 leading-relaxed font-light">
                            <li>
                              <strong className="text-zinc-900 font-bold">● 거대 스케일 행성 시아:</strong> 지구 중력과 비교해도 압도적으로 광활한 영지를 지녔으며, 중앙 이념 통제권이 전혀 닿지 않아 지뢰 및 은거 수련자들이 지내는 거대한 '가변지대'가 전역에 걸쳐 공존합니다.
                            </li>
                            <li>
                              <strong className="text-zinc-900 font-bold">● 위성 궤도:</strong> 먼 비대칭 타원형 궤도를 도는 '뮤제(Meuige)'와 가까운 위성인 '피아테(Fiatei)', 그리고 '테사(Texa)'가 자전 주기를 장식합니다.
                            </li>
                            <li>
                              <strong className="text-zinc-900 font-bold">● 화폐 단위:</strong> 시아(국가 단위) &gt; 피아테 &gt; 테사 &gt; 뮤제 &gt; 레이로 철저하게 가치 연동됩니다.
                            </li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      /* b3 Settings Timeline */
                      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-50/50 border border-zinc-150 space-y-6">
                        <h4 className="font-sans font-black text-xs sm:text-sm tracking-widest text-zinc-500 font-bold uppercase flex items-center gap-2">
                          <Compass className="w-4 h-4 text-teal-600 animate-spin-slow" />
                          대대적 대충돌 이후 역사 4대 시기 분수값 (5 : 11 : 7 : 3)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                          <div className="p-4 rounded-xl bg-white border border-zinc-150 relative">
                            <span className="absolute top-2 right-3 font-mono font-black text-zinc-300 text-lg">01</span>
                            <span className="inline-block px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 font-mono text-[10px] font-black mb-2">전조기</span>
                            <p className="font-sans text-xs leading-relaxed text-zinc-650 font-normal">
                              인간과 인수 각 측에서 지능과 무력 신체를 기반으로 한 '종우월설'이 돌며 전선 긴장도가 달아오르던 선박 발흥 국면입니다.
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100 relative">
                            <span className="absolute top-2 right-3 font-mono font-black text-teal-200 text-lg">02</span>
                            <span className="inline-block px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-800 font-mono text-[10px] font-black mb-2">대전기</span>
                            <p className="font-sans text-xs leading-relaxed text-zinc-700 font-normal">
                              침략과 약탈 및 전면 범죄 수반. 이 시기에 인간 우위를 결정지은 핵심 무한 영구기관 ‘파워락(Power Rack)’이 역사 전면에 등장합니다.
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-white border border-zinc-150 relative">
                            <span className="absolute top-2 right-3 font-mono font-black text-zinc-300 text-lg">03</span>
                            <span className="inline-block px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 font-mono text-[10px] font-black mb-2">소강기</span>
                            <p className="font-sans text-xs leading-relaxed text-zinc-650 font-normal">
                              격렬국들의 급속한 경제 파탄으로 전면 기동 전투 수량은 줄어들었으나 여전히 소리 없는 세계 국지 투쟁은 영속되던 시기입니다.
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100 relative">
                            <span className="absolute top-2 right-3 font-mono font-black text-teal-200 text-lg">04</span>
                            <span className="inline-block px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-850 font-mono text-[10px] font-black mb-2">전후기</span>
                            <p className="font-sans text-xs leading-relaxed text-zinc-700 font-normal">
                              소수 불안정 전쟁 지속국을 빼고는 대다수가 정전에 접어들며, 안정화 상태 파워락 파동 특성을 이용한 각종 응용 기술 연구 장벽에 진입했습니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Weapon / Gun classifications for b2 */}
                    {isB2 && (
                      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-50/50 border border-zinc-150 space-y-6">
                        <h4 className="font-sans font-black text-xs sm:text-sm tracking-widest text-zinc-500 font-bold uppercase flex items-center gap-2">
                          <Radio className="w-4 h-4 text-amber-600" />
                          유에 총기 분류 및 탄약 마공 역학
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                          <div className="p-4 rounded-xl bg-white border border-zinc-150 relative">
                            <span className="absolute top-2 right-3 font-mono font-black text-zinc-300 text-lg">01</span>
                            <span className="inline-block px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 font-mono text-[10px] font-black mb-2">폭발식</span>
                            <p className="font-sans text-xs leading-relaxed text-zinc-650 font-normal">
                              총탄 후부에 마력을 뇌관 작약식으로 충전 폭발. 반동이 가공스러우나 마력의 궤적 입자가 남김없이 소거되어 보급에 최적인 공격 계위.
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100 relative">
                            <span className="absolute top-2 right-3 font-mono font-black text-amber-200 text-lg">02</span>
                            <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-mono text-[10px] font-black mb-2">추진식</span>
                            <p className="font-sans text-xs leading-relaxed text-zinc-700 font-normal">
                              총탄에 유에를 추진 제트 가스식으로 마력을 연소 분화 격탄. 반동이 완전히 부존하나 비행선 유에 잔해 연무가 긴 꼬리로 남아 적에게 조기 유도 검출.
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-white border border-zinc-150 relative">
                            <span className="absolute top-2 right-3 font-mono font-black text-zinc-300 text-lg">03</span>
                            <span className="inline-block px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 font-mono text-[10px] font-black mb-2">유도식</span>
                            <p className="font-sans text-xs leading-relaxed text-zinc-650 font-normal">
                              총신 탄환에 극 미세 유에적 자가 인식망을 입력 결합. 가동 시 인위적인 각도 회절 보정을 사수가 직접 실시간 교정 전개하는 최상위 전술식.
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100 relative">
                            <span className="absolute top-2 right-3 font-mono font-black text-amber-200 text-lg">04</span>
                            <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-850 font-mono text-[10px] font-black mb-2">투척식</span>
                            <p className="font-sans text-xs leading-relaxed text-zinc-700 font-normal">
                              아네로 물체를 포위 결합하여 무반동 투석하듯이 격발. 화기 공학 발달로 현재는 극소수 무소 국가를 제외한 나머지 제국에서 사문화된 방식.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {aliveTab === 'characters' && (
                  <motion.div
                    key="characters"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-8"
                  >
                    {isB2 ? (
                      /* b2 Characters Grid */
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Shetyr Card */}
                        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-amber-100 shadow-xs relative overflow-hidden flex flex-col justify-between">
                          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 font-black font-mono text-[90px] text-amber-50/50 pointer-events-none uppercase select-none">
                            OWL
                          </div>
                          <div className="space-y-4 relative">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-full border-2 border-amber-300 overflow-hidden shrink-0 shadow-md">
                                <img
                                  src="/src/assets/images/shetyr_cover_art_1780299676615.png"
                                  alt="Shetyr Avatar"
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono text-[9px] font-black px-2 py-0.5 rounded bg-amber-100 text-amber-805 uppercase">Light Chosen</span>
                                  <span className="font-mono text-[9px] font-black px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 uppercase">Eurasian Eagle-Owl</span>
                                </div>
                                <h3 className="font-sans font-black text-xl text-zinc-950 mt-1">셰티르 (Shetyr)</h3>
                              </div>
                            </div>

                            <span className="block h-[1px] bg-zinc-150/60" />

                            <p className="font-sans text-xs sm:text-sm text-zinc-750 leading-relaxed font-light font-normal text-zinc-700">
                              평범한 하교과정 도중 의문의 '발송자 표시 제한' 마력 편지를 개봉하고, 가슴 속 잠재원리에서 뿜어져 나오는 극상의 황금빛 마네를 현현화 시키기 시작한 수리부엉이 인수 소년입니다.
                            </p>
                            <p className="font-sans text-xs sm:text-sm text-zinc-750 leading-relaxed font-light font-normal text-amber-955">
                              <strong>[외형 및 복식 특징]</strong> 차갑고도 깊은 호박동색 눈동자와 고요하고 쓸쓸한 부엉이 털깃 귀, 빛으로 고열 반응을 내는 고아한 은수 날개를 지녔습니다. 엄격한 학림 생활에 대응하도록 정밀 수놓인 아카데미아의 깃 높은 남청 기사 제복 조끼 코트와 비밀 서한 가죽 매듭 벨트를 착용하고 있습니다.
                            </p>

                            <div className="mt-4 rounded-xl overflow-hidden aspect-[3/4] border border-amber-100 relative bg-zinc-50 shadow-xs flex items-center justify-center p-1">
                              <img
                                src="/src/assets/images/shetyr_cover_art_1780299676615.png"
                                alt="Shetyr Concept Art"
                                className="w-full h-full object-contain hover:scale-102 transition duration-550 ease-out"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent flex flex-col justify-end p-4 pt-12">
                                <span className="font-mono text-[9px] font-black text-amber-400 tracking-widest uppercase">DATALINK // PROTAGONIST DATA</span>
                                <h4 className="text-white text-xs sm:text-sm font-sans font-bold mt-0.5">셰티르 라이트 애니메이션 전신 원화 (Light Novel Art)</h4>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Las Card */}
                        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-amber-100 shadow-xs relative overflow-hidden flex flex-col justify-between font-sans">
                          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 font-black font-mono text-[90px] text-amber-50/50 pointer-events-none uppercase select-none">
                            CLOCK
                          </div>
                          <div className="space-y-4 relative">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-full border-2 border-amber-300 overflow-hidden shrink-0 shadow-md">
                                <img
                                  src="/src/assets/images/las_concept_art_1780826548721.png"
                                  alt="Las Avatar"
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono text-[9px] font-black px-2 py-0.5 rounded bg-amber-100 text-amber-855 uppercase">Chrono Weaver</span>
                                  <span className="font-mono text-[9px] font-black px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 uppercase">Fox Demihuman</span>
                                </div>
                                <h3 className="font-sans font-black text-xl text-zinc-950 mt-1">라스 (Las)</h3>
                              </div>
                            </div>

                            <span className="block h-[1px] bg-zinc-150/60" />

                            <p className="font-sans text-xs sm:text-sm text-zinc-750 leading-relaxed font-light font-normal text-zinc-700">
                              유나 제국의 외곽 빈민 지구에서 마법 영창을 극도로 압축 수련하며 은신해 오다 셰티르 일행에 안전 발탁된, 훗날 차원 끈을 끊어 시간을 멈추게 하는 불세출의 여우 인수 소녀입니다.
                            </p>
                            <p className="font-sans text-xs sm:text-sm text-zinc-750 leading-relaxed font-light font-normal text-amber-955">
                              <strong>[외형 및 복식 특징]</strong> 곱디고운 동색-살구빛 여우 귀와 풍만한 꼬리를 가졌으며, 다소 까칠하면서도 영리함을 내포한 감빛 동공을 지닙니다. 여우 가문 생존자로서 긴 바람을 피하기 위해 튼튼한 금속 고리가 체결된 중세 여정자 트래블 클로크 망토와 마도 연성 서문을 소지하고 있습니다.
                            </p>

                            <div className="mt-4 rounded-xl overflow-hidden aspect-[3/4] border border-amber-100 relative bg-zinc-50 shadow-xs flex items-center justify-center p-1">
                              <img
                                src="/src/assets/images/las_concept_art_1780826548721.png"
                                alt="Las Concept Art"
                                className="w-full h-full object-contain hover:scale-102 transition duration-550 ease-out"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent flex flex-col justify-end p-4 pt-12">
                                <span className="font-mono text-[9px] font-black text-amber-400 tracking-widest uppercase">DATALINK // CHRONO ARCHIVE</span>
                                <h4 className="text-white text-xs sm:text-sm font-sans font-bold mt-0.5">라스 라이트 애니메이션 전신 원화 (Light Novel Art)</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* b3 Characters Grid */
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Etiya Card */}
                        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-rose-100 shadow-xs relative overflow-hidden flex flex-col justify-between font-sans">
                          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 font-black font-mono text-[90px] text-rose-50/50 pointer-events-none uppercase select-none">
                            FOX
                          </div>
                          <div className="space-y-4 relative">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-full border-2 border-rose-300 overflow-hidden shrink-0 shadow-md">
                                <img
                                  src="/src/assets/images/etiya_lightnovel_1780244566911.png"
                                  alt="Etiya Avatar"
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono text-[9px] font-black px-2 py-0.5 rounded bg-rose-100 text-rose-700 uppercase">Reincarnator</span>
                                  <span className="font-mono text-[9px] font-black px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 uppercase">Fox Demihuman</span>
                                </div>
                                <h3 className="font-sans font-black text-xl text-zinc-950 mt-1">에티야 (Etiya / 엘리나)</h3>
                              </div>
                            </div>

                            <span className="block h-[1px] bg-zinc-150/60" />

                            <p className="font-sans text-xs sm:text-sm text-zinc-750 leading-relaxed font-light font-normal text-zinc-700">
                              과거 현실 세계에서 VR 다이브 기기 사고로 인생의 끈을 놓친 뒤, 대충충돌 소강기 한가운데의 북방 왕국 최연소 제1왕녀 엘리나로 영적 전생을 완수한 이색적 배경의 여우인수입니다.
                            </p>
                            <p className="font-sans text-xs sm:text-sm text-zinc-750 leading-relaxed font-light font-normal text-rose-955">
                              <strong>[외형 및 복식 특징]</strong> 고결하고 기품 있는 순백의 여우 귀 끝에 등황색 붉은 불꽃 무늬가 깃들어 있으며, 반항기와 영민함이 깃든 매혹적인 은회색(잿빛) 동공을 지녔습니다. 멸국 이후의 행보인 만큼, 기품 서린 고전적 중세 황실 드레스웨어 위에 튼튼한 다크 레더 벨티드 코르셋 자경단 보호 장비를 두르고 있습니다.
                            </p>

                            <div className="mt-4 rounded-xl overflow-hidden aspect-[3/4] border border-rose-100 relative bg-zinc-50 shadow-xs flex items-center justify-center p-1">
                              <img
                                src="/src/assets/images/etiya_lightnovel_1780244566911.png"
                                alt="Etiya Concept Art"
                                className="w-full h-full object-contain hover:scale-102 transition duration-550 ease-out"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent flex flex-col justify-end p-4 pt-12">
                                <span className="font-mono text-[9px] font-black text-rose-400 tracking-widest uppercase">DATALINK // ROYAL DOSSIER</span>
                                <h4 className="text-white text-xs sm:text-sm font-sans font-bold mt-0.5">에티야 라이트 애니메이션 전신 원화 (Light Novel Art)</h4>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Lumina Card */}
                        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-teal-100 shadow-xs relative overflow-hidden flex flex-col justify-between">
                          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 font-black font-mono text-[90px] text-teal-50/50 pointer-events-none uppercase select-none">
                            LEOPARD
                          </div>
                          <div className="space-y-4 relative">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-full border-2 border-teal-300 overflow-hidden shrink-0 shadow-md">
                                <img
                                  src="/src/assets/images/lumina_lightnovel_1780244584807.png"
                                  alt="Lumina Avatar"
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono text-[9px] font-black px-2 py-0.5 rounded bg-teal-100 text-teal-850 uppercase">Honorary Knight</span>
                                  <span className="font-mono text-[9px] font-black px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 uppercase">Snow Leopard</span>
                                </div>
                                <h3 className="font-sans font-black text-xl text-zinc-950 mt-1">루미나 (Lumina)</h3>
                              </div>
                            </div>

                            <span className="block h-[1px] bg-zinc-150/60" />

                            <p className="font-sans text-xs sm:text-sm text-zinc-750 leading-relaxed font-light">
                              대혼전기 영웅으로 칭송받던 노장 기사단의 수양딸로 자라나, 제국의 철저한 매스 미디어용 영웅 광고판 역할을 내려놓고 밤안개 지대의 의적으로 거거히 전향한 백색 설표 무인입니다.
                            </p>
                            <p className="font-sans text-xs sm:text-sm text-zinc-750 leading-relaxed font-light font-normal text-teal-955">
                              <strong>[외형 및 복식 특징]</strong> 특유의 차갑고도 날카로운 황금빛 고양이 야수안과 함께, 칠흑의 어두운 무늬와 층형 가닥이 기품 있게 잡힌 흑백 레이어드 투톤 은발 머리를 지녔습니다. 웅장한 전설급 명예 기사에 어울리도록 정교하게 폴리싱 코팅된 은백색 중세 판금 갑옷과 두터운 견갑, 대형 붉은 가죽 보를 착용하고 있습니다.
                            </p>

                            <div className="mt-4 rounded-xl overflow-hidden aspect-[3/4] border border-teal-100 relative bg-zinc-50 shadow-xs flex items-center justify-center p-1">
                              <img
                                src="/src/assets/images/lumina_lightnovel_1780244584807.png"
                                alt="Lumina Concept Art"
                                className="w-full h-full object-contain hover:scale-102 transition duration-550 ease-out"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent flex flex-col justify-end p-4 pt-12">
                                <span className="font-mono text-[9px] font-black text-teal-400 tracking-widest uppercase">DATALINK // CRUSADER PROFILE</span>
                                <h4 className="text-white text-xs sm:text-sm font-sans font-bold mt-0.5">루미나 라이트 애니메이션 전신 원화 (Light Novel Art)</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Supporting Characters row */}
                    <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
                      <h4 className="font-sans font-black text-xs tracking-widest text-zinc-500 font-bold uppercase mb-4 flex items-center gap-2">
                        <Users className="w-4 h-4 text-zinc-700" />
                        주변 기류 캐릭터 (Supporting Roles)
                      </h4>
                      {isB2 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-zinc-750">
                          <div className="p-4 rounded-xl bg-white border border-zinc-150 space-y-2">
                            <h5 className="font-sans font-black text-sm text-zinc-900">모어 이트니르 (More Uitnir)</h5>
                            <p className="font-sans text-xs leading-relaxed text-zinc-650 font-normal">
                              대장장이 명인의 피를 이어받은 아카데미아 학우. 마네 재능 고갈로 상심했으나, 훗날 마법 자체를 일도양단하는 은가른 귀족 검강 기술을 연마해 셰티르의 전술 연대를 돕습니다.
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-white border border-zinc-150 space-y-2">
                            <h5 className="font-sans font-black text-sm text-zinc-900">마코 테레피스 (Maco Terepeace)</h5>
                            <p className="font-sans text-xs leading-relaxed text-zinc-650 font-normal">
                              마코 성가 가문의 총화 자제이자 셰티르의 소꿉친구. 호화로운 상위 전공 위압을 기피하고 자유를 선언한 학도로, 주인공의 빛 성각 조사를 뒤쪽에서 든든하게 보호해 주는 중심축.
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-white border border-zinc-150 space-y-2">
                            <h5 className="font-sans font-black text-sm text-zinc-900">마코 카벨리아 (Maco Cavelia)</h5>
                            <p className="font-sans text-xs leading-relaxed text-zinc-650 font-normal">
                              테레의 장녀이자 기사단 코마테일의 영도자. 전체 토너먼트 리그 23위에 기염을 토하는 속도전 기합의 토끼 기인으로, 대결 상대의 검격을 유려하게 흘려 타격하는 회피 극단 검사.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-zinc-750 font-sans">
                          {/* Rika Card */}
                          <div className="p-4 rounded-xl bg-white border border-zinc-150 space-y-2">
                            <h5 className="font-sans font-black text-sm text-zinc-900 font-bold">리카 (Rika)</h5>
                            <p className="font-sans text-xs leading-relaxed text-zinc-650 font-normal">
                              에티야(엘리나)가 환생해온 북방 왕국의 제2왕녀. 돌연히 달라진 언니의 능력을 경외하면서도, 혹시 모를 파멸에 대비해 쓸쓸하게 왕가의 권위와 생존 투쟁을 결단하려 하는 입체적 인물입니다.
                            </p>
                          </div>
                          {/* Evion Card */}
                          <div className="p-4 rounded-xl bg-white border border-zinc-150 space-y-2">
                            <h5 className="font-sans font-black text-sm text-zinc-900 font-bold">에비온 (Evion)</h5>
                            <p className="font-sans text-xs leading-relaxed text-zinc-650 font-normal">
                              엘리나의 이성적이고 세심한 정략 약혼자. 완충지 왕궁이 파워락 화력 군기들에 의해 함락당할 당시 리카의 곁을 지키며 탈출했고, 흩어지면서도 끝까지 약속을 사수하려 합니다.
                            </p>
                          </div>
                          {/* Tofie Card */}
                          <div className="p-4 rounded-xl bg-white border border-zinc-150 space-y-2">
                            <h5 className="font-sans font-black text-sm text-zinc-900 font-bold">토피 대제국 기사단 (Tofie Outriders)</h5>
                            <p className="font-sans text-xs leading-relaxed text-zinc-650 font-normal">
                              소강기 변경의 비공식 완충지 소탕을 지휘하는 강경 기계화 전선단. 파워락 엔진의 압도적 중화력 우위를 추종하며 인수들의 비정형 진영 장막(Shroud)을 집요하게 역탐지 추적합니다.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
{aliveTab === 'timeline' && (
                  <motion.div
                    key="timeline"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-2xl mx-auto py-4"
                  >
                    {/* Vertical story pipeline */}
                    <div className="relative border-l-2 border-teal-500 pl-6 sm:pl-8 space-y-10 py-2">
                      <div className="absolute -left-[7px] top-[14px] w-3.5 h-3.5 rounded-full bg-teal-650 ring-4 ring-teal-100" />
                      <div className="space-y-2">
                        <span className="font-mono text-[9px] font-black text-teal-600 tracking-wider">LORE BEAT 01 // RIKA FOCUS</span>
                        <h4 className="font-sans font-black text-sm sm:text-base text-zinc-900">제1막: 북방 완충 무역 왕국의 다과회 일상과 균열</h4>
                        <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
                          에티야의 감정 결핍적 면모(싸이코패스적 과거 메타버스 관습 자아)를 드러내는 왕국 무도회 전조기. 동생 리카의 왕권 욕망 확대와 다과회 안의 잔잔함 이면의 복잡한 정치적 복선을 그립니다.
                        </p>
                      </div>

                      <div className="absolute -left-[7px] top-[148px] w-3.5 h-3.5 rounded-full bg-zinc-400 ring-4 ring-zinc-100" />
                      <div className="space-y-2 pt-1">
                        <span className="font-mono text-[9px] font-black text-zinc-500 tracking-wider">LORE BEAT 02 // WAR FALLOUT</span>
                        <h4 className="font-sans font-black text-sm sm:text-base text-zinc-900">제2막: 대화재 속 조국의 파탄과 사별</h4>
                        <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
                          파워락 대형 장갑 기병을 앞세운 신흥 기동국들에 의한 왕궁 포위 공격. 동생 리카, 충직한 약혼자와 참성 안에서 영정의 이별을 고한 에티야는 노예 검문 부대에 체포되어 질주하는 이송 마차에 갇히게 됩니다.
                        </p>
                      </div>

                      <div className="absolute -left-[7px] top-[290px] w-3.5 h-3.5 rounded-full bg-teal-650 ring-4 ring-teal-100" />
                      <div className="space-y-2 pt-1">
                        <span className="font-mono text-[9px] font-black text-teal-600 tracking-wider">LORE BEAT 03 // AMBUSH & RESCUE</span>
                        <h4 className="font-sans font-black text-sm sm:text-base text-zinc-900">제3막: 마차 급습과 월광의 투사 루미나 구원</h4>
                        <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
                          독점 노예 수송 중인 마차 샛길을 덮쳐 강간과 전리품 분양에 눈먼 산야의 도적단들. 무표정 속 사슬 안에서 위기를 관망하는 여우 에티야 앞에, 명예 기사이자 장막 흑막인 백발 설표 루미나가 피의 은검을 가르고 돌격해 들어옵니다.
                        </p>
                      </div>

                      <div className="absolute -left-[7px] top-[430px] w-3.5 h-3.5 rounded-full bg-zinc-400 ring-4 ring-zinc-100" />
                      <div className="space-y-2 pt-1">
                        <span className="font-mono text-[9px] font-black text-zinc-500 tracking-wider">LORE BEAT 04 // EMPIRIAL ENTERING</span>
                        <h4 className="font-sans font-black text-sm sm:text-base text-zinc-900">제4막: 토피 대제국으로의 위장 진입과 수사 명령</h4>
                        <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
                          생존을 위해 정체를 감추고 은밀히 따르기 시작한 에티야와 그녀를 틱틱대며 기르는 루미나. 제국 중앙 위장 게이트를 밟자, 전직 동료 기사인 단장으로부터 도성 빈민지대의 이단적 위협인 '장막(The Shroud)'을 소탕하라는 역추적 임무를 맡아 수사가 시작됩니다.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {aliveTab === 'novels' && (
                  <motion.div
                    key="novels"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start min-h-0"
                  >
                    {/* Novel chapter trigger selector (Left panel) */}
                    <div className="md:col-span-4 flex flex-col gap-3 shrink-0">
                      <span className="font-mono text-[9px] text-zinc-400 font-black tracking-widest uppercase mb-1">CHAPTER INDEX</span>
                      
                      <button
                        onClick={() => setAliveEpisode(0)}
                        className={`p-4 rounded-xl text-left border font-sans transition duration-300 flex items-start gap-3 cursor-pointer ${
                          aliveEpisode === 0 
                            ? 'bg-teal-50/70 border-teal-200 text-teal-900 shadow-xs scale-[0.98]' 
                            : 'bg-white border-zinc-150 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-250'
                        }`}
                      >
                        <Bookmark className="w-5 h-5 mt-0.5 shrink-0 text-teal-600" />
                        <div>
                          <span className="block font-mono text-[9px] font-black text-teal-700">EPISODE 01</span>
                          <span className="block font-sans font-black text-xs md:text-sm mt-0.5 leading-snug">제1화: 달빛 속의 붉은 검성</span>
                        </div>
                      </button>

                      <button
                        onClick={() => setAliveEpisode(1)}
                        className={`p-4 rounded-xl text-left border font-sans transition duration-300 flex items-start gap-3 cursor-pointer ${
                          aliveEpisode === 1 
                            ? 'bg-teal-50/70 border-teal-200 text-teal-900 shadow-xs scale-[0.98]' 
                            : 'bg-white border-zinc-150 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-250'
                        }`}
                      >
                        <Bookmark className="w-5 h-5 mt-0.5 shrink-0 text-teal-600" />
                        <div>
                          <span className="block font-mono text-[9px] font-black text-teal-700">EPISODE 02</span>
                          <span className="block font-sans font-black text-xs md:text-sm mt-0.5 leading-snug">제2화: 제국의 관문과 임무</span>
                        </div>
                      </button>
                    </div>

                    {/* Novel content viewport (Right panel) */}
                    <div className="md:col-span-8 p-6 sm:p-8 bg-zinc-50/70 border border-zinc-150 rounded-2xl relative shadow-inner">
                      <div className="w-8 h-1 bg-teal-600 rounded-full mb-3" />
                      <h3 className="font-sans font-black text-xs sm:text-sm text-zinc-950 pb-3 border-b border-zinc-200 uppercase tracking-tight">
                        {booklet.pages[aliveEpisode + 3].title}
                      </h3>
                      
                      {/* Serif, comfortable, legible reading style */}
                      <div className="mt-5 font-sans font-normal text-xs sm:text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap max-h-[460px] overflow-y-auto pr-3 md:pr-4">
                        {booklet.pages[aliveEpisode + 3].content}
                      </div>

                      {/* Reading completion status bar */}
                      <div className="mt-6 pt-4 border-t border-zinc-200 flex justify-between items-center text-[10px] font-mono text-zinc-400">
                        <span>PAGE TRANSCRIPTION COMPLETE</span>
                        <span className="font-bold text-teal-700">STORY ARCHIVE LORE // 100% Verified</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {aliveTab === 'cartoon' && (
                  <motion.div
                    key="cartoon"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6 max-w-5xl mx-auto pb-6"
                  >
                    {isB2 ? (
                      /* b2 (Send Sender Restricted) Trendy Short-Form Drama Studio - Rearranged for natural multi-video browsing */
                      <div className="space-y-6 text-left">
                        
                        {/* Interactive Top Row of 3 Episode Cards to naturally see and choose */}
                        <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-2xl">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-zinc-150">
                            <div>
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-100 border border-amber-200 text-amber-900 rounded-md text-[10px] font-mono font-black tracking-wider">
                                <Radio className="w-3 h-3 text-amber-500 animate-pulse" /> 공식 숏폼 극장
                              </span>
                              <h3 className="font-sans font-black text-base text-zinc-950 mt-1">발송자 표시 제한 공식 숏폼 드라마 아카이브</h3>
                            </div>
                            <span className="text-[10px] font-bold text-zinc-400 font-mono select-none">3 EXCLUSIVE EPISODES</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {b2Videos.map((video, idx) => {
                              const isSelected = selectedVideoId === video.id;
                              return (
                                <button
                                  key={video.id}
                                  onClick={() => {
                                    setSelectedVideoId(video.id);
                                    setVideoProgress(0);
                                    setIsPlaying(true);
                                  }}
                                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between cursor-pointer h-full min-h-[145px] relative overflow-hidden group ${
                                    isSelected
                                      ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-500/10'
                                      : 'bg-white border-zinc-200 hover:bg-zinc-50/45 hover:border-zinc-300'
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-[9px] font-mono font-black text-amber-600 tracking-wider">EP_0{idx + 1} // SHORT</span>
                                      <span className="text-sm select-none">{video.id === 'b2-v1' ? '🦊' : video.id === 'b2-v2' ? '🦉' : '✉️'}</span>
                                    </div>
                                    <h4 className="font-sans font-black text-[12px] text-zinc-950 leading-snug group-hover:text-amber-700 transition-colors">
                                      {video.title}
                                    </h4>
                                    <p className="font-sans text-[10.5px] text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
                                      {video.desc}
                                    </p>
                                  </div>

                                  <div className="w-full h-1 bg-zinc-100 rounded-full mt-3 overflow-hidden">
                                    {isSelected ? (
                                      <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 w-full animate-pulse" />
                                    ) : (
                                      <div className="h-full bg-zinc-350 w-0 group-hover:w-1/3 transition-all" />
                                    )}
                                  </div>

                                  {isSelected && (
                                    <span className="absolute top-3 right-8 flex h-1.5 w-1.5">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Left: Beautiful Smartphone Shorts Viewport (7 columns) */}
                        <div className="lg:col-span-7 flex flex-col items-center">
                          <div className="w-full max-w-sm rounded-[40px] border-[10px] border-zinc-900 bg-zinc-950 p-2 shadow-2xl relative overflow-hidden ring-4 ring-amber-500/10 transition-all duration-300">
                            
                            {/* Notch Indicator */}
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-zinc-900 rounded-[20px] z-30 flex items-center justify-center pointer-events-none">
                              <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 border border-zinc-800"></div>
                              <div className="w-12 h-1 bg-zinc-950 rounded-full ml-2"></div>
                            </div>

                            {/* Video screen area (9:16 aspect ratio simulation) */}
                            <div 
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="relative aspect-[9/16] w-full rounded-[30px] overflow-hidden bg-gradient-to-br from-zinc-950 via-stone-900 to-zinc-900 cursor-pointer flex flex-col justify-between"
                            >
                              
                              {/* Real-time AI Generated Anime Footage plane */}
                              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                                <motion.img
                                  key={activeVideo.id}
                                  src={activeVideo.coverImage}
                                  alt={activeVideo.title}
                                  animate={isPlaying ? {
                                    scale: [1.02, 1.12, 1.05, 1.18, 1.02],
                                    x: [0, -5, 4, -3, 0],
                                    y: [0, 3, -6, 2, 0],
                                    filter: [
                                      "brightness(0.7) contrast(1.15) saturate(1.2) hue-rotate(0deg)",
                                      "brightness(0.85) contrast(1.25) saturate(1.35) hue-rotate(-2deg)",
                                      "brightness(0.65) contrast(1.1) saturate(1.15) hue-rotate(2deg)",
                                      "brightness(0.8) contrast(1.2) saturate(1.25) hue-rotate(0deg)",
                                      "brightness(0.7) contrast(1.15) saturate(1.2) hue-rotate(0deg)"
                                    ]
                                  } : { 
                                    scale: 1.02, 
                                    filter: "brightness(0.5) contrast(0.95) saturate(0.8)" 
                                  }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 12,
                                    ease: "easeInOut"
                                  }}
                                  className="w-full h-full object-cover transition-all"
                                  referrerPolicy="no-referrer"
                                />
                                {/* Overlay gradient to guarantee subtitles readability and high visual contrast */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-zinc-950/20 to-black/45 z-2" />
                              </div>

                              {/* Cinematic Anime Vignette and Scanline Overlays if playing */}
                              {isPlaying && (
                                <div className="absolute inset-0 z-3 pointer-events-none overflow-hidden">
                                  {/* Speedlines repeating ring effect */}
                                  <div className="absolute inset-0 opacity-[0.25] bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#000_100%)] mix-blend-multiply" />
                                  
                                  {/* Dynamic Film grain Scanlines */}
                                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-15" />
                                  
                                  {/* Kinetic Anime Speed rings for actions */}
                                  <motion.div
                                    animate={{
                                      scale: [0.95, 1.05, 0.95],
                                      opacity: [0.15, 0.35, 0.15]
                                    }}
                                    transition={{ repeat: Infinity, duration: 0.18, ease: "linear" }}
                                    className="absolute inset-x-[-15%] inset-y-[-15%] bg-[repeating-radial-gradient(circle,_transparent,_transparent_10px,_rgba(255,255,255,0.06)_12px,_rgba(255,255,255,0.06)_14px)]"
                                  />
                                  
                                  {/* Beautiful Japanese Anime Chromatic Light Leaks */}
                                  <motion.div
                                    animate={{
                                      opacity: [0.25, 0.55, 0.25],
                                      background: [
                                        "linear-gradient(135deg, rgba(244,63,94,0.15) 0%, rgba(245,158,11,0.05) 50%, rgba(56,189,248,0.1) 100%)",
                                        "linear-gradient(225deg, rgba(56,189,248,0.2) 0%, rgba(139,92,246,0.1) 50%, rgba(244,63,94,0.18) 100%)",
                                        "linear-gradient(135deg, rgba(244,63,94,0.15) 0%, rgba(245,158,11,0.05) 50%, rgba(56,189,248,0.1) 100%)"
                                      ]
                                    }}
                                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 mix-blend-screen"
                                  />

                                  {/* Beautiful drifting cherry-blossom light gold particles */}
                                  {[...Array(7)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      className="absolute w-1.5 h-1.5 bg-yellow-200/55 rounded-full blur-[0.5px]"
                                      initial={{ 
                                        x: Math.random() * 300, 
                                        y: 500 + Math.random() * 100, 
                                        scale: 0.6 + Math.random() * 0.8,
                                        opacity: 0
                                      }}
                                      animate={{
                                        y: -20,
                                        x: `+=${(Math.random() - 0.5) * 80}`,
                                        opacity: [0, 0.9, 0.9, 0],
                                        rotate: [0, 360]
                                      }}
                                      transition={{
                                        duration: 4 + Math.random() * 3,
                                        repeat: Infinity,
                                        delay: i * 0.8,
                                        ease: "linear"
                                      }}
                                      style={{
                                        boxShadow: "0 0 6px 2px rgba(251,191,36,0.35)"
                                      }}
                                    />
                                  ))}
                                  
                                  {/* Advanced Futuristic Tactical HUD (Inspired by Endfield Deliverer Core Interface) */}
                                  <div className="absolute inset-0 z-3 pointer-events-none overflow-hidden select-none font-mono">
                                    {/* Subtle Hexagon patterns or grids overlay */}
                                    <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]" />
                                    
                                    {/* Circular Rotating Laser Scanner (Tactical Weapon Aim Reticle) */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                                        className="w-48 h-48 border border-dashed border-amber-500/25 rounded-full relative flex items-center justify-center"
                                      >
                                        <div className="absolute -inset-2 border border-dotted border-amber-500/10 rounded-full" />
                                        <motion.div 
                                          animate={{ rotate: -360 }}
                                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                          className="w-24 h-24 border border-amber-400/20 rounded-full border-t border-r border-t-amber-400/50 border-r-amber-400/10"
                                        />
                                        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-amber-500/10" />
                                        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-amber-500/10" />
                                      </motion.div>
                                    </div>

                                    {/* Tactical telemetry coordinates (Bottom Left) */}
                                    <div className="absolute bottom-32 left-4 text-[7px] text-amber-500/80 tracking-widest leading-normal flex flex-col gap-0.5 select-none bg-black/40 p-1.5 rounded-lg border border-white/5 backdrop-blur-xs">
                                      <div className="flex items-center gap-1 font-black">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                        <span>COORD: 35.802 / -126.304</span>
                                      </div>
                                      <div>SIGNAL FIELD: 98.42%</div>
                                      {selectedVideoId === 'b2-v1' && <div className="text-rose-400">CHRONO ACTIVE: TIME_0.1s</div>}
                                      {selectedVideoId === 'b2-v2' && <div className="text-sky-400">TIPON FREQ: 824.12MHz</div>}
                                      {selectedVideoId === 'b2-v3' && <div className="text-yellow-400">TIAMO GRAVITY: -9.81G</div>}
                                      <div className="text-zinc-500">PROTOCOL: ADVISER_CORE</div>
                                    </div>

                                    {/* Real-time soundwave bar meter (Bottom Right) */}
                                    <div className="absolute bottom-32 right-4 flex items-end gap-0.5 h-6 bg-black/35 p-1 rounded border border-white/5">
                                      {[...Array(6)].map((_, idx) => (
                                        <motion.div
                                          key={idx}
                                          animate={{
                                            height: isPlaying 
                                              ? [4, Math.random() * 16 + 4, 4] 
                                              : 4
                                          }}
                                          transition={{
                                            duration: 0.2 + idx * 0.05,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                          }}
                                          className="w-1 bg-amber-500/80 rounded-t-[1px]"
                                        />
                                      ))}
                                    </div>

                                    {/* Anime Corner Crop Marks */}
                                    <div className="absolute top-16 left-4 font-mono font-bold text-[8px] text-zinc-400 select-none flex flex-col gap-0.5">
                                      <div className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                                        <span className="text-rose-400">● TACTICAL STUN</span>
                                      </div>
                                      <div className="text-zinc-500 text-[7.5px] font-mono leading-none mt-0.5">
                                        SHORTS CORE // HDR_60FPS
                                      </div>
                                    </div>

                                    <div className="absolute top-16 right-4 font-mono font-bold text-[7.5px] text-zinc-500 select-none text-right">
                                      LAYER: COMP_ANIME_B2<br/>
                                      LUT: NOSTALGIA_ANIME
                                    </div>

                                    {/* Minimal scope crop lines */}
                                    <div className="absolute top-14 left-3 w-3 h-3 border-t border-l border-white/20" />
                                    <div className="absolute top-14 right-3 w-3 h-3 border-t border-r border-white/20" />
                                    <div className="absolute bottom-14 left-3 w-3 h-3 border-b border-l border-white/20" />
                                    <div className="absolute bottom-14 right-3 w-3 h-3 border-b border-r border-white/20" />
                                  </div>
                                </div>
                              )}

                              {/* Background Glowing Vector (simulating live video movement) */}
                              <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden z-2">
                                <motion.div 
                                  animate={{ 
                                    scale: isPlaying ? [1, 1.25, 1] : 1,
                                    rotate: isPlaying ? [0, 4, -4, 0] : 0,
                                    opacity: isPlaying ? [0.15, 0.3, 0.15] : 0.15
                                  }}
                                  transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                                  className={`absolute -inset-10 bg-gradient-to-tr ${
                                    selectedVideoId === 'b2-v1' ? 'from-amber-600/20 via-rose-600/10 to-zinc-950' : 
                                    selectedVideoId === 'b2-v2' ? 'from-orange-600/20 via-amber-600/10 to-zinc-950' :
                                    'from-yellow-600/20 via-amber-700/10 to-zinc-950'
                                  }`} 
                                />
                                <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80" />
                              </div>

                              {/* Play/Pause Center Indicator Alert */}
                              {!isPlaying && (
                                <div className="absolute inset-0 flex items-center justify-center z-35 bg-black/40 backdrop-blur-xs">
                                  <motion.div 
                                    initial={{ scale: 0.8 }} 
                                    animate={{ scale: 1 }}
                                    className="w-16 h-16 rounded-full bg-amber-500/90 flex items-center justify-center text-zinc-950 shadow-lg"
                                  >
                                    <Play className="w-8 h-8 fill-current ml-1" />
                                  </motion.div>
                                </div>
                              )}

                              {/* Top Bar overlays */}
                              <div className="absolute top-8 left-0 right-0 p-4 flex justify-between items-center z-20 text-white pointer-events-none select-none">
                                <div className="flex items-center gap-1.5 bg-black/40 rounded-full px-2.5 py-1 text-[9.5px] font-mono tracking-wider font-extrabold border border-white/5 backdrop-blur-xs">
                                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                  <span>TRENDING SHORTS</span>
                                </div>
                                <span className="font-bold text-[10px] bg-white/10 rounded-full px-2 py-0.5 backdrop-blur-xs font-mono">
                                  {Math.floor(currentSecond)}s / 15s
                                </span>
                              </div>

                              {/* Over-the-video interface (Right floating action bar) */}
                              <div className="absolute right-2 bottom-16 flex flex-col items-center gap-4 z-20">
                                
                                {/* Creator avatar */}
                                <div className="relative">
                                  <div className="w-10 h-10 rounded-full border border-white/80 overflow-hidden bg-zinc-800 shadow-md">
                                    <img
                                      src={activeVideo.avatar}
                                      alt="Creator"
                                      className="w-full h-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-[10px] text-zinc-950 font-black border border-zinc-950 select-none leading-none">+</span>
                                </div>

                                {/* Like Button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleLike(activeVideo.id);
                                  }}
                                  className="flex flex-col items-center gap-0.5 group cursor-pointer focus:outline-none"
                                >
                                  <div className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                                    userLikedVideos[activeVideo.id]
                                      ? 'bg-amber-500 text-zinc-950 border border-amber-400 shadow-md scale-105'
                                      : 'bg-black/35 text-white/90 border border-white/5 hover:bg-black/55 hover:scale-105'
                                  }`}>
                                    <Heart className={`w-4 h-4 ${userLikedVideos[activeVideo.id] ? 'fill-current' : ''}`} />
                                  </div>
                                  <span className="text-[10px] font-mono font-black text-white px-1 leading-none drop-shadow-md">
                                    {videoLikes[activeVideo.id]}
                                  </span>
                                </button>

                                {/* Comments bubble count */}
                                <div className="flex flex-col items-center gap-0.5">
                                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-black/35 border border-white/5 backdrop-blur-md text-white/90 font-mono">
                                    <MessageSquare className="w-4 h-4" />
                                  </div>
                                  <span className="text-[10px] font-mono font-black text-white px-1 leading-none drop-shadow-md">
                                    {getCommentsForVideo(activeVideo.id, activeVideo.initialComments).length}
                                  </span>
                                </div>

                                {/* Share button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    alert(`'${activeVideo.title}' 숏폼 공유 완료!`);
                                  }}
                                  className="w-9 h-9 rounded-full flex items-center justify-center bg-black/35 border border-white/5 backdrop-blur-md text-white/90 hover:bg-black/55 hover:scale-105 transition duration-300 cursor-pointer"
                                >
                                  <Share2 className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Left details & script overlay */}
                              <div className="absolute left-3 bottom-4 right-14 z-20 text-white space-y-2 pointer-events-none select-none text-left">
                                <div className="text-[9px] font-bold font-mono text-amber-400 flex items-center gap-1 bg-amber-950/40 border border-amber-900/30 px-2.5 py-0.5 rounded-md w-max">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                  LORE CAST: {activeVideo.character}
                                </div>
                                <h4 className="font-sans font-black text-xs md:text-sm leading-tight text-zinc-5 drop-shadow-md line-clamp-1">
                                  {activeVideo.title}
                                </h4>

                                {/* Interactive synchronized subtitles box */}
                                <div className="mt-2 bg-black/95 border border-zinc-800 p-3 rounded-xl text-zinc-100 shadow-xl pointer-events-auto leading-relaxed">
                                  <p className="font-mono text-[9px] text-zinc-400 text-center uppercase tracking-wider mb-1 select-none opacity-85">
                                    {getJapaneseSubtitle(activeSubtitle.text)}
                                  </p>
                                  <p className="font-sans text-[11px] font-bold text-center">
                                    <span className="text-amber-400 font-extrabold">[{activeSubtitle.speaker}]: </span>
                                    {activeSubtitle.text}
                                  </p>
                                </div>
                              </div>

                              {/* Volume Sound controller overlays */}
                              <div className="absolute bottom-14 left-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/5 pointer-events-auto">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsAudioMuted(!isAudioMuted);
                                  }}
                                  className="text-zinc-350 hover:text-white transition cursor-pointer"
                                >
                                  {isPlaying ? (
                                    <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                                  ) : (
                                    <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                                  )}
                                </button>
                                <div className="flex gap-0.5 items-end justify-center h-4 px-1">
                                  {[1, 2, 3, 4, 5].map((idx) => {
                                    const barHz = isAudioMuted || !isPlaying
                                      ? 2
                                      : Math.floor(Math.sin((videoProgress * idx) / 2.5) * 6 + 10);
                                    return (
                                      <div
                                        key={idx}
                                        className={`w-[1.5px] rounded-full transition-all duration-150 ${
                                          isAudioMuted ? 'bg-zinc-700' : 'bg-amber-400'
                                        }`}
                                        style={{ height: `${Math.max(2, Math.min(16, barHz))}px` }}
                                      />
                                    );
                                  })}
                                </div>
                              </div>

                            </div>

                            {/* Slider visual progress line */}
                            <div className="h-1 bg-zinc-850 w-full relative z-10 shrink-0 select-none rounded-[30px] overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-150 ease-linear" 
                                style={{ width: `${videoProgress}%` }}
                              />
                            </div>

                          </div>
                        </div>

                        {/* Right: Active Episode Synopsis (5 columns) */}
                        <div className="lg:col-span-5 space-y-6 text-zinc-900">
                          
                          {/* Selected Episode Synopses */}
                          <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl space-y-4 text-zinc-900 text-left shadow-xs">
                            <div className="flex justify-between items-center border-b border-zinc-200 pb-2.5">
                              <span className="text-[10px] font-black font-mono text-amber-600 tracking-wider">ACTIVE EPISODE INFO</span>
                              <span className="text-[10px] font-mono text-zinc-400 font-bold">EP_ID: {activeVideo.id.toUpperCase()}</span>
                            </div>
                            <div>
                              <span className="text-[10px] px-2 py-0.5 bg-amber-100 border border-amber-200 text-amber-900 rounded font-mono font-bold">시놉시스</span>
                              <h4 className="font-sans font-black text-base text-zinc-950 mt-1.5">
                                {activeVideo.title}
                              </h4>
                            </div>
                            <div className="text-[11px] text-zinc-500 font-bold font-mono bg-white border border-zinc-150 rounded-lg p-2.5 flex justify-between items-center">
                              <span>포커스 캐릭터</span>
                              <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-xs">{activeVideo.character}</span>
                            </div>
                            <div className="space-y-1.5">
                              <span className="text-[10px] font-mono font-bold text-zinc-400 block uppercase">EPISODE OUTLINE</span>
                              <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed font-light bg-white border border-zinc-150 p-4 rounded-xl shadow-2xs">
                                {activeVideo.desc}
                              </p>
                            </div>
                            
                            {/* Trivia Card */}
                            <div className="bg-amber-50/40 border border-amber-200/50 p-4 rounded-xl space-y-1.5">
                              <span className="text-[10px] font-mono font-bold text-amber-800 tracking-wider block">💡 숏폼 에피소드 가이드</span>
                              <p className="font-sans text-[11px] text-zinc-650 leading-relaxed">
                                '발송자 표시 제한'의 캐릭터 관계도와 설정을 극도로 축약한 한정판 미니 드라마 클립입니다. 상단의 에피소드 카드를 클릭해 각본의 실시간 음성/자막 싱크 연출을 감상하세요.
                              </p>
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>
                  ) : (
                      /* b3 (Everyday Alive) Classic Comic view */
                      <div className="p-6 sm:p-8 bg-white border border-zinc-200 rounded-3xl shadow-xs space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-150/60 pb-4">
                          <div>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-md text-[10px] font-mono font-black uppercase tracking-wider">
                              공식 4컷 웹툰 // 에브리데이 어라이브
                            </span>
                            <h3 className="font-sans font-black text-xl text-zinc-950 mt-1">4컷 명랑 만화: "콰직! 판금 갑옷의 괴력 소동"</h3>
                            <p className="font-sans text-xs sm:text-sm text-zinc-550 leading-relaxed font-light mt-0.5">
                              품위 넘치는 황실 드레스를 입은 채 배고픔에 굶주린 에티야 공주와, 정교한 은백색 판금 아머를 걸친 츤데레 설표 기사 루미나의 엉뚱하고 귀여운 중세 비상 공급 소동극입니다.
                            </p>
                          </div>
                          <div className="text-[10px] font-mono text-zinc-400 border border-zinc-200 rounded-lg px-3 py-1.5 bg-zinc-50 shrink-0 select-none">
                            웹툰 번호: <span className="font-bold text-rose-700">ALIVE_SD_C1</span>
                          </div>
                        </div>

                        {/* Comic panel container */}
                        <div className="relative rounded-2xl overflow-hidden border border-zinc-300 bg-zinc-50 group shadow-md max-w-3xl mx-auto flex items-center justify-center p-2 min-h-[350px]">
                          <img 
                            src="/src/assets/images/alive_comic_medieval_korean_1780244902783.png" 
                            alt="Alive Cartoon" 
                            className="max-h-[500px] md:max-h-[700px] w-auto max-w-full object-contain group-hover:scale-[1.015] transition duration-700 ease-out"
                            referrerPolicy="no-referrer"
                          />
                          
                          <div className="absolute top-4 left-4 bg-zinc-950/85 backdrop-blur-xs border border-zinc-700/60 p-3 rounded-lg text-white max-w-xs font-sans text-xs leading-relaxed font-light shadow-md hidden sm:block">
                            <span className="block font-sans font-black text-rose-350 text-[10px] tracking-wider mb-1 select-none">📢 일상 설정</span>
                            “야수의 괴력을 조절하지 못한 기사의 비상식량 파쇄법!”
                          </div>
                          
                          <div className="absolute bottom-4 right-4 bg-rose-950/90 backdrop-blur-xs border border-rose-500/30 p-3 rounded-xl text-white max-w-xs font-sans text-xs leading-relaxed font-light shadow-lg">
                            <span className="block font-sans font-black text-rose-350 text-[10px] tracking-wider mb-1 select-none">💬 에티야 (Etiya)</span>
                            “루미나... 캔을 그렇게 박살 내놓으면 우린 뭘 어떻게 먹으라는 거야...?”
                          </div>

                          <div className="absolute bottom-4 left-4 bg-zinc-950/85 backdrop-blur-xs border border-zinc-700/60 p-2 rounded-md text-white text-[9px] font-mono leading-none flex items-center gap-1.5 select-none font-bold text-rose-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                            <span>스핀오프 일상 극장</span>
                          </div>
                        </div>

                        {/* Detail metadata row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                            <span className="block font-sans font-black text-xs text-zinc-900">클래식 중세 일러스트풍 (Classic Medieval Style)</span>
                            <p className="font-sans text-xs leading-relaxed text-zinc-650 mt-1 font-light">
                              에티야의 등황색 띠를 두른 순백 귀와 수려한 드레스, 그리고 루미나의 완벽히 재현된 풀 플레이트 판금 갑바 복식이 미학적으로 융합된 고품격 4컷 비주얼입니다.
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100">
                            <span className="block font-sans font-black text-xs text-teal-950">스토리 설정과의 정밀한 동기화 (Perfect Lore Sync)</span>
                            <p className="font-sans text-xs leading-relaxed text-zinc-750 mt-1 font-light">
                              황실 가문 생존자로서의 시니컬함이 묻어나는 에티야 공주와, 부끄러운 표정으로 땀을 흘리는 전설의 설표 전사 기사단장 루미나의 기막힌 케미스트리를 중세 개그물로 절묘하게 담았습니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {aliveTab === 'comics' && (
                  <motion.div
                    key="comics"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-5xl mx-auto pb-6 text-zinc-900 font-sans"
                  >
                    {/* Image grid featuring cards with beautiful captions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {[
                        {
                          src: "/src/assets/images/las_concept_art_1780826548721.png",
                          title: "#1 빠른 탈출"
                        },
                        {
                          src: "",
                          title: "(추가 예정)",
                          isPlaceholder: true
                        }
                      ].map((item, index) => {
                        if (item.isPlaceholder) {
                          return (
                            <div key={index} className="flex flex-col rounded-2xl border border-dashed border-zinc-250 bg-zinc-50/30 overflow-hidden group">
                              <div className="aspect-[3/4] flex flex-col justify-center items-center text-center p-6">
                                <BookOpen className="w-7 h-7 text-zinc-350 mb-2" />
                                <span className="font-mono text-[9px] font-bold text-zinc-400 tracking-widest uppercase mb-1">
                                  COMING SOON
                                </span>
                              </div>
                              <div className="p-3 bg-zinc-50/50 border-t border-dashed border-zinc-200 text-center select-none">
                                <span className="font-sans font-black text-xs md:text-sm text-zinc-400">
                                  {item.title}
                                </span>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <motion.div
                            key={index}
                            whileHover={{ y: -6, transition: { duration: 0.25 } }}
                            onClick={() => setActiveLightboxImg(item.src)}
                            className="bg-white rounded-2xl border border-zinc-200 overflow-hidden cursor-pointer hover:border-amber-400 hover:shadow-lg transition-all duration-300 flex flex-col group"
                          >
                            {/* Image Box - Pure Visual Asset */}
                            <div className="aspect-[3/4] bg-zinc-50 relative overflow-hidden flex items-center justify-center p-1.5">
                              <img
                                src={item.src}
                                alt={item.title}
                                className="w-full h-full object-cover rounded-xl group-hover:scale-103 transition-transform duration-500 ease-out"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                                <span className="bg-amber-500 text-zinc-950 px-3.5 py-1.5 rounded-full text-xs font-sans font-black flex items-center gap-1.5 shadow-md">
                                  <Sparkles className="w-3.5 h-3.5 text-zinc-950 fill-current" /> 완전히 크게 보기
                                </span>
                              </div>
                            </div>
                            
                            {/* Symmetric minimal title bottom rail */}
                            <div className="p-3 bg-white border-t border-zinc-150 text-center transition-colors duration-350">
                              <span className="font-sans font-black text-xs md:text-sm text-zinc-800 group-hover:text-amber-850 transition-colors">
                                {item.title}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {aliveTab === 'mediamix' && (
                  <motion.div
                    key="mediamix"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6 max-w-5xl mx-auto pb-4"
                  >
                    {/* Header */}
                    <div className="p-6 bg-gradient-to-r from-zinc-900 via-zinc-950 to-black text-white rounded-3xl border border-zinc-805 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-md text-[10px] font-mono font-black uppercase tracking-wider">
                            <Radio className="w-3 h-3 animate-pulse text-rose-500" /> SHORTS MULTIMEDIA
                          </span>
                          <span className="text-zinc-600 font-bold">|</span>
                          <span className="text-xs font-medium font-sans text-zinc-350">영상 생성 AI 동력 일본 애니메이션 극장</span>
                        </div>
                        <h3 className="font-sans font-black text-xl text-white mt-1.5 flex items-center gap-2">
                          {booklet.title} AI 애니메이션 쇼츠 비주얼 가동
                        </h3>
                        <p className="font-sans text-xs sm:text-xs text-zinc-400 leading-relaxed font-light mt-1">
                          인수 가문의 캐릭터 특징과 세계관 라이트노벨 설정을 토대로, <span className="text-amber-400 font-bold">영상 생성 AI 기술</span>을 활용해 특유의 부드럽고 수려한 <span className="text-amber-400 font-bold">일본 애니메이션풍 9:16 비주얼 쇼츠 비디오 루프</span>를 완성했습니다. 자막 싱크 및 리드미컬한 입체 음향과 함께 감상하세요!
                        </p>
                      </div>
                      <div className="shrink-0 flex items-center gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl text-[10px] text-zinc-400 font-mono">
                        <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
                        WEEKLY ACTIVE: <span className="font-bold text-white text-xs">#91.6k VIEWS</span>
                      </div>
                    </div>

                    {/* Main Layout Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                      
                      {/* Left: Shorts Clip Selector & Description (4 cols) */}
                      <div className="lg:col-span-4 flex flex-col gap-4">
                        <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-150 space-y-3">
                          <h4 className="font-sans font-black text-xs text-zinc-500 tracking-wider uppercase font-mono">
                            EPISODE CLIPS (클립 리스트)
                          </h4>
                          <div className="flex flex-col gap-2.5">
                            {videosList.map((video) => {
                              const isActive = video.id === selectedVideoId;
                              return (
                                <button
                                  key={video.id}
                                  onClick={() => {
                                    setSelectedVideoId(video.id);
                                    setVideoProgress(0);
                                    setIsPlaying(true);
                                  }}
                                  className={`p-3 rounded-xl border text-left transition duration-300 relative overflow-hidden flex items-start gap-3 w-full group cursor-pointer ${
                                    isActive
                                      ? 'bg-amber-500/10 border-amber-400 shadow-sm ring-1 ring-amber-400/20'
                                      : 'bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-xs'
                                  }`}
                                >
                                  {/* Thumbnail placeholder with play button overlay */}
                                  <div className="w-12 h-16 rounded-lg bg-zinc-100 border border-zinc-200 shadow-inner overflow-hidden shrink-0 relative flex items-center justify-center">
                                    <img
                                      src={video.avatar}
                                      alt={video.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                      {isActive && isPlaying ? (
                                        <div className="flex gap-0.5 items-end justify-center w-5 h-5">
                                          <div className="w-0.5 bg-amber-400 animate-pulse h-[80%]"></div>
                                          <div className="w-0.5 bg-amber-400 animate-pulse h-[40%]"></div>
                                          <div className="w-0.5 bg-amber-400 animate-pulse h-[90%]"></div>
                                        </div>
                                      ) : (
                                        <Play className="w-3 h-3 text-white fill-white" />
                                      )}
                                    </div>
                                  </div>

                                  <div className="space-y-1 overflow-hidden">
                                    <h5 className="font-sans font-black text-xs text-zinc-950 line-clamp-1 group-hover:text-amber-600 transition">
                                      {video.title}
                                    </h5>
                                    <span className="block font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-widest leading-none">
                                      {video.sub}
                                    </span>
                                    <p className="text-[10px] text-zinc-500 leading-relaxed font-light line-clamp-2 mt-0.5">
                                      {video.desc}
                                    </p>
                                  </div>

                                  {isActive && (
                                    <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-500" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Active Lore Card */}
                        <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-150 space-y-2.5">
                          <h4 className="font-sans font-black text-xs text-zinc-500 tracking-wider uppercase font-mono">
                            CLIPS SYNOPSIS (시놉시스)
                          </h4>
                          <div className="space-y-1.5 text-zinc-700">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 animate-pulse"></span>
                              스토리 주연: <span className="text-amber-800 font-black">{activeVideo.character}</span>
                            </div>
                            <p className="font-sans text-[11px] leading-relaxed text-zinc-600 font-light">
                              {activeVideo.desc}
                            </p>
                          </div>
                          <div className="p-3 bg-white border border-zinc-150 rounded-xl space-y-1 flex items-center gap-2">
                            <span className="text-xs">🎵</span>
                            <div>
                              <span className="block font-sans font-black text-[10px] text-zinc-900 leading-tight">가상 수록 사운드트랙</span>
                              <span className="block font-mono text-[9px] text-zinc-400 uppercase leading-none">BGM // ACTIVE CHRONO BEAT</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Middle: Phone Shorts Video Simulator (4 cols) */}
                      <div className="lg:col-span-4 flex flex-col items-center justify-center p-2">
                        
                        {/* iPhone/Galaxy inspired virtual smartphone frame */}
                        <div className="w-full max-w-[275px] aspect-[9/18] bg-zinc-950 rounded-[40px] border-[5px] border-zinc-900 shadow-2xl relative flex flex-col overflow-hidden ring-4 ring-zinc-800/40">
                          
                          {/* Screen Header / Dynamic notch camera */}
                          <div className="absolute top-0 inset-x-0 h-6 bg-black z-20 flex items-center justify-center">
                            <div className="w-16 h-3.5 bg-zinc-900 rounded-b-xl flex items-center justify-between px-3 select-none">
                              <span className="w-1 h-1 rounded-full bg-zinc-600" />
                              <span className="w-6 h-1 rounded-full bg-zinc-850" />
                            </div>
                          </div>

                          {/* Video Screen Content Area */}
                          <div 
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="flex-1 bg-zinc-900 relative flex flex-col justify-end overflow-hidden cursor-pointer select-none"
                          >
                            
                            {/* Visual background image representing the novel character with cinematic filters */}
                            <div className="absolute inset-0">
                              <motion.img
                                key={activeVideo.id}
                                src={activeVideo.coverImage}
                                alt={activeVideo.title}
                                animate={isPlaying ? {
                                  scale: [1.02, 1.13, 1.06, 1.20, 1.02],
                                  x: [0, 4, -5, 3, 0],
                                  y: [0, -4, 4, -2, 0],
                                  filter: [
                                    "brightness(0.7) contrast(1.16) saturate(1.22) hue-rotate(0deg)",
                                    "brightness(0.88) contrast(1.28) saturate(1.36) hue-rotate(-2deg)",
                                    "brightness(0.66) contrast(1.1) saturate(1.16) hue-rotate(2deg)",
                                    "brightness(0.82) contrast(1.22) saturate(1.28) hue-rotate(0deg)",
                                    "brightness(0.7) contrast(1.16) saturate(1.22) hue-rotate(0deg)"
                                  ]
                                } : { 
                                  scale: 1.01, 
                                  filter: "brightness(0.4) contrast(0.95)" 
                                }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 12,
                                  ease: "easeInOut"
                                }}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/55 to-transparent z-[2] pointer-events-none" />

                              {/* Cinematic Anime Vignette and Scanline Overlays if playing */}
                              {isPlaying && (
                                <div className="absolute inset-0 z-3 pointer-events-none overflow-hidden">
                                  {/* Speedlines repeating ring effect */}
                                  <div className="absolute inset-0 opacity-[0.22] bg-[radial-gradient(ellipse_at_center,_transparent_42%,_#000_100%)] mix-blend-multiply" />
                                  
                                  {/* Dynamic Film grain Scanlines */}
                                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.22)_50%)] bg-[length:100%_4px] opacity-15" />
                                  
                                  {/* Kinetic Anime Speed rings for actions */}
                                  <motion.div
                                    animate={{
                                      scale: [0.93, 1.03, 0.93],
                                      opacity: [0.12, 0.3, 0.12]
                                    }}
                                    transition={{ repeat: Infinity, duration: 0.22, ease: "linear" }}
                                    className="absolute inset-x-[-15%] inset-y-[-15%] bg-[repeating-radial-gradient(circle,_transparent,_transparent_10px,_rgba(255,255,255,0.05)_12px,_rgba(255,255,255,0.05)_14px)]"
                                  />
                                  
                                  {/* Beautiful Japanese Anime Chromatic Light Leaks */}
                                  <motion.div
                                    animate={{
                                      opacity: [0.2, 0.5, 0.2],
                                      background: [
                                        "linear-gradient(135deg, rgba(236,72,153,0.12) 0%, rgba(245,158,11,0.04) 50%, rgba(14,165,233,0.08) 100%)",
                                        "linear-gradient(225deg, rgba(14,165,233,0.18) 0%, rgba(168,85,247,0.08) 50%, rgba(236,72,153,0.15) 100%)",
                                        "linear-gradient(135deg, rgba(236,72,153,0.12) 0%, rgba(245,158,11,0.04) 50%, rgba(14,165,233,0.08) 100%)"
                                      ]
                                    }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 mix-blend-screen"
                                  />

                                  {/* Beautiful drifting gold/white particles */}
                                  {[...Array(6)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      className="absolute w-1.5 h-1.5 bg-rose-200/50 rounded-full blur-[0.5px]"
                                      initial={{ 
                                        x: Math.random() * 260, 
                                        y: Math.random() * 200 + 300, 
                                        scale: 0.5 + Math.random() * 0.8,
                                        opacity: 0
                                      }}
                                      animate={{
                                        y: -20,
                                        x: `+=${(Math.random() - 0.5) * 60}`,
                                        opacity: [0, 0.85, 0.85, 0],
                                        rotate: [0, 360]
                                      }}
                                      transition={{
                                        duration: 4.5 + Math.random() * 2.5,
                                        repeat: Infinity,
                                        delay: i * 0.9,
                                        ease: "linear"
                                      }}
                                      style={{
                                        boxShadow: "0 0 5px 2px rgba(244,63,94,0.3)"
                                      }}
                                    />
                                  ))}
                                  
                                  {/* Advanced Futuristic Tactical HUD (Inspired by Endfield Deliverer Core Interface) */}
                                  <div className="absolute inset-0 z-3 pointer-events-none overflow-hidden select-none font-mono">
                                    {/* Subtle Hexagon patterns or grids overlay */}
                                    <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]" />
                                    
                                    {/* Circular Rotating Laser Scanner (Tactical Weapon Aim Reticle) */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                                        className="w-48 h-48 border border-dashed border-teal-500/25 rounded-full relative flex items-center justify-center"
                                      >
                                        <div className="absolute -inset-2 border border-dotted border-teal-500/10 rounded-full" />
                                        <motion.div 
                                          animate={{ rotate: -360 }}
                                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                          className="w-24 h-24 border border-teal-400/20 rounded-full border-t border-r border-t-teal-400/50 border-r-teal-400/10"
                                        />
                                        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-teal-500/10" />
                                        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-teal-500/10" />
                                      </motion.div>
                                    </div>

                                    {/* Tactical telemetry coordinates (Bottom Left) */}
                                    <div className="absolute bottom-32 left-4 text-[7px] text-teal-500/80 tracking-widest leading-normal flex flex-col gap-0.5 select-none bg-black/40 p-1.5 rounded-lg border border-white/5 backdrop-blur-xs">
                                      <div className="flex items-center gap-1 font-black">
                                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                                        <span>COORD: 54.218 / -92.404</span>
                                      </div>
                                      <div>SIGNAL FIELD: 97.15%</div>
                                      {selectedVideoId === 'b3-v1' && <div className="text-teal-400">POWER RACK: CORE_STRENGTH</div>}
                                      {selectedVideoId === 'b3-v2' && <div className="text-orange-400">BARRIER FIELD: ACTIVE</div>}
                                      <div className="text-zinc-500">PROTOCOL: KINETIC_LUMINA</div>
                                    </div>

                                    {/* Real-time soundwave bar meter (Bottom Right) */}
                                    <div className="absolute bottom-32 right-4 flex items-end gap-0.5 h-6 bg-black/35 p-1 rounded border border-white/5">
                                      {[...Array(6)].map((_, idx) => (
                                        <motion.div
                                          key={idx}
                                          animate={{
                                            height: isPlaying 
                                              ? [4, Math.random() * 16 + 4, 4] 
                                              : 4
                                          }}
                                          transition={{
                                            duration: 0.2 + idx * 0.05,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                          }}
                                          className="w-1 bg-teal-500/80 rounded-t-[1px]"
                                        />
                                      ))}
                                    </div>

                                    {/* Anime Filming Display HUD */}
                                    <div className="absolute top-14 left-4 font-mono font-bold text-[8px] text-zinc-400 select-none flex flex-col gap-0.5">
                                      <div className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                                        <span className="text-zinc-300">● MEDIAMIX REC</span>
                                      </div>
                                      <div className="text-zinc-500 text-[7px] leading-none mt-0.5">
                                        THEATER SIMULATOR v4 // 23.976fps
                                      </div>
                                    </div>

                                    <div className="absolute top-14 right-4 font-mono font-bold text-[7px] text-zinc-500 select-none text-right">
                                      LORE_SYNC: RESOLVED<br/>
                                      FILTER: NOSTALGIC_GRADIENT
                                    </div>

                                    {/* Scope crops */}
                                    <div className="absolute top-12 left-3 w-2.5 h-2.5 border-t border-l border-white/20" />
                                    <div className="absolute top-12 right-3 w-2.5 h-2.5 border-t border-r border-white/20" />
                                    <div className="absolute bottom-12 left-3 w-2.5 h-2.5 border-b border-l border-white/20" />
                                    <div className="absolute bottom-12 right-3 w-2.5 h-2.5 border-b border-r border-white/20" />
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Floating Sparkles and Magic circle indicators (B2/B3 aesthetic theme) */}
                            {isPlaying && (
                              <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 flex items-center justify-center">
                                {/* Subtle magic particle or flash loop inside shorts based on video state */}
                                <motion.div
                                  animate={{
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 3, -3, 0],
                                    opacity: [0.15, 0.35, 0.15],
                                  }}
                                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                  className={`w-36 h-36 rounded-full border border-dashed text-center flex items-center justify-center text-[10px] ${
                                    isB2 
                                      ? 'border-amber-400/25 text-amber-400 font-serif' 
                                      : 'border-teal-400/25 text-teal-400'
                                  }`}
                                >
                                  {isB2 ? 'CHRONO LOUPE ENGRAVE' : 'POWER RACK ENGRAVE'}
                                </motion.div>
                              </div>
                            )}

                            {/* Playback status overlay icon */}
                            <AnimatePresence>
                              {!isPlaying && (
                                <motion.div
                                  initial={{ scale: 0.5, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 0.8 }}
                                  exit={{ scale: 1.5, opacity: 0 }}
                                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/60 shadow-lg flex items-center justify-center z-20 pointer-events-none"
                                >
                                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Quick notification bar top */}
                            <div className="absolute top-7 inset-x-0 px-4 flex justify-between items-center z-10 text-[9px] font-mono tracking-wider text-white/50 pointer-events-none">
                              <span className="flex items-center gap-1 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                MULTIMEDIA MIX
                              </span>
                              <span className="font-bold flex items-center gap-1 bg-white/10 rounded-full px-2 py-0.5 backdrop-blur-xs">
                                {Math.floor(currentSecond)}s / 15s
                              </span>
                            </div>

                            {/* Over-the-video interface (Like/Comment/Share bar) (Right floating edge, absolute) */}
                            <div className="absolute right-2 bottom-16 flex flex-col items-center gap-3.5 z-20">
                              
                              {/* Creator avatar icon */}
                              <div className="relative group/avatar">
                                <div className="w-9 h-9 rounded-full border border-white/85 overflow-hidden bg-zinc-800 shadow-md">
                                  <img
                                    src={activeVideo.avatar}
                                    alt="Creator"
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-[10px] text-zinc-950 font-black leading-none select-none border border-zinc-950">+</span>
                              </div>

                              {/* Heart Like button */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLike(activeVideo.id);
                                }}
                                className="flex flex-col items-center gap-0.5 group cursor-pointer focus:outline-none"
                              >
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md shadow-xs transition duration-300 ${
                                  userLikedVideos[activeVideo.id]
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-black/35 text-white/90 hover:bg-black/55 hover:scale-105'
                                }`}>
                                  <Heart className={`w-[18px] h-[18px] ${userLikedVideos[activeVideo.id] ? 'fill-current' : ''}`} />
                                </div>
                                <span className="text-[10px] font-mono font-black text-white px-1 leading-none drop-shadow-md">
                                  {videoLikes[activeVideo.id]}
                                </span>
                              </button>

                              {/* Comment icon display */}
                              <div className="flex flex-col items-center gap-0.5">
                                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-black/35 backdrop-blur-md text-white/90">
                                  <MessageSquare className="w-[18px] h-[18px]" />
                                </div>
                                <span className="text-[10px] font-mono font-black text-white px-1 leading-none drop-shadow-md">
                                  {getCommentsForVideo(activeVideo.id, activeVideo.initialComments).length}
                                </span>
                              </div>

                              {/* Virtual Share Button */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  alert(`'${activeVideo.title}' 정복 주연 클립 링크가 복사되었습니다! (시뮬레이터 공유 완료)`);
                                }}
                                className="w-9 h-9 rounded-full flex items-center justify-center bg-black/35 backdrop-blur-md text-white/90 hover:bg-black/55 hover:scale-105 transition duration-300 cursor-pointer"
                              >
                                <Share2 className="w-[18px] h-[18px]" />
                              </button>
                            </div>

                            {/* Left Text Detail info Overlay (Bottom of screens) */}
                            <div className="absolute left-3 bottom-4 right-14 z-20 text-white space-y-1.5 pointer-events-none text-left select-none">
                              <div className="text-[9px] font-bold font-mono text-amber-400 drop-shadow-sm flex items-center gap-1 bg-amber-950/40 border border-amber-900/20 px-2 py-0.5 rounded-md w-max">
                                <span className="w-1 h-1 rounded-full bg-amber-400 animate-ping"></span>
                                ON-STORY: {activeVideo.character}
                              </div>
                              <h4 className="font-sans font-black text-xs leading-tight text-white line-clamp-1 drop-shadow-md">
                                {activeVideo.title}
                              </h4>

                              {/* Interactive dynamic subtitle box synced precisely on time */}
                              <div className="mt-2 bg-black/90 border border-zinc-800/65 p-3 rounded-xl shadow-lg ring-1 ring-white/5 leading-relaxed">
                                <p className="font-mono text-[9px] text-zinc-400 text-center uppercase tracking-wider mb-1 select-none opacity-85">
                                  {getJapaneseSubtitle(activeSubtitle.text)}
                                </p>
                                <p className="font-sans text-[11px] font-bold text-center text-zinc-100">
                                  <span className="text-orange-400 font-extrabold">[{activeSubtitle.speaker}]: </span>
                                  {activeSubtitle.text}
                                </p>
                              </div>
                            </div>

                            {/* Virtual Audio Sound Overlay */}
                            <div className="absolute bottom-14 left-3 z-30 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-xs border border-white/5 pointer-events-auto">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsAudioMuted(!isAudioMuted);
                                }}
                                className="text-zinc-350 hover:text-white transition cursor-pointer"
                              >
                                {isAudioMuted ? (
                                  <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                                ) : (
                                  <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                                )}
                              </button>
                              <div className="flex gap-0.5 items-end justify-center h-4 px-1">
                                {[1, 2, 3, 4, 5].map((idx) => {
                                  const barHz = isAudioMuted || !isPlaying
                                    ? 2
                                    : Math.floor(Math.sin((videoProgress * idx) / 3) * 6 + 10);
                                  return (
                                    <div
                                      key={idx}
                                      className={`w-[1.5px] rounded-full transition-all duration-150 ${
                                        isAudioMuted ? 'bg-zinc-650' : 'bg-amber-400'
                                      }`}
                                      style={{ height: `${Math.max(2, Math.min(16, barHz))}px` }}
                                    ></div>
                                  );
                                })}
                              </div>
                            </div>

                          </div>

                          {/* Video Progress Bar slider (Strictly visual sync) */}
                          <div className="h-1 bg-zinc-850 w-full relative z-10 shrink-0 select-none pointer-events-none">
                            <div 
                              className={`h-full transition-all duration-150 ease-linear ${
                                isB2 ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-teal-500 to-emerald-500'
                              }`} 
                              style={{ width: `${videoProgress}%` }}
                            />
                          </div>

                        </div>
                      </div>

                      {/* Right: Rich Interactive Dynamic FAN Comments and feedback (4 cols) */}
                      <div className="lg:col-span-4 flex flex-col gap-4">
                        <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-150 flex flex-col justify-between h-full space-y-3 min-h-[350px]">
                          <div>
                            <div className="flex justify-between items-center border-b border-zinc-200 pb-2 mb-2">
                              <h4 className="font-sans font-black text-xs text-zinc-500 tracking-wider">
                                상세 설정 및 세계관 해석집
                              </h4>
                              <span className="text-[9px] font-mono font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">
                                ACTIVE_LORE
                              </span>
                            </div>

                            <div className="space-y-3">
                              <div className="bg-white border border-zinc-200 p-3.5 rounded-xl space-y-1 shadow-2xs">
                                <span className="text-[10px] text-teal-600 font-bold block">스토리 주연 캐릭터</span>
                                <span className="font-sans font-black text-sm text-zinc-950 block">{activeVideo.character}</span>
                              </div>

                              <div className="bg-white border border-zinc-200 p-3.5 rounded-xl space-y-1.5 shadow-2xs">
                                <span className="text-[10px] text-zinc-400 font-bold block">에피소드 개요</span>
                                <p className="font-sans text-xs text-zinc-650 leading-relaxed font-light">
                                  {activeVideo.desc}
                                </p>
                              </div>

                              <div className="bg-amber-50/45 border border-amber-200/50 p-3.5 rounded-xl space-y-1">
                                <span className="text-[10px] text-amber-800 font-black block">💡 작가 한마디 & 세계관 주해</span>
                                <p className="font-sans text-[11px] text-zinc-650 leading-relaxed">
                                  {activeVideo.id === 'b3-v1' 
                                    ? "기사단장 루미나의 비정상적 근섬유 포사주 원리와 왕녀 에티야의 전생 기억 속 차원 마법이 교차하는 지점입니다. 일상적 대화 속에 유쾌한 파워 인과가 숨어있습니다."
                                    : "왕녀가 부딪치는 정치가들의 가식과 위협을, 장막 마법이라는 고유 메커니즘으로 방어하는 지극히 차분하면서도 삼엄한 정치 시나리오의 핵심입니다."
                                  }
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-teal-50/40 border border-teal-200/40 rounded-xl">
                            <span className="text-[10px] font-bold text-teal-800 block">✓ 상단 비디오 루프 가동 완료</span>
                            <p className="text-[10.5px] text-zinc-500 leading-tight mt-0.5">
                              원작 라이트노벨의 고품격 애니메이션 각색 시뮬레이터를 정상적으로 로드했습니다.
                            </p>
                          </div>

                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pagination Back to top Helper */}
            <div className="border-t border-zinc-150 pt-4 flex justify-between items-center shrink-0">
              <span className="text-[10px] font-mono text-zinc-400">STORY TRANSLATION ENGINE</span>
            </div>

          </div>
        ) : isB4 ? (
          /* B4: GEIST-INSPIRED CREATOR LABORATORY (기반 캐릭터 창작과 서사 엔진) */
          <div className="flex-1 mt-6 sm:mt-8 flex flex-col gap-8 overflow-hidden min-h-0">
            {/* Header Dashboard with subtle grid and animated line */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-950 via-zinc-900 to-black text-white relative overflow-hidden border border-indigo-500/25 shadow-xl shrink-0">
              <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-[0.03] pointer-events-none scale-150 select-none">
                <Palette className="w-64 h-64 text-indigo-400 rotate-12" />
              </div>
              <div className="relative space-y-3 max-w-4xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 rounded-full text-[10px] font-mono font-black uppercase tracking-widest shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-400" /> CHARACTER CREATION LAB // METAMIX
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight">
                  기반 캐릭터 <span className="text-indigo-400 text-lg sm:text-xl font-medium font-serif italic">창작 및 서사 방법론 설계집</span>
                </h2>
                <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  유저의 소설 작법인 <strong>갈등의 형이상학적 대칭성(내면적 이중성)</strong>, <strong>고선명 외모/복식 고전화</strong>, 그리고 <strong>동력기관(유에/파워락)과의 인과관계 연동</strong>을 심도 있게 계승해, 모바일 서브컬처 3대 명작 세계관에 적합한 6인의 독자적인 기반 캐릭터들을 창조했습니다.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-[11px] font-mono text-zinc-400 border-t border-zinc-805/40">
                  <div>STUDY THEME: <span className="font-black text-indigo-305 text-xs">"발송자 표시 제한" & "Alive" 역학</span></div>
                  <div>CHARACTERS: <span className="font-black text-indigo-305 text-xs">6 NEW ROLES CREATED</span></div>
                  <div>ENGINE LUT: <span className="font-black text-indigo-350 text-xs">ANIME_HYPER_FLOW</span></div>
                </div>
              </div>
            </div>

            {/* Custom Tab Bar for game platforms + methodology */}
            <div className="flex border-b border-zinc-200 px-1 gap-1.5 overflow-x-auto scrollbar-none shrink-0">
              <button
                onClick={() => setB4GameTab('methodology')}
                className={`px-4 sm:px-5 py-3 font-sans font-black text-[11px] sm:text-[12px] uppercase tracking-wider flex items-center gap-2 border-b-2 transition duration-300 cursor-pointer shrink-0 ${
                  b4GameTab === 'methodology' 
                    ? 'border-b-indigo-600 text-indigo-700' 
                    : 'border-transparent text-zinc-500 hover:text-indigo-950'
                }`}
              >
                <Layers className="w-4 h-4" />
                서사 창작 방법론 (METHODOLOGY)
              </button>
              <button
                onClick={() => setB4GameTab('arknights')}
                className={`px-4 sm:px-5 py-3 font-sans font-black text-[11px] sm:text-[12px] uppercase tracking-wider flex items-center gap-2 border-b-2 transition duration-300 cursor-pointer shrink-0 ${
                  b4GameTab === 'arknights' 
                    ? 'border-b-indigo-600 text-indigo-700' 
                    : 'border-transparent text-zinc-500 hover:text-indigo-950'
                }`}
              >
                <Shield className="w-4 h-4 text-emerald-600" />
                명일방주 기반 (ARKNIGHTS)
              </button>
              <button
                onClick={() => setB4GameTab('bluearchive')}
                className={`px-4 sm:px-5 py-3 font-sans font-black text-[11px] sm:text-[12px] uppercase tracking-wider flex items-center gap-2 border-b-2 transition duration-300 cursor-pointer shrink-0 ${
                  b4GameTab === 'bluearchive' 
                    ? 'border-b-indigo-600 text-indigo-700' 
                    : 'border-transparent text-zinc-500 hover:text-indigo-950'
                }`}
              >
                <Sparkles className="w-4 h-4 text-sky-500" />
                블루 아카이브 기반 (BLUE ARCHIVE)
              </button>
              <button
                onClick={() => setB4GameTab('reverse1999')}
                className={`px-4 sm:px-5 py-3 font-sans font-black text-[11px] sm:text-[12px] uppercase tracking-wider flex items-center gap-2 border-b-2 transition duration-300 cursor-pointer shrink-0 ${
                  b4GameTab === 'reverse1999' 
                    ? 'border-b-indigo-600 text-indigo-700' 
                    : 'border-transparent text-zinc-500 hover:text-indigo-950'
                }`}
              >
                <Compass className="w-4 h-4 text-amber-600" />
                리버스: 1999 기반 (REVERSE1999)
              </button>
            </div>

            {/* Sub content Area with animations */}
            <div className="flex-1 overflow-y-auto pr-1 min-h-0 pb-10">
              <AnimatePresence mode="wait">
                {b4GameTab === 'methodology' && (
                  <motion.div
                    key="methodology"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
                      <h3 className="font-sans font-black text-sm text-zinc-800 tracking-wider flex items-center gap-2 mb-4">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block animate-pulse" />
                        유저 핵심 소설 작법 분석 매트릭스
                      </h3>
                      <div className="space-y-4 text-xs font-sans text-zinc-700 leading-relaxed font-light">
                        <div className="p-4 rounded-xl bg-white border border-zinc-150 space-y-1.5 shadow-2xs">
                          <h4 className="font-bold text-zinc-900 text-xs sm:text-sm">1. 내면 갈등의 대칭성과 이중화 설계</h4>
                          <p>
                            셰티르의 <strong className="font-bold text-zinc-950">빛의 자아 vs 약화된 자존감의 궤도</strong>, 에티야의 <strong className="font-bold text-zinc-950">전생 기인(사이코패스 본성) vs 현생 기사(소극적 이성)</strong>처럼 극단적인 인격적 대칭 구조를 활용해 평범하지 않은 내면의 격돌을 자아내며 고도의 서사적 긴장감을 불어넣습니다.
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white border border-zinc-150 space-y-1.5 shadow-2xs">
                          <h4 className="font-bold text-zinc-900 text-xs sm:text-sm">2. 정교한 시각적/복식 기사도 및 고전화</h4>
                          <p>
                            단순한 단편 캐릭터가 아니라 귀, 꼬리, 눈동자 색의 매혹적 디테일과 중세-하이테크 하이브리드의 화려한 의상 설계(아카데미아 세공 제복, 판금 견갑, 코르셋 레더 벨트)를 극단적으로 세밀하게 명문화하여 시각을 자극합니다.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col justify-between">
                      <div className="space-y-4">
                        <h3 className="font-sans font-black text-sm text-zinc-800 tracking-wider flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
                          시스템적 개연성 & 주변 인물 동기화
                        </h3>
                        <div className="space-y-4 text-xs font-sans text-zinc-700 leading-relaxed font-light">
                          <div className="p-4 rounded-xl bg-white border border-zinc-150 space-y-1.5 shadow-2xs">
                            <h4 className="font-bold text-zinc-900 text-xs sm:text-sm">3. 오동작 동력 및 고위 마법의 전술 결부</h4>
                            <p>
                              빛의 아네에서 고위 마네 계통으로의 진화, 혹은 파워락 폭발 역장의 신체 접촉에 따른 거동 장애 리스크 등, 세계관의 물리 법칙이나 마법 시스템을 사건 전개의 직접적인 매개로 밀착 연동시켜 과학적 개연성을 배가합니다.
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-white border border-zinc-150 space-y-1.5 shadow-2xs">
                            <h4 className="font-bold text-zinc-900 text-xs sm:text-sm">4. 관계적 기류의 다자 동시 발흥 (Supporting Line-up)</h4>
                            <p>
                              주인공의 결사 외에도 학우 모어, 은밀 비호 세력 마코, 동생 리카, 충직한 우방 약혼자 등 다층적인 주변 인물 관계망을 설계해 서사의 입체적 동학을 만들어냅니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {b4GameTab === 'arknights' && (
                  <motion.div
                    key="arknights"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start animate-fade-in"
                  >
                    {/* Left: Cards for Arka & Lien */}
                    <div className="xl:col-span-7 space-y-6">
                      {/* Arka Card */}
                      <div className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm relative overflow-hidden">
                        <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 font-black font-mono text-[72px] text-emerald-50/70 pointer-events-none uppercase select-none">
                          BEAR
                        </div>
                        <div className="space-y-3 relative">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full border border-emerald-300 p-0.5 bg-zinc-50 overflow-hidden shrink-0">
                              <span className="w-full h-full rounded-full bg-emerald-500/10 flex items-center justify-center font-bold text-emerald-700 text-xs font-mono">AK-1</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[8px] font-black px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 uppercase">Rhodes Medical</span>
                                <span className="font-mono text-[8px] font-black px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-650 uppercase">Ursa Demihuman</span>
                              </div>
                              <h3 className="font-sans font-black text-lg text-zinc-950 mt-0.5">아르카 (Arka)</h3>
                            </div>
                          </div>
                          <span className="block h-[1px] bg-zinc-100" />
                          <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed font-light">
                            <strong>[서사 및 반전적 내면]</strong> 과거 거센 제국 전방의 혈투 속에서 적들을 잔인하게 짓뭉개던 야수적 전투 천재 위생 사병이었습니다. 그러나 동료와 적군 할 것 없이 터져나가는 선혈 앞에 자신의 깊은 파괴 본능에 기시감과 혐오를 느끼고, 극단적으로 섬세하고 다정한 침묵의 침구 의무 대원으로 거듭난 소년입니다. 치료라는 형식 속에 타인의 목숨을 완전히 구원하고 통제하려는 또 다른 강박에 시달리고 있습니다.
                          </p>
                          <p className="font-sans text-xs sm:text-sm text-emerald-950 leading-relaxed font-light">
                            <strong>[외형 및 복식 특징]</strong> 곱게 갈라진 반수형 검은 곰 귀 끝에 은빛 침핀 장식을 고정했으며, 깊고 조용한 잿빛 얼음 서리의 은청색 안광을 발합니다. 오리파티(광석병) 소독약 입자가 조용히 묻어나는 슬림핏 백색 의무 가림 코트 아우터와 내마도 테크 레더 카고팬츠, 손끝 마비 제약용 가죽 스트랩 장갑을 매칭 장착하고 있습니다.
                          </p>
                          <div className="mt-3 text-[10px] sm:text-xs font-mono text-zinc-650 flex items-center gap-2 bg-emerald-50/40 p-2.5 rounded-lg border border-emerald-100/50">
                            <span className="font-bold text-emerald-700 uppercase">[오리지늄 아츠]</span>
                            <span>세포 융해 결속 (Cell Restoration / Reversion Science)</span>
                          </div>
                        </div>
                      </div>

                      {/* Lien Card */}
                      <div className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm relative overflow-hidden">
                        <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 font-black font-mono text-[72px] text-emerald-50/70 pointer-events-none uppercase select-none">
                          WOLF
                        </div>
                        <div className="space-y-3 relative">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full border border-emerald-300 p-0.5 bg-zinc-50 overflow-hidden shrink-0">
                              <span className="w-full h-full rounded-full bg-emerald-500/10 flex items-center justify-center font-bold text-emerald-700 text-xs font-mono">AK-2</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[8px] font-black px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 uppercase">Wolf Guard Sniper</span>
                                <span className="font-mono text-[8px] font-black px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-650 uppercase">Lupo Demihuman</span>
                              </div>
                              <h3 className="font-sans font-black text-lg text-zinc-950 mt-0.5">리엔 (Lien)</h3>
                            </div>
                          </div>
                          <span className="block h-[1px] bg-zinc-100" />
                          <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed font-light">
                            <strong>[서사 및 반전적 내면]</strong> 시라쿠사 뒷골목에서 태어나 기계적으로 목표를 격살하는 냉혹한 <strong className="font-bold text-zinc-950">‘가문의 탄창 배달소녀’</strong>로 혹사당해 왔습니다. 격렬한 세력 정화 속에서 혈혈단신 소속을 잃고 방치되었을 때 로도스 아일랜드의 보호 하에 귀순했습니다. 수많은 살육 끝에 입술을 지그시 깨무는 영속적 침묵의 습관을 지니고 있으며, 아군 전위들이 난전에 빠지면 그들을 절대 엄호하겠다는 강철 같은 성약을 짊어집니다.
                          </p>
                          <p className="font-sans text-xs sm:text-sm text-emerald-955 leading-relaxed font-light">
                            <strong>[외형 및 복식 특징]</strong> 차갑고 날카롭게 날이 선 어두운 차콜빛의 루포 늑대 귀와 매혹적인 피빛 루비 동공의 소유자. 시라쿠사식 수트 가죽 재단 기술이 투명하게 이식된 기품 서린 블랙 롱 포멀 트렌치코트에 어깨 판금 전장 보호 견갑 가드를 달았고, 가죽 전술 벨트와 탄창 홀스터들을 구비했습니다.
                          </p>
                          <div className="mt-3 text-[10px] sm:text-xs font-mono text-zinc-650 flex items-center gap-2 bg-emerald-50/40 p-2.5 rounded-lg border border-emerald-100/50">
                            <span className="font-bold text-emerald-700 uppercase">[고유 전술 장비]</span>
                            <span>발터-9 오리지늄 마도 저격 소총 (V-9 High-Pressure Compressed Sniper)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Anime loops card holding custom image with filters */}
                    <div className="xl:col-span-5 flex flex-col gap-4">
                      <div className="rounded-2xl border border-emerald-150 p-4 bg-zinc-50 relative overflow-hidden flex flex-col shadow-xs">
                        <div className="aspect-[9/16] rounded-xl overflow-hidden relative shadow-md bg-stone-900 border border-zinc-200">
                          <motion.img
                            src="/src/assets/images/ark_inspired_v1_1780330945756.png"
                            alt="Arknights Inspired Characters"
                            animate={{
                              scale: [1, 1.05, 1.01, 1.06, 1],
                              filter: [
                                "brightness(0.7) contrast(1.15) saturate(1.1)",
                                "brightness(0.8) contrast(1.2) saturate(1.2)",
                                "brightness(0.65) contrast(1.1) saturate(1.15)",
                                "brightness(0.75) contrast(1.25) saturate(1.25)",
                                "brightness(0.7) contrast(1.15) saturate(1.1)"
                              ]
                            }}
                            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          
                          {/* Aesthetic Scanlines & Overlay & Speedlines */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/45 z-2" />
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(10,12,12,0)_50%,_rgba(0,0,0,0.22)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none z-3" />
                          
                          {/* HUD Details */}
                          <div className="absolute top-4 left-4 font-mono font-black text-[8px] text-zinc-400 select-none flex flex-col gap-0.5 z-3">
                            <div className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                              <span className="text-emerald-400">● RHODES_SYS_REC</span>
                            </div>
                            <div className="text-zinc-500 text-[6.5px] leading-none mt-0.5">
                              TERRITORY_SCAN // LUT_ARK_CINEMATIC
                            </div>
                          </div>

                          <div className="absolute top-4 right-4 font-mono text-zinc-500 text-[6.5px] font-black text-right z-3">
                            CODE: ARK-INSPIRED-V1<br/>
                            FPS: 23.976 // SENSITIVE
                          </div>

                          <div className="absolute top-8 left-3 w-3 h-3 border-t border-l border-white/20 z-3" />
                          <div className="absolute top-8 right-3 w-3 h-3 border-t border-r border-white/20 z-3" />
                          <div className="absolute bottom-16 left-3 w-3 h-3 border-b border-l border-white/20 z-3" />
                          <div className="absolute bottom-16 right-3 w-3 h-3 border-b border-r border-white/20 z-3" />

                          <div className="absolute inset-x-0 bottom-4 px-4 flex flex-col justify-end z-4 pt-12">
                            <span className="font-mono text-[9px] font-black text-emerald-400 tracking-wider">MEDIA SYNTHESIS ENGINE</span>
                            <h4 className="text-white text-xs sm:text-xs font-sans font-black mt-0.5 uppercase">명일방주 기반 비주얼 시각화 원화</h4>
                          </div>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-mono leading-relaxed mt-3 px-1">
                          영상 생성 AI를 통한 웅장하고 어두운 황야 클리닉 비주얼 가동 루프입니다. 우르사스 위생병 아르카와 루포 전술 사격 리엔의 묵직한 하이 레벨 연대를 감상하세요.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {b4GameTab === 'bluearchive' && (
                  <motion.div
                    key="bluearchive"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start animate-fade-in"
                  >
                    {/* Left: Cards for Kanade & Shizuku */}
                    <div className="xl:col-span-7 space-y-6">
                      {/* Kanade Card */}
                      <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm relative overflow-hidden">
                        <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 font-black font-mono text-[72px] text-sky-50/70 pointer-events-none uppercase select-none font-serif">
                          ANGEL
                        </div>
                        <div className="space-y-3 relative">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full border border-sky-300 p-0.5 bg-zinc-50 overflow-hidden shrink-0">
                              <span className="w-full h-full rounded-full bg-sky-500/10 flex items-center justify-center font-bold text-sky-600 text-xs font-mono">BA-1</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[8px] font-black px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 uppercase">Trinity Knight</span>
                                <span className="font-mono text-[8px] font-black px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-650 uppercase">Rescue Relief</span>
                              </div>
                              <h3 className="font-sans font-black text-lg text-zinc-950 mt-0.5">유리조노 카나데 (Yurizono Kanade)</h3>
                            </div>
                          </div>
                          <span className="block h-[1px] bg-zinc-100" />
                          <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed font-light">
                            <strong>[서사 및 반전적 내면]</strong> 트리니티 최고 명예인 구호기사단 소속 장난꾸러기 기사단 학도입니다. "아픈 거 고쳐줄 테니 가만히 계세요!"라며 상냥한 미소를 띠지만, 소중한 아군이나 환자 뒤를 기습하려는 나쁜 불량배 무리(게헨나 거친 패거리나 무속성 도적)를 마주치면 즉각 소형 전술 소이탄 기관총을 무자비하게 난사해 등가죽에 불도장을 새겨주는 고상한 전술적 야만성을 지녔습니다.
                          </p>
                          <p className="font-sans text-xs sm:text-sm text-sky-955 leading-relaxed font-light">
                            <strong>[외형 및 복식 특징]</strong> 찰랑이는 파스텔 살구 핑크빛 반묶음 트윈테일에 하얀 면사 보조 안대 밴드를 착용하고 있으며 머리 위에 하트 형상 핑크빛 링 헤일로(Halo)가 둥실 부유합니다. 기품 서린 깃 세운 백색 카라 트리니티 세일러 원피스에 튼튼한 무광가죽 크루세이더 이중 탄띠 벨트를 두르고 있습니다.
                          </p>
                          <div className="mt-3 text-[10px] sm:text-xs font-mono text-zinc-650 flex items-center gap-2 bg-sky-50/40 p-2.5 rounded-lg border border-sky-100/50">
                            <span className="font-bold text-sky-600 uppercase">[소지 학도 총기]</span>
                            <span>신성한 제어 9mm 머신피스톨 "Sanctus Remedium"</span>
                          </div>
                        </div>
                      </div>

                      {/* Shizuku Card */}
                      <div className="p-6 rounded-2xl bg-white border border-sky-100 shadow-sm relative overflow-hidden">
                        <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 font-black font-mono text-[72px] text-sky-50/70 pointer-events-none uppercase select-none">
                          DATA
                        </div>
                        <div className="space-y-3 relative">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full border border-sky-300 p-0.5 bg-zinc-50 overflow-hidden shrink-0">
                              <span className="w-full h-full rounded-full bg-sky-500/10 flex items-center justify-center font-bold text-sky-600 text-xs font-mono">BA-2</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[8px] font-black px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 uppercase">Millennium Seminar</span>
                                <span className="font-mono text-[8px] font-black px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-650 uppercase">Quantum Analyzer</span>
                              </div>
                              <h3 className="font-sans font-black text-lg text-zinc-950 mt-0.5">쿠로사키 시즈쿠 (Kurosaki Shizuku)</h3>
                            </div>
                          </div>
                          <span className="block h-[1px] bg-zinc-100" />
                          <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed font-light">
                            <strong>[서사 및 반전적 내면]</strong> 밀레니엄 세미나 행정부 산하 비공식 전술 데이터 개발실의 수석 분석관입니다. 얼음장 같은 무표정과 정밀하고 차가운 이진법 분석어만 내뱉기에 <strong className="font-bold text-zinc-950">‘피도 눈물도 없는 계산 마녀’</strong>로 불리지만, 밤이 되면 홀로 아리우스 특별구나 빈곤 자경단 거리에 익명 명의로 고용량 정제 식량 패키지와 정밀 대공 레이더 맵을 지속 수송해 주는 따뜻하고 서툰 츤데레 영혼입니다.
                          </p>
                          <p className="font-sans text-xs sm:text-sm text-sky-955 leading-relaxed font-light">
                            <strong>[외형 및 복식 특징]</strong> 청명한 블루 그라데이션이 아름답게 조율된 은회색 보브 헤어에 파란 스카이블루 크리스털 큐브 통제핀을 꽂았습니다. 머리 너머로 가로세로 사각형 푸른 데이터 그리드 광초박 입체 헤일로를 소환 가동합니다. 두텁고 폭신한 오버사이즈 밀레니엄 하이테크 롱 패딩 필드 웨어와 카본 텍스처 어깨 보호대를 장착합니다.
                          </p>
                          <div className="mt-3 text-[10px] sm:text-xs font-mono text-zinc-650 flex items-center gap-2 bg-sky-50/40 p-2.5 rounded-lg border border-sky-100/50">
                            <span className="font-bold text-sky-600 uppercase">[소지 학도 무기]</span>
                            <span>다기능 위상 광학 중계 조종 드론 "Aegis-v4" & 전술 박격 박스</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Anime picture frame with BA image with filter scaling */}
                    <div className="xl:col-span-5 flex flex-col gap-4">
                      <div className="rounded-2xl border border-sky-150 p-4 bg-zinc-50 relative overflow-hidden flex flex-col shadow-xs">
                        <div className="aspect-[9/16] rounded-xl overflow-hidden relative shadow-md bg-stone-900 border border-zinc-200">
                          <motion.img
                            src="/src/assets/images/ba_inspired_v1_1780330964822.png"
                            alt="Blue Archive Inspired Characters"
                            animate={{
                              scale: [1.01, 1.05, 1.02, 1.07, 1.01],
                              filter: [
                                "brightness(0.92) contrast(1.08) saturate(1.15)",
                                "brightness(1) contrast(1.11) saturate(1.22) hue-rotate(-1deg)",
                                "brightness(0.88) contrast(1.05) saturate(1.1)",
                                "brightness(0.98) contrast(1.13) saturate(1.25) hue-rotate(1deg)",
                                "brightness(0.92) contrast(1.08) saturate(1.15)"
                              ]
                            }}
                            transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          
                          {/* Aesthetic overlay and cute grid light */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-zinc-950/15 to-transparent z-2" />
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(240,248,255,0)_60%,_rgba(56,189,248,0.06)_40%)] mix-blend-color-burn pointer-events-none z-3" />
                          
                          {/* Floating sparkles animation inside */}
                          <motion.div
                            animate={{ opacity: [0.15, 0.45, 0.15] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(56,189,248,0.15)_0%,_transparent_50%)] z-3 pointer-events-none"
                          />

                          {/* HUD Details */}
                          <div className="absolute top-4 left-4 font-mono font-black text-[8px] text-zinc-400 select-none flex flex-col gap-0.5 z-3">
                            <div className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                              <span className="text-sky-400">● BLUE_SCH_REC</span>
                            </div>
                            <div className="text-zinc-500 text-[6.5px] leading-none mt-0.5">
                              ACADEMY_PORTAL // KIWOTOS_LUT_V2
                            </div>
                          </div>

                          <div className="absolute top-4 right-4 font-mono text-zinc-500 text-[6.5px] font-black text-right z-3">
                            CODE: BA-CAMPUS-V1<br/>
                            FPS: 60.00 // APPLIED
                          </div>

                          <div className="absolute top-8 left-3 w-3 h-3 border-t border-l border-white/20 z-3" />
                          <div className="absolute top-8 right-3 w-3 h-3 border-t border-r border-white/20 z-3" />
                          <div className="absolute bottom-16 left-3 w-3 h-3 border-b border-l border-white/20 z-3" />
                          <div className="absolute bottom-16 right-3 w-3 h-3 border-b border-r border-white/20 z-3" />

                          <div className="absolute inset-x-0 bottom-4 px-4 flex flex-col justify-end z-4 pt-12">
                            <span className="font-mono text-[9px] font-black text-sky-400 tracking-wider">MEDIA SYNTHESIS ENGINE</span>
                            <h4 className="text-white text-xs sm:text-xs font-sans font-black mt-0.5 uppercase">블루 아카이브 기반 학원전술 시각 원화</h4>
                          </div>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-mono leading-relaxed mt-3 px-1">
                          에이징 데이터에 동기화되어 가동하는 햇빛 화사하고 청량감 있는 키보토스 배경 애니메이션 일러스트 루프입니다. 분홍빛 구호천사 카나데와 블루 큐브 데이터안 시즈쿠가 공존합니다.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {b4GameTab === 'reverse1999' && (
                  <motion.div
                    key="reverse1999"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start animate-fade-in"
                  >
                    {/* Left: Cards for Mary & Alistair */}
                    <div className="xl:col-span-7 space-y-6">
                      {/* Mary Card */}
                      <div className="p-6 rounded-2xl bg-white border border-amber-100 shadow-sm relative overflow-hidden">
                        <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 font-black font-mono text-[72px] text-amber-50/70 pointer-events-none uppercase select-none">
                          CROWN
                        </div>
                        <div className="space-y-3 relative">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full border border-amber-300 p-0.5 bg-zinc-50 overflow-hidden shrink-0">
                              <span className="w-full h-full rounded-full bg-amber-50/10 flex items-center justify-center font-bold text-amber-700 text-xs font-mono">RV-1</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[8px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-850 uppercase">London Class</span>
                                <span className="font-mono text-[8px] font-black px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-650 uppercase">Arcanist Aristocrat</span>
                              </div>
                              <h3 className="font-sans font-black text-lg text-zinc-950 mt-0.5">메리 엘리어트 (Mary Eliot)</h3>
                            </div>
                          </div>
                          <span className="block h-[1px] bg-zinc-100" />
                          <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed font-light">
                            <strong>[서사 및 반전적 내면]</strong> 1960년대 비 오는 런던의 유력 귀족가 출신 고서 독서광이자 재단 소속 감시관 아르카니스트 여성입니다. 지극히 우아한 귀족주의 묵음 티타임과 순수 지성 보전을 주장하지만, 내면에 엄청난 <strong className="font-bold text-zinc-950">‘독점욕과 비천한 기류 소모 충동’</strong>을 내재해 질투 지수가 한계에 들면 상대의 영혼이나 시간 좌표를 시가 잉크빛 장막 속에 완전히 가두고 멸균 박제하려는 파괴적 아르카노 실체를 자아냅니다.
                          </p>
                          <p className="font-sans text-xs sm:text-sm text-amber-955 leading-relaxed font-light">
                            <strong>[외형 및 복식 특징]</strong> 깊은 수심의 침잠된 푸른 네이비 동공에 빈티지풍 중세 프릴 레이스가 정교하게 마감된 검은 벨라 보닛 모자를 착용했습니다. 고풍스럽게 재단된 격자 체크 문양의 롱 보들 울 모직코트와 태엽 톱니식 금빛 구리 아르카늄 충전 만년필을 조율 중입니다.
                          </p>
                          <div className="mt-3 text-[10px] sm:text-xs font-mono text-zinc-650 flex items-center gap-2 bg-amber-50/40 p-2.5 rounded-lg border border-amber-100/50">
                            <span className="font-bold text-amber-750 uppercase">[마도 비학 사조]</span>
                            <span>잉크 수묵 변성 구속 "묵염 장막 (Ink-Spill Tapestry Book)"</span>
                          </div>
                        </div>
                      </div>

                      {/* Alistair Card */}
                      <div className="p-6 rounded-2xl bg-white border border-amber-100 shadow-sm relative overflow-hidden">
                        <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 font-black font-mono text-[72px] text-amber-50/70 pointer-events-none uppercase select-none">
                          STAGE
                        </div>
                        <div className="space-y-3 relative">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full border border-amber-300 p-0.5 bg-zinc-50 overflow-hidden shrink-0">
                              <span className="w-full h-full rounded-full bg-amber-50/10 flex items-center justify-center font-bold text-amber-700 text-xs font-mono">RV-2</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[8px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-850 uppercase">Paris Theater</span>
                                <span className="font-mono text-[8px] font-black px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-650 uppercase">Phantasm Alchemist</span>
                              </div>
                              <h3 className="font-sans font-black text-lg text-zinc-950 mt-0.5">알리스테어 (Alistair)</h3>
                            </div>
                          </div>
                          <span className="block h-[1px] bg-zinc-100" />
                          <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed font-light">
                            <strong>[서사 및 반전적 내면]</strong> 19세기 말 프랑스 파리 극장가의 낙천적이고 꼬부라진 사기꾼 기조의 극단단이자 영혼 연금술사 남성입니다. 늘 실실 웃으며 관가 세금을 갈취하고 연극 사기를 주도해 수리 영장이 떨어진 범죄자 같지만, 영속적으로 <strong className="font-bold text-zinc-950">‘폭풍우(The Storm)’</strong> 속에서 부서지고 휘발하는 길거리 외로운 광대들의 비통한 극작 대사와 기억 파편을 자기 영혼 트렁크 속에 불법 기체 가두기를 통해 영구 수호해 오던 비극적 헌신가입니다.
                          </p>
                          <p className="font-sans text-xs sm:text-sm text-amber-955 leading-relaxed font-light">
                            <strong>[외형 및 복식 특징]</strong> 얼굴 왼쪽 반절 범위를 조밀하게 은폐시킨 기품 어린 나전 상아빛 탈가면을 부착하였고 쾌락과 나른함이 감도는 황금 사자 야수 동공을 드러냅니다. 주름 패턴 빅토리 크라바트 넥 밴드에 빈티지 보라빛 자색 연미복 슈트 보를 입었습니다. 영성이 울리는 마도 쇠가죽 봉인용 대형 연금 트렁크 실린더를 칭칭 묶었습니다.
                          </p>
                          <div className="mt-3 text-[10px] sm:text-xs font-mono text-zinc-650 flex items-center gap-2 bg-amber-50/40 p-2.5 rounded-lg border border-amber-100/50">
                            <span className="font-bold text-amber-750 uppercase">[마도 비학 사조]</span>
                            <span>망상의 극작 실체화 "망령 독백 (Ghost Soliloquy Watch)"</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Retro anime art container holding generated image */}
                    <div className="xl:col-span-5 flex flex-col gap-4">
                      <div className="rounded-2xl border border-amber-150 p-4 bg-zinc-50 relative overflow-hidden flex flex-col shadow-xs">
                        <div className="aspect-[9/16] rounded-xl overflow-hidden relative shadow-md bg-stone-900 border border-zinc-200">
                          <motion.img
                            src="/src/assets/images/r1999_inspired_v1_1780330982764.png"
                            alt="Reverse 1999 Inspired Characters"
                            animate={{
                              scale: [1.02, 1.08, 1.03, 1.1, 1.02],
                              filter: [
                                "brightness(0.72) contrast(1.18) sepia(0.08) saturate(1.1)",
                                "brightness(0.85) contrast(1.23) sepia(0.12) saturate(1.15) hue-rotate(-2deg)",
                                "brightness(0.68) contrast(1.12) sepia(0.05) saturate(1.05)",
                                "brightness(0.8) contrast(1.2) sepia(0.1) saturate(1.12) hue-rotate(1deg)",
                                "brightness(0.72) contrast(1.18) sepia(0.08) saturate(1.1)"
                              ]
                            }}
                            transition={{ repeat: Infinity, duration: 13, ease: "easeInOut" }}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          
                          {/* Aesthetic Vintage filter screen with old amber particles */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/45 z-2" />
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(120,60,20,0)_52%,_rgba(0,0,0,0.25)_48%)] bg-[length:100%_4px] opacity-15 pointer-events-none z-[3]" />
                          
                          {/* Drifting old gold dust effects (simulating paper ash in Storm) */}
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1.5 h-1.5 bg-amber-200/60 rounded-full blur-[0.6px] z-3"
                              initial={{ 
                                x: Math.random() * 250, 
                                y: 450 + Math.random() * 100, 
                                opacity: 0
                              }}
                              animate={{
                                y: -20,
                                x: `+=${(Math.random() - 0.5) * 50}`,
                                opacity: [0, 0.9, 0.9, 0],
                              }}
                              transition={{
                                duration: 5 + Math.random() * 3,
                                repeat: Infinity,
                                delay: i * 1.2,
                                ease: "linear"
                              }}
                              style={{
                                boxShadow: "0 0 4px 1.5px rgba(217,119,6,0.3)"
                              }}
                            />
                          ))}

                          {/* HUD Details */}
                          <div className="absolute top-4 left-4 font-mono font-black text-[8px] text-zinc-400 select-none flex flex-col gap-0.5 z-3">
                            <div className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                              <span className="text-amber-500">● STORM_SCAN_RESOLV</span>
                            </div>
                            <div className="text-zinc-500 text-[6.5px] leading-none mt-0.5">
                              HISTORIC_RECON_V4 // LUT_1999_WARM
                            </div>
                          </div>

                          <div className="absolute top-4 right-4 font-mono text-zinc-500 text-[6.5px] font-black text-right z-3">
                            CODE: RV-RETRO-V1<br/>
                            VINTAGE: APPLIED // SYSTEM_OK
                          </div>

                          <div className="absolute top-8 left-3 w-3 h-3 border-t border-l border-white/20 z-3" />
                          <div className="absolute top-8 right-3 w-3 h-3 border-t border-r border-white/20 z-3" />
                          <div className="absolute bottom-16 left-3 w-3 h-3 border-b border-l border-white/20 z-3" />
                          <div className="absolute bottom-16 right-3 w-3 h-3 border-b border-r border-white/20 z-3" />

                          <div className="absolute inset-x-0 bottom-4 px-4 flex flex-col justify-end z-4 pt-12">
                            <span className="font-mono text-[9px] font-black text-amber-500 tracking-wider">MEDIA SYNTHESIS ENGINE</span>
                            <h4 className="text-white text-xs sm:text-xs font-sans font-black mt-0.5 uppercase">리버스: 1999 기반 중세 레트로 시각 원화</h4>
                          </div>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-mono leading-relaxed mt-3 px-1">
                          생성형 AI로 수렴한 리버스 1999 특유의 클래식하고 풍성한 입체 회화형 일러스트 프레임 루프입니다. 귀족 마도사 메리 엘리어트와 가면 연금사 알리스테어가 빈티지 안갯속에 마주합니다.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Back to top helper inside the section */}
            <div className="flex justify-between items-center border-t border-zinc-150 pt-4 shrink-0">
              <span className="text-[10px] font-mono text-zinc-400">STORY TRANSLATION ENGINE // COMP_B4</span>
            </div>
          </div>
        ) : (
          /* DEFAULT BOOKLET DETAIL VIEW */
          <>
            <div className="flex-1 my-6 sm:my-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch overflow-hidden min-h-0">
              
              {/* Left partition: Booklet Cover Image */}
              <div className="md:col-span-5 flex flex-col justify-center bg-zinc-50 border border-zinc-100 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                {booklet.image ? (
                  <img 
                    src={booklet.image} 
                    alt={booklet.title} 
                    className="w-full h-full max-h-[300px] object-contain rounded-xl select-none"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-48 bg-zinc-200 rounded-xl animate-pulse" />
                )}

                <div className="mt-5 space-y-1.5">
                  <h4 className="font-sans font-black text-sm text-zinc-800 tracking-tight leading-tight uppercase">
                    {booklet.subtitle}
                  </h4>
                  <p className="font-sans text-[11px] text-zinc-400 font-light leading-relaxed">
                    {booklet.description}
                  </p>
                </div>
              </div>

              {/* Right partition: Live reading page contents with pristine layout */}
              <div className="md:col-span-7 flex flex-col justify-between border-l border-zinc-100 pl-0 md:pl-8 relative min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="flex-1 flex flex-col justify-between min-h-0"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                      <h3 className="font-sans font-black text-lg sm:text-xl text-zinc-900 border-b border-zinc-100 pb-2 leading-tight tracking-tight uppercase">
                        {booklet.pages[currentPage].title}
                      </h3>
                      
                      <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed font-light whitespace-pre-wrap max-h-[200px] overflow-y-auto pr-2">
                        {booklet.pages[currentPage].content}
                      </p>
                    </div>

                    {/* Technical specifications checklist */}
                    <div className="mt-6 pt-4 border-t border-zinc-100">
                      <span className="block font-mono text-[9px] text-zinc-400 tracking-widest uppercase mb-2 font-black">
                        Technical Specifications
                      </span>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        {booklet.specifications.slice(0, 4).map((spec, i) => (
                          <div key={i} className="flex justify-between items-center text-[11px] border-b border-zinc-50 pb-1">
                            <span className="font-sans text-zinc-450">{spec.label}</span>
                            <span className="font-mono font-bold text-zinc-750">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Pagination controls inside footer */}
            <div className="flex items-center justify-between border-t border-zinc-150 pt-4 font-mono text-xs text-zinc-500 shrink-0">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-700 hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-zinc-50 disabled:pointer-events-none transition duration-300 font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>PREV</span>
              </button>

              <div className="flex gap-2">
                {booklet.pages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentPage === i ? 'bg-blue-600 w-6' : 'bg-zinc-200 hover:bg-zinc-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === booklet.pages.length - 1}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-700 hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-zinc-50 disabled:pointer-events-none transition duration-300 font-bold"
              >
                <span>NEXT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

      </div>

      {/* Floating Go To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            onClick={() => {
              if (mainScrollRef.current) {
                mainScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-50 p-4 sm:p-4.5 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-500 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center border border-blue-400/25 group"
            title="맨 위로 이동"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition duration-300" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImg(null)}
            className="fixed inset-0 bg-zinc-950/95 backdrop-blur-md z-[99999] flex items-center justify-center p-4 sm:p-8 cursor-zoom-out select-none"
            style={{ zIndex: 99999 }}
          >
            {/* Close Button Top-right */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxImg(null);
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/10 text-white rounded-full p-2.5 sm:p-3 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all cursor-pointer z-50 border border-white/15 flex items-center justify-center shadow-lg"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Main picture display area with smooth motion spring */}
            <motion.div
              initial={{ scale: 0.93, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-full max-h-[85vh] md:max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center"
            >
              <img
                src={activeLightboxImg}
                alt="Enlarged Poster Artwork"
                className="max-w-full max-h-[80vh] md:max-h-[88vh] object-contain rounded-xl cursor-default border border-white/10"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
