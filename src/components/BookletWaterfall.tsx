import React, { useState, useEffect, useRef } from 'react';
import { Booklet } from '../types';
import { Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

interface BookletWaterfallProps {
  booklets: Booklet[];
  onSelectBook: (book: Booklet) => void;
}

export default function BookletWaterfall({ booklets, onSelectBook }: BookletWaterfallProps) {
  const [isPaused, setIsPaused] = useState(false);
  
  // Each item wrapper will have a precise height of 370px to represent 1.7x scale.
  const ITEM_HEIGHT = 370;
  const PERIOD = booklets.length * ITEM_HEIGHT; // 4 * 370 = 1480px
  
  // Start in the middle cycle to allow seamless scroll up & down
  const [wheelOffset, setWheelOffset] = useState(-PERIOD);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicating the 4 unique booklets so we have plenty of cycles rendered for infinite scroll
  const repeatingItems = [
    ...booklets, // Cycle 1
    ...booklets, // Cycle 2 (Active/centered)
    ...booklets, // Cycle 3
    ...booklets, // Cycle 4
  ];

  // Mouse wheel scroll handler that drives the list movement smoothly and wraps seamlessly
  const handleWheel = (e: React.WheelEvent) => {
    setWheelOffset((prev) => {
      let nextOffset = prev - e.deltaY * 0.95;
      
      // Infinite circular loop wrap-around bounds checking
      if (nextOffset < -PERIOD * 2.5) {
        nextOffset += PERIOD;
      } else if (nextOffset > -PERIOD * 0.5) {
        nextOffset -= PERIOD;
      }
      return nextOffset;
    });
  };

  // Automated slow floating movement drift when user is not actively scrolling, with seamless loop
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setWheelOffset((prev) => {
        let nextOffset = prev - 0.25; // extremely slow smooth drift
        if (nextOffset < -PERIOD * 2.5) {
          nextOffset += PERIOD;
        }
        return nextOffset;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [isPaused, PERIOD]);

  return (
    <div className="h-full flex flex-col bg-[#08080a] text-white">
      {/* Falling Marquee Wrapper with active mouse wheel listener */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-hidden relative cursor-ns-resize select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onWheel={handleWheel}
      >
        {/* Soft edge color shadows blurring the entry/exit ranges */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#08080a] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#08080a] to-transparent z-10 pointer-events-none" />

        {/* Dynamic translate box governed directly by state wheelOffset */}
        <div 
          className="w-full absolute flex flex-col"
          style={{
            transform: `translateY(${wheelOffset}px)`,
            transition: 'transform 0.2s cubic-bezier(0.1, 0.8, 0.3, 1)',
            gap: '0px'
          }}
        >
          {repeatingItems.map((book, index) => (
            <div
              key={`${book.id}-${index}`}
              onClick={() => onSelectBook(book)}
              className="px-5 sm:px-8 w-full flex items-center justify-center shrink-0"
              style={{ height: `${ITEM_HEIGHT}px` }}
            >
              {/* Entirely flat, ultra-minimalist booklet card meeting exactly the instructions */}
              <motion.div 
                layoutId={`booklet-card-trigger-${book.id}`}
                className="group w-full h-[330px] bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_30px_70px_rgba(0,0,0,0.95)] cursor-pointer active:scale-98 flex relative border border-zinc-200/40"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {/* 1. Wider Blue Band (Stripe) containing the booklet title in crisp bold White */}
                <div 
                  className="w-20 md:w-24 bg-blue-600 flex items-center justify-center p-4 shrink-0 transition-all duration-300 group-hover:bg-blue-500 overflow-hidden relative"
                >
                  <h3 
                    className="font-sans font-black text-base sm:text-xl md:text-2xl lg:text-[25px] text-white tracking-widest text-center uppercase whitespace-nowrap select-none px-1"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    {book.title}
                  </h3>
                </div>

                {/* 2. White area containing ONLY the simple generated image related to its title */}
                <div className="flex-1 bg-white p-6 flex items-center justify-center relative overflow-hidden">
                  {book.image ? (
                    <img 
                      src={book.image} 
                      alt={book.title} 
                      className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105" 
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-150 rounded-lg animate-pulse" />
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
