import React from "react";

const GridSkeleton = ({ cols = 4, rows = 4 }) => {
  const gridColsClass = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols} gap-6`;

  return (
    <div className={`pt-28 ${gridColsClass}`} role="status" aria-live="polite">
      {Array.from({ length: rows }).map((_, i) => (
        <article
          key={i}
          className="p-6 rounded-2xl bg-gradient-to-br from-white/3 to-white/2 backdrop-blur-lg border border-white/10 overflow-hidden"
        >
          <div className="animate-pulse">
            {/* Image */}
            <div className="w-full h-44 md:h-48 lg:h-56 rounded-xl bg-gradient-to-r from-white/6 via-white/10 to-white/6 mb-5" />

            {/* Title */}
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-2 w-3/4">
                <div className="h-5 bg-white/10 rounded w-5/6"></div>
                <div className="h-3 bg-white/8 rounded w-2/3"></div>
              </div>
              <div className="h-8 w-20 rounded-lg bg-white/8" />
            </div>

            {/* Tags / excerpt */}
            <div className="mb-5">
              <div className="flex gap-2 mb-3">
                <div className="h-8 w-20 rounded-full bg-white/8"></div>
                <div className="h-8 w-16 rounded-full bg-white/8"></div>
                <div className="h-8 w-12 rounded-full bg-white/8 hidden md:block"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-white/10 rounded w-full"></div>
                <div className="h-3 bg-white/10 rounded w-5/6"></div>
              </div>
            </div>

            {/* Footer (author + meta) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10" />
                <div>
                  <div className="h-3 bg-white/10 rounded w-24 mb-1"></div>
                  <div className="h-2 bg-white/8 rounded w-16"></div>
                </div>
              </div>

              <div className="text-right">
                <div className="h-3 bg-white/8 rounded w-20 mb-2 ml-auto"></div>
                <div className="h-8 w-28 rounded-lg bg-white/8" />
              </div>
            </div>
          </div>

          <span className="sr-only">Loading content</span>
        </article>
      ))}
    </div>
  );
};

export default GridSkeleton;
