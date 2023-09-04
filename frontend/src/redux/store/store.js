import {configureStore} from '@reduxjs/toolkit';
import productReducer from '../slices/products/productsSlice'
import productDetailsReducer from '../slices/products/productDetailsSlice';
import userReducer from "../slices/user/userLoginSlice"
import userUpdateReducer from "../slices/user/userUpdateSlice"
 import userPasswordResetReducer from "../slices/user/userPasswordReset"
 import cartReducer from "../slices/cartSlice"
 import filterReducer from "../slices/filterSlice"
 import orderReducer from "../slices/order/orderSlice"
 import createProductsReviewReducer from "../slices/products/reviewSlice"
 import newProductReducer from "../slices/products/ProductSlice"
 import usersReducer from "../slices/user/usersSlice"
export const store = configureStore({
    reducer:{
     allProducts:productReducer,
     productDetails:productDetailsReducer,
     user : userReducer,
     updatedUser:userUpdateReducer,
     userPasswordReset : userPasswordResetReducer,
     cart:cartReducer,
     filter : filterReducer,
     order:orderReducer,
     review:createProductsReviewReducer,
     product:newProductReducer,
     users:usersReducer
  
    }
}) 