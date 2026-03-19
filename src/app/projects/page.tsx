'use client';

import { useBusinessStore, Project } from '@/src/lib/store/useBusinessStore';
import { Card, Button, Input, Label } from '@/src/components/ui';
import { FolderKanban, Plus, Clock, CheckCircle2, MoreHorizontal, Trash2, X } from 'lucide-react';
import { useState } from 'react';

export default function ProjectsPage() {
  const { projects, clients, addProject, deleteProject, updateProject } = useBusinessStore();
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: '',
    clientId: '',
    status: 'ACTIVE',
    progress: 0
  });

  const handleAddProject = () => {
    if (!newProject.name || !newProject.clientId) return;
    
    addProject({
      id: Math.random().toString(36).substring(7),
      name: newProject.name,
      clientId: newProject.clientId,
      status: newProject.status as any,
      progress: Number(newProject.progress) || 0,
      startDate: new Date().toISOString()
    });
    setNewProject({ name: '', clientId: '', status: 'ACTIVE', progress: 0 });
    setShowForm(false);
  };

  const projectList = Object.values(projects);

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Projects
          </h1>
          <p className="text-slate-500 font-medium mt-1">Keep track of your ongoing delivery and milestones.</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="gap-2 rounded-xl shadow-md bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4" /> New Project
        </Button>
      </header>

      {showForm && (
        <Card className="p-6 border-blue-200 dark:border-blue-900 shadow-xl animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Launch New Project</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Project Name</Label>
              <Input 
                placeholder="e.g. Website Redesign" 
                value={newProject.name}
                onChange={(e) => setNewProject({...newProject, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Client</Label>
              <select 
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm font-medium h-10"
                value={newProject.clientId}
                onChange={(e) => setNewProject({...newProject, clientId: e.target.value})}
              >
                <option value="">Select a client</option>
                {Object.values(clients).map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Initial Status</Label>
              <select 
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm font-medium h-10"
                value={newProject.status}
                onChange={(e) => setNewProject({...newProject, status: e.target.value as any})}
              >
                <option value="ACTIVE">Active</option>
                <option value="PAUSED">Paused</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Progress</Label>
                <span className="text-xs font-bold text-blue-600">{newProject.progress}%</span>
              </div>
              <input 
                type="range" 
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                value={newProject.progress}
                onChange={(e) => setNewProject({...newProject, progress: Number(e.target.value)})}
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-3">
             <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
             <Button onClick={handleAddProject} className="bg-blue-600 hover:bg-blue-700">Create Project</Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectList.length === 0 ? (
          <div className="col-span-full h-80 flex flex-col items-center justify-center text-slate-400 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-8">
             <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
               <FolderKanban className="w-8 h-8 opacity-40" />
             </div>
             <p className="font-bold text-slate-900 dark:text-white">Start your first project</p>
             <p className="text-sm mt-1">Track milestones and delivery progress for your clients.</p>
             <Button onClick={() => setShowForm(true)} className="mt-6">Add Project</Button>
          </div>
        ) : (
          projectList.map(project => {
            const client = clients[project.clientId];
            return (
              <Card key={project.id} className="p-6 hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-xl">
                      <FolderKanban className="w-6 h-6" />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-400 hover:text-rose-600"
                      onClick={() => deleteProject(project.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.name}</h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">{client?.name || 'Unknown Client'}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-end text-xs font-bold uppercase tracking-widest">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-blue-600">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    {project.status === 'COMPLETED' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-500" />
                    )}
                    <span className="text-xs font-bold text-slate-500 capitalize">{project.status.toLowerCase()}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600 h-8 font-bold"
                      onClick={() => {
                        const newProg = Math.min(100, project.progress + 10);
                        updateProject(project.id, { 
                          progress: newProg,
                          status: newProg === 100 ? 'COMPLETED' : project.status
                        });
                      }}
                    >
                      +10%
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
