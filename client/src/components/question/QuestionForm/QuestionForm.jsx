import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { TagInput } from '../TagInput/TagInput';
import { questionService } from '../../../services/questionService';
import { useNavigate } from 'react-router-dom';
import styles from './QuestionForm.module.css';

const schema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(300),
  body: z.string().min(20, 'Body must be at least 20 characters'),
  tags: z.array(z.string()).min(1, 'At least one tag required').max(5),
});

export const QuestionForm = ({ communityId }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { tags: [] },
  });

  const onSubmit = async (data) => {
    try {
      const res = await questionService.create({ ...data, communityId });
      navigate(`/questions/${res.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.questionForm}>
      <Input
        label="Title"
        placeholder="What's your question?"
        {...register('title')}
        error={errors.title?.message}
      />
      <div className={styles.field}>
        <label>Body</label>
        <textarea
          className={styles.textarea}
          {...register('body')}
          rows={10}
          placeholder="Provide details..."
        />
        {errors.body && <span className={styles.error}>{errors.body.message}</span>}
      </div>
      <TagInput control={control} name="tags" label="Tags" />
      <Button type="submit" isLoading={isSubmitting}>Post Question</Button>
    </form>
  );
};