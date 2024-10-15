import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: "home",
}

export const currentPageSlice = createSlice({
    name: 'currentPage',
    initialState,
    reducers: {
        setToHome: (state) => {
         state.value = "home"
        },
        setToProducts: (state) => {
         state.value = "products"
        },
        setToOrders: (state) => {
         state.value = "orders"
        },
        setToFavorites: (state) => {
         state.value = "favorites"
        },
        setToProfile: (state) => {
         state.value = "profile"
        },
        setToCart: (state) => {
         state.value = "cart"
        },
    },
})

export const { setToHome, setToProducts, setToOrders, setToFavorites, setToProfile, setToCart} = currentPageSlice.actions;
export default currentPageSlice.reducer;