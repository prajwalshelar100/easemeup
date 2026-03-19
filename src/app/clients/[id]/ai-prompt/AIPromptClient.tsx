'use client';

import { useParams, useRouter } from 'next/navigation';
import { useBusinessStore } from '@/src/lib/store/useBusinessStore';
import { Button, Card, Input, Label } from '@/src/components/ui';
import { ArrowLeft, Copy, Sparkles, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getData } from '@/src/lib/storage';

export default function AIPromptBuilderPage() {
  const { id } = useParams();
  const router = useRouter();
  const { clients } = useBusinessStore();
  const [copied, setCopied] = useState(false);
  
  const client = clients[id as string];

  const [documentType, setDocumentType] = useState('Proposal');
  const [businessName, setBusinessName] = useState('');
  const [service, setService] = useState('');
  const [amount, setAmount] = useState('');
  const [timeline, setTimeline] = useState('2 Weeks');
  const [currencySymbol, setCurrencySymbol] = useState('$');

  useEffect(() => {
    const settings = getData<any>('app_settings', { currency: 'USD ($)' });
    const match = settings.currency.match(/\((.*)\)/);
    setCurrencySymbol(match ? match[1] : settings.currency || '$');
  }, []);
  
  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-bold">Client Not Found</h2>
        <Button className="mt-4" onClick={() => router.push('/clients')}>Go Back</Button>
      </div>
    );
  }

  // Generate the Master Prompt based on user requested template
  const generatePromptText = () => {
    return `You are an AI business assistant.

Generate a professional ${documentType || '[Document Type]'} for the following:

Client Name: ${client.name}
Business: ${businessName || '[Business Name]'}
Service: ${service || '[Service Description]'}
Amount: ${currencySymbol}${amount || '[Amount]'}
Timeline: ${timeline || '[Timeline]'}

Make it:
* Clear
* Professional
* Persuasive
* Structured

Include:
* Introduction
* Scope
* Pricing
* Timeline
* Terms
* Closing

Output in clean formatted text.

---
Developed by: EasyBiz Team
GitHub: https://github.com/easybiz`;
  };

  const promptContent = generatePromptText();

  const handleCopy = () => {
    navigator.clipboard.writeText(promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="container max-w-5xl mx-auto bg-neutral-50 dark:bg-neutral-950 min-h-screen pb-24">
      {/* Top Nav */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-neutral-200 dark:bg-neutral-950/80 dark:border-neutral-800 z-10">
        <div className="flex h-14 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" className="rounded-full w-8 h-8" onClick={() => router.push(`/clients/${client.id}`)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h1 className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
              AI Prompt Builder
            </h1>
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Panel */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Configure Prompt</h2>
            <p className="text-sm text-neutral-500 mb-6">Fill in the details below to generate a tailored instruction set for any LLM (ChatGPT, Claude, etc). The prompt will automatically update.</p>
          </div>

          <div className="space-y-4 bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="space-y-2">
              <Label>Document Type</Label>
              <Input 
                value={documentType} 
                onChange={(e) => setDocumentType(e.target.value)} 
                placeholder="e.g. Proposal, Agreement, Invoice Description" 
              />
            </div>
            <div className="space-y-2">
              <Label>Client Name</Label>
              <Input value={client.name} disabled className="bg-neutral-50 dark:bg-neutral-950 text-neutral-500" />
            </div>
            <div className="space-y-2">
              <Label>Your Business Name</Label>
              <Input 
                value={businessName} 
                onChange={(e) => setBusinessName(e.target.value)} 
                placeholder="e.g. Acme Agency" 
              />
            </div>
            <div className="space-y-2">
              <Label>Details of Service</Label>
              <Input 
                value={service} 
                onChange={(e) => setService(e.target.value)} 
                placeholder="e.g. Custom Website Design & SEO" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Amount ({currencySymbol})</Label>
                <Input 
                  type="number"
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  placeholder="e.g. 500" 
                />
              </div>
              <div className="space-y-2">
                <Label>Timeline</Label>
                <Input 
                  value={timeline} 
                  onChange={(e) => setTimeline(e.target.value)} 
                  placeholder="e.g. 2 Weeks" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="flex flex-col h-full">
          <Card className="flex-1 p-0 overflow-hidden shadow-sm border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col min-h-[500px]">
            <div className="bg-neutral-100 dark:bg-neutral-950 px-3 py-2 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
              <span className="text-xs font-mono font-semibold text-neutral-500">prompt_payload.txt</span>
              <Button size="sm" variant="primary" className="h-8 px-3 text-xs gap-2" onClick={handleCopy}>
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied to Clipboard' : 'Copy Prompt'}
              </Button>
            </div>
            <textarea 
              readOnly 
              className="flex-1 w-full p-5 text-sm font-mono bg-transparent text-neutral-800 dark:text-neutral-300 resize-none focus:outline-none leading-relaxed"
              value={promptContent}
            />
          </Card>
        </div>
      </div>
    </main>
  );
}
