import { configureStore } from '@reduxjs/toolkit';
import { outlayApi } from './api/outlayApi';
import tableReducer from './slices/tableSlice';

export const store = configureStore({
  reducer: {
    table: tableReducer,
    [outlayApi.reducerPath]: outlayApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(outlayApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
