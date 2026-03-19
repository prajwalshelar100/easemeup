import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Client {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  taxId?: string;
  notes?: string;
  manualBilled?: number;
  manualPaid?: number;
  createdAt: string;
}

import { DocumentFormValues } from '../schemas';

export interface Project {
  id: string;
  name: string;
  clientId: string;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  progress: number;
  startDate: string;
}

export interface DocumentMeta {
  id: string;
  clientId?: string;
  projectId?: string;
  type: 'INVOICE' | 'RECEIPT' | 'PROPOSAL' | 'QUOTATION';
  documentNumber: string;
  totalAmount: number;
  amountPaid: number;
  status: 'UNPAID' | 'PAID' | 'PARTIAL';
  date: string;
  formData?: DocumentFormValues;
}

export interface PaymentEntry {
  id: string;
  documentId: string;
  amount: number;
  date: string;
  method?: string;
}

interface BusinessState {
  clients: Record<string, Client>;
  documents: Record<string, DocumentMeta>;
  payments: Record<string, PaymentEntry>;
  projects: Record<string, Project>;
  
  // Actions
  addClient: (client: Client) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  
  addDocument: (doc: DocumentMeta) => void;
  updateDocument: (id: string, updates: Partial<DocumentMeta>) => void;
  deleteDocument: (id: string) => void;
  
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  addPayment: (payment: PaymentEntry) => void;
}

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set) => ({
      clients: {},
      documents: {},
      payments: {},
      projects: {},
      
      addClient: (client) =>
        set((state) => ({
          clients: { ...state.clients, [client.id]: client },
        })),
        
      updateClient: (id, updates) =>
        set((state) => ({
          clients: {
            ...state.clients,
            [id]: { ...state.clients[id], ...updates },
          },
        })),
        
      deleteClient: (id) =>
        set((state) => {
          const newClients = { ...state.clients };
          delete newClients[id];
          return { clients: newClients };
        }),
        
      addDocument: (doc) =>
        set((state) => ({
          documents: { ...state.documents, [doc.id]: doc },
        })),
        
      updateDocument: (id, updates) =>
        set((state) => ({
          documents: {
            ...state.documents,
            [id]: { ...state.documents[id], ...updates },
          },
        })),

      deleteDocument: (id) =>
        set((state) => {
          const newDocs = { ...state.documents };
          delete newDocs[id];
          return { documents: newDocs };
        }),

      addProject: (project) =>
        set((state) => ({
          projects: { ...state.projects, [project.id]: project },
        })),

      updateProject: (id, updates) =>
        set((state) => ({
          projects: {
            ...state.projects,
            [id]: { ...state.projects[id], ...updates },
          },
        })),

      deleteProject: (id) =>
        set((state) => {
          const newProjects = { ...state.projects };
          delete newProjects[id];
          return { projects: newProjects };
        }),
        
      addPayment: (payment) =>
        set((state) => {
          const newPayments = { ...state.payments, [payment.id]: payment };
          
          const doc = state.documents[payment.documentId];
          const newDocs = { ...state.documents };
          
          if (doc) {
            const newAmountPaid = (doc.amountPaid || 0) + payment.amount;
            let newStatus = doc.status;
            
            if (newAmountPaid >= doc.totalAmount && doc.totalAmount > 0) {
              newStatus = 'PAID';
            } else if (newAmountPaid > 0) {
              newStatus = 'PARTIAL';
            }
            
            newDocs[doc.id] = {
              ...doc,
              amountPaid: newAmountPaid,
              status: newStatus
            };
          }
          
          return { payments: newPayments, documents: newDocs };
        }),
    }),
    {
      name: 'business-os-storage',
    }
  )
);
