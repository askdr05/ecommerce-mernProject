import { request } from "../../api";
// import axios from 'axios'

const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk
// creat order
export const createOrder = createAsyncThunk('order/createOrder',async(order, { rejectWithValue })=>{
    try {
        const config = { headers: { "Content-Type": "application/json"} };
        const {data} = await request.post(`/order/new`,order,config)
        console.log(data)
        return data
    } catch (error) {
        if (!error.response) {
            throw error
          }
          return rejectWithValue(error.response.data)
        }
})
// orders
export const Orders = createAsyncThunk('order/myOrders',async(_, { rejectWithValue })=>{
    try {
        const {data} = await request.get("/orders/me")
        console.log(data)
        return data
    } catch (error) {
        if (!error.response) {
            throw error
          }
          return rejectWithValue(error.response.data)
        }
})

//orderDetails
export const orderDetails = createAsyncThunk('order/orderDetails',async(orderId, { rejectWithValue })=>{
    try {
        const {data} = await request.get(`/order/${orderId}`)
        console.log(data)
        return data
    } catch (error) {
        if (!error.response) {
            throw error
          }
          return rejectWithValue(error.response.data)
        }
})

//Admin Orders


export const getAdminOrders = createAsyncThunk('order/adminOrders',async(_, { rejectWithValue })=>{
    try {
        const {data} = await request.get("/admin/orders")
        console.log(data)
        return data
    } catch (error) {
        if (!error.response) {
            throw error
          }
          return rejectWithValue(error.response.data)
        }
})

//delet order -- admin

export const adminDeleteOrders = createAsyncThunk('order/adminDeleteOrders',async(orderId, { rejectWithValue })=>{
    try {
        console.log(orderId)
        const {data} = await request.delete(`/admin/order/${orderId}`)
        console.log(data)
        return data
    } catch (error) {
        if (!error.response) {
            throw error
          }
          return rejectWithValue(error.response.data)
        }
})

//updateOrder
export const updateOrder = createAsyncThunk('order/updateOrder',async(status, { rejectWithValue })=>{
    try {
        const config = { headers: { 'Content-Type': 'multipart/form-data'} };
        const {data} = await request.put(`/admin/order/${status.id}`,status.myForm,config)
        console.log(data)
        return data
    } catch (error) {
        if (!error.response) {
            throw error
          }
          return rejectWithValue(error.response.data)
        }
})