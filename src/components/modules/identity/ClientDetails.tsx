'use client';

import { useFormContext } from 'react-hook-form';
import { DocumentFormValues } from '@/src/lib/schemas';
import { Input, Label, Card } from '@/src/components/ui';

export const ClientDetails = () => {
  const { register } = useFormContext<DocumentFormValues>();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Client Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="mb-1 block">Client / Buyer Name *</Label>
            <Input {...register('buyerName')} placeholder="Client Name" />
          </div>
          <div>
            <Label className="mb-1 block">Client Address</Label>
            <Input {...register('buyerAddress')} placeholder="Street, City, Zip" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="mb-1 block">Client Tax ID / VAT</Label>
            <Input {...register('buyerTaxId')} placeholder="Optional Tax ID" />
          </div>
        </div>
      </div>
    </Card>
  );
};
