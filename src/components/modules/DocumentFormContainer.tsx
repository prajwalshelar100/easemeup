'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DocumentFormValues } from '@/src/lib/schemas';
import { useDocumentEngine } from '@/src/hooks/useDocumentEngine';

import { BusinessIdentity } from './identity/BusinessIdentity';
import { ClientDetails } from './identity/ClientDetails';
import { LineItemsTable } from './line-items/LineItemsTable';
import { PaymentSettings } from './payment/PaymentSettings';
import { ProjectSettings } from './project/ProjectSettings';
import { SummaryPanel } from './summary/SummaryPanel';
import { DocumentPreview } from './DocumentPreview';
import { ArrowLeft, Eye, FileEdit } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/src/components/ui';

export const DocumentFormContainer = () => {
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const { watch } = useFormContext<DocumentFormValues>();
  const { calculatedItems } = useDocumentEngine();
  
  const formData = watch();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/documents">
              <Button type="button" variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            </Link>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {view === 'edit' ? 'Create Document' : 'Document Preview'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant={view === 'edit' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setView('edit')}
              className="gap-2"
            >
              <FileEdit className="w-4 h-4" /> Edit
            </Button>
            <Button
              type="button"
              variant={view === 'preview' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setView('preview')}
              className="gap-2"
            >
              <Eye className="w-4 h-4" /> Preview
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl flex-1">
        {view === 'edit' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                    Document Builder
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">Configure your document blocks below.</p>
                </div>
              </div>
              <BusinessIdentity />
              <ClientDetails />
              
              {/* Conditional Project Settings for Proposal/Quotation */}
              <ProjectSettings />
              
              <LineItemsTable />
              <PaymentSettings />
            </div>
            
            <div className="lg:col-span-4 relative">
              <SummaryPanel />
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <DocumentPreview data={formData} items={calculatedItems} />
          </div>
        )}
      </main>
    </div>
  );
};
