import { ProtectedImage } from '../../common/ProtectedMedia/ProtectedImage';
import styles from './PostMedia.module.css';

export const PostMedia = ({ mediaIds }) => {
  if (!mediaIds?.length) return null;
  return (
    <div className={styles.postMedia}>
      {mediaIds.map(id => (
        <ProtectedImage key={id} mediaId={id} alt="" className={styles.image} />
      ))}
    </div>
  );
};