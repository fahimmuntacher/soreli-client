import React from "react";
import GridSkeleton from "../Skeletons/GridSkeleton";

const Loading = ({ type = "grid", cols = 4, rows = 4 }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-10">
      <div className="max-w-7xl mx-auto px-5">
        <GridSkeleton cols={cols} rows={rows} />
      </div>
    </div>
  );
};

export default Loading;
