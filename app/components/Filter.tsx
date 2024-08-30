"use client";

import { useState } from "react";

interface FilterProps {
  categories: string[]; // Daftar kategori produk yang tersedia
  selectedCategories: string[]; // Kategori yang saat ini dipilih untuk filter
  className?: string; // Kelas CSS opsional untuk styling tambahan
  onFilterChange: (selectedCategories: string[], minPrice: string, maxPrice: string) => void; // Fungsi callback yang dipanggil saat filter diubah
}

const Filter: React.FC<FilterProps> = ({ categories, selectedCategories, onFilterChange, className }) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>(selectedCategories); // Status kategori yang dipilih
  const [minPrice, setMinPrice] = useState<string>('0'); // Status harga minimum filter
  const [maxPrice, setMaxPrice] = useState<string>('100'); // Status harga maksimum filter

  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand)); // Menghapus kategori jika sudah ada
    } else {
      setSelectedBrands([...selectedBrands, brand]); // Menambahkan kategori jika belum ada
    }
  };

  const handleApplyFilter = () => {
    onFilterChange(selectedBrands, minPrice, maxPrice); // Menerapkan filter dan memanggil callback
  };

  const formatPrice = (value: string) => {
    // Format harga untuk memasukkan titik sebagai pemisah ribuan
    const [integerPart, decimalPart] = value.split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
  };

  const parsePrice = (value: string) => {
    // Mengurai harga menjadi angka
    return parseFloat(value.replace(/\./g, '').replace(',', '.'));
  };

  return (
    <div className={className}>
      <div className="brand">
        <h4>Brand</h4>
        {categories.map((name) => (
          <div key={name}>
            <label>
              <input
                type="checkbox"
                value={name}
                checked={selectedBrands.includes(name)} // Menandai checkbox jika kategori terpilih
                onChange={() => handleBrandChange(name)} // Menangani perubahan checkbox
              />
              {name} {/* Menampilkan nama kategori */}
            </label>
          </div>
        ))}
      </div>

      <div>
        <h4>Harga</h4>
        <label>
          Min:
          <input
            type="text"
            value={formatPrice(minPrice)} // Menampilkan harga minimum yang diformat
            onChange={(e) => setMinPrice(parsePrice(e.target.value).toString())} // Mengubah harga minimum
          />
        </label>
        <label>
          Max:
          <input
            type="text"
            value={formatPrice(maxPrice)} // Menampilkan harga maksimum yang diformat
            onChange={(e) => setMaxPrice(parsePrice(e.target.value).toString())} // Mengubah harga maksimum
          />
        </label>
      </div>

      <button onClick={handleApplyFilter}>Terapkan</button> {/* Tombol untuk menerapkan filter */}
    </div>
  );
};

export default Filter;
