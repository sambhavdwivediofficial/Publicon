import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { voteService } from '../../../services/voteService';
import styles from './AnswerVote.module.css';

export const AnswerVote = ({ answerId, initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState(0); // -1, 0, 1

  const handleVote = async (value) => {
    const newValue = userVote === value ? 0 : value;
    try {
      await voteService.vote('answer', answerId, newValue);
      setVotes(votes - userVote + newValue);
      setUserVote(newValue);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.answerVote}>
      <button
        className={`${styles.voteBtn} ${userVote === 1 ? styles.active : ''}`}
        onClick={() => handleVote(1)}
      >
        <ChevronUp size={20} />
      </button>
      <span>{votes}</span>
      <button
        className={`${styles.voteBtn} ${userVote === -1 ? styles.active : ''}`}
        onClick={() => handleVote(-1)}
      >
        <ChevronDown size={20} />
      </button>
    </div>
  );
};