'use client';

import { useState, useEffect } from 'react';
import { Card, Input, Label, Button } from '@/src/components/ui';
import { Settings2, Save, Upload, Building2, Coins, Moon, Sun, ArrowUpRight } from 'lucide-react';
import { getData, updateData } from '@/src/lib/storage';
import { useTheme } from '@/src/components/providers/ThemeProvider';

interface AppSettings {
  businessName: string;
  currency: string;
  logoUrl: string;
  theme: 'light' | 'dark' | 'system';
}

const defaultSettings: AppSettings = {
  businessName: 'My Awesome Business',
  currency: 'USD ($)',
  logoUrl: '',
  theme: 'system',
};

export default function SettingsPage() {
  const { setTheme } = useTheme();
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [savedStatus, setSavedStatus] = useState(false);

  // Load settings on mount
  useEffect(() => {
    const stored = getData<AppSettings>('app_settings', defaultSettings);
    setSettings(stored);
  }, []);

  const handleSave = () => {
    updateData('app_settings', settings);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({ ...settings, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      <header className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-xl text-blue-600 dark:text-blue-400">
          <Settings2 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
            Global Settings
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Configure your Ease Me Up workspace</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Settings Form */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-slate-400" />
              Business Profile
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Business Name</Label>
                <Input 
                  value={settings.businessName} 
                  onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                  placeholder="e.g. Acme Corporation"
                />
              </div>

              <div className="space-y-2">
                <Label>Base Currency</Label>
                <select 
                  value={settings.currency} 
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                >
                  {[
                    'USD ($)', 'EUR (€)', 'GBP (£)', 'INR (₹)', 'JPY (¥)', 
                    'AUD ($)', 'CAD ($)', 'SGD ($)', 'AED (د.إ)', 'CNY (¥)',
                    'BRL (R$)', 'ZAR (R)', 'MXN ($)'
                  ].map(curr => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-500 font-medium">This symbol will be used across all reports and dashboards.</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Label>Brand Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-900 overflow-hidden">
                    {settings.logoUrl ? (
                      <img src={settings.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <Upload className="w-6 h-6 text-slate-300" />
                    )}
                  </div>
                  <div>
                    <Label htmlFor="logo-upload" className="cursor-pointer">
                      <div className="inline-flex items-center justify-center h-9 px-4 rounded-xl text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 transition">
                        Upload Image
                      </div>
                    </Label>
                    <input 
                      id="logo-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleLogoUpload}
                    />
                    <p className="text-xs text-slate-500 mt-2">Recommended: 256x256px PNG or JPG.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Moon className="w-5 h-5 text-slate-400" />
              Appearance Theme
            </h2>
            <div className="flex gap-4">
              {['light', 'dark', 'system'].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    const newTheme = t as 'light' | 'dark' | 'system';
                    setSettings({ ...settings, theme: newTheme });
                    setTheme(newTheme);
                  }}
                  className={`flex-1 h-12 rounded-xl border-2 text-sm font-medium capitalize transition-all ${
                    settings.theme === t
                      ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-900/10">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-800 dark:text-blue-300">
              🛡️ Data Privacy & Persistence
            </h2>
            <div className="space-y-3 text-sm text-blue-700 dark:text-blue-400 leading-relaxed font-medium">
              <p>Ease Me Up is a <strong>Private-First</strong> tool. All your data is stored directly in your browser's local storage.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>No data is uploaded to any server.</li>
                <li>Your data is consistent on <strong>this device and browser only</strong>.</li>
                <li>Clearing browser history/cache may delete your business data.</li>
                <li>Use the <strong>Export CSV</strong> feature on the Dashboard to backup your records.</li>
              </ul>
            </div>
          </Card>

          <div className="flex justify-end pt-4">
            <Button size="lg" onClick={handleSave} className="min-w-[140px] gap-2">
              <Save className="w-4 h-4" />
              {savedStatus ? 'Saved!' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {/* Sidebar Preview Component & Socials */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white border-0">
             <div className="flex items-start gap-4 mb-8">
               <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center p-1 overflow-hidden">
                 {settings.logoUrl ? (
                    <img src={settings.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                  ) : (
                    <Building2 className="w-6 h-6 text-white" />
                  )}
               </div>
               <div>
                 <h3 className="font-bold opacity-90 text-sm">Preview</h3>
                 <p className="font-semibold text-lg leading-tight mt-1">{settings.businessName || 'Your Business'}</p>
               </div>
             </div>
             
             <div className="space-y-4">
               <div>
                 <p className="text-blue-200 text-xs font-medium uppercase tracking-wider mb-1">Currency Format</p>
                 <p className="font-mono text-xl">{settings.currency.match(/\\((.*)\\)/)?.[1] || '$'} 1,234.00</p>
               </div>
               <div>
                 <p className="text-blue-200 text-xs font-medium uppercase tracking-wider mb-1">Active Theme</p>
                 <p className="capitalize font-medium">{settings.theme}</p>
               </div>
             </div>
          </Card>

          <Card className="p-6 border-blue-100 dark:border-slate-800">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Know the Developer</h3>
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-blue-600">
                 DB
               </div>
                <div>
                  <p className="text-center text-xs text-slate-400 dark:text-slate-500 pt-4">
        Ease Me Up v1.0.0 • Made with ❤️ by <a href="https://prajwalshelar100.github.io/" target="_blank" className="hover:text-blue-600 transition-colors">Prajwal Shelar</a> • MIT License
      </p>
                </div>
            </div>
            
            <div className="space-y-3">
              {[
                { name: 'GitHub', icon: '🐙', url: 'https://github.com' },
                { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
              ].map(social => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-300 transition-colors"
                >
                  <span className="text-sm font-bold flex items-center gap-2">
                    {social.icon} {social.name}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 italic">Support this open source project</p>
               <Button className="w-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-black rounded-xl gap-2 h-11 shadow-sm shadow-amber-200" onClick={() => window.open('https://prajwalshelar100.github.io/', '_blank')}>
                 ☕ Support Developer
               </Button>
                <p className="text-[10px] text-slate-500 mt-3 font-medium">UPI: prajwalshelar100@oksbi</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
