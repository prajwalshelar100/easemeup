import { z } from 'zod';

export const LineItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Item name is required"),
  description: z.string().optional(),
  quantity: z.number().min(1, "Min quantity is 1"),
  unitPrice: z.number().min(0, "Price cannot be negative"),
  discount: z.number().min(0).default(0),
  taxRate: z.number().min(0).default(0),
  hsnSac: z.string().optional(),
});

export const DocumentFormSchema = z.object({
  documentType: z.enum(['INVOICE', 'RECEIPT', 'PROPOSAL', 'QUOTATION']),
  documentNumber: z.string().min(1, "Document number is required"),
  clientId: z.string().optional(),
  
  issueDate: z.date(),
  dueDate: z.date().optional(),
  
  // Seller details
  sellerName: z.string().min(1, "Business name is required"),
  sellerAddress: z.string().optional(),
  sellerTaxId: z.string().optional(),
  sellerLogo: z.string().optional(), // Base64 or URL
  sellerSignature: z.string().optional(),
  businessNumber: z.string().optional(),

  // Buyer details
  buyerName: z.string().min(1, "Client name is required"),
  buyerAddress: z.string().optional(),
  buyerTaxId: z.string().optional(),
  
  // Financials & Settings
  currency: z.string().default("USD"),
  country: z.string().default("US"),
  
  paymentStatus: z.enum(['UNPAID', 'PAID', 'PARTIAL']).default('UNPAID'),
  paymentTerms: z.string().optional(),
  bankDetails: z.string().optional(),
  upiDetails: z.string().optional(),
  
  // Custom Modules for Proposals/Quotations
  scopeOfWork: z.string().optional(),
  projectTimeline: z.string().optional(),
  termsAndConditions: z.string().optional(),
  
  notes: z.string().optional(),
  introduction: z.string().optional(),
  
  items: z.array(LineItemSchema).min(1, "At least one item is required"),
});

export type DocumentFormValues = z.infer<typeof DocumentFormSchema>;
