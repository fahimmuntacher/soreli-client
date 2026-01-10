import React from "react";

const DetailPageSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      {/* Header skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-12 bg-white/10 rounded-lg w-3/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-white/10 rounded w-5/6"></div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left content (larger) */}
        <div className="lg:col-span-2">
          {/* Image skeleton */}
          <div className="w-full h-96 bg-white/10 rounded-2xl mb-6 animate-pulse"></div>

          {/* Content blocks */}
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-6 bg-white/10 rounded w-1/3 mb-3"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-white/10 rounded w-full"></div>
                  <div className="h-3 bg-white/10 rounded w-full"></div>
                  <div className="h-3 bg-white/10 rounded w-4/5"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 animate-pulse">
            {/* Author card skeleton */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/10"></div>
              <div className="flex-1">
                <div className="h-4 bg-white/10 rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-white/10 rounded w-1/2"></div>
              </div>
            </div>

            {/* Stats skeleton */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="py-3 border-b border-white/10">
                  <div className="h-3 bg-white/10 rounded w-1/3 mb-2"></div>
                  <div className="h-5 bg-white/10 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPageSkeleton;
