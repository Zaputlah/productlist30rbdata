"use client";

interface SortingProps {
  sortBy: string; // Menyimpan nilai saat ini dari opsi pengurutan yang dipilih
  onSortChange: (sortBy: string) => void; // Fungsi callback yang dipanggil saat opsi pengurutan berubah
  className?: string; // Kelas CSS opsional untuk styling tambahan
}

const Sorting: React.FC<SortingProps> = ({ sortBy, onSortChange, className }) => (
  <div className={className}>
    <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
      <option value="priceAsc">Price: Low to High</option> {/* Urutkan berdasarkan harga dari rendah ke tinggi */}
      <option value="priceDesc">Price: High to Low</option> {/* Urutkan berdasarkan harga dari tinggi ke rendah */}
      <option value="newest">Newest</option> {/* Urutkan berdasarkan yang terbaru */}
      <option value="oldest">Oldest</option> {/* Urutkan berdasarkan yang terlama */}
    </select>
  </div>
);

export default Sorting;
