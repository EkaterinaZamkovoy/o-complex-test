import Image from 'next/image';
import styles from './page.module.css';
import { ProductsGallery } from '@/widgets';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ProductsGallery></ProductsGallery>
      </main>
    </div>
  );
}
