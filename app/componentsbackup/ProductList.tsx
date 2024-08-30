// components/ProductList.tsx
"use client";

import styles from '../page.module.css';

interface Product {
  id: number;
  name: string;
  price: number;
  code: string;
  image?: string;
}

interface ProductListProps {
  products: Product[];
  className?: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, className }) => (
  <div className={`${styles.productList} ${className}`}>
    {products.map((product) => (
      <div key={product.id} className={styles.productItem}>
        {product.image && <img src={product.image} alt={product.name} />}
        <h3>{product.name}</h3>
        <p>Price: Rp. {product.price}</p>
        <p>Code: {product.code}</p>
      </div>
    ))}
  </div>
);

export default ProductList;
