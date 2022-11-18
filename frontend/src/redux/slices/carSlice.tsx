import { createSlice } from '@reduxjs/toolkit'

export const carSlice = createSlice({
    name: 'car',
    initialState: {},
    reducers: {
        set: (state, action) => action.payload
    },
})

export const { set } = carSlice.actions
export default carSlice.reducer

