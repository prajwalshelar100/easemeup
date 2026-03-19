'use client';

import { DocumentProvider } from '@/src/components/modules/DocumentProvider';
import { DocumentFormContainer } from '@/src/components/modules/DocumentFormContainer';
import { useSearchParams } from 'next/navigation';
import { useBusinessStore } from '@/src/lib/store/useBusinessStore';
import { Suspense } from 'react';
import { DocumentFormValues } from '@/src/lib/schemas';

const InvoiceCreator = () => {
  const searchParams = useSearchParams();
  const clientId = searchParams.get('clientId');
  // @ts-ignore
  const type: 'INVOICE' | 'RECEIPT' | 'PROPOSAL' = searchParams.get('type') || 'INVOICE';
  
  const { clients } = useBusinessStore();
  const client = clientId ? clients[clientId] : null;

  const dynamicDefaults: Partial<DocumentFormValues> = {
    documentType: type,
    clientId: clientId || undefined,
    buyerName: client?.name || '',
    buyerAddress: client?.address || '',
    buyerTaxId: client?.taxId || '',
    documentNumber: type === 'PROPOSAL' ? `PROP-${Math.floor(Math.random() * 10000)}` : `INV-${Math.floor(Math.random() * 10000)}`
  };

  return (
    <DocumentProvider defaultOverrides={dynamicDefaults}>
      <DocumentFormContainer />
    </DocumentProvider>
  );
};

export default function CreateDocumentPage() {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-950">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Engine...</div>}>
        <InvoiceCreator />
      </Suspense>
    </div>
  );
}
