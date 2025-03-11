import { useState } from 'react';
import { useDeleteRowMutation } from 'src/store/api/outlayApi';
import { useDispatch } from 'react-redux';
import { localDeleteRow } from 'src/store/slices/tableSlice';
import { IconButton, TableCell } from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';
import DeleteIcon from '../../../../assets/icons/TrashFill.svg';
import { Row } from 'src/types';
import { AppDispatch } from 'src/store/store';
import { eID, INITIAL_ROW } from 'src/constants';
import styles from './LevelRowCell.module.scss';

type Props = {
  isEditMode: boolean;
  rowId: number;
  onCreateRow: (newRow: Row, parentId: number | null) => void;
  level: number;
};

export default function LevelRowCell({ isEditMode, rowId, onCreateRow, level }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const [deleteRow] = useDeleteRowMutation();

  const handleDeleteRow = async () => {
    try {
      dispatch(localDeleteRow(rowId));
      await deleteRow({
        eID,
        rID: rowId,
      });
    } catch (e) {
      console.error('Ошибка при удалении строки');
    }
  };

  const paddingLeft = level === 0 ? '10px' : `${10 + level * 20}px`;
  const linePosition = level === 0 ? 10 : 10 + level * 20;

  return (
    <TableCell className={styles.container} sx={{ paddingLeft }}>
      {level > 0 && (
        <div
          className={styles.verticalLine}
          style={{
            left: `${linePosition - 7}px`,
          }}
        ></div>
      )}
      <div className={styles.actions} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {level > 0 && (
          <div
            className={styles.horizontalLine}
            style={{
              left: `${linePosition - 7}px`,
            }}
          ></div>
        )}
        <IconButton disabled={isEditMode} className={styles.button} onClick={() => onCreateRow(INITIAL_ROW, rowId)}>
          <FeedIcon className={styles.feedIcon} />
        </IconButton>
        {!isEditMode && isHovered && (
          <IconButton disabled={isEditMode} className={styles.button} onClick={handleDeleteRow}>
            <DeleteIcon className={styles.deleteIcon} />
          </IconButton>
        )}
      </div>
    </TableCell>
  );
}
