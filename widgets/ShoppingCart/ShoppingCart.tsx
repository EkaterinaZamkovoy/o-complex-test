'use client';

import { useEffect, useState } from 'react';
import styles from './ShoppingCart.module.scss';
import { useSendOrderMutation } from '@/features/products/api';
import { IMaskInput } from 'react-imask';

type Props = {
  cart: Record<number, number>;
  products: { id: number; title: string; price: number }[];
  clearCart: () => void;
};

export const ShoppingCart = ({ cart, products, clearCart }: Props) => {
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState(false);
  const [sendOrder, { isLoading, isSuccess }] = useSendOrderMutation();

  useEffect(() => {
    const saved = localStorage.getItem('phone');
    if (saved) setPhone(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('phone', phone);
  }, [phone]);

  const cartItems = products.filter((p) => cart[p.id]);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * cart[item.id],
    0
  );

  const handleSubmit = async () => {
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 11) {
      setTouched(true);
      return;
    }

    await sendOrder({
      phone: digitsOnly,
      cart: Object.entries(cart).map(([id, quantity]) => ({
        id: Number(id),
        quantity,
      })),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setPhone('');
      localStorage.removeItem('phone');
      clearCart();
    }
  }, [isSuccess]);

  return (
    <div className={styles.cart}>
      <h3 className={styles.title}>Добавленные товары</h3>

      {cartItems.length === 0 && !isSuccess ? (
        <p>Корзина пуста</p>
      ) : (
        <ul className={styles.list}>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} x{cart[item.id]} — {item.price * cart[item.id]} ₽
            </li>
          ))}
        </ul>
      )}

      <div className={styles.controls}>
        <IMaskInput
          mask='+7 (000) 000-00-00'
          value={phone}
          onAccept={(value: string) => setPhone(value)}
          placeholder='+7 (___) ___-__-__'
          className={`${styles.input} ${
            touched && phone.replace(/\D/g, '').length < 11 ? styles.error : ''
          }`}
        />
        <button
          onClick={handleSubmit}
          disabled={
            isLoading ||
            cartItems.length === 0 ||
            phone.replace(/\D/g, '').length < 11
          }
        >
          заказать
        </button>
      </div>

      {isSuccess && cartItems.length === 0 && (
        <div className={styles.success}>Заказ отправлен</div>
      )}
    </div>
  );
};
