import Row from './Row';
import React, { useEffect } from 'react';
import { AppDispatch, RootState } from 'src/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetRowListQuery } from 'src/store/api/outlayApi';
import { setRows } from 'src/store/slices/tableSlice';
import { eID } from 'src/constants';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Row as RowType } from 'src/types';
import styles from './ProjectTable.module.scss';

export default function ProjectTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { rows, editingRowId } = useSelector((state: RootState) => state.table);

  const [fetchData] = useLazyGetRowListQuery();

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchData(eID).unwrap();
        dispatch(setRows(result));
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    loadData();
  }, []);

  const renderRows = (rowList: RowType[], level = 0): JSX.Element[] => {
    return rowList.map((row) => (
      <React.Fragment key={row.id}>
        <Row row={row} isEditMode={editingRowId === row.id} level={level} />
        {row.child && row.child.length > 0 && renderRows(row.child, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <div className={styles.container}>
      <Table>
        <TableHead>
          <TableRow className={styles.headerRow}>
            <TableCell sx={{ width: 110 }}>Уровень</TableCell>
            <TableCell sx={{ width: 757 }}>Наименование работ</TableCell>
            <TableCell sx={{ width: 200 }}>Основная з/п</TableCell>
            <TableCell sx={{ width: 200 }}>Оборудование</TableCell>
            <TableCell sx={{ width: 200 }}>Накладные расходы</TableCell>
            <TableCell sx={{ width: 200 }}>Сметная прибыль</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={styles.body}>
          {rows.length === 0 ? <Row isEditMode={true} level={0} /> : renderRows(rows)}
        </TableBody>
      </Table>
    </div>
  );
}
