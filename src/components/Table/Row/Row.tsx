import { useState } from 'react';
import { TableRow } from '@mui/material';
import RowCell from './RowCell';
import LevelRowCell from './LevelRowCell';
import { useDispatch, useSelector } from 'react-redux';
import { localCreateRow, localUpdateRow, setEditingRowId } from 'src/store/slices/tableSlice';
import { AppDispatch, RootState } from 'src/store/store';
import { Row } from 'src/types';
import { INITIAL_ROW, eID } from 'src/constants';
import styles from './Row.module.scss';
import { useCreateRowMutation, useUpdateRowMutation } from 'src/store/api/outlayApi';

type Props = {
  row?: Row;
  isEditMode?: boolean;
  level: number;
};

export default function Row({ row, isEditMode = false, level }: Props) {
  const [createRow] = useCreateRowMutation();
  const [updateRow] = useUpdateRowMutation();

  const dispatch = useDispatch<AppDispatch>();
  const { editingRowId } = useSelector((state: RootState) => state.table);

  const [editRow, setEditRow] = useState<Row>(row || INITIAL_ROW);
  const { id, rowName, salary, materials, overheads, estimatedProfit } = editRow;

  const handleCreateRow = async (newRow: Row, parentId: number | null = null) => {
    try {
      const createdRow = await createRow({
        eID,
        rowData: { ...newRow, parentId },
      }).unwrap();
      dispatch(localCreateRow({ newRow: createdRow.current, parentId }));
      dispatch(setEditingRowId(createdRow.current.id));
    } catch (e) {
      console.error('Ошибка при создании строки');
    }
  };

  const handleUpdateRow = async () => {
    try {
      const updatedRow = await updateRow({
        eID,
        rID: id,
        rowData: editRow,
      }).unwrap();
      dispatch(localUpdateRow({ updatedRow }));
      dispatch(setEditingRowId(null));
    } catch (e) {
      console.error('Ошибка при обновлении строки');
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      try {
        if (row && editingRowId) {
          await handleUpdateRow();
        } else {
          await handleCreateRow(editRow);
          dispatch(setEditingRowId(null));
        }
      } catch (error) {
        console.error('Ошибка при сохранении строки:', error);
      }
    }
    if (e.key === 'Escape') {
      dispatch(setEditingRowId(null));
    }
  };

  const handleEditRow = (id: number) => {
    dispatch(setEditingRowId(id));
  };

  const handleInputChange = (field: keyof Row) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditRow((prev) => ({ ...prev, [field]: +e.target.value || e.target.value }));
  };

  return (
    <TableRow className={styles.container} onDoubleClick={() => handleEditRow(id)}>
      <LevelRowCell isEditMode={isEditMode} rowId={id} onCreateRow={handleCreateRow} level={level} />
      <RowCell
        isEditMode={isEditMode}
        value={rowName}
        onInputChange={handleInputChange('rowName')}
        onInputKeyDown={handleKeyDown}
      />
      <RowCell
        isEditMode={isEditMode}
        value={salary}
        onInputChange={handleInputChange('salary')}
        onInputKeyDown={handleKeyDown}
        type="number"
      />
      <RowCell
        isEditMode={isEditMode}
        value={materials}
        onInputChange={handleInputChange('materials')}
        onInputKeyDown={handleKeyDown}
        type="number"
      />
      <RowCell
        isEditMode={isEditMode}
        value={overheads}
        onInputChange={handleInputChange('overheads')}
        onInputKeyDown={handleKeyDown}
        type="number"
      />
      <RowCell
        isEditMode={isEditMode}
        value={estimatedProfit}
        onInputChange={handleInputChange('estimatedProfit')}
        onInputKeyDown={handleKeyDown}
        type="number"
      />
    </TableRow>
  );
}
