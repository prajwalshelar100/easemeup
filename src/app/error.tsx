/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { useEffect } from 'react';
import { Button } from '@/src/components/ui';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">Something went wrong</h1>
        <p className="mb-8 text-neutral-600 dark:text-neutral-400">
          We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={() => reset()} className="w-full sm:w-auto gap-2">
            <RefreshCw className="h-4 w-4" /> Try Again
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
