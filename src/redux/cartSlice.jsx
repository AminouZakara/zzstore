import { createSlice } from '@reduxjs/toolkit'
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload)
            
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.id != action.payload.id);
            
        }
    }
})

export const { addToCart, deleteFromCart } = cartSlice.actions

export default cartSlice.reducer;

{/**
    
     reducers: {
        addToCart(state, action) {
            const product = action.payload;
            const existingProduct = state.find((item) => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                state.push(product);
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        deleteFromCart(state, action) {
            const productId = action.payload;
            state = state.filter((item) => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(state));
        },
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const product = state.find((item) => item.id === id);
            product.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(state));
        }
    }
    */}