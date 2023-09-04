import { createProductsReview,getAllReviews,deleteReviews} from './productApi';

const createSlice = require('@reduxjs/toolkit').createSlice;

const createProductsReviewSlice = createSlice({
    name: 'review',
    initialState:{
        loading : false,
        reviews:[],
        reviewUpdated :false,
        reviewDeleted:false,
        reviewError:null
    },
    reducers:{
        clearError(state){
            state.reviewError=  null
        },
        reviewStateReset(state){
           state.reviewUpdated = false
           state.reviewDeleted = false
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(createProductsReview.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(createProductsReview.fulfilled,(state,action)=>{
            state.loading = false
            state.reviewUpdated = action.payload.success
           
        })
        builder.addCase(createProductsReview.rejected,(state,action)=>{
            state.loading = false
            state.reviewError = action.payload.message
        })

        // get all reviews
        builder.addCase(getAllReviews.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(getAllReviews.fulfilled,(state,action)=>{
            state.loading = false
            state.reviews = action.payload.reviews
           
        })
        builder.addCase(getAllReviews.rejected,(state,action)=>{
            state.loading = false
            state.reviews = []
            state.reviewError = action.payload.message
        })

        //delete reviews
        builder.addCase(deleteReviews.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(deleteReviews.fulfilled,(state,action)=>{
            state.loading = false
            state.reviewDeleted = action.payload.success
           
        })
        builder.addCase(deleteReviews.rejected,(state,action)=>{
            state.loading = false
            state.reviewError = action.payload.message
        })

    }

})

export const { clearError,reviewStateReset } = createProductsReviewSlice.actions;
export default createProductsReviewSlice.reducer