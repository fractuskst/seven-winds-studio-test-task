import { Input, InputProps } from '@mui/material';
import styles from './StyledInput.module.scss';
import { useRef } from 'react';

export default function StyledInput(props: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };
  return (
    <div className={styles.container}>
      <Input {...props} disableUnderline className={styles.input} inputRef={inputRef} onFocus={handleFocus} />
    </div>
  );
}
