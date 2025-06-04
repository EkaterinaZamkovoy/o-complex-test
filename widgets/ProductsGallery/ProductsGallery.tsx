'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ProductsGallery.module.scss';
import { useLazyGetProductsQuery } from '@/features/products/api';
import { ProductCard, useCart } from '@/shared';

export const ProductsGallery = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { cart, addItem, removeItem, changeQuantity } = useCart();
  const [fetchProducts, { data, isFetching }] = useLazyGetProductsQuery();
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchProducts({ page, pageSize: 20 });
  }, [page]);

  useEffect(() => {
    if (data?.items?.length) {
      setProducts((prev) => [...prev, ...data.items]);
      if (data.items.length < 20) setHasMore(false);
    }
  }, [data]);

  useEffect(() => {
    if (!hasMore || isFetching) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 1,
      }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, isFetching]);

  return (
    <div className={styles.grid}>
      {products.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
          quantity={cart[item.id] || 0}
          onAdd={() => addItem(item.id)}
          onRemove={() => removeItem(item.id)}
          onChangeQuantity={(value) => changeQuantity(item.id, value)}
        />
      ))}

      {hasMore && (
        <div ref={observerRef} className={styles.loader}>
          Загрузка...
        </div>
      )}
    </div>
  );
};
