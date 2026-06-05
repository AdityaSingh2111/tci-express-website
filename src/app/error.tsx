'use client';

/**
 * error.tsx — Next.js root error boundary
 * Renders for any unhandled runtime error in the app.
 * Must be a Client Component to receive `error` and `reset` props.
 */

import React, { useEffect } from 'react';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to an error tracking service in production.
    // e.g. Sentry.captureException(error);
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">

        {/* Error code */}
        <p className="font-mono text-[5rem] font-extrabold text-brand-red/10 leading-none select-none">
          500
        </p>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mt-2 mb-3 tracking-tight">
          Something went wrong
        </h1>

        {/* Supporting text */}
        <p className="text-[#6B7280] text-base leading-relaxed mb-8">
          An unexpected error occurred. Our team has been notified. Please
          try again or contact support if the issue persists.
        </p>

        {/* Error digest for reporting */}
        {error.digest && (
          <p className="text-xs text-[#9CA3AF] mb-6 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 text-[15px] font-bold text-white bg-brand-blue rounded-xl hover:bg-[#0047B3] transition-colors shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-[15px] font-semibold text-[#374151] rounded-xl border border-[#D1D5DB] bg-white hover:bg-[#F9FAFB] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            Back to Home
          </Link>
        </div>

        {/* Contact fallback */}
        <p className="mt-8 text-sm text-[#9CA3AF]">
          Need help?{' '}
          <Link
            href="/contact"
            className="text-brand-blue hover:underline underline-offset-2 font-medium"
          >
            Contact our support team
          </Link>
        </p>

      </div>
    </main>
  );
}
