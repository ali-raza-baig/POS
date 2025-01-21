import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './CartSlice';

const store = configureStore({
    reducer: {
        Cart: CartSlice
    }
})

export default store;