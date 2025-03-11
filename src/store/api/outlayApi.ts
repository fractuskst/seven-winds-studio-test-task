import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DeleteOrCreateRowResponse, Row } from 'src/types';

export const outlayApi = createApi({
  reducerPath: 'outlayApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://185.244.172.108:8081/v1' }),
  tagTypes: ['Row'],
  endpoints: (builder) => ({
    getRowList: builder.query<Row[], number>({
      query: (eID) => `/outlay-rows/entity/${eID}/row/list`,
      providesTags: ['Row'],
    }),
    createRow: builder.mutation<DeleteOrCreateRowResponse, { eID: number; rowData: Omit<Row, 'id' | 'child'> }>({
      query: ({ eID, rowData }) => ({
        url: `/outlay-rows/entity/${eID}/row/create`,
        method: 'POST',
        body: rowData,
      }),
      invalidatesTags: ['Row'],
    }),
    updateRow: builder.mutation<Row, { eID: number; rID: number; rowData: Partial<Row> }>({
      query: ({ eID, rID, rowData }) => ({
        url: `/outlay-rows/entity/${eID}/row/${rID}/update`,
        method: 'POST',
        body: rowData,
      }),
      invalidatesTags: ['Row'],
    }),
    deleteRow: builder.mutation<DeleteOrCreateRowResponse, { eID: number; rID: number }>({
      query: ({ eID, rID }) => ({
        url: `/outlay-rows/entity/${eID}/row/${rID}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Row'],
    }),
  }),
});

export const { useLazyGetRowListQuery, useCreateRowMutation, useUpdateRowMutation, useDeleteRowMutation } = outlayApi;
