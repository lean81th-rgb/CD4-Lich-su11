
import React from 'react';
import { AppSection } from '../types';
import { Scroll, Target, BookOpen, Map, BrainCircuit, BookText, Settings } from 'lucide-react';

interface HeaderProps {
  activeSection: AppSection;
  onNavigate: (section: AppSection) => void;
  onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate, onOpenSettings }) => {
  const navItems = [
    { id: AppSection.OBJECTIVES, label: 'Mục tiêu', icon: Target },
    { id: AppSection.CONTENT, label: 'Nghiên cứu', icon: BookOpen },
    { id: AppSection.SUMMARY, label: 'Sơ đồ', icon: Map },
    { id: AppSection.PRACTICE, label: 'Luyện tập (AI)', icon: BrainCircuit },
    { id: AppSection.RESOURCES, label: 'Tài liệu GV', icon: BookText },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass shadow-sm px-6 py-4 flex flex-col lg:flex-row items-center justify-between gap-4">
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => onNavigate(AppSection.OBJECTIVES)}
      >
        <Scroll className="text-primary w-8 h-8 group-hover:rotate-12 transition-transform" />
        <h1 className="font-hand text-2xl md:text-3xl font-bold text-primary">Sử 11 - Chủ đề 4</h1>
      </div>

      <nav>
        <ul className="flex flex-wrap justify-center gap-4 md:gap-8">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center gap-2 font-hand text-lg md:text-xl font-semibold transition-colors ${activeSection === item.id ? 'text-primary border-b-2 border-primary' : 'text-slate-600 hover:text-primary'
                  }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <span className="hidden xl:inline text-xs font-bold text-red-500 animate-pulse">
          Lấy API key để sử dụng app
        </span>
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/80 hover:bg-white text-slate-700 rounded-lg text-sm font-medium transition-all shadow-sm border border-slate-200"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Settings (API Key)</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
