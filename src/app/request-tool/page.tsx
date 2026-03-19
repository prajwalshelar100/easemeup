'use client';

import { useState } from 'react';
import { Card, Input, Label, Textarea, Button } from '@/src/components/ui';
import { MessageSquarePlus, Send } from 'lucide-react';
import { saveData, getData } from '@/src/lib/storage';

export default function RequestToolPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [toolName, setToolName] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toolName || !description) return;

    const requestData = {
      id: `req_${Date.now()}`,
      name,
      email,
      toolName,
      description,
      status: 'pending'
    };

    const existingRequests = getData<typeof requestData[]>('tool_requests', []);
    saveData('tool_requests', [requestData, ...existingRequests]);
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setToolName('');
      setDescription('');
    }, 4000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 pt-8">
      <header className="text-center">
        <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl mb-4">
          <MessageSquarePlus className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Request a New Tool</h1>
        <p className="text-slate-500 font-medium">Missing a utility or calculator? Let us know what you need built.</p>
      </header>

      <Card className="p-8 shadow-md border-0 ring-1 ring-slate-200 dark:ring-slate-800 bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-emerald-600">Request Sent Successfully!</h2>
            <p className="text-slate-500">Thanks for helping us improve EasyBiz. We've saved your request locally and our team will review it.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="mb-2 block">Your Name (Optional)</Label>
                <Input 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label className="mb-2 block">Email Address (Optional)</Label>
                <Input 
                  type="email"
                  placeholder="john@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-2">
              <Label className="mb-2 block font-medium text-slate-900 dark:text-slate-100">Tool Name <span className="text-rose-500">*</span></Label>
              <Input 
                placeholder="e.g. JSON Formatter, Currency Converter" 
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div>
              <Label className="mb-2 block font-medium text-slate-900 dark:text-slate-100">Detailed Description <span className="text-rose-500">*</span></Label>
              <Textarea 
                placeholder="Describe how this tool should work, typical inputs/outputs, and why it's useful for your workflow..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="min-h-[160px] p-4 text-base"
              />
            </div>

            <Button type="submit" size="lg" className="w-full h-14 text-base font-bold shadow-sm">
              Submit Request
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
