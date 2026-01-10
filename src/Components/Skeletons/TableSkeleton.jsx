import React from "react";

const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            {[1, 2, 3, 4, 5].map((i) => (
              <th key={i} className="px-4 py-3 text-left">
                <div className="h-4 bg-white/10 rounded w-20 animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array(rows)
            .fill(0)
            .map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-white/10">
                {[1, 2, 3, 4, 5].map((colIndex) => (
                  <td key={colIndex} className="px-4 py-4">
                    <div className="h-3 bg-white/10 rounded w-32 animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
