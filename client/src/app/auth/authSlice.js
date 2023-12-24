import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    signedUser: null,
    loading: false,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.signedUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutStart: (state) => {
            state.loading = true;
        },
        signOutSuccess: (state) => {
            state.signedUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
})

// Action creators are generated for each case reducer function
export const { 
    signInStart, 
    signInSuccess, 
    signInFailure,
    signOutStart,
    signOutSuccess,
    signOutFailure,
 } = authSlice.actions

export default authSlice.reducer