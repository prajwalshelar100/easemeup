'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  PieChart, 
  FileText, 
  Wrench, 
  Settings,
  FolderKanban,
  StickyNote,
  CreditCard,
  Receipt,
  X,
  Info
} from 'lucide-react';
import { cn } from '@/src/components/ui';

const mainNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Clients', icon: Users, href: '/clients' },
  { label: 'Documents', icon: FileText, href: '/documents' },
  { label: 'Finance', icon: PieChart, href: '/finance' },
  { label: 'Payments', icon: CreditCard, href: '/payments' },
  { label: 'Expenses', icon: Receipt, href: '/expense-tracker' },
  { label: 'Projects', icon: FolderKanban, href: '/projects' },
  { label: 'Quick Notes', icon: StickyNote, href: '/notes' },
  { label: 'Tools', icon: Wrench, href: '/tools' },
];

const bottomNavItems = [
  { label: 'Settings', icon: Settings, href: '/settings' },
  { label: 'About / Developer', icon: Info, href: '/about' },
];

export const Sidebar = ({ isOpen, setOpen }: { isOpen: boolean; setOpen: (open: boolean) => void }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={cn(
        "fixed top-0 left-0 bottom-0 w-72 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-r border-neutral-200 dark:border-neutral-800 z-50 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:w-64 shadow-2xl md:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-100 dark:border-neutral-900 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
              <span className="text-white font-black text-sm italic">E</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-black text-neutral-900 dark:text-white tracking-tight">Ease Me Up</h1>
              <p className="text-[9px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest leading-none mt-1">BUSINESS TOOL</p>
            </div>
          </Link>
          {/* Close Button - Mobile Only */}
          <button 
            className="md:hidden p-2 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
            onClick={() => setOpen(false)}
            aria-label="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          <p className="px-3 text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.2em] mb-4">Core Navigation</p>
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || (pathname !== '/' && pathname.startsWith(item.href) && item.href !== '/dashboard');
            return (
              <Link 
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all duration-200 group",
                  isActive 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                    : "text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
                )}
              >
                <item.icon className={cn("w-[18px] h-[18px] shrink-0 transition-colors", isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white")} />
                {item.label}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Links */}
        <div className="p-4 border-t border-neutral-100 dark:border-neutral-900 space-y-1 shrink-0">
          {bottomNavItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
               <Link 
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all duration-200 group",
                  isActive 
                    ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-white" 
                    : "text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
                )}
              >
                <item.icon className={cn("w-[18px] h-[18px] shrink-0 transition-colors", isActive ? "text-neutral-900 dark:text-white" : "text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white")} />
                {item.label}
              </Link>
            )
          })}
        </div>
      </aside>
    </>
  );
};
