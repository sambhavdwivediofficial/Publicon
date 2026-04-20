import styles from './AIAnswerBlock.module.css';

export const AIAnswerBlock = ({ answer }) => {
  return (
    <div className={styles.aiAnswerBlock}>
      <div className={styles.header}>
        <span className={styles.aiBadge}>AI Generated</span>
      </div>
      <div className={styles.summary}>{answer.summary}</div>
      <details>
        <summary>Deep Dive</summary>
        <div className={styles.deepDive}>{answer.deepDive}</div>
      </details>
    </div>
  );
};