import React from 'react';
import { Compass, Book, Shield, Zap, Info, Waves, Terminal, Flame, Compass as ShipWheel } from 'lucide-react';

interface SidebarMenuProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  onSelectBook: (bookId: string) => void;
  ambientTemp: number;
  setAmbientTemp: (temp: number) => void;
}

export default function SidebarMenu({
  activeCategory,
  setActiveCategory,
  onSelectBook,
  ambientTemp,
  setAmbientTemp,
}: SidebarMenuProps) {
  const menuItems = [
    { id: 'Who is?', label: 'Who is?', icon: Waves },
    { id: 'Comics', label: 'Comics', icon: Zap },
    { id: 'Character', label: 'Character', icon: Shield },
    { id: 'Media', label: 'Media', icon: Info },
  ];

  const quickBooks = [
    { id: 'b1', title: '분석', code: 'TYR-WHO' },
    { id: 'b2', title: '발송자 표시 제한', code: 'TYR-COM' },
    { id: 'b3', title: 'Alive', code: 'TYR-CHA' },
    { id: 'b4', title: '기반 캐릭터', code: 'TYR-MED' },
  ];

  return (
    <div className="absolute top-0 left-0 w-[280px] h-full bg-[#0a0a0c] text-white p-6 flex flex-col justify-between z-0 border-r border-blue-950/20 select-none">
      
      {/* Top Brand Logo */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center font-mono font-bold text-white shadow-lg shadow-blue-500/20">
            T
          </div>
          <div>
            <span className="font-sans font-black tracking-widest text-lg text-white">TYR</span>
            <span className="font-mono text-[9px] block text-blue-500 tracking-wider">TACTICAL & MARINE</span>
          </div>
        </div>

        {/* Division Line */}
        <div className="h-[1px] bg-zinc-900 w-full" />

        {/* Dynamic Category Navigation menu */}
        <div className="space-y-1">
          <span className="block font-mono text-[9px] text-zinc-500 tracking-widest mb-3 uppercase">CORE DIVISIONS</span>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveCategory(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded transition text-left ${
                  isActive
                    ? 'bg-blue-950/80 border border-blue-750 text-white font-medium shadow-md shadow-blue-950/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-zinc-500'}`} />
                <span className="font-sans text-xs tracking-wider">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Direct Technical Archive Link */}
        <div className="space-y-2 pt-4">
          <span className="block font-mono text-[9px] text-zinc-500 tracking-widest uppercase">DIRECT ARCHIVES</span>
          <div className="space-y-1.5">
            {quickBooks.map((book) => (
              <button
                key={book.id}
                onClick={() => onSelectBook(book.id)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs transition rounded group hover:bg-zinc-900/60"
              >
                <div className="flex items-center gap-2.5 text-zinc-400 group-hover:text-blue-300">
                  <Book className="w-3.5 h-3.5 text-zinc-500 group-hover:text-blue-500" />
                  <span className="font-sans truncate">{book.title}</span>
                </div>
                <span className="font-mono text-[8px] text-zinc-600 group-hover:text-blue-600">{book.code}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Controls area & System Specs */}
      <div className="space-y-6">
        
        {/* Ambient Settings widget */}
        <div className="p-4 rounded bg-zinc-950 border border-zinc-900 space-y-3">
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="text-zinc-500">ATLANTIC TEMP</span>
            <span className="text-blue-400 font-bold">{ambientTemp}°C</span>
          </div>
          <input
            type="range"
            min="4"
            max="32"
            value={ambientTemp}
            onChange={(e) => setAmbientTemp(Number(e.target.value))}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <span className="block font-mono text-[8px] text-zinc-650 tracking-wider">
            ADJUSTS FABRIC INSULATION INDEX
          </span>
        </div>

        {/* Technical Signature */}
        <div className="space-y-2 border-t border-zinc-900 pt-4">
          <div className="flex items-center gap-2 font-mono text-[9px] text-zinc-600">
            <Terminal className="w-3 h-3 text-blue-500/60" />
            <span>OPERATING: ACTIVE_SHELL</span>
          </div>
          <p className="font-sans text-[10px] text-zinc-500 leading-normal font-light">
            Crafted for premium athletics. Black foundation, high-purity ocean blue accents, and pristine alpine white components. No clutter, pure performance.
          </p>
        </div>
      </div>
    </div>
  );
}
