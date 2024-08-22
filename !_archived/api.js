import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base API
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.68.107:8000/api/v1',
    credentials: 'include', // Include credentials (e.g., cookies)
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    getUser: builder.query({
      query: () => '/user',
    }),
  }),
});

export const { useLoginUserMutation, useLogoutUserMutation, useGetUserQuery } = api;