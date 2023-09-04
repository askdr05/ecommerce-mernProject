import { createOrder,Orders,orderDetails,getAdminOrders,adminDeleteOrders,updateOrder } from './orderApi';
const createSlice = require('@reduxjs/toolkit').createSlice;

const orderSlice = createSlice({
    name:"order",
    initialState:{
        loading:false,
        myOrders:[],
        adminOrders:[],
        order:{},
        OrderDetails:{},
        error:null,
        success:false,

    },
    reducers:{
        clearError(state){
            state.error=null
        },
        orderStateReset(state){
            state.success=false
        }

    },
    extraReducers:(builder)=>{

        //creat order
        builder.addCase(createOrder.pending, (state) => {
          state.loading = true
      })
      builder.addCase(createOrder.fulfilled, (state, action) => {
          state.loading = false
          state.order = action.payload.order
      })
      builder.addCase(createOrder.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload.message
          state.order = null
      })

      //myOrders

      builder.addCase(Orders.pending, (state) => {
        state.loading = true
    })
    builder.addCase(Orders.fulfilled, (state, action) => {
        state.loading = false
        state.myOrders = action.payload.orders
    })
    builder.addCase(Orders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message

    })
    //orderDetails
      builder.addCase(orderDetails.pending, (state) => {
        state.loading = true
    })
    builder.addCase(orderDetails.fulfilled, (state, action) => {
        state.loading = false
        state.OrderDetails = action.payload.order
    })
    builder.addCase(orderDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
        state.OrderDetails = null
    })

    //admin all orders

    builder.addCase(getAdminOrders.pending, (state) => {
        state.loading = true
    })
    builder.addCase(getAdminOrders.fulfilled, (state, action) => {
        state.loading = false
        state.adminOrders = action.payload.orders
       
    })
    builder.addCase(getAdminOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message

    })
    //admin delete orders

    builder.addCase(adminDeleteOrders.pending, (state) => {
        state.loading = true
    })
    builder.addCase(adminDeleteOrders.fulfilled, (state, action) => {
        state.loading = false
        state.success = action.payload.success
       
    })
    builder.addCase(adminDeleteOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message

    })
    //updateOrder
    builder.addCase(updateOrder.pending, (state) => {
        state.loading = true
    })
    builder.addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false
        state.success = action.payload.success
       
    })
    builder.addCase(updateOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message

    })
  
      }
})

export const { clearError,orderStateReset } = orderSlice.actions;

export default orderSlice.reducer