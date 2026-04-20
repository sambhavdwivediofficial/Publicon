import { useForm } from 'react-hook-form';
import { Button } from '../../common/Button/Button';
import { postService } from '../../../services/postService';
import styles from './PostEditor.module.css';

export const PostEditor = ({ communityId, onSuccess }) => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await postService.create({ ...data, communityId });
      onSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.postEditor}>
      <input {...register('title')} placeholder="Title" required />
      <textarea {...register('body')} placeholder="Text (optional)" rows={4} />
      <Button type="submit" isLoading={isSubmitting}>Post</Button>
    </form>
  );
};