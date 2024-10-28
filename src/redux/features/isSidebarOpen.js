import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const isSidebarOpenSlice = createSlice({
    name: 'IsSidebarOpen',
    initialState,
    reducers: {
        setToTrue: (state) => {
         state.value = true
        },
        setToFalse: (state) => {
         state.value = false
        },
    },
})

export const { setToTrue, setToFalse } = isSidebarOpenSlice.actions;
export default isSidebarOpenSlice.reducer;