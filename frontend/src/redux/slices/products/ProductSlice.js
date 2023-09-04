import { createProduct,deleteProduct,updateProduct} from './productApi';

const createSlice = require('@reduxjs/toolkit').createSlice;

const productSlice = createSlice({
    name: 'product',
    initialState:{
        loading : false,
        // product :{},
        error:null,
        success : false,
        message:null
    },
    reducers:{
        ClearError(state){
            state.error=null
        },
        productStateReset(state){
            state.success = false
            state.product = {}
            state.message = null
         }
    },
    extraReducers: (builder)=>{
        //creat
        builder.addCase(createProduct.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(createProduct.fulfilled,(state,action)=>{
            state.loading = false
            // state.product = action.payload.newProduct
            state.success = true
        })
        builder.addCase(createProduct.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload.message
        })
        //update
        builder.addCase(updateProduct.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(updateProduct.fulfilled,(state,action)=>{
            state.loading = false
            // state.product = action.payload.newProduct
            state.success = true
            state.message = action.payload.message
        })
        builder.addCase(updateProduct.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload.message
        })

        //delete product
        builder.addCase(deleteProduct.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(deleteProduct.fulfilled,(state,action)=>{
            state.loading = false
            state.success = action.payload.success
            state.message = action.payload.message
        })
        builder.addCase(deleteProduct.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload.message
        })

    }

})
export const { ClearError,productStateReset } = productSlice.actions;
export default productSlice.reducer