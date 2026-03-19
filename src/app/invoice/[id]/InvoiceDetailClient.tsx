'use client';

import { useParams, useRouter } from 'next/navigation';
import { useBusinessStore } from '@/src/lib/store/useBusinessStore';
import { Button } from '@/src/components/ui';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { DocumentPreview } from '@/src/components/modules/DocumentPreview';
import { CalculationEngine, LineItemResult } from '@/src/services/CalculationEngine';
import { useEffect, useState } from 'react';

export default function InvoiceViewPage() {
  const { id } = useParams();
  const router = useRouter();
  const { documents } = useBusinessStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">Loading...</div>;

  const docData = documents[id as string];

  if (!docData || !docData.formData) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-xl font-bold mb-4">Invoice Not Found or Requires Re-saving</h2>
        <p className="text-neutral-500 mb-6">If this is an old invoice, it might not have the full embedded data.</p>
        <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
      </div>
    );
  }

  // Calculate items for preview
  const calculatedItems: LineItemResult[] = docData.formData.items.map(item => 
    CalculationEngine.calculateLineItem(item as any)
  );

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pb-20">
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
        <div className="container mx-auto max-w-5xl flex h-14 md:h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 md:gap-4">
            <Link href={docData.clientId ? `/clients/${docData.clientId}` : '/dashboard'}>
              <Button variant="ghost" size="sm" className="gap-2 px-2 md:px-3">
                <ArrowLeft className="w-4 h-4" /> <span className="hidden md:inline">Back</span>
              </Button>
            </Link>
            <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800" />
            <h1 className="text-sm md:text-lg font-bold text-neutral-900 dark:text-neutral-100 truncate max-w-[200px] md:max-w-none">
              {docData.type === 'PROPOSAL' ? 'Proposal' : 'Invoice'} #{docData.documentNumber}
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-4xl mx-auto w-full">
          <DocumentPreview data={docData.formData} items={calculatedItems} />
        </div>
      </main>
    </div>
  );
}
