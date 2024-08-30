"use client";

import styles from '../page.module.css';

interface Product {
  id: number; // ID unik untuk setiap produk
  name: string; // Nama produk
  price: number; // Harga produk
  code: string; // Kode produk
  image?: string; // URL gambar produk (opsional)
}

interface ProductListProps {
  products: Product[]; // Daftar produk yang akan ditampilkan
  className?: string; // Kelas CSS opsional untuk styling tambahan
}

const ProductList: React.FC<ProductListProps> = ({ products, className }) => (
  <div className={`${styles.productList} ${className}`}>
    {products.map((product) => (
      <div key={product.id} className={styles.productItem}>
        {product.image && <img src={product.image} alt={product.name} />} {/* Menampilkan gambar jika ada */}
        <h3>{product.name}</h3> {/* Menampilkan nama produk */}
        <p>Price: Rp{product.price}</p> {/* Menampilkan harga produk */}
        <p>Code: {product.code}</p> {/* Menampilkan kode produk */}
      </div>
    ))}
  </div>
);

export default ProductList;
