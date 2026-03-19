'use client';

import { useBusinessStore } from '@/src/lib/store/useBusinessStore';
import { Button, Input, Label, Card } from '@/src/components/ui';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewClientPage() {
  const router = useRouter();
  const { addClient } = useBusinessStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    taxId: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    
    const newClient = {
      id: `client_${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString()
    };
    
    addClient(newClient);
    router.replace(`/clients/${newClient.id}`); // Redirect directly to the detail view
  };

  return (
    <main className="container max-w-3xl mx-auto min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-neutral-200 dark:bg-neutral-950/80 dark:border-neutral-800 z-10">
        <div className="flex h-14 items-center gap-4 px-4">
          <Link href="/clients">
            <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="font-semibold text-neutral-900 dark:text-neutral-100 flex-1">Add New Client</h1>
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

          <div>
            <Label className="mb-1.5 block text-sm font-medium">Tax ID / GSTIN (Optional)</Label>
            <Input 
              placeholder="e.g. 27AAAAA0000A1Z5" 
              value={formData.taxId}
              onChange={e => setFormData({...formData, taxId: e.target.value})}
              className="h-12 uppercase"
            />
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
