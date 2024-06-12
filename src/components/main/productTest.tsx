"use client";

// src/app/products/page.tsx
import { useEffect, useState } from "react";
import { fetchProducts } from "../../utils/productAPI";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData: Product[] = await fetchProducts();
        if (Array.isArray(productsData)) {
          setProducts(productsData);
        } else {
          throw new Error("Products data is not an array");
        }
      } catch (error) {
        setError((error as Error).message);
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} -{" "}
              <div className="relative w-64 h-64"> {/* Atur ukuran dan posisi di sini */}
                <Image
                  fill
                  src={product.image}
                  alt={product.name}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
