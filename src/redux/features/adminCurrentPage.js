import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: "dashboard",
}

export const adminCurrentPageSlice = createSlice({
    name: 'AdminCurrentPage',
    initialState,
    reducers: {
        setToDashboard: (state) => {
         state.value = "dashboard"
        },
        setToOrders: (state) => {
         state.value = "orders"
        },
        setToProducts: (state) => {
         state.value = "products"
        },
        setToUsers: (state) => {
         state.value = "users"
        },
        setToProfile: (state) => {
         state.value = "profile"
        },
        setToNull: (state) => {
         state.value = ""
        },
    },
})

export const { setToDashboard, setToOrders, setToProducts, setToUsers, setToProfile, setToNull} = adminCurrentPageSlice.actions;
export default adminCurrentPageSlice.reducer;