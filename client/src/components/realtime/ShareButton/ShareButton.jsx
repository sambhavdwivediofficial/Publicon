import { Share2 } from 'lucide-react';
import { shareService } from '../../../services/shareService';
import styles from './ShareButton.module.css';

export const ShareButton = ({ targetType, targetId }) => {
  const handleShare = async () => {
    const url = `${window.location.origin}/${targetType}s/${targetId}`;
    if (navigator.share) {
      await navigator.share({ url });
      shareService.share(targetType, targetId, 'native');
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied!');
      shareService.share(targetType, targetId, 'copy');
    }
  };

  return (
    <button className={styles.shareButton} onClick={handleShare}>
      <Share2 size={18} />
    </button>
  );
};