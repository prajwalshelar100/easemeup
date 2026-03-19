/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Loading Invoicely...</p>
      </div>
    </div>
  );
}
