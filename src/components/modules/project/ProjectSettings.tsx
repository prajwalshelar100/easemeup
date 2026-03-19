'use client';

import { useFormContext } from 'react-hook-form';
import { DocumentFormValues } from '@/src/lib/schemas';
import { Card, Label, Textarea } from '@/src/components/ui';

export const ProjectSettings = () => {
  const { register, watch } = useFormContext<DocumentFormValues>();
  const documentType = watch('documentType');

  if (documentType !== 'PROPOSAL' && documentType !== 'QUOTATION') {
    return null; // Only applicable to Proposals and Quotations
  }

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Project Details</h3>
        <p className="text-sm text-slate-500">Define the scope, timeline, and terms of the project.</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="mb-1.5 block">Scope of Work</Label>
          <Textarea 
            {...register('scopeOfWork')} 
            placeholder="Describe the deliverables, constraints, and specific goals of this engagement..."
            className="min-h-[120px]"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label className="mb-1.5 block">Project Timeline</Label>
            <Textarea 
              {...register('projectTimeline')} 
              placeholder="e.g. Phase 1: 2 Weeks, Phase 2: 4 Weeks"
              className="min-h-[80px]"
            />
          </div>
          <div>
            <Label className="mb-1.5 block">Terms & Conditions</Label>
            <Textarea 
              {...register('termsAndConditions')} 
              placeholder="Standard contract terms, revisions limits, or specific agreements..."
              className="min-h-[120px]"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
