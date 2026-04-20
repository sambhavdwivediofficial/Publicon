import { useForm } from 'react-hook-form';
import { Button } from '../../components/common/Button/Button';
import { userService } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import { Helmet } from 'react-helmet-async';
import styles from './SettingsPage.module.css';

const SettingsPage = () => {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm({
    defaultValues: { name: user?.name, bio: user?.bio },
  });

  const onSubmit = async (data) => {
    await userService.updateProfile(data);
  };

  return (
    <>
      <Helmet><title>Settings · Publicon</title></Helmet>
      <div className={styles.settingsPage}>
        <h1>Settings</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('name')} placeholder="Name" />
          <textarea {...register('bio')} placeholder="Bio" />
          <Button type="submit">Save</Button>
        </form>
      </div>
    </>
  );
};
export default SettingsPage;