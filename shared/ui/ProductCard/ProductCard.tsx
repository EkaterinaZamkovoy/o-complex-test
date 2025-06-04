import { useState } from 'react';
import styles from './ProductCard.module.scss';

type Product = {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
};

type Props = {
  product: Product;
  quantity?: number;
  onAdd: () => void;
  onRemove: () => void;
  onChangeQuantity: (value: number) => void;
};

export const ProductCard = ({
  product,
  quantity = 0,
  onAdd,
  onRemove,
  onChangeQuantity,
}: Props) => {
  const [inputValue, setInputValue] = useState(quantity.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
      onChangeQuantity(Number(value || 0));
    }
  };

  const handleBlur = () => {
    if (inputValue === '' || Number(inputValue) === 0) {
      onRemove();
    }
  };

  return (
    <div className={styles.card}>
      <img
        src={product.image_url}
        alt={product.title}
        className={styles.image}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>Цена: {product.price} ₽</p>

        {quantity === 0 ? (
          <button
            className={styles.buyButton}
            onClick={() => {
              setInputValue('1');
              onAdd();
            }}
          >
            Купить
          </button>
        ) : (
          <div className={styles.counter}>
            <button
              onClick={() => {
                const newVal = Number(inputValue) - 1;
                setInputValue(newVal.toString());
                onChangeQuantity(newVal);
              }}
            >
              -
            </button>
            <input
              type='text'
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            <button
              onClick={() => {
                const newVal = Number(inputValue) + 1;
                setInputValue(newVal.toString());
                onChangeQuantity(newVal);
              }}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
