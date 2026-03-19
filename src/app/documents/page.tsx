'use client';

import { useBusinessStore } from '@/src/lib/store/useBusinessStore';
import { Card, Button } from '@/src/components/ui';
import { FileText, Search, Filter, Download, ExternalLink, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getData } from '@/src/lib/storage';

export default function DocumentsSummaryPage() {
  const { documents, clients, deleteDocument } = useBusinessStore();
  const [search, setSearch] = useState('');
  const [currencySymbol, setCurrencySymbol] = useState('$');

  useEffect(() => {
    const settings = getData<any>('app_settings', { currency: 'USD ($)' });
    const match = settings.currency.match(/\\((.*)\\)/);
    setCurrencySymbol(match ? match[1] : settings.currency || '$');
  }, []);

  const allDocuments = Object.values(documents).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const filtered = allDocuments.filter(doc => {
    const client = doc.clientId ? clients[doc.clientId] : null;
    const term = search.toLowerCase();
    return (
      doc.documentNumber.toLowerCase().includes(term) ||
      client?.name.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Documents
          </h1>
          <p className="text-slate-500 font-medium mt-1">All your generated invoices, proposals, and quotations.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/invoice-generator">
            <Button size="sm" className="rounded-xl h-10 px-4">New Invoice</Button>
          </Link>
          <Link href="/proposal-generator">
            <Button variant="outline" size="sm" className="rounded-xl h-10 px-4">New Proposal</Button>
          </Link>
        </div>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text"
          placeholder="Search by doc number or client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Document</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Client</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Total</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-24 text-center text-slate-400 font-medium">
                    No documents found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map(doc => {
                  const client = doc.clientId ? clients[doc.clientId] : null;
                  return (
                    <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-500">{new Date(doc.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                           <span className={`w-2 h-2 rounded-full ${
                             doc.type === 'INVOICE' ? 'bg-blue-500' : 
                             doc.type === 'PROPOSAL' ? 'bg-indigo-500' : 'bg-emerald-500'
                           }`} />
                           <span className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-tight">{doc.documentNumber}</span>
                         </div>
                         <p className="text-[10px] text-slate-400 font-bold mt-0.5">{doc.type}</p>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300 text-sm">{client?.name || 'Walk-in'}</td>
                      <td className="px-6 py-4 font-black text-slate-900 dark:text-white">{currencySymbol}{doc.totalAmount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                         <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                            doc.status === 'PAID' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' :
                            doc.status === 'PARTIAL' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30' :
                            'bg-slate-100 text-slate-600 dark:bg-slate-800'
                          }`}>
                            {doc.status}
                          </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                         <Link href={`/invoice/${doc.id}`} target="_blank">
                           <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                             <Download className="w-4 h-4" />
                           </Button>
                         </Link>
                         <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-600" onClick={() => {
                           if(confirm('Delete document?')) deleteDocument(doc.id);
                         }}>
                           <Trash2 className="w-4 h-4" />
                         </Button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
