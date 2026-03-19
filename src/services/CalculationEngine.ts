export interface LineItemInput {
  name?: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  discount?: number; // per item fixed discount
  taxRate?: number; // percentage
}

export interface LineItemResult extends LineItemInput {
  baseTotal: number;
  taxAmount: number;
  netTotal: number;
}

export interface DocumentSummary {
  subTotal: number;
  discountTotal: number;
  taxTotal: number;
  grandTotal: number;
}

export class CalculationEngine {
  /**
   * Calculates financials for a single line item
   */
  static calculateLineItem(item: LineItemInput): LineItemResult {
    const qty = item.quantity || 0;
    const price = item.unitPrice || 0;
    const discount = item.discount || 0;
    const rate = item.taxRate || 0;

    const baseTotal = (qty * price) - discount;
    const taxAmount = (baseTotal * rate) / 100;
    const netTotal = baseTotal + taxAmount;

    return {
      ...item,
      baseTotal: Math.max(0, baseTotal),
      taxAmount: Math.max(0, taxAmount),
      netTotal: Math.max(0, netTotal),
    };
  }

  /**
   * Calculates the overall document summary based on all calculated line items
   */
  static calculateDocumentSummary(items: LineItemResult[]): DocumentSummary {
    let subTotal = 0;
    let discountTotal = 0;
    let taxTotal = 0;
    let grandTotal = 0;

    for (const item of items) {
      // Subtotal before item-level discounts
      subTotal += item.quantity * item.unitPrice;
      discountTotal += item.discount || 0;
      taxTotal += item.taxAmount;
      grandTotal += item.netTotal;
    }

    // Apply any document-level adjustments here in the future if needed

    return {
      subTotal,
      discountTotal,
      taxTotal,
      grandTotal,
    };
  }

  /**
   * Utility to format number as currency
   */
  static formatCurrency(amount: number, currency: string, locale: string = 'en-US'): string {
    // Extract 3-letter code if format is "USD ($)"
    const code = currency.split(' ')[0] || 'USD';
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: code,
      }).format(amount);
    } catch {
      return `${code} ${amount.toLocaleString()}`;
    }
  }
}
