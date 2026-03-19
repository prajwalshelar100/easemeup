'use client';

import { useState } from 'react';
import { Card, Textarea, Button } from '@/src/components/ui';
import { Type, Copy, Trash2 } from 'lucide-react';

export default function CaseConverterPage() {
  const [text, setText] = useState('');

  const transforms = {
    uppercase: () => setText(text.toUpperCase()),
    lowercase: () => setText(text.toLowerCase()),
    titleCase: () => setText(text.toLowerCase().replace(/(?:^|\\s|-|\\.|_)\\w/g, match => match.toUpperCase())),
    sentenceCase: () => setText(text.toLowerCase().replace(/(^|[.?!]\\s+)([a-z])/g, match => match.toUpperCase())),
    camelCase: () => setText(text.replace(/(?:^\\w|[A-Z]|\\b\\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\\s+/g, '')),
    snakeCase: () => setText(text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || ''),
    pascalCase: () => setText(text.replace(/(?:^\\w|[A-Z]|\\b\\w)/g, (word) => word.toUpperCase()).replace(/\\s+/g, '')),
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pt-6">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
          <Type className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
            Case Converter
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Quickly transform text blocks between different case formats.</p>
        </div>
      </header>

      <Card className="p-1 border-0 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-shadow rounded-2xl overflow-hidden bg-white dark:bg-slate-950">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 p-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={transforms.uppercase}>UPPERCASE</Button>
            <Button variant="outline" size="sm" onClick={transforms.lowercase}>lowercase</Button>
            <Button variant="outline" size="sm" onClick={transforms.titleCase}>Title Case</Button>
            <Button variant="outline" size="sm" onClick={transforms.sentenceCase}>Sentence case</Button>
            <Button variant="outline" size="sm" onClick={transforms.camelCase}>camelCase</Button>
            <Button variant="outline" size="sm" onClick={transforms.pascalCase}>PascalCase</Button>
            <Button variant="outline" size="sm" onClick={transforms.snakeCase}>snake_case</Button>
          </div>
        </div>

        <Textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text to convert..."
          className="min-h-[400px] border-0 focus-visible:ring-0 p-6 text-base resize-y bg-transparent"
        />

        <div className="flex items-center justify-end border-t border-slate-100 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900/50 gap-2">
          <Button variant="ghost" onClick={() => setText('')} className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30">
            <Trash2 className="w-4 h-4 mr-2" /> Clear
          </Button>
          <Button onClick={copyToClipboard} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
            <Copy className="w-4 h-4 mr-2" /> Copy Result
          </Button>
        </div>
      </Card>
    </div>
  );
}
