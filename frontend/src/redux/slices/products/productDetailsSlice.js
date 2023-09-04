import { getProductDetails } from './productApi';

const createSlice = require('@reduxjs/toolkit').createSlice;

const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState:{
        loading : false,
        product :{},
        error:null
    },
    reducers:{
        clearproductDetailsErrors(state){
            state.error = null
          },
    },
    extraReducers: (builder)=>{
        builder.addCase(getProductDetails.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(getProductDetails.fulfilled,(state,action)=>{
            state.loading = false
            state.product = action.payload.productDetails
           
        })
        builder.addCase(getProductDetails.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload.message
        })

    }

})
export const {clearproductDetailsErrors} = productDetailsSlice.actions
export default productDetailsSlice.reducer