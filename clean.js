import fs from 'fs';

const filepath = './src/components/BookletDetailWindow.tsx';
let data = fs.readFileSync(filepath, 'utf8');

const markerStart = '{/* Content Segment 1: Blue Archive design analysis section */}';
const firstIndex = data.indexOf(markerStart);

if (firstIndex === -1) {
  console.error("Could not find first occurrence of start marker.");
  process.exit(1);
}

const afterFirstIndex = data.indexOf(markerStart, firstIndex + markerStart.length);
if (afterFirstIndex === -1) {
  console.error("Could not find second occurrence of start marker.");
  process.exit(1);
}

// Now search for the closing block of Content Segment 2 from afterFirstIndex
const closeIndexMarker = 'className="text-xs font-mono font-bold text-zinc-750 hover:underline hover:text-zinc-950 flex items-center gap-1.5 cursor-pointer bg-white px-4 py-2 rounded-lg border border-zinc-200 shadow-xs transition duration-350"';
const targetCloseIndexText = '</div>\n              </div>\n            </div>\n\n          </div>\n        ) : isStoryBooklet ? (';

// Let's search for targetCloseIndexText
let searchStartIndex = afterFirstIndex;
let endOfSnippetIndex = data.indexOf(targetCloseIndexText, searchStartIndex);

if (endOfSnippetIndex === -1) {
  // Let's search with smaller close block if exact spacing/newlines differ
  const fallbackMarker = 'TOP OF BOOKLET';
  const topOfBookletIndex = data.indexOf(fallbackMarker, searchStartIndex);
  if (topOfBookletIndex === -1) {
    console.error("Could not find end markers.");
    process.exit(1);
  }
  
  // Find the next occurrence of `) : isStoryBooklet ? (`
  const isStoryIndex = data.indexOf(') : isStoryBooklet ? (', topOfBookletIndex);
  if (isStoryIndex === -1) {
    console.error("Could not find isStory segment after top of booklet.");
    process.exit(1);
  }
  
  // We want to keep everything from isStoryIndex onwards. Let's find where the outer </div> finishes right before it.
  // Backtrack to find the last </div> before isStoryIndex.
  const lastDivOfBlockIndex = data.lastIndexOf('</div>', isStoryIndex);
  endOfSnippetIndex = lastDivOfBlockIndex;
}

if (endOfSnippetIndex === -1) {
  console.error("Error finding boundaries.");
  process.exit(1);
}

// Adjust end index to include the closing tags or match up exactly to isStoryBooklet check
const boundaryBeforeIsStory = data.lastIndexOf(') : isStoryBooklet ? (', data.indexOf(') : isStoryBooklet ? ('));
// Actually, let's find the exact index of standard marker `) : isStoryBooklet ? (`:
const targetIsStoryIndex = data.indexOf(') : isStoryBooklet ? (');

const beforePart = data.substring(0, firstIndex);
const afterPart = data.substring(targetIsStoryIndex);

const cleanSection = `            {/* Content Segment 1: Blue Archive design analysis section */}
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

                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => handleScrollToSection(mainScrollRef)}
                    className="text-xs font-mono font-bold text-zinc-750 hover:underline hover:text-zinc-950 flex items-center gap-1.5 cursor-pointer bg-white px-4 py-2 rounded-lg border border-zinc-200 shadow-xs transition duration-350"
                  >
                    <span>▲ TOP OF BOOKLET</span>
                  </button>
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
                    <p className="font-sans text-sm sm:text-base leading-relaxed text-zinc-750 font-normal">
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

                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => handleScrollToSection(mainScrollRef)}
                    className="text-xs font-mono font-bold text-zinc-750 hover:underline hover:text-zinc-950 flex items-center gap-1.5 cursor-pointer bg-white px-4 py-2 rounded-lg border border-zinc-200 shadow-xs transition duration-350"
                  >
                    <span>▲ TOP OF BOOKLET</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        ) : isStoryBooklet ? (`;

fs.writeFileSync(filepath, beforePart + cleanSection + data.substring(targetIsStoryIndex + ') : isStoryBooklet ? ('.length));
console.log("Successfully cleaned up BookletDetailWindow!");
