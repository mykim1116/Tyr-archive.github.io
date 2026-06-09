import React, { useState } from 'react';
import { TYRProduct } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, Shield, Compass, Mail, CornerDownRight, ArrowLeft, ArrowUpRight } from 'lucide-react';

interface TYRShowcaseProps {
  products: TYRProduct[];
  ambientTemp: number;
}

export default function TYRShowcase({ products, ambientTemp }: TYRShowcaseProps) {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="w-full h-full bg-black relative overflow-hidden flex flex-col justify-between p-8 sm:p-16 select-none animate-fade-in">
      
      {/* 1. Deep Blue Dynamic Radial Gradients & White Orbital Orbs */}
      <div className="absolute inset-0 bg-zinc-950 -z-30"></div>
      
      {/* Split Color Blocks: pure white geometric half-canvas backing the left, royal blue backing the top */}
      <div className={`absolute top-0 left-0 h-full bg-[#ffffff] -z-20 transition-all duration-1000 ease-in-out ${showAbout ? 'w-[12%] opacity-10' : 'w-[45%]'}`}></div>
      <div className="absolute bottom-0 right-0 w-[55%] h-[35%] bg-[#1d4ed8] -z-20 opacity-80 mix-blend-multiply filter blur-[80px]"></div>
      
      {/* Dynamic graphic lines in White and Blue spanning across the viewport */}
      <div className={`absolute top-0 h-full bg-blue-600 -z-10 shadow-lg shadow-blue-600/30 transition-all duration-1000 ease-in-out ${showAbout ? 'left-[12%] w-1 opacity-30' : 'left-[45%] w-2'}`}></div>
      <div className="absolute top-1/4 left-0 w-full h-[1px] bg-zinc-200/20 -z-10"></div>
      <div className="absolute top-2/3 left-0 w-full h-[1px] bg-zinc-800/50 -z-10"></div>

      {/* 2. Absolute Geometric Accent Rings (Strictly Blue, White, and Black) */}
      <div className="absolute right-[10%] top-[15%] w-96 h-96 rounded-full border-[3px] border-blue-600/30 -z-10 animate-[spin_40s_linear_infinite]"></div>
      <div className="absolute right-[10%] top-[15%] w-96 h-96 rounded-full border-t-[3px] border-white -z-10 animate-[spin_10s_linear_infinite]"></div>
      <div className="absolute right-[15%] top-[20%] w-64 h-64 rounded-full border border-dashed border-zinc-800 -z-10"></div>
      
      {/* Active rotating solid vector dot */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute right-[20%] top-[25%] w-48 h-48 border border-blue-500/10 rounded-full flex items-start justify-center -z-10"
      >
        <div className="w-4 h-4 rounded-full bg-white shadow-xl shadow-white/50 -translate-y-2"></div>
      </motion.div>

      {/* 3. Horizontal layout accent bar from design template */}
      <div className="absolute top-20 right-16 w-8 h-80 bg-blue-600 -z-10 hidden lg:block opacity-90 rounded-b-sm"></div>

      <AnimatePresence mode="wait">
        {!showAbout ? (
          <motion.div
            key="showcase-main"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex-1 flex flex-col justify-between h-full w-full"
          >
            {/* 4. Top Header Branding Block */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-mono text-sm tracking-[0.5em] font-extrabold text-blue-905 uppercase">
                .archive
              </span>
              <div className="flex gap-1.5 items-center">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-600 animate-pulse"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-white"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-black border border-zinc-800"></div>
              </div>
            </div>

            {/* 5. Central Giant Typography Masterpiece */}
            <div className="relative z-10 my-auto flex flex-col items-start space-y-6">
              
              {/* The Word TYR (Giant Display Italic Serif/Sans Pair with .archive suffix) */}
              <motion.button
                onClick={() => setShowAbout(true)}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative cursor-pointer text-left focus:outline-none select-none transition-transform active:scale-95 group block"
              >
                {/* Deep Black / Pure White text based on which background it floats over */}
                <h1 className="text-[120px] sm:text-[160px] md:text-[210px] lg:text-[250px] font-black leading-none tracking-tighter italic select-none drop-shadow-2xl group-hover:opacity-95 transition-opacity flex items-baseline">
                  {/* White side over dark, Dark side over light built using backdrop mixing or clean absolute dual text */}
                  <span className="text-zinc-950 mix-blend-difference filter invert">
                    TYR
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-black text-blue-500 tracking-wider ml-4 not-italic uppercase opacity-90 drop-shadow-sm">
                    .archive
                  </span>
                </h1>
                
                {/* Subtle outline duplicate offset that represents high architectural design */}
                <h1 className="absolute -top-3 -left-3 text-[120px] sm:text-[160px] md:text-[210px] lg:text-[250px] font-black leading-none tracking-tighter italic select-none text-transparent stroke-1 stroke-blue-600 opacity-30 pointer-events-none group-hover:text-blue-500/20 transition-colors flex items-baseline">
                  <span>TYR</span>
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-black text-transparent stroke-1 stroke-blue-600 ml-4 not-italic uppercase">
                    .archive
                  </span>
                </h1>

                {/* Micro Hover Hint to let users know it is clickable without cluttering visual design */}
                <div className="absolute -bottom-5 left-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 font-mono text-[9px] text-blue-500 font-extrabold tracking-widest bg-black/85 px-2 py-0.5 rounded border border-blue-500/20">
                  <CornerDownRight className="w-3 h-3 animate-pulse" />
                  <span>CLICK_TO_INTERACT</span>
                </div>
              </motion.button>

              {/* The Moniker .archive */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-6"
              >
                <div className="w-16 h-1 bg-blue-600"></div>
                <span className="font-mono text-base tracking-[0.65em] font-black uppercase text-blue-605">
                  .archive
                </span>
              </motion.div>

            </div>

            {/* 6. Pure Minimalist Footer Grid Bar (Black, Blue, White colors only) */}
            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center pt-8 border-t border-zinc-200/20 font-mono text-xs gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-blue-600 rounded-sm"></div>
                <span className="text-zinc-450 font-bold uppercase tracking-widest">
                  .archive
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-blue-500 font-extrabold">TYR</span>
                <span className="text-zinc-550 font-bold">//</span>
                <span className="text-zinc-450 font-bold tracking-widest">.archive</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="about-me"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex-1 flex flex-col justify-between h-full w-full relative z-10"
          >
            {/* Header branding block */}
            <div className="flex justify-between items-center pb-5 border-b border-zinc-800/60 shrink-0">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/25 text-blue-400 rounded-full text-xs font-mono font-black uppercase tracking-widest shadow-xs">
                  CREATOR ARCHIVE // LAB_INTEL
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mt-1">
                  기획자 & 서사 디자이너 PROFILE
                </h2>
              </div>
              
              <button
                onClick={() => setShowAbout(false)}
                className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-sans font-bold text-white bg-blue-600 hover:bg-blue-500 hover:scale-[1.02] border border-blue-500 rounded-xl transition-all duration-300 cursor-pointer shadow-lg shadow-blue-900/30 active:scale-95 shrink-0"
              >
                <ArrowLeft className="w-4 h-4 animate-pulse" />
                <span>메인 화면으로 돌아가기 (Return to Main)</span>
              </button>
            </div>

            {/* Profile Grid content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-6 overflow-y-auto max-h-[70vh] scrollbar-none pr-1">
              
              {/* Left card: core profile */}
              <div className="lg:col-span-12 xl:col-span-12 xl:col-span-5 space-y-6">
                <div className="p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md space-y-6">
                  <div className="flex items-center gap-5">
                    <div className="w-18 h-18 rounded-full border border-blue-500/40 p-1 bg-black overflow-hidden flex items-center justify-center shrink-0">
                      <span className="font-mono font-black text-blue-400 text-lg">K_H</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] font-black px-2 py-0.5 rounded bg-blue-950 text-blue-400 uppercase border border-blue-900/50">PLANNING</span>
                        <span className="font-mono text-[11px] font-black px-2 py-0.5 rounded bg-zinc-850 text-zinc-350 uppercase">NARRATIVE</span>
                      </div>
                      <h3 className="font-sans font-black text-2xl text-white mt-1.5">김기환 (Ki-Hwan Kim)</h3>
                    </div>
                  </div>

                  <div className="h-[1px] bg-zinc-800/60" />

                  <div className="space-y-5 font-mono text-[15px] sm:text-base text-zinc-300 font-light">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 font-bold">CONTACT:</span>
                      <span className="text-white font-black select-text">myan1116@gmail.com</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 font-bold">YOUTUBE:</span>
                      <a href="https://www.youtube.com/@Tyr0605" target="_blank" rel="noopener noreferrer" className="text-rose-550 font-black hover:underline flex items-center gap-1.5">
                        @Tyr0605
                        <ArrowUpRight className="w-4 h-4 text-rose-500" />
                      </a>
                    </div>
                    
                    <div className="h-[1px] bg-zinc-800/30" />

                    {/* Highly vibrant Who am I? website access container */}
                    <div className="space-y-3.5 pt-1 text-left">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-450 font-black tracking-widest text-xs uppercase">Who am I?</span>
                        <span className="text-emerald-400 text-[11px] font-bold uppercase tracking-wider animate-pulse flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                          LIVE VERIFICATION
                        </span>
                      </div>
                      <a 
                        href="https://about-kkh-github-io.vercel.app/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group/btn relative flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-emerald-500/12 via-blue-500/12 to-zinc-900 border border-emerald-500/40 hover:border-emerald-450 hover:from-emerald-500/20 hover:via-blue-500/20 transition-all duration-300 shadow-xl shadow-emerald-500/8 cursor-pointer overflow-hidden block"
                      >
                        {/* Interactive light ray reflection on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-550 -z-10 blur-xl"></div>
                        
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover/btn:scale-105 group-hover/btn:bg-emerald-500/30 transition-all duration-300">
                            <span className="text-xl">🌐</span>
                          </div>
                          <div>
                            <p className="font-sans font-black text-sm sm:text-base text-white leading-tight">공식 웹 포트폴리오 웹사이트</p>
                            <p className="font-mono text-[11px] text-emerald-400/80 group-hover/btn:text-emerald-300 transition-colors mt-1">about-kkh-github-io.vercel.app</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-400 group-hover/btn:bg-gradient-to-r group-hover/btn:from-emerald-500 group-hover/btn:to-teal-500 group-hover/btn:text-zinc-950 transition-all duration-300 shadow-md border border-emerald-500/10 group-hover/btn:translate-x-0.5">
                          <ArrowUpRight className="w-5 h-5 stroke-[2.5px]" />
                        </div>
                      </a>
                    </div>

                    <div className="h-[1px] bg-zinc-800/30" />

                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 font-bold">STATUS:</span>
                      <span className="text-emerald-400 font-black uppercase animate-pulse flex items-center gap-2 font-sans text-[13px] sm:text-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>READY FOR WORK</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-blue-950/15 border border-blue-500/10 backdrop-blur-md space-y-3">
                  <span className="block font-sans font-black text-xs text-blue-400 uppercase tracking-widest">
                    CREATIVE PLANNING PHILOSOPHY (기획 철학)
                  </span>
                  <p className="font-sans text-sm sm:text-base text-zinc-200 leading-relaxed font-light">
                    "단순한 텍스트 나열을 넘어 독자가 깊숙이 침잠할 수 있는 <strong>유일무이한 세계관과 탄탄한 서사적 규칙성</strong>을 설계합니다. 작품 <span className="text-blue-400 font-bold">‘발송자 표시 제한’</span>의 복잡다단한 서간 플롯과 마력 시스템, 장르적 한계를 허무는 <span className="text-emerald-400 font-bold">‘Alive’</span>의 미디어믹스적 구상처럼, 저는 가상의 입체적 인물들이 살아 숨 쉴 수 있는 완벽한 가설 무대를 짓는 서사 디자이너입니다."
                  </p>
                </div>
              </div>

              {/* Right: details methodology */}
              <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                <span className="block font-mono text-xs text-zinc-500 tracking-widest uppercase">
                  CORE PLANNING VALUES & METHODOLOGY (핵심 기획력)
                </span>
                
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-850 hover:border-zinc-800 transition duration-300 flex gap-4">
                    <div className="w-10 h-10 rounded bg-zinc-950 flex items-center justify-center text-blue-400 border border-zinc-800 shrink-0 mt-0.5 animate-pulse">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-sans font-black text-sm sm:text-base text-white">독립 세계관의 정합성 기획 (Coherent World-Building)</h4>
                      <p className="text-zinc-400 text-xs sm:text-sm font-sans font-light leading-relaxed">
                        역사적 이데올로기 대립, 구체화된 초자연 법칙, 판타지가 공존하는 가상 사회상의 규칙을 완벽하게 정의하여, 독자가 어떤 장면에 진입해도 타당한 정합성을 느끼게 합니다.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-850 hover:border-zinc-800 transition duration-300 flex gap-4">
                    <div className="w-10 h-10 rounded bg-zinc-950 flex items-center justify-center text-blue-400 border border-zinc-800 shrink-0 mt-0.5">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-sans font-black text-sm sm:text-base text-white">다각적 캐릭터 생태학 및 입체 설계 (Multi-Dimensional Cast)</h4>
                      <p className="text-zinc-400 text-xs sm:text-sm font-sans font-light leading-relaxed">
                        수리부엉이 인수 소년 <span className="text-blue-400 font-bold">‘셰티르’</span>, 차원의 끈을 다루는 소녀 <span className="text-purple-400 font-bold">‘라스’</span>처럼 뚜렷한 매혹점과 유기적인 결점을 가진 입체적 캐릭터 관계망을 설계하고 집약하여, 서사의 내밀성을 극대화합니다.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-850 hover:border-zinc-800 transition duration-300 flex gap-4">
                    <div className="w-10 h-10 rounded bg-zinc-950 flex items-center justify-center text-blue-400 border border-zinc-800 shrink-0 mt-0.5">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-sans font-black text-sm sm:text-base text-white">오감 수호의 융합 매체 기획 (Interactive Narratives)</h4>
                      <p className="text-zinc-400 text-xs sm:text-sm font-sans font-light leading-relaxed">
                        단순 텍스트 매체에 스스로를 가두지 않고, 감각적인 웹 사용자 경험 쇼케이스, 자막 시스템, 모션 연출, 쇼츠 등의 뉴미디어 융합 매체 전달 방식을 기획 단계부터 통합 추진합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer details */}
            <div className="pt-4 border-t border-zinc-850 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-zinc-500 gap-2 shrink-0">
              <div>CRAFTED BY KIM KI-HWAN & ANTIGRAVITY ENGINE v4.5.</div>
              <div className="flex gap-4">
                <span>SEC_ID: 2026_M_PORTAL</span>
                <span className="text-blue-500 font-bold">TYR_LAB</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
