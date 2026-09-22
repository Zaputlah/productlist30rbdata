"use client";

import type { Product } from "../page";
import styles from "../page.module.css";

const ArrowIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const getPrice = (price: Product["price"]) => typeof price === "string" ? Number(price.replace(/\./g, "").replace(",", ".")) : price;

const ProductList = ({ products }: { products: Product[] }) => (
  <div className={styles.productGrid}>
    {products.map((product) => (
      <article key={product.id} className={styles.productItem}>
        <div className={styles.imageWrap}>
          {product.image ? <img src={product.image} alt={`Produk ${product.name}`} loading="lazy" /> : <span>{product.name.charAt(0)}</span>}
          <span className={styles.stockBadge}>Produk pilihan</span>
        </div>
        <div className={styles.productInfo}>
          <div className={styles.productMeta}><span>{product.code}</span></div>
          <h3>{product.name}</h3>
          <p className={styles.productType}>Perkakas & perlengkapan profesional</p>
          <div className={styles.cardFooter}>
            <div><small>Mulai dari</small><strong>Rp{getPrice(product.price).toLocaleString("id-ID")}</strong></div>
            <button type="button" aria-label={`Lihat produk ${product.name}`}><ArrowIcon /></button>
          </div>
        </div>
      </article>
    ))}
  </div>
);

export default ProductList;
