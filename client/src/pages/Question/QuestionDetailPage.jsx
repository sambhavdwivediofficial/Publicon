import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { questionService } from '../../services/questionService';
import { answerService } from '../../services/answerService';
import { QuestionCard } from '../../components/question/QuestionCard/QuestionCard';
import { AnswerCard } from '../../components/answer/AnswerCard/AnswerCard';
import { AnswerEditor } from '../../components/answer/AnswerEditor/AnswerEditor';
import styles from './QuestionDetailPage.module.css';

const QuestionDetailPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  const fetchAnswers = () => {
    answerService.list(id).then(res => setAnswers(res.data));
  };

  useEffect(() => {
    questionService.get(id).then(setQuestion);
    fetchAnswers();
  }, [id]);

  if (!question) return null;

  return (
    <>
      <Helmet><title>{question.title} · Publicon</title></Helmet>
      <div className={styles.page}>
        <QuestionCard question={question} />
        <AnswerEditor questionId={id} onSuccess={fetchAnswers} />
        {answers.map(a => <AnswerCard key={a.id} answer={a} />)}
      </div>
    </>
  );
};

export default QuestionDetailPage;