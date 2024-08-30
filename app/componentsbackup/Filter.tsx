// components/Filter.tsx
"use client";

import { useState } from "react";

interface FilterProps {
  categories: string[];
  selectedCategories: string[];
  className?: string;
  onFilterChange: (selectedCategories: string[], minPrice: string, maxPrice: string) => void;
}

const Filter: React.FC<FilterProps> = ({ categories, selectedCategories, onFilterChange, className }) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>(selectedCategories);
  const [minPrice, setMinPrice] = useState<string>('0');
  const [maxPrice, setMaxPrice] = useState<string>('100');

  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleApplyFilter = () => {
    onFilterChange(selectedBrands, minPrice, maxPrice);
  };

  const formatPrice = (value: string) => {
    // Format price to include dots as thousand separators
    const [integerPart, decimalPart] = value.split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
  };

  const parsePrice = (value: string) => {
    // Parse the price to a number
    return parseFloat(value.replace(/\./g, '').replace(',', '.'));
  };

  return (
    <div className={className}>
      <h3>Filter</h3>

      <div>
        <h4>Brand</h4>
        {categories.map((name) => (
          <div key={name}>
            <label>
              <input
                type="checkbox"
                value={name}
                checked={selectedBrands.includes(name)}
                onChange={() => handleBrandChange(name)}
              />
              {name}
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
            value={formatPrice(minPrice)}
            onChange={(e) => setMinPrice(parsePrice(e.target.value).toString())}
          />
        </label>
        <label>
          Max:
          <input
            type="text"
            value={formatPrice(maxPrice)}
            onChange={(e) => setMaxPrice(parsePrice(e.target.value).toString())}
          />
        </label>
      </div>

      <button onClick={handleApplyFilter}>Terapkan</button>
    </div>
  );
};

export default Filter;
