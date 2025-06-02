import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../shared/styles/globals.scss';
import { RootProvider } from '@/shared/providers';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Тестовый магазин — Покупай легко',
  description:
    'Интернет-магазин с отзывами и удобной корзиной. Выбирайте товары, добавляйте в корзину, оформляйте заказ — всё просто и понятно.',
  keywords: [
    'интернет-магазин',
    'купить онлайн',
    'товары с отзывами',
    'оформление заказа',
    'доставка',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.variable}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
