'use client';

import { Card } from '@/src/components/ui';
import { 
  Wrench, Link as LinkIcon, QrCode, Calculator, 
  Percent, FileText, Type, MessageSquarePlus 
} from 'lucide-react';
import Link from 'next/link';

export default function ToolsHubPage() {
  const categories = [
    {
      name: 'Utility Tools',
      tools: [
        { name: 'URL Shortener', desc: 'Create compact links', icon: LinkIcon, href: '/tools/url-shortener', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' },
        { name: 'QR Generator', desc: 'Generate scannable codes', icon: QrCode, href: '/tools/qr-generator', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400' },
      ]
    },
    {
      name: 'Finance & Math',
      tools: [
        { name: 'GST Calculator', desc: 'Compute Indian tax', icon: Calculator, href: '/tools/gst-calculator', color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400' },
        { name: 'Percentage Calc', desc: 'Quick ratio math', icon: Percent, href: '/tools/percentage-calculator', color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400' },
      ]
    },
    {
      name: 'Text Utilities',
      tools: [
        { name: 'Word Counter', desc: 'Count characters & words', icon: FileText, href: '/tools/word-counter', color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400' },
        { name: 'Case Converter', desc: 'Change text formats', icon: Type, href: '/tools/case-converter', color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400' },
      ]
    }
  ];

  return (
    <div className="w-full max-w-5xl space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-xl text-slate-600 dark:text-slate-400">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
              Business Tools Hub
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-1">A collection of free utilities to optimize your workflow.</p>
          </div>
        </div>

        <Link href="/request-tool" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors">
          <MessageSquarePlus className="w-4 h-4" />
          Request a Tool
        </Link>
      </header>

      <div className="space-y-8">
        {categories.map((category) => (
          <section key={category.name} className="space-y-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-2 border-l-2 border-slate-200 dark:border-slate-800">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.tools.map((tool) => (
                <Link key={tool.name} href={tool.href}>
                  <Card className="p-5 flex items-start gap-4 hover:border-blue-200 hover:shadow-md dark:hover:border-blue-900/50 transition-all cursor-pointer group">
                    <div className={`p-3 rounded-xl ${tool.color}`}>
                      <tool.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{tool.desc}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
