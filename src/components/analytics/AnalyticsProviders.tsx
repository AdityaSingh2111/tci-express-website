'use client';

/**
 * AnalyticsProviders.tsx
 *
 * Injects Google Analytics 4, Google Tag Manager, and Microsoft Clarity
 * into the document <head> / <body> non-blockingly.
 *
 * Usage: render once inside RootLayout <body>.
 *
 * Environment variables required (set in .env.local / Vercel dashboard):
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID   e.g. G-XXXXXXXXXX
 *   NEXT_PUBLIC_GTM_ID              e.g. GTM-XXXXXXX
 *   NEXT_PUBLIC_CLARITY_ID          e.g. xxxxxxxx
 *
 * Any missing variable gracefully disables that provider.
 */

import Script from 'next/script';
import { GA_ID, GTM_ID, CLARITY_ID } from '@/lib/analytics';

export function AnalyticsProviders() {
  return (
    <>
      {/* ── Google Tag Manager ──────────────────────────────────────────── */}
      {GTM_ID && (
        <>
          {/* GTM script injected in <head> with afterInteractive to avoid render blocking */}
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        </>
      )}

      {/* ── Google Analytics 4 (direct, if GTM is not used) ─────────────── */}
      {GA_ID && !GTM_ID && (
        <>
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `,
            }}
          />
        </>
      )}

      {/* ── Microsoft Clarity ───────────────────────────────────────────── */}
      {CLARITY_ID && (
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","${CLARITY_ID}");`,
          }}
        />
      )}
    </>
  );
}
