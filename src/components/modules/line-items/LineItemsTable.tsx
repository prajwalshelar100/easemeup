'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { DocumentFormValues } from '@/src/lib/schemas';
import { useDocumentEngine } from '@/src/hooks/useDocumentEngine';
import { Button, Input, Label, Card } from '@/src/components/ui';
import { Plus, Trash2 } from 'lucide-react';

export const LineItemsTable = () => {
  const { control, register } = useFormContext<DocumentFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  
  const { calculatedItems } = useDocumentEngine();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Line Items</h3>
      
      <div className="space-y-4">
        {fields.map((field, index) => {
          const calculatedItem = calculatedItems[index];
          
          return (
            <div key={field.id} className="grid grid-cols-12 gap-4 items-start border-b border-neutral-200 pb-4 dark:border-neutral-800">
              <div className="col-span-12 md:col-span-4">
                <Label className="mb-1 block">Item Name</Label>
                <Input {...register(`items.${index}.name` as const)} placeholder="Item name" />
                <Input {...register(`items.${index}.description` as const)} placeholder="Optional description" className="mt-2 text-sm" />
              </div>

              <div className="col-span-6 md:col-span-1">
                <Label className="mb-1 block">Qty</Label>
                <Input type="number" {...register(`items.${index}.quantity` as const, { valueAsNumber: true })} />
              </div>

              <div className="col-span-6 md:col-span-2">
                <Label className="mb-1 block">Price</Label>
                <Input type="number" step="0.01" {...register(`items.${index}.unitPrice` as const, { valueAsNumber: true })} />
              </div>

              <div className="col-span-6 md:col-span-1">
                <Label className="mb-1 block">Discount</Label>
                <Input type="number" step="0.01" {...register(`items.${index}.discount` as const, { valueAsNumber: true })} />
              </div>

              <div className="col-span-6 md:col-span-1">
                <Label className="mb-1 block">Tax %</Label>
                <Input type="number" step="0.01" {...register(`items.${index}.taxRate` as const, { valueAsNumber: true })} />
              </div>

              <div className="col-span-10 md:col-span-2 text-right">
                <Label className="mb-1 block">Total</Label>
                <div className="h-10 flex items-center justify-end font-medium">
                  {calculatedItem?.netTotal ? calculatedItem.netTotal.toFixed(2) : '0.00'}
                </div>
              </div>

              <div className="col-span-2 md:col-span-1 flex justify-end">
                <div className="pt-6">
                  <Button type="button" variant="ghost" className="text-red-500 hover:text-red-700" onClick={() => remove(index)} disabled={fields.length === 1}>
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ name: '', quantity: 1, unitPrice: 0, discount: 0, taxRate: 0 })}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>
    </Card>
  );
};
