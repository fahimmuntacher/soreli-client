import React from "react";

const GridSkeleton = ({ cols = 4, rows = 4 }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols} gap-6`}>
      {Array(rows)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 animate-pulse"
          >
            {/* Image placeholder */}
            <div className="w-full h-40 rounded-lg bg-white/10 mb-4"></div>

            {/* Title placeholder */}
            <div className="h-5 bg-white/10 rounded mb-3 w-3/4"></div>

            {/* Description placeholder */}
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-white/10 rounded w-full"></div>
              <div className="h-3 bg-white/10 rounded w-4/5"></div>
            </div>

            {/* Button placeholder */}
            <div className="h-10 bg-white/10 rounded-lg w-full"></div>
          </div>
        ))}
    </div>
  );
};

export default GridSkeleton;
