'use client';

import { useState, useEffect } from 'react';
import { Card, Input, Label } from '@/src/components/ui';
import { Calculator } from 'lucide-react';
import { getData } from '@/src/lib/storage';

export default function GstCalculatorPage() {
  const [baseAmount, setBaseAmount] = useState<number | ''>(1000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [currencySymbol, setCurrencySymbol] = useState('$');

  useEffect(() => {
    const settings = getData<any>('app_settings', { currency: 'USD ($)' });
    const match = settings.currency.match(/\((.*)\)/);
    setCurrencySymbol(match ? match[1] : settings.currency || '$');
  }, []);
  const calculateGst = () => {
    const amount = typeof baseAmount === 'number' ? baseAmount : 0;
    if (mode === 'add') {
      const gstAmount = amount * (gstRate / 100);
      const netAmount = amount + gstAmount;
      return { gstAmount, netAmount, original: amount };
    } else {
      const original = amount / (1 + (gstRate / 100));
      const gstAmount = amount - original;
      return { gstAmount, netAmount: amount, original };
    }
  };

  const results = calculateGst();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pt-6">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
            GST Calculator
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Easily add or remove GST from any amount.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 space-y-6">
          <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setMode('add')}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition ${mode === 'add' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-slate-100' : 'text-slate-500'}`}
            >
              Add GST (+Tax)
            </button>
            <button
              onClick={() => setMode('remove')}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition ${mode === 'remove' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-slate-100' : 'text-slate-500'}`}
            >
              Remove GST (-Tax)
            </button>
          </div>

          <div>
            <Label className="mb-2 block">Amount ({currencySymbol})</Label>
            <Input 
              type="number" 
              value={baseAmount}
              onChange={(e) => setBaseAmount(e.target.value ? parseFloat(e.target.value) : '')}
              className="h-12 text-lg font-medium"
            />
          </div>

          <div>
            <Label className="mb-2 block">GST Rate (%)</Label>
            <div className="flex flex-wrap gap-2">
              {[5, 12, 18, 28].map(rate => (
                <button
                  key={rate}
                  onClick={() => setGstRate(rate)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition ${gstRate === rate ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400 hover:border-slate-300'}`}
                >
                  {rate}%
                </button>
              ))}
            </div>
            <div className="mt-4">
              <Input 
                type="number" 
                value={gstRate}
                onChange={(e) => setGstRate(parseFloat(e.target.value) || 0)}
                placeholder="Custom Rate"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-900 dark:bg-slate-950 text-white border-0 flex flex-col justify-center">
          <div className="space-y-6 max-w-xs mx-auto w-full">
            <div className="pb-6 border-b border-slate-800">
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Pre-GST Amount</p>
              <p className="text-3xl font-mono">{currencySymbol} {results.original.toFixed(2)}</p>
            </div>
            
            <div className="pb-6 border-b border-slate-800">
              <p className="text-emerald-400 text-sm font-medium uppercase tracking-wider mb-2">GST Amount ({gstRate}%)</p>
              <p className="text-3xl font-mono">{currencySymbol} {results.gstAmount.toFixed(2)}</p>
            </div>
            
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Post-GST Amount</p>
              <p className="text-4xl font-bold font-mono text-emerald-400">{currencySymbol} {results.netAmount.toFixed(2)}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
