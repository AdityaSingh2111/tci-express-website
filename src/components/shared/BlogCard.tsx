import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types/data.types';

interface BlogCardProps {
  post: BlogPost;
}

/**
 * BlogCard
 * Design system §22 Blog: clean card grid, large typography titles,
 * minimal metadata. No cluttered tags or excess excerpt text.
 * Card design §11: white bg, 1px border-gray, no shadow default,
 * border darkens + shadow-card on hover. No scale/lift.
 *
 * Accessibility: entire card is clickable via pseudo-element overlay.
 * The <article> semantic element correctly represents a blog entry.
 */
export function BlogCard({ post }: BlogCardProps) {
  const imageSrc = post.imageSrc ?? `/images/blog/${post.slug}.svg`;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-IN', {
    day:   'numeric',
    month: 'short',
    year:  'numeric',
  });

  return (
    <article
      className={
        'group relative bg-white rounded-[8px] border border-[#E5E7EB] overflow-hidden ' +
        'transition-[border-color,box-shadow] duration-[150ms] ease-out ' +
        'hover:border-[#D1D5DB] hover:[box-shadow:0_1px_3px_rgba(0,0,0,0.05)]'
      }
    >
      {/* Thumbnail */}
      <div className="relative w-full h-48 bg-[#F9FAFB] overflow-hidden">
        <Image
          src={imageSrc}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Metadata row */}
        <div className="flex items-center gap-2 text-xs text-[#4B5563] mb-3">
          <span className="font-medium text-brand-blue">{post.category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.publishedAt}>{formattedDate}</time>
        </div>

        {/* Title — H3 per SEO hierarchy §7.1 */}
        <h3 className="text-base font-semibold text-[#000000] leading-snug mb-2 group-hover:text-brand-blue transition-colors duration-[150ms]">
          <Link
            href={`/blog/${post.slug}`}
            aria-label={`Read article: ${post.title}`}
            className="focus-visible:outline-2 focus-visible:outline-brand-blue rounded-sm"
          >
            {/* Full-card overlay for clickability */}
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="text-xs text-[#4B5563] line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </div>
    </article>
  );
}
