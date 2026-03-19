'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card, Button, Input, Label, Textarea } from '@/src/components/ui';
import { ArrowRight, Code, Cpu, LineChart, Globe, Zap, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function RequirementsPage() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe-PLACEHOLDER/formResponse";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    try {
      const formData = new FormData(e.currentTarget);
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });
      // no-cors always returns an opaque response, so we assume success if no network error
      setSubmitStatus('success');
      e.currentTarget.reset();
    } catch (error) {
      console.error('Submission failed', error);
      setSubmitStatus('error');
    }
  };

  const services = [
    {
      title: "Custom Automation Pipelines",
      description: "Replace manual spreadsheet workflows with fully automated digital pipelines tailored for structural engineering and fabrications.",
      icon: Cpu
    },
    {
      title: "Analytics Dashboards",
      description: "Real-time visualization of production lines, sensor data, and inventory metrics directly mapped to your operational footprint.",
      icon: LineChart
    },
    {
      title: "Industrial SaaS Solutions",
      description: "Full-stack cloud applications designed to run safely and consistently inside heavy-machinery and factory floor environments.",
      icon: Globe
    },
    {
      title: "API & System Integration",
      description: "Seamlessly connect legacy ERPs (like Tally) with modern CRMs or cloud infrastructure without losing structural integrity.",
      icon: Code
    }
  ];

  return (
    <main className="container max-w-6xl mx-auto p-4 md:p-8 flex flex-col min-h-screen pb-24 md:pb-8 border-none">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-blue-900 text-white p-8 md:p-12 lg:p-16 mb-8 md:mb-12 shadow-xl shadow-blue-900/20">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Zap className="w-64 h-64 text-white" />
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-blue-50">
            Digital & Industrial Solutions
          </h1>
          <p className="text-base md:text-xl text-blue-200/90 leading-relaxed mb-8 max-w-2xl">
            I build custom digital systems for engineering and industrial businesses. From automation pipelines to complex analytics dashboards, my focus is operational speed and precision. Tell us what you need.
          </p>
          <div className="w-full mt-8 bg-white/5 md:bg-white/10 p-4 md:p-6 rounded-2xl border border-white/10 shadow-inner backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">Request a Consultation</h3>
            
            {submitStatus === 'success' ? (
              <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-300" />
                </div>
                <h4 className="text-lg font-bold text-emerald-100 mb-2">Request Received!</h4>
                <p className="text-emerald-200/80 text-sm">We've got your requirements and will be in touch shortly.</p>
                <Button variant="secondary" className="mt-6 w-full md:w-auto" onClick={() => setSubmitStatus('idle')}>
                  Send Another Request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitStatus === 'error' && (
                  <div className="bg-red-500/20 border border-red-500/30 text-red-200 p-3 rounded-lg text-sm mb-4">
                    Something went wrong. Please try again.
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-blue-100">Name *</Label>
                    <Input 
                      required 
                      name="entry.1000000" // IMPORTANT: Replace with actual Google Form entry ID
                      placeholder="Your Name" 
                      className="bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 focus:border-white/40 focus:ring-white/20" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-blue-100">Email *</Label>
                    <Input 
                      required 
                      type="email" 
                      name="entry.1000001" // IMPORTANT: Replace with actual Google Form entry ID
                      placeholder="you@company.com" 
                      className="bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 focus:border-white/40 focus:ring-white/20" 
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <Label className="text-blue-100">Project Requirements *</Label>
                  <Textarea 
                    required 
                    name="entry.1000002" // IMPORTANT: Replace with actual Google Form entry ID
                    placeholder="Tell us about the digital or industrial solution you need..." 
                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 focus:border-white/40 focus:ring-white/20 min-h-[120px]" 
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={submitStatus === 'loading'}
                  className="w-full bg-white text-blue-900 hover:bg-blue-50 font-bold h-12"
                >
                  {submitStatus === 'loading' ? 'Sending...' : 'Submit Requirements'}
                  {!submitStatus && <Zap className="w-4 h-4 ml-2" />}
                </Button>
                
                <p className="text-xs text-blue-200/60 text-center mt-4">
                  Note: You need to configure the exact Google Form ID and Entry IDs in the code for this form to capture data.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Our Expertise</h2>
        <p className="text-neutral-500 text-sm md:text-base">We specialize in turning complex industrial workflows into simple, scalable digital tools.</p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 mb-12">
        {services.map((service, index) => (
          <Card key={index} className="p-6 md:p-8 flex flex-col justify-between hover:border-blue-300 transition-colors shadow-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 group">
            <div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform dark:bg-blue-900/30">
                <service.icon className="w-6 h-6 md:w-7 md:h-7 text-blue-700 dark:text-blue-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 group-hover:text-blue-700 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                {service.description}
              </p>
            </div>
            
            <Link href="https://wa.me/919987909499" target="_blank" className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 w-max">
              Discuss this service
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Card>
        ))}
      </div>

      {/* Collaboration Model */}
      <div className="bg-neutral-50 dark:bg-neutral-900 rounded-3xl p-6 md:p-10 border border-neutral-200 dark:border-neutral-800">
        <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">Collaboration Model</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Strategy', desc: 'Needs analysis & scope' },
            { step: '02', title: 'Prototype', desc: 'UX wireframes & architecture' },
            { step: '03', title: 'Build', desc: 'Full-stack agile development' },
            { step: '04', title: 'Scale', desc: 'Optimization & maintenance' },
          ].map((phase, i) => (
             <div key={i} className="text-center md:text-left relative">
               <div className="text-4xl md:text-5xl font-black text-neutral-200 dark:text-neutral-800 mb-2 md:mb-4">{phase.step}</div>
               <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-1">{phase.title}</h4>
               <p className="text-sm text-neutral-500">{phase.desc}</p>
             </div>
          ))}
        </div>
      </div>
    </main>
  );
}
