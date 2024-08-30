"use client";

interface ItemsPerPageSelectorProps {
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  className?: string; 
}

const ItemsPerPageSelector: React.FC<ItemsPerPageSelectorProps> = ({
  itemsPerPage,
  onItemsPerPageChange,
  className,
}) => (
  <div className={className}>
    <select
      value={itemsPerPage}
      onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
    >
      {[5, 10, 20, 30, 40, 50, 100, 150, 200, 250, 300, 400].map((count) => (
        <option key={count} value={count}>
          {count}
        </option>
      ))}
    </select>
  </div>
);

export default ItemsPerPageSelector;
