"use client";

import { useEffect, useMemo, useState } from "react";
import Filter from "./components/Filter";
import ItemsPerPageSelector from "./components/ItemsPerPageSelector";
import Pagination from "./components/Pagination";
import ProductList from "./components/ProductList";
import Sorting from "./components/Sorting";
import styles from "./page.module.css";

export interface Product {
  id: number;
  name: string;
  price: number | string;
  code: string;
  image?: string;
}

const getPrice = (price: Product["price"]) =>
  typeof price === "string" ? Number(price.replace(/\./g, "").replace(",", ".")) : price;

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.7-3.7" /></svg>
);

const BagIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l1 12H5L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>
);

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Number.POSITIVE_INFINITY);
  const [sortBy, setSortBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products10data");
        if (!res.ok) throw new Error("Gagal mengambil data produk");
        setProducts(await res.json());
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.name))).sort(),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return products
      .filter((product) => selectedCategories.length === 0 || selectedCategories.includes(product.name))
      .filter((product) => getPrice(product.price) >= minPrice && getPrice(product.price) <= maxPrice)
      .filter((product) => !query || product.name.toLowerCase().includes(query) || product.code.toLowerCase().includes(query))
      .sort((a, b) => {
        if (sortBy === "priceAsc") return getPrice(a.price) - getPrice(b.price);
        if (sortBy === "priceDesc") return getPrice(b.price) - getPrice(a.price);
        if (sortBy === "newest") return b.id - a.id;
        if (sortBy === "oldest") return a.id - b.id;
        return a.name.localeCompare(b.name);
      });
  }, [products, selectedCategories, minPrice, maxPrice, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const startItem = filteredProducts.length ? startIndex + 1 : 0;
  const endItem = Math.min(startIndex + itemsPerPage, filteredProducts.length);

  const applyFilter = (categories: string[], min: string, max: string) => {
    setSelectedCategories(categories);
    setMinPrice(Number(min.replace(/\D/g, "")) || 0);
    setMaxPrice(Number(max.replace(/\D/g, "")) || Number.POSITIVE_INFINITY);
    setCurrentPage(1);
  };

  return (
    <main className={styles.main}>
      <header className={styles.navbar}>
        <a className={styles.brand} href="#" aria-label="Bengkel Mart">
          <span className={styles.brandMark}><BagIcon /></span>
          <span>Bengkel<span>Mart</span></span>
        </a>
        <div className={styles.navBadge}><span /> Katalog produk selalu diperbarui</div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Belanja kebutuhan proyek jadi mudah</span>
          <h1>Peralatan terbaik.<br /><em>Hasil kerja maksimal.</em></h1>
          <p>Temukan perkakas dan perlengkapan pilihan untuk setiap pekerjaan, dari merek yang sudah Anda percaya.</p>
        </div>
        <div className={styles.heroStat}>
          <strong>{products.length ? `${products.length.toLocaleString("id-ID")}+` : "30K+"}</strong>
          <span>Produk pilihan<br />untuk setiap proyek</span>
        </div>
      </section>

      <section className={styles.catalog}>
        <div className={styles.catalogTitle}>
          <div><span className={styles.sectionLabel}>Katalog produk</span><h2>Temukan yang Anda butuhkan</h2></div>
          <label className={styles.searchBox}>
            <SearchIcon />
            <input type="search" placeholder="Cari merek atau kode produk..." value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setCurrentPage(1); }} />
            <kbd>⌘ K</kbd>
          </label>
        </div>

        <div className={styles.filterAndList}>
          <aside className={styles.filter}>
            <Filter categories={categories} selectedCategories={selectedCategories} onFilterChange={applyFilter} />
          </aside>

          <div className={styles.productArea}>
            <div className={styles.productListHeader}>
              <p>Menampilkan <strong>{startItem}–{endItem}</strong> dari <strong>{filteredProducts.length.toLocaleString("id-ID")}</strong> produk</p>
              <Sorting sortBy={sortBy} onSortChange={(value) => { setSortBy(value); setCurrentPage(1); }} />
            </div>

            {loading ? (
              <div className={styles.status}><span className={styles.loader} /><h3>Menyiapkan katalog...</h3></div>
            ) : error ? (
              <div className={styles.status}><h3>Oops, katalog belum dapat dimuat.</h3><p>{error}</p></div>
            ) : displayedProducts.length === 0 ? (
              <div className={styles.status}><h3>Produk tidak ditemukan</h3><p>Coba ubah kata pencarian atau filter harga Anda.</p></div>
            ) : <ProductList products={displayedProducts} />}

            {!loading && !error && filteredProducts.length > 0 && (
              <div className={styles.itemsPerPageAndPagination}>
                <ItemsPerPageSelector itemsPerPage={itemsPerPage} onItemsPerPageChange={(value) => { setItemsPerPage(value); setCurrentPage(1); }} />
                <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div><span className={styles.brandMark}><BagIcon /></span><strong>BengkelMart</strong></div>
        <p>Perkakas tepat untuk pekerjaan hebat.</p>
      </footer>
    </main>
  );
}
