'use client';

import { useState, useEffect } from 'react';
import { Card, Input, Label, Button } from '@/src/components/ui';
import { Plus, Receipt, Trash2, TrendingDown, Clock, X } from 'lucide-react';
import { getData, updateData } from '@/src/lib/storage';

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
}

export default function ExpenseTrackerPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('Software');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const stored = getData<{ list: Expense[] }>('business_expenses', { list: [] });
    setExpenses(stored.list);
    
    const settings = getData<any>('app_settings', { currency: 'USD ($)' });
    const match = settings.currency.match(/\((.*)\)/);
    setCurrencySymbol(match ? match[1] : settings.currency || '$');
  }, []);

  const saveExpenses = (newList: Expense[]) => {
    updateData('business_expenses', { list: newList });
    setExpenses(newList);
  };

  const handleAdd = () => {
    if (!description || !amount) return;
    const newExpense: Expense = {
      id: Math.random().toString(36).substring(7),
      date,
      category,
      description,
      amount: parseFloat(amount)
    };
    saveExpenses([newExpense, ...expenses]);
    setDescription('');
    setAmount('');
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    saveExpenses(expenses.filter(e => e.id !== id));
  };

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Expenses</h1>
          <p className="text-slate-500 font-medium mt-1">Monitor outgoings and manage your business costs.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-2xl border border-rose-100 dark:border-rose-900/30 flex items-center gap-3">
             <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
               <TrendingDown className="w-5 h-5 text-rose-600" />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-rose-600">Total Spent</p>
               <p className="text-xl font-black text-slate-900 dark:text-white">{currencySymbol}{totalSpent.toLocaleString()}</p>
             </div>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="h-14 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold gap-2 shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-5 h-5" /> Log Expense
          </Button>
        </div>
      </header>

      {showForm && (
        <Card className="p-6 border-blue-200 dark:border-blue-900 shadow-xl animate-in fade-in slide-in-from-top-4">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold">New Expense Entry</h2>
             <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
               <X className="w-5 h-5" />
             </Button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <select 
                  className="w-full h-10 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  {['Software', 'Marketing', 'Hardware', 'Travel', 'Salaries', 'Rent', 'Tax', 'Misc'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Description</Label>
                <Input placeholder="What did you pay for?" value={description} onChange={e => setDescription(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Amount ({currencySymbol})</Label>
                <Input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
              </div>
              <div className="flex items-end md:col-span-3">
                 <Button onClick={handleAdd} className="w-full bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-xl font-bold h-10">
                   Add Log Record
                 </Button>
              </div>
           </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {expenses.length === 0 ? (
          <div className="py-24 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
             <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
               <Receipt className="w-8 h-8 text-slate-300" />
             </div>
             <p className="text-slate-400 font-bold">No expenses logged yet.</p>
             <p className="text-xs text-slate-500 mt-1 font-medium italic">Start tracking your business spendings to optimize growth.</p>
             <Button onClick={() => setShowForm(true)} variant="outline" className="mt-8 rounded-xl border-slate-200">
               Click to Start Tracking
             </Button>
          </div>
        ) : (
          expenses.map(expense => (
            <Card key={expense.id} className="p-5 flex justify-between items-center group hover:border-rose-400 transition-all bg-white dark:bg-slate-900 border-slate-100 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-600 transition-colors rounded-xl">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                   <div className="flex items-center gap-2">
                     <h3 className="font-bold text-slate-900 dark:text-white text-sm">{expense.description}</h3>
                     <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">
                       {expense.category}
                     </span>
                   </div>
                   <p className="text-xs text-slate-400 font-medium mt-1">{new Date(expense.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                 <p className="font-black text-slate-900 dark:text-white text-lg">
                   {currencySymbol}{expense.amount.toLocaleString()}
                 </p>
                 <Button 
                   variant="ghost" 
                   size="icon" 
                   className="h-8 w-8 text-slate-300 hover:text-rose-600 transition-colors"
                   onClick={() => handleDelete(expense.id)}
                 >
                   <Trash2 className="w-4 h-4" />
                 </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
