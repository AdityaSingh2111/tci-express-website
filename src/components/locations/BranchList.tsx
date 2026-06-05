"use client";

import React, { useState } from "react";
import { BranchItem } from "@/types/data.types";
import { TextCTA } from "@/components/shared/TextCTA";
import { SecondaryButton } from "@/components/shared/SecondaryButton";

interface BranchListProps {
  branches: BranchItem[];
}

export function BranchList({ branches }: BranchListProps) {
  const [visibleCount, setVisibleCount] = useState(10);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, branches.length));
  };

  const visibleBranches = branches.slice(0, visibleCount);

  return (
    <div className="max-w-[1200px] mx-auto w-full px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {visibleBranches.map((branch) => (
          <div 
            key={branch.slug} 
            className="bg-white p-5 md:p-6 border border-[#E5E7EB] rounded-[12px] transition-all duration-200 ease-out hover:-translate-y-[2px] hover:border-[#D1D5DB] hover:shadow-md group cursor-pointer flex flex-col"
            onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(branch.name + " " + branch.city)}`, "_blank")}
          >
            <h3 className="text-[17px] md:text-lg font-bold text-[#000000] mb-1 group-hover:text-brand-blue transition-colors line-clamp-1">
              {branch.name}
            </h3>
            <p className="text-[13px] md:text-sm text-[#4B5563] mb-4 line-clamp-2">
              {branch.address || branch.city}
            </p>
            <div className="mt-auto pt-4 border-t border-[#F3F4F6]">
              <TextCTA onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(branch.name + " " + branch.city)}`, "_blank")}>
                View Directions
              </TextCTA>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < branches.length && (
        <div className="mt-10 flex justify-center">
          <SecondaryButton onClick={handleLoadMore}>
            Load More Branches
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </SecondaryButton>
        </div>
      )}
    </div>
  );
}
