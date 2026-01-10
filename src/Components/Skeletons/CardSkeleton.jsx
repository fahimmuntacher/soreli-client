import React from "react";

const CardSkeleton = () => {
  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-48 rounded-xl bg-white/10 mb-4"></div>
      
      {/* Title placeholder */}
      <div className="h-5 bg-white/10 rounded mb-3 w-3/4"></div>
      
      {/* Text placeholder lines */}
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-white/10 rounded w-full"></div>
        <div className="h-3 bg-white/10 rounded w-5/6"></div>
      </div>
      
      {/* Author/footer placeholder */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <div className="w-10 h-10 rounded-full bg-white/10"></div>
        <div className="flex-1">
          <div className="h-3 bg-white/10 rounded w-1/2 mb-2"></div>
          <div className="h-2 bg-white/10 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
