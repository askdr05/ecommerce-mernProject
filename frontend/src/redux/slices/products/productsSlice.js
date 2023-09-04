import { getAllProducts,getAllAdminProducts } from './productApi';

const createSlice = require('@reduxjs/toolkit').createSlice;

const productsSlice = createSlice({
    name: "allProducts",
    initialState: {
        loading: false,
        data: [],
        productCount:null,
        resultPerPage:null,
        Error:null
    },

    reducers:{
          clearErrors(state){
            state.Error = null
          }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload.allProducts
            state.productCount = action.payload.productCount
            state.resultPerPage = action.payload.resultPerPage
        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.loading = false
            state.Error= action.payload.message
        })

        //admin
        builder.addCase(getAllAdminProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllAdminProducts.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload.Products
            // state.productCount = action.payload.productCount
            // state.resultPerPage = action.payload.resultPerPage
        })
        builder.addCase(getAllAdminProducts.rejected, (state, action) => {
            state.loading = false
            state.Error= action.payload.message
        })
        
    }

})

export const { clearError } = productsSlice.actions;

export default productsSlice.reducer;