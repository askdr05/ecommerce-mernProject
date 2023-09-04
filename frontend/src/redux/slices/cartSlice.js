const createSlice = require('@reduxjs/toolkit').createSlice;

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: localStorage.getItem("cartItems") ?
            JSON.parse(localStorage.getItem("cartItems")) : [],

        shippingInfo: localStorage.getItem("shippingInfo") ?
        JSON.parse(localStorage.getItem("shippingInfo")):{}
    },
    reducers: {
        addToCart(state, action) {
            const isExist = state.cartItems.find((e) => {
                return e.product._id === action.payload.product._id
            })
            if (isExist) {
                state.cartItems = state.cartItems.map((e) => {
                    if (e.product._id === action.payload.product._id) {
                        if (e.quantity === action.payload.quantity) {
                            return e
                        } else { return action.payload }
                    } else { return e }
                })
            } else { state.cartItems = [...state.cartItems, action.payload] }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        removeFromCart(state, action) {
            // console.log(action.payload.product._id)
            state.cartItems = state.cartItems.filter((e) => e.product._id !== action.payload)
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },

        saveShippingInfo(state,action){
            state.shippingInfo = action.payload
            localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo))
        },
        clearCart(state){
            state.cartItems = []
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        }

    }
})

export const { addToCart, removeFromCart,saveShippingInfo,clearCart } = cartSlice.actions
export default cartSlice.reducer
