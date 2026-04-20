import { useState } from 'react';
import { useController } from 'react-hook-form';
import { X } from 'lucide-react';
import styles from './TagInput.module.css';

export const TagInput = ({ control, name, label }) => {
  const { field } = useController({ control, name });
  const [inputValue, setInputValue] = useState('');

  const addTag = (tag) => {
    const trimmed = tag.trim().toLowerCase();
    if (trimmed && !field.value.includes(trimmed)) {
      field.onChange([...field.value, trimmed]);
    }
    setInputValue('');
  };

  const removeTag = (index) => {
    const newTags = [...field.value];
    newTags.splice(index, 1);
    field.onChange(newTags);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  return (
    <div className={styles.tagInput}>
      {label && <label>{label}</label>}
      <div className={styles.tagsContainer}>
        {field.value.map((tag, idx) => (
          <span key={idx} className={styles.tag}>
            {tag}
            <button type="button" onClick={() => removeTag(idx)}><X size={12} /></button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(inputValue)}
          placeholder="Add tags..."
          className={styles.input}
        />
      </div>
    </div>
  );
};