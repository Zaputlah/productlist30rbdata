"use client";
import styles from "../page.module.css";
interface PaginationProps { currentPage: number; totalPages: number; onPageChange: (page: number) => void; }
const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from(new Set([1, currentPage - 1, currentPage, currentPage + 1, totalPages])).filter((page) => page > 0 && page <= totalPages).sort((a, b) => a - b);
  return <nav className={styles.pagination} aria-label="Navigasi halaman"><button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="Halaman sebelumnya">‹</button>{pages.map((page, index) => <span key={page} className={styles.pageItem}>{index > 0 && page - pages[index - 1] > 1 && <i>…</i>}<button className={page === currentPage ? styles.activePage : ""} onClick={() => onPageChange(page)}>{page}</button></span>)}<button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Halaman berikutnya">›</button></nav>;
};
export default Pagination;
