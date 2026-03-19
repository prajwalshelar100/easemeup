'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DocumentFormSchema, DocumentFormValues } from '@/src/lib/schemas';
import { useBusinessStore } from '@/src/lib/store/useBusinessStore';
import { CalculationEngine } from '@/src/services/CalculationEngine';
import { useRouter } from 'next/navigation';

export const DocumentProvider = ({ 
  children, 
  defaultOverrides = {} 
}: { 
  children: ReactNode;
  defaultOverrides?: Partial<DocumentFormValues>;
}) => {
  const { addDocument } = useBusinessStore();
  const router = useRouter();
  
  const defaultValues: Partial<DocumentFormValues> = {
    documentType: 'INVOICE',
    documentNumber: `INV-${Math.floor(Math.random() * 10000)}`,
    issueDate: new Date(),
    sellerName: '',
    buyerName: '',
    currency: 'USD',
    country: 'US',
    paymentStatus: 'UNPAID',
    items: [
      { name: '', quantity: 1, unitPrice: 0, discount: 0, taxRate: 0 }
    ],
    ...defaultOverrides
  };

  const methods = useForm<DocumentFormValues>({
    resolver: zodResolver(DocumentFormSchema) as any,
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = (data: DocumentFormValues) => {
    // Calculate final true amounts locally before saving to store
    const calcs = data.items.map(item => CalculationEngine.calculateLineItem(item as any));
    const summary = CalculationEngine.calculateDocumentSummary(calcs);
    
    // Save to Zustand
    const docId = `doc_${Date.now()}`;
    addDocument({
      id: docId,
      clientId: data.clientId,
      type: data.documentType,
      documentNumber: data.documentNumber,
      totalAmount: summary.grandTotal,
      amountPaid: 0,
      status: 'UNPAID',
      date: new Date().toISOString(),
      formData: data
    });
    
    // Redirect to dashboard or view page (for now dashboard)
    router.push('/dashboard');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full h-full">
        {children}
      </form>
    </FormProvider>
  );
};
