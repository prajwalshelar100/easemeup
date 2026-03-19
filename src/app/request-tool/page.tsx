'use client';

import { Card, Button } from '@/src/components/ui';
import { Wrench, Briefcase, MessageCircle, ArrowRight } from 'lucide-react';

export default function RequestHubPage() {

  const PHONE = '919987909499';

  const TOOL_FORM = `https://wa.me/${PHONE}?text=${encodeURIComponent('Tool Requirement')}`;
  const SERVICE_FORM = `https://wa.me/${PHONE}?text=${encodeURIComponent('Service Requirement')}`;
  const FEEDBACK_FORM = `https://wa.me/${PHONE}?text=${encodeURIComponent('Feedback')}`;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-16">

      {/* HERO */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Build Anything Your Business Needs 🚀
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          From tools to full-scale business systems — we design, develop and deliver
          custom digital solutions tailored for startups, MSMEs, and industrial businesses.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button onClick={() => window.open(TOOL_FORM, '_blank')}>
            Request a Tool
          </Button>
          <Button variant="secondary" onClick={() => window.open(SERVICE_FORM, '_blank')}>
            Request a Service
          </Button>
          <Button variant="outline" onClick={() => window.open(FEEDBACK_FORM, '_blank')}>
            Give Feedback
          </Button>
        </div>
      </section>

      {/* SERVICES */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Our Services</h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Card className="p-6 space-y-3">
            <h3 className="font-bold text-lg">🌐 Web Development</h3>
            <p className="text-sm text-slate-600">
              SEO-optimized websites, landing pages, business sites, and fast web apps using Next.js.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <h3 className="font-bold text-lg">💻 Software Development</h3>
            <p className="text-sm text-slate-600">
              Custom desktop apps, enterprise software, and scalable backend systems.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <h3 className="font-bold text-lg">📱 Mobile Applications</h3>
            <p className="text-sm text-slate-600">
              Android & cross-platform mobile apps tailored for your business.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <h3 className="font-bold text-lg">🤖 AI Tools & Automation</h3>
            <p className="text-sm text-slate-600">
              AI-powered tools, chatbots, workflow automation, and smart systems.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <h3 className="font-bold text-lg">📊 ERP & Business Systems</h3>
            <p className="text-sm text-slate-600">
              Invoice systems, CRM, dashboards, and complete ERP solutions.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <h3 className="font-bold text-lg">🏭 Industrial Solutions</h3>
            <p className="text-sm text-slate-600">
              Custom software for factories, operations, tracking, and business optimization.
            </p>
          </Card>

        </div>
      </section>

      {/* CTA CARDS */}
      <section className="grid md:grid-cols-3 gap-6">

        {/* TOOL */}
        <Card className="p-8 text-center space-y-4 hover:shadow-lg transition">
          <Wrench className="w-10 h-10 mx-auto text-blue-500" />
          <h3 className="text-xl font-bold">Request a Tool</h3>
          <p className="text-sm text-slate-600">
            Need a custom calculator, generator, or utility? Tell us what you need.
          </p>
          <Button
            className="w-full"
            onClick={() => window.open(TOOL_FORM, '_blank')}
          >
            Submit Tool Request <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Card>

        {/* SERVICE */}
        <Card className="p-8 text-center space-y-4 hover:shadow-lg transition">
          <Briefcase className="w-10 h-10 mx-auto text-green-500" />
          <h3 className="text-xl font-bold">Request a Service</h3>
          <p className="text-sm text-slate-600">
            Need a website, app, ERP, or full solution? Let’s build it.
          </p>
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => window.open(SERVICE_FORM, '_blank')}
          >
            Contact Us <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Card>

        {/* FEEDBACK */}
        <Card className="p-8 text-center space-y-4 hover:shadow-lg transition">
          <MessageCircle className="w-10 h-10 mx-auto text-purple-500" />
          <h3 className="text-xl font-bold">Feedback</h3>
          <p className="text-sm text-slate-600">
            Help us improve our tools and services with your feedback.
          </p>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => window.open(FEEDBACK_FORM, '_blank')}
          >
            Give Feedback <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Card>

      </section>

      {/* TRUST SECTION */}
      <section className="text-center pt-10">
        <p className="text-slate-500">
          Trusted by startups, developers, and businesses for building scalable digital solutions.
        </p>
      </section>

    </div>
  );
}