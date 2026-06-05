import React from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { BlogCard } from '../shared/BlogCard';
import { SecondaryButton } from '../shared/SecondaryButton';
import { blogData } from '@/data/blog';

/**
 * BlogPreview
 * Source: 05-homepage-content-blueprint.md §19
 * 
 * Layout:
 * - Desktop: 3-column grid
 * - Mobile: Single-column stack
 * Server Component. Uses BlogCard.
 */
export function BlogPreview() {
  return (
    <SectionContainer className="bg-[#F9FAFB] border-t border-[#E5E7EB]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div className="max-w-2xl">
          <SectionHeader 
            title="Insights & Logistics Guides" 
            subtitle="Expert advice, packing tips, and industry news to help you move smarter."
            alignment="left"
            theme="light"
          />
        </div>
        <div className="shrink-0 mb-4 md:mb-0">
          <SecondaryButton href="/blog">
            View All Articles
          </SecondaryButton>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogData.slice(0, 3).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </SectionContainer>
  );
}
