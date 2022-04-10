import styles from './index.module.css';

/* eslint-disable-next-line */
export interface ArticleProps {}

export function Article(props: ArticleProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Article!</h1>
    </div>
  );
}

export default Article;
