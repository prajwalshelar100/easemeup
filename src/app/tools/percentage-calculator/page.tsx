'use client';

import { useState } from 'react';
import { Card, Input, Label } from '@/src/components/ui';
import { Percent } from 'lucide-react';

export default function PercentageCalculatorPage() {
  // Scenario 1: What is X% of Y?
  const [s1X, setS1X] = useState<number | ''>(20);
  const [s1Y, setS1Y] = useState<number | ''>(150);

  // Scenario 2: X is what percent of Y?
  const [s2X, setS2X] = useState<number | ''>(30);
  const [s2Y, setS2Y] = useState<number | ''>(150);

  // Scenario 3: Percentage increase/decrease
  const [s3X, setS3X] = useState<number | ''>(100);
  const [s3Y, setS3Y] = useState<number | ''>(150);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pt-6">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-xl">
          <Percent className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
            Percentage Calculator
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Quickly solve various percentage formulas.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scenario 1 */}
        <Card className="p-6">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">What is X% of Y?</h2>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[100px]">
              <Input type="number" value={s1X} onChange={(e) => setS1X(e.target.value ? parseFloat(e.target.value) : '')} placeholder="X" />
            </div>
            <span className="font-semibold text-slate-400">% of</span>
            <div className="flex-1 min-w-[100px]">
              <Input type="number" value={s1Y} onChange={(e) => setS1Y(e.target.value ? parseFloat(e.target.value) : '')} placeholder="Y" />
            </div>
          </div>
          <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 rounded-lg text-lg font-bold text-center">
            {typeof s1X === 'number' && typeof s1Y === 'number' ? ((s1X / 100) * s1Y).toFixed(2) : '-'}
          </div>
        </Card>

        {/* Scenario 2 */}
        <Card className="p-6">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">X is what percent of Y?</h2>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[100px]">
              <Input type="number" value={s2X} onChange={(e) => setS2X(e.target.value ? parseFloat(e.target.value) : '')} placeholder="X" />
            </div>
            <span className="font-semibold text-slate-400">is what % of</span>
            <div className="flex-1 min-w-[100px]">
              <Input type="number" value={s2Y} onChange={(e) => setS2Y(e.target.value ? parseFloat(e.target.value) : '')} placeholder="Y" />
            </div>
          </div>
          <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 rounded-lg text-lg font-bold text-center">
            {typeof s2X === 'number' && typeof s2Y === 'number' && s2Y !== 0 ? ((s2X / s2Y) * 100).toFixed(2) + '%' : '-'}
          </div>
        </Card>

        {/* Scenario 3 */}
        <Card className="p-6 md:col-span-2">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Percentage Increase/Decrease</h2>
          <div className="flex items-center gap-4 flex-wrap">
             <span className="font-semibold text-slate-400 w-full md:w-auto">From</span>
            <div className="flex-1 min-w-[120px]">
               <Label className="sr-only">Initial Value</Label>
              <Input type="number" value={s3X} onChange={(e) => setS3X(e.target.value ? parseFloat(e.target.value) : '')} placeholder="Initial Value" />
            </div>
            <span className="font-semibold text-slate-400 w-full md:w-auto mt-2 md:mt-0">To</span>
            <div className="flex-1 min-w-[120px]">
              <Label className="sr-only">Final Value</Label>
              <Input type="number" value={s3Y} onChange={(e) => setS3Y(e.target.value ? parseFloat(e.target.value) : '')} placeholder="Final Value" />
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center">
            {typeof s3X === 'number' && typeof s3Y === 'number' && s3X !== 0 ? (() => {
               const diff = s3Y - s3X;
               const per = (diff / s3X) * 100;
               const isIncrease = diff >= 0;
               return (
                 <div className={`p-6 w-full max-w-sm rounded-xl text-center ${isIncrease ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                   <p className="text-sm font-medium uppercase tracking-wider mb-2">{isIncrease ? 'Increase' : 'Decrease'} of</p>
                   <p className="text-4xl font-bold">{Math.abs(per).toFixed(2)}%</p>
                 </div>
               )
            })() : (
               <div className="p-6 w-full max-w-sm rounded-xl text-center shadow-sm border border-slate-100 dark:border-slate-800 text-slate-400">
                  Awaiting Input
               </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
