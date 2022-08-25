import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const notesApi = createApi({
    reducerPath: "notesApi",
    tagTypes: ["Notes"],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BASE_URL}api/v1`,
        // credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            // const token = getState().auth.token;
            headers.set('authorization', `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAllNotes: builder.query({
            query: () => `users/get-notes`,
            transformResponse: (res, meta, error) => res.data,
            providesTags: ['Notes'],
        }),
        deleteNote: builder.mutation({
            query: (noteId) => ({
                url: `users/delete-note/${noteId}`,
                method: "DELETE",
            }),
            transformResponse: (res, meta, error) => res.data,
            invalidatesTags: ['Notes'],
        }),
        sendNote: builder.mutation({
            query: (formData) => ({
                url: `users/send-note`,
                method: "POST",
                body: formData
            }),
            transformResponse: (res, meta, error) => res.data,
            invalidatesTags: ['Notes'],
        }),
        sendNotification: builder.mutation({
            query: (subscription) => ({
                url: `users/subscribe`,
                method: "POST",
                body: subscription
            }),
            transformResponse: (res, meta, error) => res.data,
            invalidatesTags: ['Notes'],
        }),
    })
})

export const {
    useGetAllNotesQuery,
    useDeleteNoteMutation,
    useSendNoteMutation,
    useSendNotificationMutation,
} = notesApi