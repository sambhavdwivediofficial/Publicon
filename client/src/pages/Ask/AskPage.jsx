import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { QuestionForm } from '../../components/question/QuestionForm/QuestionForm';
import styles from './AskPage.module.css';

const AskPage = () => {
  const [searchParams] = useSearchParams();
  const communityId = searchParams.get('community');

  return (
    <>
      <Helmet><title>Ask a Question · Publicon</title></Helmet>
      <div className={styles.askPage}>
        <h1>Ask a Question</h1>
        <QuestionForm communityId={communityId} />
      </div>
    </>
  );
};

export default AskPage;