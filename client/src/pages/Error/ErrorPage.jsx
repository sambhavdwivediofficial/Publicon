import { useRouteError } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <Helmet><title>Error · Publicon</title></Helmet>
      <div className={styles.errorPage}>
        <h1>Oops!</h1>
        <p>Something went wrong.</p>
        <p>{error.statusText || error.message}</p>
      </div>
    </>
  );
};
export default ErrorPage;