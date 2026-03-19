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
        "fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 z-50 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:w-64 shadow-xl md:shadow-sm",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/30">
              <span className="text-white font-black text-sm">E</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">EasyBiz</h1>
              <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest leading-none mt-0.5">Business Suite</p>
            </div>
          </Link>
          {/* Close Button - Mobile Only */}
          <button 
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setOpen(false)}
            aria-label="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          <p className="px-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Menu</p>
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || (pathname !== '/' && pathname.startsWith(item.href) && item.href !== '/dashboard');
            return (
              <Link 
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150",
                  isActive 
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
                )}
              >
                <item.icon className={cn("w-[18px] h-[18px] shrink-0", isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500")} />
                {item.label}
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Links */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-0.5 shrink-0">
          {bottomNavItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
               <Link 
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150",
                  isActive 
                    ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
                )}
              >
                <item.icon className="w-[18px] h-[18px] text-slate-400 dark:text-slate-500 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </aside>
    </>
  );
};
