"use client";

import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import ItemsPerPageSelector from "./components/ItemsPerPageSelector";
import Pagination from "./components/Pagination";
import ProductList from "./components/ProductList";
import Sorting from "./components/Sorting";
import styles from "./page.module.css";

interface Product {
  id: number;
  name: string;
  price: number;
  code: string;
  image?: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000.000);
  const [sortBy, setSortBy] = useState<string>("name");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        // Mengambil data produk dari API (3 opsi disediakan)
        // const res = await fetch("/api/mongoproducts");
        // const res = await fetch("/api/mongoproductsData10");
        const res = await fetch("/api/products10data");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setProducts(data);
        setCategories(Array.from(new Set(data.map((product: Product) => product.name))));
      } catch (error: any) {
        setError(error.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const parsePrice = (priceString: string): number => {
    return parseFloat(priceString.replace(/\./g, '').replace(',', '.'));
  };

  const handleFilterChange = debounce((selectedCategories: string[], minPriceString: string, maxPriceString: string) => {
    const validMinPrice = parsePrice(minPriceString) || 0;
    const validMaxPrice = parsePrice(maxPriceString) || 1000.000;
    
    setSelectedCategories(selectedCategories);
    setMinPrice(validMinPrice);
    setMaxPrice(validMaxPrice);
    setCurrentPage(1); 
  }, 300);

  useEffect(() => {
    let filtered = products;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.name)
      );
    }

    if (minPrice) {
      filtered = filtered.filter((product) => product.price >= minPrice);
    }

    if (maxPrice) {
      filtered = filtered.filter((product) => product.price <= maxPrice);
    }

    if (sortBy === "priceAsc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => b.id - a.id);
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => a.id - b.id);
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    console.log("Filtered and Sorted Products:", filtered); 
    setFilteredProducts(filtered);
  }, [products, selectedCategories, minPrice, maxPrice, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredProducts.length);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChangeWrapper = (selectedCategories: string[], minPrice: string, maxPrice: string) => {
    handleFilterChange(selectedCategories, minPrice, maxPrice);
  };

  return (
    <main className={styles.main}>
      <div className={styles.filterAndList}>
        <aside className={styles.filter}>
          <Filter 
            categories={categories} 
            selectedCategories={selectedCategories} 
            onFilterChange={handleFilterChangeWrapper} 
            className={styles.filterAndprice} 
          />
        </aside>
        <section className={styles.productList}>
          <div className={styles.productListHeader}>
            <p>
              Menampilkan {startItem}-{endItem} dari {filteredProducts.length} produk
            </p>
            <Sorting sortBy={sortBy} onSortChange={setSortBy} className={styles.sortings} />
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <ProductList products={displayedProducts} className={styles.product} />
          )}
          <div className={styles.itemsPerPageAndPagination}>
            <ItemsPerPageSelector 
              itemsPerPage={itemsPerPage} 
              onItemsPerPageChange={setItemsPerPage}
            />
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
              className={styles.pagination}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
