import { request } from "../../api";
import reviewSlice from "./reviewSlice";
// import axios from 'axios'

const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk

// fetching all product
export const getAllProducts = createAsyncThunk('allProducts/getAllProducts', async (productData, { rejectWithValue }) => {

    try {
        const { data } = await request.get(`/products`,
            {
                params:
                {
                    keyword: productData.keyword ? productData.keyword : "",
                    page: productData.currentPage ? productData.currentPage : 1,
                    category: productData.category ? productData.category : "",
                    price: {
                        gte: productData.priceRange && productData.priceRange[0] ? productData.priceRange[0] : 0,
                        lte: productData.priceRange && productData.priceRange[1] ? productData.priceRange[1] : 200000
                    },
                    ratings: {
                        gte: productData.ratings ? productData.ratings : 0
                    }
                }
            }
        )
        console.log(data)
        return data

    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }


})

//fetching productDetails
export const getProductDetails = createAsyncThunk('productDetails/getProductDetails', async (userId, { rejectWithValue }) => {
    try {
        const { data } = await request.get(`/products/${userId}`)
        console.log(data)
        return data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

//creat product review

export const createProductsReview = createAsyncThunk('product/createProductsReview', async (review, { rejectWithValue }) => {
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        console.log(review)
        const { data } = await request.put(`/reviews`,
            {
                rating: review.rating,
                comment: review.comment,
                productId: review.id
            },
            config)
        console.log(data)
        return data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})


//admin

// fetching all product admin
export const getAllAdminProducts = createAsyncThunk('allProducts/getAllAdminProducts', async (_, { rejectWithValue }) => {

    try {
        const { data } = await request.get(`/admin/products` )
        console.log(data)
        return data

    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }


})


//create product

export const createProduct = createAsyncThunk('product/creatProduct',async(newProductData, { rejectWithValue })=>{
    try {
        const config = { headers: { 'Content-Type': 'multipart/form-data'} };
        const {data} = await request.post(`/admin/products/new`,newProductData,config)
        // console.log(data)
        return data
    } catch (error) {
        console.log(error)
        if (!error.response) {
            throw error
          }
          return rejectWithValue(error.response.data)
        }
})

//update product

export const updateProduct = createAsyncThunk('product/updateProduct',async(productData, { rejectWithValue })=>{
    try {
        const config = { headers: { 'Content-Type': 'multipart/form-data'} };
        const {data} = await request.put(`/admin/products/${productData.productId}`,productData.myForm,config)
        // console.log(data)
        return data
    } catch (error) {
        console.log(error)
        if (!error.response) {
            throw error
          }
          return rejectWithValue(error.response.data)
        }
})


//delet product
export const deleteProduct = createAsyncThunk('product/deleteProduct',async(productId, { rejectWithValue })=>{
    try {
        const {data} = await request.delete(`/admin/products/${productId}`)
        console.log(productId)
        return data
    } catch (error) {
        console.log(error)
        if (!error.response) {
            throw error
          }
          return rejectWithValue(error.response.data)
        }
})

//fetching all reviews of a product
export const getAllReviews = createAsyncThunk('product/getAllReviews', async (productId, { rejectWithValue }) => {
    try {
        const { data } = await request.get(`/reviews?id=${productId}`)
        console.log(data)
        return data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})


//delet reviews
export const deleteReviews = createAsyncThunk('product/deleteReviews',async(details, { rejectWithValue })=>{
    
    try {
        console.log(details.productId)
        const {data} = await request.delete(`/reviews?id=${details.reviewId}&productId=${details.productId}`)
        return data
    } catch (error) {
        console.log(error)
        if (!error.response) {
            throw error
          }
          return rejectWithValue(error.response.data)
        }
})