'use client';

import { DocumentProvider } from '@/src/components/modules/DocumentProvider';
import { DocumentFormContainer } from '@/src/components/modules/DocumentFormContainer';
import { Suspense } from 'react';
import { DocumentFormValues } from '@/src/lib/schemas';

const InvoiceCreator = () => {
  const defaults: Partial<DocumentFormValues> = {
    documentType: 'INVOICE',
    documentNumber: `INV-${Math.floor(Math.random() * 10000)}`,
  };

  return (
    <DocumentProvider defaultOverrides={defaults}>
      <DocumentFormContainer />
    </DocumentProvider>
  );
};

export default function InvoiceGeneratorPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Engine...</div>}>
        <InvoiceCreator />
      </Suspense>
    </div>
  );
}
