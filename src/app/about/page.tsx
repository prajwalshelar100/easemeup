'use client';

import { Card } from '@/src/components/ui';
import { Github, Twitter, Linkedin, Heart, Coffee, ExternalLink, Code2, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-8 pb-12 max-w-3xl mx-auto">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">About Ease Me Up</h1>
        <p className="text-slate-500 font-medium mt-1">Online Free business management Tool.</p>
      </header>

      {/* App Info */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-900/30">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30 shrink-0">
            <span className="text-white font-black text-xl">E</span>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Ease Me Up</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              A professional, online free business management tool. Generate invoices, manage clients,
              track expenses, and access powerful utilities — all from your browser, with zero backend required.
              Your data stays 100% on your device.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'LocalStorage'].map(tech => (
                <span key={tech} className="px-2.5 py-1 bg-white dark:bg-slate-800 rounded-lg text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Developer Card */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Know the Developer</h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Built with ❤️ by a passionate developer. Connect on socials, contribute to the codebase, or buy me a coffee to fuel more features!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="https://github.com/prajwalshelar100" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all group">
            <Github className="w-5 h-5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            <div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">GitHub</p>
              <p className="text-[10px] text-slate-400">prajwalshelar100</p>
            </div>
          </a>
          <a href="https://prajwalshelar.online" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 transition-all group lg:col-span-1">
            <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            <div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">Portfolio</p>
              <p className="text-[10px] text-slate-400">prajwalshelar.online</p>
            </div>
          </a>
        </div>
      </Card>

      {/* Support */}
      <Card className="p-6 border-amber-100 dark:border-amber-900/30">
        <div className="flex items-center gap-3 mb-5">
          <Coffee className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Support the Project</h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Ease Me Up is 100% free and open-source. Your support helps cover hosting costs and fuels new feature development.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="upi://pay?pa=prajwalshelar100@oksbi&pn=Prajwal%20Shelar&cu=INR&tn=Buy%20me%20a%20coffee" className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/40 hover:shadow-md transition-all group">
            <Coffee className="w-6 h-6 text-amber-600" />
            <div>
              <p className="text-sm font-bold text-amber-800 dark:text-amber-400">Buy me a coffee</p>
              <p className="text-[10px] text-amber-600/70">Support via UPI</p>
            </div>
            <ExternalLink className="w-4 h-4 text-amber-400 ml-auto" />
          </a>
          <a href="upi://pay?pa=prajwalshelar100@oksbi&pn=Prajwal%20Shelar&cu=INR&tn=Support%20EaseMeUp" className="flex items-center gap-3 p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-900/40 hover:shadow-md transition-all group">
            <Heart className="w-6 h-6 text-violet-600" />
            <div>
              <p className="text-sm font-bold text-violet-800 dark:text-violet-400">UPI Support</p>
              <p className="text-xs text-violet-600/70 font-mono mt-0.5">prajwalshelar100@oksbi</p>
            </div>
          </a>
        </div>
      </Card>

      {/* Contribute */}
      <Card className="p-6 border-emerald-100 dark:border-emerald-900/30">
        <div className="flex items-center gap-3 mb-5">
          <Code2 className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Contribute</h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Ease Me Up is open to contributions! Fork the repo, submit PRs, report issues, or suggest features.
          Every contribution, big or small, is appreciated.
        </p>
        <a href="https://github.com/prajwalshelar100/easemeup" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
          <Github className="w-4 h-4" /> View on GitHub <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </Card>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500 pt-4">
        Ease Me Up v1.0.0 • Made with ❤️ • Open Source under MIT License
      </p>
    </div>
  );
}
