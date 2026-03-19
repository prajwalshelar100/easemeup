import { useFormContext, useWatch } from 'react-hook-form';
import { DocumentFormValues } from '@/src/lib/schemas';
import { CalculationEngine, LineItemResult } from '@/src/services/CalculationEngine';
import { useMemo } from 'react';

export const useDocumentEngine = () => {
  const { control, setValue } = useFormContext<DocumentFormValues>();
  
  const items = useWatch({ control, name: 'items' }) || [];
  const country = useWatch({ control, name: 'country' }) || 'US';

  const calculatedItems: LineItemResult[] = useMemo(() => {
    return items.map((item) => CalculationEngine.calculateLineItem({
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      discount: item.discount,
      taxRate: item.taxRate,
    }));
  }, [items]);

  const summary = useMemo(() => {
    return CalculationEngine.calculateDocumentSummary(calculatedItems);
  }, [calculatedItems]);

  return {
    calculatedItems,
    summary,
    country,
  };
};
