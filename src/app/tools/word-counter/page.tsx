'use client';

import { useState } from 'react';
import { Card, Textarea, Button } from '@/src/components/ui';
import { FileText, Copy, Trash2 } from 'lucide-react';

export default function WordCounterPage() {
  const [text, setText] = useState('');

  const stats = {
    words: text.trim() ? text.trim().split(/\\s+/).length : 0,
    characters: text.length,
    charactersNoSpaces: text.replace(/\\s/g, '').length,
    sentences: text.split(/[.!?]+/).filter(Boolean).length,
    paragraphs: text.split(/\\n+/).filter(Boolean).length,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\\s+/).length : 0) / 200) // Avg 200 words per min
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const clearText = () => {
    if (confirm('Are you sure you want to clear all text?')) {
      setText('');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pt-6">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-xl">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
            Word Counter
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Real-time character, word, and sentence analytics.</p>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: 'Words', value: stats.words, color: 'text-rose-500' },
          { label: 'Characters', value: stats.characters, color: 'text-blue-500' },
          { label: 'Sentences', value: stats.sentences, color: 'text-emerald-500' },
          { label: 'Paragraphs', value: stats.paragraphs, color: 'text-purple-500' },
          { label: 'No Spaces', value: stats.charactersNoSpaces, color: 'text-orange-500' },
          { label: 'Reading Time', value: `${stats.readingTime}m`, color: 'text-slate-500' }
        ].map((stat, idx) => (
          <Card key={idx} className="p-4 text-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{stat.label}</h3>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-1 border-0 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 focus-within:ring-2 focus-within:ring-blue-500 transition-shadow rounded-2xl overflow-hidden bg-white dark:bg-slate-950">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-4 py-2 bg-slate-50 dark:bg-slate-900/50">
          <span className="text-sm font-semibold text-slate-500">Document Editor</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 gap-2 text-xs">
              <Copy className="w-3.5 h-3.5" /> Copy
            </Button>
            <Button variant="ghost" size="sm" onClick={clearText} className="h-8 gap-2 text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30">
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </Button>
          </div>
        </div>
        <Textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here to begin counting..."
          className="min-h-[400px] border-0 focus-visible:ring-0 p-6 text-base resize-y bg-transparent"
        />
      </Card>
    </div>
  );
}
