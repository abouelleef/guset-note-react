import { apiSlice } from '../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
      transformResponse: (res, meta, error) => res.data,
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      transformResponse: (res, meta, error) => res.data,
    }),


    register: builder.mutation({
      query: (body) => ({
        url: `/auth/register`,
        method: 'POST',
        body: body,
      }),
      transformResponse: (res, meta, error) => res.data,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApiSlice;
