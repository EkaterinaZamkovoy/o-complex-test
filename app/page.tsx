import styles from './page.module.css';
import { ProductsGallery, ShoppingCart } from '@/widgets';
import { ReviewsList } from '@/widgets/ReviewsList/ReviewsList';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ReviewsList />
        <ProductsGallery />
      </main>
    </div>
  );
}
