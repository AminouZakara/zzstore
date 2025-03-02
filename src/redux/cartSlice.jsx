import { createSlice } from '@reduxjs/toolkit'
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },

        deleteFromCart: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id);
        },
        increaseQuantity: (state, action) => {
            const itemIndex = state.findIndex((item) => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state[itemIndex].quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const itemIndex = state.findIndex((item) => item.id === action.payload.id);
            if (itemIndex >= 0 && state[itemIndex].quantity > 1) {
                state[itemIndex].quantity -= 1;
            }else if(state[itemIndex].quantity === 1){
                state = state.filter((item) => item.id !== action.payload.id);
                }

        }


    }
})

export const { addToCart, deleteFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

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