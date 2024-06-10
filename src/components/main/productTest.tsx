"use client";

import React, { useEffect, useState } from 'react';
import productAPI from '../../services/productAPI';

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]); // Inisialisasi dengan array kosong

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productAPI.getAllProducts();
        console.log('Fetched Products:', data); // Log ini masih bisa dipertahankan untuk debugging
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product: any) => (
            <li key={product.id}>{product.name}</li>
          ))
        ) : (
          <li>No products found</li>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
