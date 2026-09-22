"use client";
import styles from "../page.module.css";
interface Props { itemsPerPage: number; onItemsPerPageChange: (value: number) => void; }
const ItemsPerPageSelector = ({ itemsPerPage, onItemsPerPageChange }: Props) => <label className={styles.perPage}>Tampilkan <select value={itemsPerPage} onChange={(event) => onItemsPerPageChange(Number(event.target.value))}>{[8, 12, 24, 48].map((count) => <option key={count} value={count}>{count}</option>)}</select> per halaman</label>;
export default ItemsPerPageSelector;
