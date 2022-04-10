import { GetStaticProps } from 'next';
import styles from './index.module.css';

/* eslint-disable-next-line */
export interface AboutProps {
  name: string;
}

export const getStaticProps: GetStaticProps<AboutProps> = async (context) => {
  return {
    props: {
      name: 'Mir',
    },
  };
};

export function About(props: AboutProps) {
  return (
    <div className={styles['container']}>
      <h1>Hey {props.name}.</h1>
    </div>
  );
}

export default About;
