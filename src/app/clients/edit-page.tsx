'use client';

import { useBusinessStore } from '@/src/lib/store/useBusinessStore';
import { Button, Input, Label, Card } from '@/src/components/ui';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function EditClientPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const { clients, updateClient } = useBusinessStore();
  const client = clients[id as string];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    taxId: '',
    notes: '',
    manualBilled: 0,
    manualPaid: 0,
  });

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || '',
        email: client.email || '',
        phone: client.phone || '',
        address: client.address || '',
        taxId: client.taxId || '',
        notes: client.notes || '',
        manualBilled: client.manualBilled || 0,
        manualPaid: client.manualPaid || 0,
      });
    }
  }, [client]);

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h2 className="text-xl font-bold">Client Not Found</h2>
        <Button className="mt-4" onClick={() => router.push('/clients')}>Go Back</Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    
    updateClient(client.id, {
      ...formData,
    });
    
    router.replace(`/clients/detail?id=${client.id}`);
  };

  return (
    <main className="container max-w-3xl mx-auto min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-neutral-200 dark:bg-neutral-950/80 dark:border-neutral-800 z-10">
        <div className="flex h-14 items-center gap-4 px-4">
          <Link href={`/clients/detail?id=${client.id}`}>
            <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="font-semibold text-neutral-900 dark:text-neutral-100 flex-1">Edit Client</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-6 pb-24">
        <Card className="p-5 space-y-5 bg-white shadow-sm border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
          <div>
            <Label className="mb-1.5 block text-sm font-medium">Business / Contact Name *</Label>
            <Input 
              required
              placeholder="Acme Corp or John Doe" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="h-12"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Email</Label>
              <Input 
                type="email"
                placeholder="contact@acme.com" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="h-12"
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Phone</Label>
              <Input 
                type="tel"
                placeholder="+1 234 567 890" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="h-12"
              />
            </div>
          </div>

          <div>
            <Label className="mb-1.5 block text-sm font-medium">Address</Label>
            <textarea 
              placeholder="Street, City, Country" 
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
              className="flex w-full rounded-xl border border-neutral-300 bg-white px-3 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Tax ID / GSTIN (Optional)</Label>
              <Input 
                placeholder="e.g. 27AAAAA0000A1Z5" 
                value={formData.taxId}
                onChange={e => setFormData({...formData, taxId: e.target.value})}
                className="h-12 uppercase"
              />
            </div>
          </div>
        </Card>
        
        <Card className="p-5 space-y-5 bg-white shadow-sm border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">Manual Financial Balances</h3>
          <p className="text-xs text-neutral-500 mb-4">You can set opening balances or adjust total amounts here. These amounts will be added to the calculated totals from invoices.</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Manual Billed Amount (Due)</Label>
              <Input 
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00" 
                value={formData.manualBilled || ''}
                onChange={e => setFormData({...formData, manualBilled: Number(e.target.value)})}
                className="h-12"
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Manual Paid Amount</Label>
              <Input 
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00" 
                value={formData.manualPaid || ''}
                onChange={e => setFormData({...formData, manualPaid: Number(e.target.value)})}
                className="h-12"
              />
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-200 px-1">Private Notes</h3>
          <Card className="p-1 border-none shadow-none bg-transparent">
             <textarea 
              placeholder="Internal notes about this client... (Not visible to them)" 
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
              className="flex w-full rounded-xl border border-neutral-300 bg-white px-4 py-4 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 min-h-[120px]"
            />
          </Card>
        </div>

        {/* Fixed bottom action */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-neutral-200 dark:bg-neutral-950 dark:border-neutral-800 md:relative md:bg-transparent md:border-none md:p-0">
          <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Save className="w-5 h-5" /> Save Client
          </Button>
        </div>
      </form>
    </main>
  );
}
