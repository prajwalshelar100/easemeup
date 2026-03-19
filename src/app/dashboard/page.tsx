'use client';

import { useBusinessStore } from '@/src/lib/store/useBusinessStore';
import { Button, Card } from '@/src/components/ui';
import { Plus, Users, FileText, ClipboardList, Download, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { getData } from '@/src/lib/storage';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const { documents, clients } = useBusinessStore();
  const [currencySymbol, setCurrencySymbol] = useState('$');

  useEffect(() => {
    const settings = getData<any>('app_settings', { currency: 'USD ($)' });
    const match = settings.currency.match(/\\((.*)\\)/);
    setCurrencySymbol(match ? match[1] : settings.currency || '$');
  }, []);

  const totalEarnings = Object.values(documents).reduce((sum, doc) => sum + doc.amountPaid, 0);
  const pendingAmount = Object.values(documents).reduce((sum, doc) => {
    return sum + (doc.totalAmount - doc.amountPaid);
  }, 0);

  const recentDocuments = Object.values(documents)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const handleExport = () => {
    const clientsCsv = ['ID,Name,Phone,Email,TaxID'].concat(
      Object.values(clients).map(c => `"${c.id}","${c.name}","${c.phone||''}","${c.email||''}","${c.taxId||''}"`)
    ).join('\n');
    
    const docsCsv = ['ID,Type,Client Name,Total,Paid,Status,Date'].concat(
      Object.values(documents).map(d => `"${d.id}","${d.type}","${d.clientId ? clients[d.clientId]?.name : ''}",${d.totalAmount},${d.amountPaid},"${d.status}","${new Date(d.date).toLocaleDateString()}"`)
    ).join('\n');

    const finalCsv = `--- CLIENTS ---\n${clientsCsv}\n\n--- FINANCIAL RECORD ---\n${docsCsv}`;

    const blob = new Blob([finalCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EaseMeUp_Export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 font-medium mt-1">Welcome back to Ease Me Up. Your private business command center.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl">
             <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
             <p className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-tighter">Device-Based Data: Local & Secure</p>
          </div>
          <Button variant="outline" onClick={handleExport} className="gap-2 rounded-xl shadow-sm border-slate-200 dark:border-slate-800">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          <Link href="/invoice-generator">
            <Button className="gap-2 rounded-xl shadow-md bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4" /> New Invoice
            </Button>
          </Link>
        </div>
      </header>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 border-0 text-white shadow-lg overflow-hidden relative">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-widest mb-4">
              <ArrowUpRight className="w-4 h-4" /> Total Revenue
            </div>
            <p className="text-4xl font-black">{currencySymbol}{totalEarnings.toLocaleString()}</p>
            <p className="text-blue-100/60 text-xs mt-4">Calculated from all paid invoices</p>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
            <Clock className="w-4 h-4" /> Outstanding
          </div>
          <p className="text-4xl font-black text-slate-900 dark:text-white">{currencySymbol}{pendingAmount.toLocaleString()}</p>
          <p className="text-slate-400 text-xs mt-4">Total amount currently due</p>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Users className="w-4 h-4" /> Total Clients
          </div>
          <p className="text-4xl font-black text-slate-900 dark:text-white">{Object.keys(clients).length}</p>
          <p className="text-slate-400 text-xs mt-4">Active clients in your directory</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
        {/* Recent Documents */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Documents</h2>
            <Link href="/documents" className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">
              View All
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentDocuments.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-8">
                <FileText className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-sm font-medium">No documents generated yet.</p>
                <Link href="/invoice-generator" className="mt-4 text-blue-600 font-bold hover:underline">
                  Create your first invoice
                </Link>
              </div>
            ) : (
              recentDocuments.map(doc => {
                const client = doc.clientId ? clients[doc.clientId] : null;
                return (
                  <Link key={doc.id} href={`/invoice/view?id=${doc.id}`} className="block group font-inter">
                    <Card className="p-4 flex items-center justify-between hover:border-blue-200 dark:hover:border-blue-900 transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-xl ${
                          doc.type === 'INVOICE' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30' : 
                          doc.type === 'PROPOSAL' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30' :
                          'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30'
                        }`}>
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors uppercase text-sm tracking-tight">{doc.documentNumber}</p>
                          <p className="text-xs text-slate-500 font-medium">{client?.name || 'Walk-in Client'} • {new Date(doc.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-extrabold text-slate-900 dark:text-white">{currencySymbol}{doc.totalAmount.toLocaleString()}</p>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                          doc.status === 'PAID' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                          doc.status === 'PARTIAL' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    </Card>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Actions / Shortcuts */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Quick Shortcuts</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Add Client', icon: Users, href: '/clients', color: 'bg-blue-50 text-blue-600' },
              { label: 'New Invoice', icon: Plus, href: '/invoice-generator', color: 'bg-indigo-50 text-indigo-600' },
              { label: 'Create Quote', icon: ClipboardList, href: '/quotation-generator', color: 'bg-emerald-50 text-emerald-600' },
              { label: 'Send Proposal', icon: FileText, href: '/proposal-generator', color: 'bg-rose-50 text-rose-600' }
            ].map(action => (
              <Link key={action.label} href={action.href}>
                <Card className="p-6 flex flex-col items-center justify-center gap-3 hover:border-blue-200 dark:hover:border-blue-900 transition-all text-center group cursor-pointer h-full">
                   <div className={`w-12 h-12 rounded-full flex items-center justify-center dark:bg-slate-800 ${action.color}`}>
                     <action.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                   </div>
                   <span className="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-blue-600">{action.label}</span>
                </Card>
              </Link>
            ))}
          </div>
          
          <Card className="p-6 bg-slate-900 dark:bg-blue-950 border-0 text-white mt-4">
            <p className="text-sm font-bold opacity-70 mb-2 uppercase tracking-widest">Privacy First</p>
            <p className="text-sm font-medium mb-6 leading-relaxed">Your data is stored 100% on this device. Clearing your browser cache or switching devices will start you on a fresh record unless you export your data.</p>
            <Link href="https://wa.me/919987909499" target="_blank">
              <Button className="w-full bg-white text-slate-900 hover:bg-white/90 font-bold rounded-xl h-12">
                Need Support?
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
