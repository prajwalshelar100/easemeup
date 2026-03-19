'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, Button, Input } from '@/src/components/ui';
import { StickyNote, Plus, Trash2, Pin, Check, X, Search } from 'lucide-react';
import { getData, updateData } from '@/src/lib/storage';

interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}

const NOTE_COLORS = [
  'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-900/40',
  'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-900/40',
  'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-900/40',
  'bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-900/40',
  'bg-violet-50 border-violet-200 dark:bg-violet-900/20 dark:border-violet-900/40',
  'bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700',
];

export default function QuickNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = getData<{ list: Note[] }>('quick_notes', { list: [] });
    setNotes(stored.list);
  }, []);

  const save = (updated: Note[]) => {
    updateData('quick_notes', { list: updated });
    setNotes(updated);
  };

  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(36),
      title: '',
      content: '',
      color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
      pinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newNote, ...notes];
    save(updated);
    setEditingId(newNote.id);
    setTimeout(() => titleRef.current?.focus(), 100);
  };

  const updateNote = (id: string, patch: Partial<Note>) => {
    save(notes.map(n => n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n));
  };

  const deleteNote = (id: string) => {
    save(notes.filter(n => n.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const togglePin = (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) updateNote(id, { pinned: !note.pinned });
  };

  const filtered = notes
    .filter(n => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  return (
    <div className="space-y-6 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Quick Notes</h1>
          <p className="text-slate-500 font-medium mt-1">Jot down ideas, reminders, and business scribbles.</p>
        </div>
        <Button 
          onClick={addNote}
          className="h-12 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold gap-2 shadow-lg shadow-blue-500/20 shrink-0"
        >
          <Plus className="w-5 h-5" /> New Note
        </Button>
      </header>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input 
          placeholder="Search notes..." 
          value={searchQuery} 
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl"
        />
      </div>

      {/* Notes Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <StickyNote className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-400 font-bold">No notes yet.</p>
          <p className="text-xs text-slate-500 mt-1 font-medium italic">Click "New Note" to start capturing your ideas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(note => (
            <div
              key={note.id}
              onClick={() => setEditingId(note.id)}
              className={`rounded-xl border p-4 ${note.color} transition-all hover:shadow-md group relative cursor-pointer`}
            >
              {note.pinned && (
                <Pin className="absolute top-3 right-3 w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              )}
              
              {editingId === note.id ? (
                <div className="space-y-3" onClick={e => e.stopPropagation()}>
                  <input
                    ref={titleRef}
                    className="w-full bg-transparent text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none border-b border-slate-200 dark:border-slate-700 pb-2"
                    placeholder="Note title..."
                    value={note.title}
                    onChange={e => updateNote(note.id, { title: e.target.value })}
                  />
                  <textarea
                    className="w-full bg-transparent text-sm text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none resize-none min-h-[100px]"
                    placeholder="Write your note..."
                    value={note.content}
                    onChange={e => updateNote(note.id, { content: e.target.value })}
                    rows={4}
                  />
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex gap-1">
                      <button onClick={() => togglePin(note.id)} className="p-1.5 rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors">
                        <Pin className={`w-3.5 h-3.5 ${note.pinned ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
                      </button>
                      <button onClick={() => deleteNote(note.id)} className="p-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors text-slate-400 hover:text-rose-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors text-emerald-600">
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                    {note.title || 'Untitled Note'}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {note.content || 'Empty note — click to edit.'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-3 font-medium">
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
