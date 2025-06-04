'use client';


import { ReviewItem } from '@/shared';
import styles from './ReviewsList.module.scss';
import { useGetReviewsQuery } from '@/features/reviews/api';

export const ReviewsList = () => {
  const { data, isLoading, error } = useGetReviewsQuery();

  if (isLoading) return <div>Загрузка отзывов...</div>;
  if (error) return <div>Ошибка при загрузке</div>;

  return (
    <div className={styles.list}>
      {data?.map((review) => (
        <ReviewItem key={review.id} html={review.text} />
      ))}
    </div>
  );
};
