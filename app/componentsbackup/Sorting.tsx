// components/Sorting.tsx
"use client";

interface SortingProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  className?: string;
}

const Sorting: React.FC<SortingProps> = ({ sortBy, onSortChange, className }) => (
  <div className={className}>
    <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
      <option value="priceAsc">Price: Low to High</option>
      <option value="priceDesc">Price: High to Low</option>
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
    </select>
  </div>
);

export default Sorting;
