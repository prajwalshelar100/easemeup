'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

export const RootLayoutClient = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <TopNav setSidebarOpen={setSidebarOpen} />
      <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />
      
      {/* Main Content Area: Offset by TopNav (h-16 = pt-16) and Sidebar on Desktop (w-64 = md:pl-64) */}
      <div className="flex-1 w-full pt-16 md:pl-64 flex flex-col min-h-screen">
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </>
  );
};
