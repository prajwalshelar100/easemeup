'use client';

import { Card, Button } from '@/src/components/ui';
import { PieChart, TrendingUp, TrendingDown, CreditCard, Receipt, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useBusinessStore } from '@/src/lib/store/useBusinessStore';
import { useState, useEffect } from 'react';
import { getData } from '@/src/lib/storage';

export default function FinanceHubPage() {
  const { documents } = useBusinessStore();
  const [currencySymbol, setCurrencySymbol] = useState('$');

  useEffect(() => {
    const settings = getData<any>('app_settings', { currency: 'USD ($)' });
    const match = settings.currency.match(/\\((.*)\\)/);
    setCurrencySymbol(match ? match[1] : settings.currency || '$');
  }, []);

  const totalIncome = Object.values(documents).reduce((sum, d) => sum + d.amountPaid, 0);
  const pendingIncome = Object.values(documents).reduce((sum, d) => sum + (d.totalAmount - d.amountPaid), 0);

  return (
    <div className="space-y-8 pb-12">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Finance Hub
        </h1>
        <p className="text-slate-500 font-medium mt-1">Unified view of your business revenue and cash flow.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-2xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <Link href="/payments">
               <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600">
                 Manage Payments <ArrowRight className="w-3 h-3 ml-2" />
               </Button>
            </Link>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Collected</p>
            <p className="text-5xl font-black text-slate-900 dark:text-white mt-1">{currencySymbol}{totalIncome.toLocaleString()}</p>
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
             <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-500">Unpaid Invoices</span>
                <span className="text-amber-600">{currencySymbol}{pendingIncome.toLocaleString()}</span>
             </div>
          </div>
        </Card>

        <Card className="p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 rounded-2xl">
              <TrendingDown className="w-6 h-6" />
            </div>
            <Link href="/expense-tracker">
               <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600">
                 Manage Expenses <ArrowRight className="w-3 h-3 ml-2" />
               </Button>
            </Link>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Global Outgoings</p>
            <p className="text-5xl font-black text-slate-900 dark:text-white mt-1">{currencySymbol}0</p>
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
             <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-500">Recorded this month</span>
                <span className="text-rose-600">{currencySymbol}0</span>
             </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Payments', icon: CreditCard, href: '/payments', desc: 'Track client settlements' },
          { label: 'Expenses', icon: Receipt, href: '/expense-tracker', desc: 'Log business costs' },
          { label: 'Invoices', icon: FileText, href: '/invoice-generator', desc: 'Generate billables' }
        ].map(item => (
          <Link href={item.href} key={item.label}>
            <Card className="p-6 hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-blue-600 rounded-xl transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{item.label}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
