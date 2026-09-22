"use client";
import styles from "../page.module.css";
interface SortingProps { sortBy: string; onSortChange: (sortBy: string) => void; }
const Sorting = ({ sortBy, onSortChange }: SortingProps) => (
  <label className={styles.sorting}><span>Urutkan:</span><select value={sortBy} onChange={(event) => onSortChange(event.target.value)}><option value="name">Nama A–Z</option><option value="priceAsc">Harga terendah</option><option value="priceDesc">Harga tertinggi</option><option value="newest">Terbaru</option><option value="oldest">Terlama</option></select></label>
);
export default Sorting;
