import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    cart: []
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload);
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
        },
        increaseItem(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItem(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
            if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
        },
        clearCart(state, action) {
            state.cart = [];
        }
    }
})
export const {addItem, deleteItem, increaseItem, decreaseItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) => {
    return state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
}
export const getTotalCartPrice = (state) => {
    return state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
}
export const getCurrentQuantityById = (id) => (state) =>
    state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;