'use client';

import { DocumentProvider } from './DocumentProvider';
import { BusinessIdentity } from './identity/BusinessIdentity';
import { ClientDetails } from './identity/ClientDetails';
import { LineItemsTable } from './line-items/LineItemsTable';
import { PaymentSettings } from './payment/PaymentSettings';
import { SummaryPanel } from './summary/SummaryPanel';

export const DocumentForm = () => {
  return (
    <DocumentProvider>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Header config: Invoice vs Receipt */}
          <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-neutral-200 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
            <div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-700">
                Document Details
              </h2>
              <p className="text-sm text-neutral-500 mt-1">Configure your global invoice or receipt</p>
            </div>
          </div>
          
          <BusinessIdentity />
          <ClientDetails />
          <LineItemsTable />
          <PaymentSettings />
        </div>
        
        <div className="lg:col-span-4 relative">
          <SummaryPanel />
        </div>
      </div>
    </DocumentProvider>
  );
};
