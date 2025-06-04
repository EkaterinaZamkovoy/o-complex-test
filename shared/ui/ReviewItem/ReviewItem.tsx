import DOMPurify from 'dompurify';
import styles from './ReviewItem.module.scss';

type Props = {
  html: string;
};

export const ReviewItem = ({ html }: Props) => {
  const safeHTML = DOMPurify.sanitize(html); // защита от XSS

  return (
    <div
      className={styles.review}
      dangerouslySetInnerHTML={{ __html: safeHTML }}
    />
  );
};
