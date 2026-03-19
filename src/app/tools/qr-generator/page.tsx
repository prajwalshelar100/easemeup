'use client';

import { useState } from 'react';
import { Card, Input, Button, Label } from '@/src/components/ui';
import { QrCode, Download, RefreshCw } from 'lucide-react';

export default function QrGeneratorPage() {
  const [data, setData] = useState('https://easybiz.test');
  const [size, setSize] = useState('250');
  const [qrUrl, setQrUrl] = useState('https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://easybiz.test');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    const encodedData = encodeURIComponent(data);
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedData}`);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qr-code-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed', err);
      // Fallback
      window.open(qrUrl, '_blank');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pt-6">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-xl">
          <QrCode className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
            QR Generator
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Create scannable QR codes for links or text.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5">
          <Card className="p-6">
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <Label className="mb-2 block">Content (URL or Text)</Label>
                <Input 
                  placeholder="https://yourwebsite.com" 
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <div>
                <Label className="mb-2 block">Resolution Size</Label>
                <select 
                  className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 shadow-sm"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="150">Small (150x150)</option>
                  <option value="250">Medium (250x250)</option>
                  <option value="500">Large (500x500)</option>
                  <option value="800">HD (800x800)</option>
                </select>
              </div>

              <Button type="submit" size="lg" className="w-full gap-2 text-sm bg-purple-600 hover:bg-purple-700">
                <RefreshCw className="w-4 h-4" /> Generate QR
              </Button>
            </form>
          </Card>
        </div>

        <div className="md:col-span-7">
          <Card className="p-6 h-[400px] flex flex-col items-center justify-center border-[3px] border-dashed border-slate-100 dark:border-slate-800">
             <div className="bg-white p-4 rounded-xl shadow-sm mb-6 inline-block">
               <img src={qrUrl} alt="Generated QR Code" className="w-[200px] h-[200px] object-contain" crossOrigin="anonymous" />
             </div>
             
             <div className="flex gap-4">
               <Button onClick={handleDownload} variant="outline" className="gap-2 font-semibold shadow-sm">
                 <Download className="w-4 h-4" /> Download PNG
               </Button>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
