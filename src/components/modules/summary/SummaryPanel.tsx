'use client';

import { useDocumentEngine } from '@/src/hooks/useDocumentEngine';
import { CalculationEngine } from '@/src/services/CalculationEngine';
import { Card } from '@/src/components/ui';

export const SummaryPanel = () => {
  const { summary, country } = useDocumentEngine();
  
  // TODO: Fetch specific currency symbol from CountryConfig
  const format = (amount: number) => CalculationEngine.formatCurrency(amount, 'USD');

  return (
    <Card className="p-6 bg-neutral-50 dark:bg-neutral-900 sticky top-6">
      <h3 className="text-lg font-semibold mb-4">Summary</h3>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
          <span>Subtotal</span>
          <span>{format(summary.subTotal)}</span>
        </div>
        
        {summary.discountTotal > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
            <span>Discount</span>
            <span>-{format(summary.discountTotal)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
          <span>Tax</span>
          <span>{format(summary.taxTotal)}</span>
        </div>
        
        <div className="pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex justify-between font-semibold text-lg">
            <span>Grand Total</span>
            <span>{format(summary.grandTotal)}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-medium h-12 rounded-lg hover:bg-blue-700 transition"
        >
          Generate Document
        </button>
      </div>
    </Card>
  );
};
