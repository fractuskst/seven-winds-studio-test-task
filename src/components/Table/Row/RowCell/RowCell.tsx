import React from 'react';
import { TableCell, TableCellProps } from '@mui/material';
import StyledInput from 'src/components/StyledInput';
import styles from './RowCell.module.scss';

type Props = TableCellProps & {
  isEditMode: boolean;
  value: string | number;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number';
};

export default function RowCell({ isEditMode, value, onInputChange, onInputKeyDown, type = 'text', ...props }: Props) {
  return (
    <TableCell
      {...props}
      className={styles.container}
      sx={{
        padding: isEditMode ? '12px' : '21px 12px',
      }}
    >
      {isEditMode ? (
        <StyledInput type={type} value={value} onKeyDown={onInputKeyDown} onChange={onInputChange} />
      ) : (
        <span className={styles.rowCell}>{value}</span>
      )}
    </TableCell>
  );
}
