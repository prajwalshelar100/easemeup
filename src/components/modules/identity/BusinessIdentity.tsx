'use client';

import { useFormContext } from 'react-hook-form';
import { DocumentFormValues } from '@/src/lib/schemas';
import { Input, Label, Card } from '@/src/components/ui';

export const BusinessIdentity = () => {
  const { register } = useFormContext<DocumentFormValues>();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Business Identity</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="mb-1 block">Business Name *</Label>
            <Input {...register('sellerName')} placeholder="Your Company Name" />
          </div>
          <div>
            <Label className="mb-1 block">Business Address</Label>
            <Input {...register('sellerAddress')} placeholder="Street, City, Zip" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1 block">Tax ID / GSTIN</Label>
              <Input {...register('sellerTaxId')} placeholder="Optional Tax ID" />
            </div>
            <div>
              <Label className="mb-1 block">Business Reg. No.</Label>
              <Input {...register('businessNumber')} placeholder="Optional ID" />
            </div>
          </div>
        </div>

        <div className="space-y-4 border-l pl-0 md:pl-6 border-transparent md:border-neutral-200 dark:border-neutral-800">
          <div>
            <Label className="mb-1 block">Logo URL (Optional)</Label>
            <Input {...register('sellerLogo')} placeholder="https://example.com/logo.png" />
            <p className="text-xs text-neutral-500 mt-1">Provide a direct image URL or Base64 string. Local upload coming soon.</p>
          </div>
          <div>
            <Label className="mb-1 block">Digital Signature URL (Optional)</Label>
            <Input {...register('sellerSignature')} placeholder="https://example.com/signature.png" />
          </div>
        </div>
      </div>
    </Card>
  );
};
