import { createSlice } from '@reduxjs/toolkit';
import { Row } from 'src/types';

interface TableState {
  rows: Row[];
  editingRowId: number | null;
}

const initialState: TableState = {
  rows: [],
  editingRowId: null,
};

const findRowById = (rows: Row[], id: number): Row | null => {
  for (const row of rows) {
    if (row.id === id) return row;
    if (row.child) {
      const found = findRowById(row.child, id);
      if (found) return found;
    }
  }
  return null;
};

const findParentRowById = (rows: Row[], id: number): Row | null => {
  for (const row of rows) {
    if (row.child) {
      const found = row.child.find((child) => child.id === id);
      if (found) return row;
      const parent = findParentRowById(row.child, id);
      if (parent) return parent;
    }
  }
  return null;
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },
    setEditingRowId(state, action) {
      state.editingRowId = action.payload;
    },
    localUpdateRow(state, action) {
      const updatedRow = action.payload;
      const rowToUpdate = findRowById(state.rows, updatedRow.id);
      if (rowToUpdate) {
        Object.assign(rowToUpdate, updatedRow);
      }
    },
    localCreateRow(state, action) {
      const { newRow, parentId } = action.payload;
      if (parentId === null) {
        state.rows.push(newRow);
      } else {
        const parentRow = findRowById(state.rows, parentId);
        if (parentRow) {
          if (!parentRow.child) parentRow.child = [];
          parentRow.child.push(newRow);
        }
      }
    },
    localDeleteRow(state, action) {
      const id = action.payload;
      const parentRow = findParentRowById(state.rows, id);
      if (parentRow) {
        parentRow.child = parentRow.child?.filter((row) => row.id !== id);
      } else {
        state.rows = state.rows.filter((row) => row.id !== id);
      }
    },
  },
});

export const { setRows, setEditingRowId, localUpdateRow, localCreateRow, localDeleteRow } = tableSlice.actions;

export default tableSlice.reducer;
