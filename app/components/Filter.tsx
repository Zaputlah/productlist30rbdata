"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css";

interface FilterProps {
  categories: string[];
  selectedCategories: string[];
  onFilterChange: (selectedCategories: string[], minPrice: string, maxPrice: string) => void;
}

const Filter = ({ categories, selectedCategories, onFilterChange }: FilterProps) => {
  const [selectedBrands, setSelectedBrands] = useState(selectedCategories);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => setSelectedBrands(selectedCategories), [selectedCategories]);

  const toggleBrand = (brand: string) => setSelectedBrands((current) => current.includes(brand) ? current.filter((item) => item !== brand) : [...current, brand]);
  const reset = () => { setSelectedBrands([]); setMinPrice(""); setMaxPrice(""); onFilterChange([], "", ""); };
  const formatInput = (value: string) => value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <div className={styles.filterContent}>
      <div className={styles.filterHeading}>
        <div><span>☷</span><h3>Filter produk</h3></div>
        <button type="button" onClick={reset}>Reset</button>
      </div>
      <div className={styles.filterGroup}>
        <h4>Merek</h4>
        <div className={styles.brandOptions}>
          {categories.map((name) => (
            <label key={name} className={styles.checkRow}>
              <input type="checkbox" checked={selectedBrands.includes(name)} onChange={() => toggleBrand(name)} />
              <span className={styles.customCheck}>✓</span><span>{name}</span>
            </label>
          ))}
        </div>
      </div>
      <div className={styles.filterGroup}>
        <h4>Rentang harga</h4>
        <div className={styles.priceInputs}>
          <label><span>Minimum</span><div><b>Rp</b><input inputMode="numeric" placeholder="0" value={minPrice} onChange={(e) => setMinPrice(formatInput(e.target.value))} /></div></label>
          <i>—</i>
          <label><span>Maksimum</span><div><b>Rp</b><input inputMode="numeric" placeholder="100.000" value={maxPrice} onChange={(e) => setMaxPrice(formatInput(e.target.value))} /></div></label>
        </div>
      </div>
      <button className={styles.applyButton} type="button" onClick={() => onFilterChange(selectedBrands, minPrice, maxPrice)}>Terapkan filter <span>→</span></button>
    </div>
  );
};

export default Filter;
