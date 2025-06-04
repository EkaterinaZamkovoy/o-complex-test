import { useEffect, useState } from 'react';

type CartMap = Record<number, number>;

export const useCart = () => {
  const [cart, setCart] = useState<CartMap>({});

  // загрузка из localStorage при инициализации
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // сохранение в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: 1 }));
  };

  const removeItem = (id: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
  };

  const changeQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      setCart((prev) => ({ ...prev, [id]: quantity }));
    }
  };

  return {
    cart,
    addItem,
    removeItem,
    changeQuantity,
  };
};
