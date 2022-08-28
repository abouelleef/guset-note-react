import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { token: null },
    reducers: {
        setCredentials: (state, { payload }) => {
            const { token } = payload
            // state.user = user
            state.token = token
        },
        logout: (state, action) => {
            // state.user = null
            state.token = null
        },
    },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token