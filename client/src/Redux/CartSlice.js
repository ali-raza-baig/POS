import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : [],
    total: 0,
}

export const cartSlice = createSlice({
    name: 'cartItem',
    initialState,
    reducers: {
        AddCart: (state, action) => {
            const existing = state.cart.findIndex(item => item._id === action.payload._id)
            if (existing !== -1) {
                state.cart[existing].cartQuantity += 1
            } else {

                state.cart.push({ ...action.payload, cartQuantity: 1 })
            }
            localStorage.setItem('cartItem', JSON.stringify(state.cart))

        },
        RemoveCart: (state, action) => {
            const removeItem = state.cart.filter(item => item._id !== action.payload._id)
            state.cart = removeItem
            localStorage.setItem('cartItem', JSON.stringify(state.cart))
        },
        DecreaseQuentity: (state, action) => {
            const existing = state.cart.findIndex(item => item._id === action.payload._id)
            if (state.cart[existing].cartQuantity > 1) {
                state.cart[existing].cartQuantity -= 1
            } else if (state.cart[existing].cartQuantity === 1) {
                const removeItem = state.cart.filter(item => item._id !== action.payload._id)
                state.cart = removeItem
            }
            localStorage.setItem('cartItem', JSON.stringify(state.cart))
        },
        ClearCart: (state, action) => {
            state.cart = []
            localStorage.setItem('cartItem', JSON.stringify(state.cart))
        }
    },

});

export const { AddCart, RemoveCart, DecreaseQuentity, ClearCart } = cartSlice.actions;
export default cartSlice.reducer;