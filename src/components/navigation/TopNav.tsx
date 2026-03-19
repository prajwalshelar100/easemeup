'use client';

import Link from 'next/link';
import { Menu, Info } from 'lucide-react';
import { Button } from '@/src/components/ui';

export const TopNav = ({ setSidebarOpen }: { setSidebarOpen: (open: boolean) => void }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 z-40 flex items-center justify-between px-4 md:pl-72 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden rounded-xl" 
          onClick={() => setSidebarOpen(true)}
          aria-label="Open Menu"
        >
          <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        </Button>
        {/* Mobile Logo Fallback */}
        <Link href="/dashboard" className="md:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm shadow-blue-600/30">
            <span className="text-white font-black text-xs">E</span>
          </div>
          <h1 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">EasyBiz</h1>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Link 
          href="/about"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-all"
        >
          <Info className="w-4 h-4" />
          <span className="hidden sm:inline">Developer</span>
        </Link>
      </div>
    </header>
  );
};
