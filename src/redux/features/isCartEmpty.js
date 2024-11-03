import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: true,
}

export const isCartEmptySlice = createSlice({
    name: 'IsCartEmpty',
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

export const { setToTrue, setToFalse } = isCartEmptySlice.actions;
export default isCartEmptySlice.reducer;