"use client";

import React, { useState } from "react";
import { BranchItem } from "@/types/data.types";

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
            className="bg-white p-4 md:p-5 border border-[#E5E7EB] rounded-xl shadow-sm hover:border-[#0052CC] hover:shadow-md transition-all group cursor-pointer flex flex-col"
            onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(branch.name + " " + branch.city)}`, "_blank")}
          >
            <h3 className="text-[17px] md:text-lg font-bold text-[#000000] mb-1 group-hover:text-[#0052CC] transition-colors line-clamp-1">
              {branch.name}
            </h3>
            <p className="text-[13px] md:text-sm text-[#4B5563] mb-4 line-clamp-2">
              {branch.address || branch.city}
            </p>
            <div className="mt-auto pt-3 border-t border-[#F3F4F6]">
              <span className="text-[#0052CC] text-[13px] md:text-sm font-semibold flex items-center group-hover:underline">
                View Directions
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < branches.length && (
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleLoadMore}
            className="px-5 py-2.5 md:px-6 md:py-2.5 bg-white border border-[#D1D5DB] hover:border-[#0052CC] hover:bg-[#F9FAFB] text-[#000000] text-sm md:text-[15px] font-medium rounded-lg transition-colors flex items-center shadow-sm"
          >
            Load More Branches
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
