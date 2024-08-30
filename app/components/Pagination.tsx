"use client";

import styles from '../page.module.css';

interface PaginationProps {
  currentPage: number; // Halaman saat ini yang ditampilkan
  totalPages: number; // Total jumlah halaman
  onPageChange: (page: number) => void; // Fungsi callback yang dipanggil saat pengguna berpindah halaman
  className?: string; // Kelas CSS opsional untuk styling tambahan
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, className }) => (
  <div className={`${styles.pagination} ${className}`}>
    <button 
      onClick={() => onPageChange(currentPage - 1)} 
      disabled={currentPage === 1} // Nonaktifkan tombol jika sudah di halaman pertama
      className={styles.button}
    >
      Previous
    </button>
    <span>Page {currentPage} of {totalPages}</span> {/* Menampilkan halaman saat ini dan total halaman */}
    <button 
      onClick={() => onPageChange(currentPage + 1)} 
      disabled={currentPage === totalPages} // Nonaktifkan tombol jika sudah di halaman terakhir
      className={styles.button}
    >
      Next
    </button>
  </div>
);

export default Pagination;
