import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setCredentials } from '../../features/authSlice';

export const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_BASE_URL}api/v1`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {

    // send refresh token to get new access token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    if (refreshResult?.data) {


      // store the new token
      api.dispatch(setCredentials({ token: refreshResult.data.data.token }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // getNewAccessToken: builder.query({
    //   query: () => `/auth/refresh`,
    //   transformResponse: (response, meta, arg) => response?.token,
    // }),
  }),


});

// export const { useGetNewAccessTokenQuery, useLazyGetNewAccessTokenQuery } =
  // apiSlice;
