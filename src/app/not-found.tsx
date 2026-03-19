'use client';

import Link from 'next/link';
import { Button } from '@/src/components/ui';
import { Ghost, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 p-6 text-center">
      <div className="relative mb-8">
        <Ghost className="w-24 h-24 text-blue-600 animate-bounce transition-all duration-1000" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-200 dark:bg-slate-800 rounded-full blur-md opacity-50" />
      </div>
      
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">404 - Lost in Space</h1>
      <p className="text-slate-500 font-medium max-w-md mx-auto mb-10">
        Oops! The page you're looking for has vanished into thin air. 
        Don't worry, your business data is still safe.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button variant="outline" className="h-12 px-8 rounded-xl font-bold gap-2 bg-white dark:bg-slate-900 border-slate-200">
            <Home className="w-4 h-4" /> Go Home
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button className="h-12 px-8 rounded-xl font-bold gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
