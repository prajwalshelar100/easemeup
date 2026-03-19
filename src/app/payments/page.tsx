'use client';

import { useBusinessStore } from '@/src/lib/store/useBusinessStore';
import { Button, Card } from '@/src/components/ui';
import { CreditCard, CheckCircle2, ChevronRight, Plus, ArrowUpRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getData } from '@/src/lib/storage';

export default function PaymentsPage() {
  const { payments, documents, clients } = useBusinessStore();
  const [filter, setFilter] = useState<'ALL' | 'UNPAID'>('ALL');
  const [currencySymbol, setCurrencySymbol] = useState('$');

  useEffect(() => {
    const settings = getData<any>('app_settings', { currency: 'USD ($)' });
    const match = settings.currency.match(/\((.*)\)/);
    setCurrencySymbol(match ? match[1] : settings.currency || '$');
  }, []);

  const paymentsArray = Object.values(payments).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const unpaidInvoices = Object.values(documents).filter(d => d.type === 'INVOICE' && d.status !== 'PAID');
  
  const totalCollected = Object.values(payments).reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Payments</h1>
          <p className="text-slate-500 font-medium mt-1">Track settlements and manage outstanding invoices.</p>
        </div>
        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-3">
           <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
             <TrendingUp className="w-5 h-5 text-emerald-600" />
           </div>
           <div>
             <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Total Collected</p>
             <p className="text-xl font-black text-slate-900 dark:text-white">{currencySymbol}{totalCollected.toLocaleString()}</p>
           </div>
        </div>
      </header>

      <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl w-full md:w-max">
        <button 
          className={`flex-1 md:px-8 py-2.5 text-sm font-bold rounded-xl transition-all ${filter === 'ALL' ? 'bg-white text-slate-900 shadow-md dark:bg-slate-800 dark:text-white' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => setFilter('ALL')}
        >
          History
        </button>
        <button 
          className={`flex-1 md:px-8 py-2.5 text-sm font-bold rounded-xl transition-all ${filter === 'UNPAID' ? 'bg-white text-slate-900 shadow-md dark:bg-slate-800 dark:text-white' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => setFilter('UNPAID')}
        >
          Pending
        </button>
      </div>

      {filter === 'UNPAID' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unpaidInvoices.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
               <p className="text-slate-400 font-bold italic">Perfect! No pending invoices.</p>
            </div>
          ) : (
            unpaidInvoices.map(doc => {
              const client = doc.clientId ? clients[doc.clientId] : null;
              const due = doc.totalAmount - doc.amountPaid;
              return (
                <Card key={doc.id} className="p-6 border-amber-100 dark:border-amber-900/30 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-tight">{doc.documentNumber}</h3>
                      <p className="text-sm font-bold text-blue-600 mt-1">{client?.name || 'Walk-in'}</p>
                    </div>
                    <div className="px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-lg text-[10px] font-black uppercase">
                      Pending
                    </div>
                  </div>
                  
                  <div className="space-y-1 mb-8">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Balance Due</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">{currencySymbol}{due.toLocaleString()}</p>
                  </div>

                  <Link href={`/invoice/${doc.id}/pay`}>
                    <Button className="w-full rounded-xl bg-slate-900 text-white font-bold h-11 gap-2">
                      Record Payment <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </Card>
              )
            })
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {paymentsArray.length === 0 ? (
            <div className="py-20 text-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
               <p className="text-slate-400 font-bold italic text-sm">No payment history yet.</p>
            </div>
          ) : (
            paymentsArray.map(payment => {
              const doc = documents[payment.documentId];
              const client = doc?.clientId ? clients[doc.clientId] : null;
              return (
                <Card key={payment.id} className="p-5 flex justify-between items-center hover:border-blue-300 dark:hover:border-blue-900 transition-colors bg-white dark:bg-slate-900 shadow-sm">
                   <div className="flex items-center gap-4">
                     <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl">
                       <CreditCard className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="font-bold text-slate-900 dark:text-white text-sm">{client?.name || 'Unknown Client'}</p>
                       <p className="text-xs text-slate-500 font-medium mt-0.5">{doc?.documentNumber || 'No Doc ID'} • {new Date(payment.date).toLocaleDateString()}</p>
                     </div>
                   </div>
                   <div className="text-right">
                      <p className="font-black text-emerald-600 text-lg">+{currencySymbol}{payment.amount.toLocaleString()}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Settled</p>
                   </div>
                </Card>
              )
            })
          )}
        </div>
      )}
    </div>
  );
}
