'use client';

import { DocumentProvider } from '@/src/components/modules/DocumentProvider';
import { DocumentFormContainer } from '@/src/components/modules/DocumentFormContainer';
import { Suspense } from 'react';
import { DocumentFormValues } from '@/src/lib/schemas';

const QuotationCreator = () => {
  const defaults: Partial<DocumentFormValues> = {
    documentType: 'QUOTATION',
    documentNumber: `QT-${Math.floor(Math.random() * 10000)}`,
  };

  return (
    <DocumentProvider defaultOverrides={defaults}>
      <DocumentFormContainer />
    </DocumentProvider>
  );
};

export default function QuotationGeneratorPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Engine...</div>}>
        <QuotationCreator />
      </Suspense>
    </div>
  );
}
