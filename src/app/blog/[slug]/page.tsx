import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { blogData } from '@/data/blog';
import { companyConfig } from '@/config/company';
import { contactConfig } from '@/config/contact';
import { seoConfig } from '@/config/seo';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import Link from 'next/link';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// SSG Generation
export function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogData.find((p) => p.slug === resolvedParams.slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  const title = `${post.title} | ${companyConfig.brandName} Blog`;
  
  return {
    title,
    description: post.excerpt,
    alternates: {
      canonical: `${seoConfig.siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description: post.excerpt,
      url: `${seoConfig.siteUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      siteName: companyConfig.brandName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.excerpt,
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = blogData.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Format date
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "datePublished": post.publishedAt,
              "author": {
                "@type": "Organization",
                "name": companyConfig.brandName
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": seoConfig.siteUrl
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blog",
                  "item": `${seoConfig.siteUrl}/blog`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": post.title,
                  "item": `${seoConfig.siteUrl}/blog/${post.slug}`
                }
              ]
            }
          ])
        }}
      />
      
      <SectionContainer className="bg-[#F9FAFB] pt-24 pb-12 border-b border-[#E5E7EB]">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-brand-blue hover:underline mb-6">
            &larr; Back to all articles
          </Link>
          <div className="flex items-center gap-3 text-sm font-medium text-[#6B7280] mb-4">
            <span className="text-brand-blue bg-brand-blue/10 px-2.5 py-0.5 rounded-full">{post.category}</span>
            <span>•</span>
            <time dateTime={post.publishedAt}>{formattedDate}</time>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background-dark leading-[1.1] mb-6 tracking-tight">
            {post.title}
          </h1>
          <p className="text-xl text-[#4B5563] leading-relaxed mb-8">
            {post.excerpt}
          </p>
        </div>
      </SectionContainer>

      <SectionContainer>
        <article className="max-w-3xl mx-auto prose prose-lg prose-blue">
          {/* Simulated rich text content since we don't have markdown files */}
          <div className="w-full aspect-[21/9] bg-[#E5E7EB] rounded-2xl mb-10 flex items-center justify-center overflow-hidden border border-[#D1D5DB]">
             <svg className="w-12 h-12 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
             </svg>
          </div>
          
          <h2>Introduction</h2>
          <p>
            This is a comprehensive guide on {post.title.toLowerCase()}. Proper planning and execution are 
            critical components of any successful logistics operation. Whether you are moving across town 
            or across the country, having the right information can make all the difference.
          </p>

          <h2>Key Considerations</h2>
          <ul>
            <li><strong>Preparation:</strong> Always start your planning at least 4 weeks in advance.</li>
            <li><strong>Documentation:</strong> Keep all important papers, IDs, and transit insurance documents handy.</li>
            <li><strong>Professional Help:</strong> Engage with certified logistics providers who offer tracking.</li>
          </ul>

          <h2>Step-by-Step Approach</h2>
          <p>
            We highly recommend organizing your move by creating an inventory of all items. Use color-coded labels
            for boxes and ensure fragile items are packed with industrial-grade bubble wrap. This simple step
            prevents 90% of transit-related damages.
          </p>

          <blockquote>
            &quot;A successful relocation is 80% planning and 20% execution. Always prioritize secure packing.&quot;
          </blockquote>

          <h2>Conclusion</h2>
          <p>
            By following these guidelines, you can ensure a seamless and stress-free experience. 
            If you need professional assistance, our team is always ready to help.
          </p>
        </article>
        
        {/* CTA Banner at bottom of article */}
        <div className="max-w-3xl mx-auto mt-16 bg-brand-navy rounded-2xl p-8 sm:p-10 text-center flex flex-col items-center">
           <h3 className="text-2xl font-bold text-white mb-3">Ready for a seamless experience?</h3>
           <p className="text-white/70 mb-8 max-w-lg">
             Our expert team handles everything from packing to delivery. Get a free, transparent estimate today.
           </p>
           <PrimaryButton href="/quote">
             Request a Free Quote
           </PrimaryButton>
        </div>
      </SectionContainer>
    </main>
  );
}
