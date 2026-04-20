import { useState } from 'react';
import { Button } from '../../common/Button/Button';
import { answerService } from '../../../services/answerService';
import styles from './AnswerEditor.module.css';

export const AnswerEditor = ({ questionId, onSuccess }) => {
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await answerService.create(questionId, body);
      setBody('');
      onSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.answerEditor}>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your answer..."
        rows={6}
        required
      />
      <Button type="submit" isLoading={submitting}>Post Answer</Button>
    </form>
  );
};