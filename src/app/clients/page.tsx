'use client';

import { useBusinessStore } from '@/src/lib/store/useBusinessStore';
import { Button, Card } from '@/src/components/ui';
import { Plus, Users, Search, ChevronRight, Mail, Phone, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getData } from '@/src/lib/storage';

export default function ClientsPage() {
  const { clients, documents } = useBusinessStore();
  const [search, setSearch] = useState('');
  const [currencySymbol, setCurrencySymbol] = useState('$');

  useEffect(() => {
    const settings = getData<any>('app_settings', { currency: 'USD ($)' });
    const match = settings.currency.match(/\\((.*)\\)/);
    setCurrencySymbol(match ? match[1] : settings.currency || '$');
  }, []);

  const clientList = Object.values(clients).filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Client Directory
          </h1>
          <p className="text-slate-500 font-medium mt-1">Manage your customer relationships and balances.</p>
        </div>
        <Link href="/clients/new">
          <Button className="gap-2 rounded-xl shadow-md bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4" /> Add New Client
          </Button>
        </Link>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {clientList.length === 0 ? (
          <div className="col-span-full h-96 flex flex-col items-center justify-center text-slate-400 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-8 text-center">
             <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
               <Users className="w-8 h-8 opacity-40" />
             </div>
             <p className="text-lg font-bold text-slate-900 dark:text-white">No clients found</p>
             <p className="text-sm mt-1 max-w-xs">Start by adding a client to generate documents and track payments.</p>
             <Link href="/clients/new" className="mt-6">
                <Button variant="outline" className="rounded-xl">Create First Client</Button>
             </Link>
          </div>
        ) : (
          clientList.map(client => {
            const clientDocs = Object.values(documents).filter(d => d.clientId === client.id);
            const totalEarned = clientDocs.reduce((sum, d) => sum + d.amountPaid, 0) + (client.manualPaid || 0);
            const totalBilled = clientDocs.reduce((sum, d) => sum + d.totalAmount, 0) + (client.manualBilled || 0);
            const totalPending = totalBilled - totalEarned;
            
            return (
              <Link href={`/clients/detail?id=${client.id}`} key={client.id} className="group">
                <Card className="p-6 h-full flex flex-col justify-between hover:border-blue-400 dark:hover:border-blue-700 transition-all shadow-sm hover:shadow-lg dark:bg-slate-900 dark:border-slate-800">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="bg-slate-100 dark:bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-slate-500 text-lg uppercase">
                        {client.name.charAt(0)}
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{client.name}</h3>
                      <div className="flex flex-col gap-1 mt-2">
                        {client.email && (
                          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                            <Mail className="w-3.5 h-3.5" /> {client.email}
                          </div>
                        )}
                        {client.phone && (
                          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                            <Phone className="w-3.5 h-3.5" /> {client.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl">
                      <p className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-500 tracking-widest mb-1">Total Paid</p>
                      <p className="text-lg font-extrabold text-emerald-900 dark:text-emerald-400">{currencySymbol}{totalEarned.toLocaleString()}</p>
                    </div>
                    <div className={`${totalPending > 0 ? 'bg-rose-50 dark:bg-rose-900/20' : 'bg-slate-50 dark:bg-slate-800/50'} p-3 rounded-xl`}>
                      <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${totalPending > 0 ? 'text-rose-600 dark:text-rose-500' : 'text-slate-500'}`}>Balance Due</p>
                      <p className={`text-lg font-extrabold ${totalPending > 0 ? 'text-rose-900 dark:text-rose-400' : 'text-slate-600 dark:text-slate-400'}`}>{currencySymbol}{totalPending.toLocaleString()}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
