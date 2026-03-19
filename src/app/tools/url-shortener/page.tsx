'use client';

import { useState, useEffect } from 'react';
import { Card, Input, Button, Label } from '@/src/components/ui';
import { Link2, Copy, Trash2, ArrowRight } from 'lucide-react';
import { saveData, getData } from '@/src/lib/storage';

interface ShortenedUrl {
  id: string;
  original: string;
  shortened: string;
  createdAt: string;
}

export default function UrlShortenerPage() {
  const [url, setUrl] = useState('');
  const [history, setHistory] = useState<ShortenedUrl[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = getData<ShortenedUrl[]>('tools_url_history', []);
    setHistory(saved);
  }, []);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || isLoading) return;
    
    // Validate basic URL
    const isValidUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;

    setIsLoading(true);
    try {
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(isValidUrl)}`);
      if (!response.ok) throw new Error('Failed to shorten URL');
      const shortUrl = await response.text();

      const newEntry: ShortenedUrl = {
        id: `url_${Date.now()}`,
        original: isValidUrl,
        shortened: shortUrl,
        createdAt: new Date().toISOString()
      };

      const newHistory = [newEntry, ...history].slice(0, 10); // Keep last 10
      setHistory(newHistory);
      saveData('tools_url_history', newHistory);
      setUrl('');
    } catch (error) {
      console.error(error);
      alert('Failed to shorten URL. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const deleteEntry = (id: string) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    saveData('tools_url_history', updated);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pt-6">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl">
          <Link2 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
            URL Shortener
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Create concise, shareable links instantly.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5">
          <Card className="p-6">
            <form onSubmit={handleShorten} className="space-y-4">
              <div>
                <Label className="mb-2 block">Destination URL</Label>
                <Input 
                  placeholder="https://very-long-url.com/some/path..." 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full gap-2 text-sm" disabled={isLoading}>
                {isLoading ? 'Shortening...' : <>Shorten Link <ArrowRight className="w-4 h-4" /></>}
              </Button>
            </form>
          </Card>
        </div>

        <div className="md:col-span-7">
          <Card className="p-6 min-h-[400px]">
            <h2 className="text-lg font-bold mb-4">Recent Links</h2>
            {history.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-slate-400 text-sm border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                No links shortened yet.
              </div>
            ) : (
              <div className="space-y-3">
                {history.map(item => (
                  <div key={item.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between group">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-blue-600 dark:text-blue-400 text-sm flex items-center gap-2">
                        {item.shortened}
                      </p>
                      <p className="text-xs text-slate-500 truncate mt-1">
                        {item.original}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(item.shortened)} className="h-8 gap-2 px-3 text-xs">
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteEntry(item.id)} className="h-8 w-8 text-slate-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
