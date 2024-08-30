"use client";

interface ItemsPerPageSelectorProps {
  itemsPerPage: number; // Jumlah item per halaman saat ini
  onItemsPerPageChange: (itemsPerPage: number) => void; // Fungsi callback yang dipanggil saat jumlah item per halaman berubah
  className?: string; // Kelas CSS opsional untuk styling tambahan
}

const ItemsPerPageSelector: React.FC<ItemsPerPageSelectorProps> = ({
  itemsPerPage,
  onItemsPerPageChange,
  className,
}) => (
  <div className={className}>
    <select
      value={itemsPerPage}
      onChange={(e) => onItemsPerPageChange(Number(e.target.value))} // Mengubah jumlah item per halaman
    >
      {[5, 10, 20, 30, 40, 50, 100, 150, 200, 250, 300, 400].map((count) => (
        <option key={count} value={count}>
          {count} {/* Menampilkan opsi jumlah item per halaman */}
        </option>
      ))}
    </select>
  </div>
);

export default ItemsPerPageSelector;
