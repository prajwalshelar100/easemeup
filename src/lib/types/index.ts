export type CountryConfig = {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  defaultTaxLabel: string;
  requiresStateForTax: boolean;
};

export const COUNTRIES: Record<string, CountryConfig> = {
  US: {
    code: 'US',
    name: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    defaultTaxLabel: 'Sales Tax',
    requiresStateForTax: true,
  },
  IN: {
    code: 'IN',
    name: 'India',
    currency: 'INR',
    currencySymbol: '₹',
    defaultTaxLabel: 'GST',
    requiresStateForTax: true,
  },
  UK: {
    code: 'UK',
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    defaultTaxLabel: 'VAT',
    requiresStateForTax: false,
  },
};

export type TaxRateInfo = {
  rate: number;
  label: string;
};
