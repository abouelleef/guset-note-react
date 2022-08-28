import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiSlice } from '../app/api/apiSlice'

export const notesApi = apiSlice.injectEndpoints({
    reducerPath: "notesApi",
    tagTypes: ["Notes"],

    endpoints: (builder) => ({
        getAllNotes: builder.query({
            keepUnusedDataFor: 1,
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
        subscribe: builder.mutation({
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
    useSubscribeMutation,
} = notesApi