/**
 * SKELETON LOADERS GUIDE
 * 
 * Use these skeleton loaders for different loading states:
 */

// 1. GRID LAYOUT (Multiple cards)
// Import: import GridSkeleton from "../Skeletons/GridSkeleton";
// Usage:
// if (isLoading) return <GridSkeleton cols={4} rows={4} />;

// 2. CARD SKELETON (Single card)
// Import: import CardSkeleton from "../Skeletons/CardSkeleton";
// Usage:
// if (isLoading) return <CardSkeleton />;

// 3. TABLE SKELETON (Data tables)
// Import: import TableSkeleton from "../Skeletons/TableSkeleton";
// Usage:
// if (isLoading) return <TableSkeleton rows={8} />;

// 4. DETAIL PAGE SKELETON (Full page with main + sidebar)
// Import: import DetailPageSkeleton from "../Skeletons/DetailPageSkeleton";
// Usage:
// if (isLoading) return <DetailPageSkeleton />;

/**
 * EXAMPLE IMPLEMENTATION
 */

import { useQuery } from "@tanstack/react-query";
import GridSkeleton from "../Skeletons/GridSkeleton";
import DetailPageSkeleton from "../Skeletons/DetailPageSkeleton";
import TableSkeleton from "../Skeletons/TableSkeleton";

// For grid/card layouts (like lessons, dashboard home)
const MyComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["my-data"],
    queryFn: async () => {
      // fetch data
    },
  });

  if (isLoading) return <GridSkeleton cols={3} rows={3} />;

  return (
    <div>
      {/* Your content here */}
    </div>
  );
};

// For detail pages (lesson details, user profile)
const DetailComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["lesson-detail"],
    queryFn: async () => {
      // fetch data
    },
  });

  if (isLoading) return <DetailPageSkeleton />;

  return (
    <div>
      {/* Your detail content */}
    </div>
  );
};

// For tables (manage lessons, manage users)
const TableComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["table-data"],
    queryFn: async () => {
      // fetch data
    },
  });

  if (isLoading) return <TableSkeleton rows={8} />;

  return (
    <table>
      {/* Your table */}
    </table>
  );
};

export { MyComponent, DetailComponent, TableComponent };
