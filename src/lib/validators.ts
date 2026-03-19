/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from 'zod';

export const PartyDetailsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  taxId: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
});

export const InvoiceItemSchema = z.object({
  id: z.string(),
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().min(0.01, 'Quantity must be greater than 0'),
  unitPrice: z.number().min(0, 'Unit price must be positive'),
  taxRate: z.number().min(0, 'Tax rate must be positive'),
  hsnSac: z.string().optional(),
});

export const InvoiceDataSchema = z.object({
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  seller: PartyDetailsSchema,
  buyer: PartyDetailsSchema,
  items: z.array(InvoiceItemSchema).min(1, 'At least one item is required'),
  currency: z.enum(['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD', 'JPY']),
  country: z.string().min(1, 'Country is required'),
  notes: z.string().optional(),
  paymentTerms: z.string().optional(),
  signature: z.string().optional(),
  
  indiaGst: z.object({
    placeOfSupply: z.string().optional(),
    reverseCharge: z.boolean(),
  }).optional(),
  
  euVat: z.object({
    reverseCharge: z.boolean(),
  }).optional(),
});

export type InvoiceFormData = z.infer<typeof InvoiceDataSchema>;
