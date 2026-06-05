import React, { useState } from 'react';
import { Menu, X, Globe, Library, Terminal, HelpCircle, Layers, ArrowUpRight } from 'lucide-react';
import SidebarMenu from './components/SidebarMenu';
import TYRShowcase from './components/TYRShowcase';
import BookletWaterfall from './components/BookletWaterfall';
import BookletDetailWindow from './components/BookletDetailWindow';
import { tyrProducts, bookletData } from './data';
import { Booklet } from './types';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Who is?');
  const [selectedBooklet, setSelectedBooklet] = useState<Booklet | null>(null);
  const [ambientTemp, setAmbientTemp] = useState<number>(18);

  // Filter products based on selected category in sidebar
  const filteredProducts = tyrProducts.filter(p => p.category === activeCategory);

  // Filter booklets based on active categories if desired, or keep all cascading
  const filteredBooklets = bookletData;

  const handleSelectBookById = (bookId: string) => {
    const book = bookletData.find(b => b.id === bookId);
    if (book) {
      setSelectedBooklet(book);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#070709] font-sans antialiased">
      
      {/* 1. Underlying Sidebar Navigation Canvas */}
      <SidebarMenu
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onSelectBook={handleSelectBookById}
        ambientTemp={ambientTemp}
        setAmbientTemp={setAmbientTemp}
      />

      {/* 2. Slide-out Main Screen Panel */}
      <div
        style={{
          transform: isSidebarOpen ? 'translateX(280px) scale(0.97)' : 'translateX(0) scale(1)',
        }}
        id="main-moving-stage"
        className="absolute inset-0 bg-zinc-950 transition-all duration-500 ease-out origin-left z-15 flex flex-col shadow-2xl shadow-black border-l border-zinc-900 overflow-hidden"
      >


        {/* Clicking here closes active sidebar drawer */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/40 z-30 cursor-pointer backdrop-blur-xs focus:outline-none"
          />
        )}

        {/* 3. Core Divided Layout Screen-Body */}
        {/* Left 3/4 (White, Blue primary) & Right 1/4 (Flowing Down Books, Dark and high contrast) */}
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 bg-white relative">
          
          {/* Left Region (3/4 width of viewport on desktop) */}
          <section className="w-full md:w-3/4 h-1/2 md:h-full shrink-0 min-h-0 relative overflow-hidden">
            <TYRShowcase 
              products={filteredProducts} 
              ambientTemp={ambientTemp}
            />

            {/* Seamless Absolute-positioned Slide-out White Plate detail panel */}
            <AnimatePresence>
              {selectedBooklet && (
                <BookletDetailWindow
                  booklet={selectedBooklet}
                  onClose={() => setSelectedBooklet(null)}
                />
              )}
            </AnimatePresence>
          </section>

          {/* Right Region (1/4 width of viewport on desktop) */}
          <section className="w-full md:w-1/4 h-1/2 md:h-full bg-[#08080a] border-t md:border-t-0 md:border-l border-zinc-900 shrink-0 min-h-0">
            <BookletWaterfall 
              booklets={filteredBooklets} 
              onSelectBook={(book) => {
                setSelectedBooklet((prev) => (prev && prev.id === book.id ? null : book));
              }}
            />
          </section>

        </main>
      </div>
    </div>
  );
}
