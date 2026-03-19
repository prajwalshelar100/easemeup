'use client';

import { useFormContext } from 'react-hook-form';
import { DocumentFormValues } from '@/src/lib/schemas';
import { Input, Label, Card } from '@/src/components/ui';

export const PaymentSettings = () => {
  const { register, watch } = useFormContext<DocumentFormValues>();
  const docType = watch('documentType');
  const isProposal = docType === 'PROPOSAL';

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{isProposal ? 'Proposal Specifics & Terms' : 'Payment & Terms'}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {isProposal ? (
            <div>
              <Label className="mb-1 block">Scope of Work / Cover Letter</Label>
              <textarea 
                {...register('introduction')} 
                placeholder="Dear Client, thank you for the opportunity..."
                className="flex w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[145px] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              />
            </div>
          ) : (
            <div>
              <Label className="mb-1 block">Payment Terms</Label>
              <Input {...register('paymentTerms')} placeholder="e.g. Net 30, Due on Receipt" />
            </div>
          )}
          <div>
            <Label className="mb-1 block">Notes / Terms</Label>
            <Input {...register('notes')} placeholder="Thank you for your business!" />
          </div>
        </div>

        {!isProposal && (
          <div className="space-y-4">
            <div>
              <Label className="mb-1 block">Bank Transfer Details</Label>
              <textarea 
                {...register('bankDetails')} 
                placeholder="Account Name:\nAccount No:\nIFSC/Routing:\nSwift:"
                className="flex w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 min-h-[100px]"
              />
            </div>
            <div>
              <Label className="mb-1 block">UPI ID (India only)</Label>
              <Input {...register('upiDetails')} placeholder="yourname@upi" />
              <p className="text-xs text-neutral-500 mt-1">If provided, a QR code will be generated on the document.</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
