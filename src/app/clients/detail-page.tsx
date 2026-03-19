'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useBusinessStore } from '@/src/lib/store/useBusinessStore';
import { Button, Card } from '@/src/components/ui';
import { 
  ArrowLeft, FileText, ClipboardList, Send, 
  Sparkles, CreditCard, ChevronRight, CheckCircle2,
  FolderKanban, Clock
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getData } from '@/src/lib/storage';

export default function ClientDetailScreen() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const { clients, documents, projects } = useBusinessStore();
  const [currencySymbol, setCurrencySymbol] = useState('$');

  useEffect(() => {
    const settings = getData<any>('app_settings', { currency: 'USD ($)' });
    const match = settings.currency.match(/\\((.*)\\)/);
    setCurrencySymbol(match ? match[1] : settings.currency || '$');
  }, []);
  
  const client = clients[id as string];
  
  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h2 className="text-xl font-bold">Client Not Found</h2>
        <Button className="mt-4" onClick={() => router.push('/clients')}>Go Back</Button>
      </div>
    );
  }

  const clientDocs = Object.values(documents).filter(d => d.clientId === client.id);
  const clientProjects = Object.values(projects).filter(p => p.clientId === client.id);
  
  const totalEarned = clientDocs.reduce((sum, d) => sum + d.amountPaid, 0) + (client.manualPaid || 0);
  const totalBilled = clientDocs.reduce((sum, d) => sum + d.totalAmount, 0) + (client.manualBilled || 0);
  const totalPending = totalBilled - totalEarned;

  const invoices = clientDocs.filter(d => d.type === 'INVOICE');
  const proposals = clientDocs.filter(d => d.type === 'PROPOSAL');

  return (
    <main className="container max-w-6xl mx-auto bg-neutral-50 dark:bg-neutral-950 min-h-screen pb-32 md:pb-8">
      {/* Top Nav (Mobile) */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-neutral-200 dark:bg-neutral-950/80 dark:border-neutral-800 z-10 md:hidden">
        <div className="flex h-14 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" className="rounded-full w-8 h-8" onClick={() => router.push('/clients')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold text-neutral-900 dark:text-neutral-100 flex-1 truncate">
            {client.name}
          </h1>
          <Button variant="outline" size="sm" className="h-8 text-xs px-2" onClick={() => router.push(`/clients/edit?id=${client.id}`)}>
            Edit
          </Button>
        </div>
      </header>
      
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between gap-3 pt-8 pb-4 px-6 md:px-8">
        <Button variant="ghost" size="sm" className="hidden md:flex gap-2 text-neutral-500 hover:text-neutral-900" onClick={() => router.push('/clients')}>
          <ArrowLeft className="w-4 h-4" /> Back to Clients
        </Button>
        <Button variant="outline" size="sm" onClick={() => router.push(`/clients/edit?id=${client.id}`)}>
          Edit Client
        </Button>
      </div>

      <div className="md:flex md:justify-between md:items-start md:px-8 md:mb-8">
        <section className="p-4 md:p-0 flex-1">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">{client.name}</h2>
          
          <div className="text-sm text-slate-500 font-medium space-y-1 md:space-y-2 mb-6">
            {client.email && <p className="flex items-center gap-2">📧 {client.email}</p>}
            {client.phone && <p className="flex items-center gap-2">📞 {client.phone}</p>}
            {client.taxId && <p className="flex items-center gap-2">🏦 <span className="font-bold">TAX ID:</span> {client.taxId}</p>}
          </div>

          <div className="flex gap-4 p-5 bg-white shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-2xl max-w-lg">
            <div className="flex-1">
              <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-emerald-600 mb-1">Total Paid</p>
              <p className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white">{currencySymbol}{totalEarned.toLocaleString()}</p>
            </div>
            <div className="w-px bg-slate-100 dark:bg-slate-800" />
            <div className="flex-1">
              <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-rose-600 mb-1">Outstanding</p>
              <p className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white">{currencySymbol}{totalPending.toLocaleString()}</p>
            </div>
          </div>
        </section>

        {/* Quick Action Bar */}
        <div className="fixed bottom-[65px] left-0 right-0 p-3 bg-white border-t border-neutral-200 dark:bg-neutral-950 dark:border-neutral-800 z-40 
                        md:static md:bg-transparent md:border-none md:p-0 md:pl-8 flex-shrink-0">
          <div className="flex gap-2 w-max px-2 mx-auto md:w-full md:flex-col md:gap-3 md:px-0">
            <Link href={`/invoice-generator?clientId=${client.id}`} className="md:w-full">
              <Button className="rounded-xl h-11 md:h-12 md:text-base gap-2 bg-blue-600 hover:bg-blue-700 md:w-full font-bold">
                <FileText className="w-4 h-4 md:w-5 md:h-5" /> New Invoice
              </Button>
            </Link>
            <Link href={`/proposal-generator?clientId=${client.id}`} className="md:w-full">
              <Button variant="outline" className="rounded-xl h-11 md:h-12 md:text-base gap-2 border-slate-200 dark:border-slate-800 md:w-full font-bold">
                <Send className="w-4 h-4 md:w-5 md:h-5" /> Send Proposal
              </Button>
            </Link>
            <Link href={`/clients/ai-prompt?id=${client.id}`} className="md:w-full">
              <Button variant="secondary" className="rounded-xl h-11 md:h-12 md:text-base gap-2 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 md:w-full font-bold">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" /> AI Payload
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-4 md:px-8 space-y-12">
        {/* Projects Tracking */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-blue-600" /> Active Projects
            </h3>
            <Link href="/projects">
               <Button variant="ghost" size="sm" className="text-blue-600 font-bold">Manage All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientProjects.length === 0 ? (
               <Card className="col-span-full p-8 bg-slate-50 dark:bg-slate-900/50 border-dashed text-center">
                 <p className="text-slate-400 font-medium italic text-sm">No projects currently tracked for this client.</p>
               </Card>
            ) : (
                clientProjects.map(project => (
                  <Card key={project.id} className="p-6 space-y-4 shadow-sm hover:border-blue-300 transition-all">
                    <div className="flex justify-between items-start">
                       <p className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-tight">{project.name}</p>
                       <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${project.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                         {project.status}
                       </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                         <span>Progress</span>
                         <span>{project.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-blue-600 rounded-full transition-all" style={{width: `${project.progress}%`}} />
                      </div>
                    </div>
                  </Card>
                ))
            )}
          </div>
        </section>

        {/* Documents Ledger */}
        <section>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">Recent Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clientDocs.length === 0 ? (
              <Card className="col-span-full py-12 text-center text-slate-400 font-medium italic text-sm">
                No invoices or proposals recorded yet.
              </Card>
            ) : (
              clientDocs.map(doc => (
                <Link href={`/invoice/view?id=${doc.id}`} key={doc.id} className="group">
                  <Card className="p-5 flex justify-between items-center hover:border-blue-400 transition-all">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors uppercase text-sm tracking-tight">{doc.documentNumber}</p>
                      <p className="text-xs text-slate-500 font-medium mt-1">{doc.type} • {new Date(doc.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-900 dark:text-white">{currencySymbol}{doc.totalAmount.toLocaleString()}</p>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                        doc.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
