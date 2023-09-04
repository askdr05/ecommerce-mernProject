import React, { useEffect } from 'react'
import CartProductCard from '../CartProductCard/CartProductCard'
import { useSelector } from 'react-redux'
import "./_Cart.scss"
import { useNavigate,Link } from 'react-router-dom'

import {MdRemoveShoppingCart}  from "react-icons/md"
import Title from '../Title'

const Cart = () => {
  const navigate = useNavigate()
  const { cartItems } = useSelector(state => state.cart)
  // let totalAmount = 0
  // cartItems.forEach((e) => {
  //   totalAmount = totalAmount + (e.product.price * e.quantity)
  // })

  const checkoutHandler = ()=>{
           navigate("/login?redirect=/shipping")
  }

  return (
   <>
   <Title title={"Cart"}/>
   {
    cartItems.length === 0 ? (
      <div className="emptyCart">
        <MdRemoveShoppingCart />

        <h2>No Product in Your Cart</h2>
        <Link to="/">View Products</Link>
      </div>
    )

    : (<div className='cart_Container'>
     {cartItems.map((e) => {
       return <CartProductCard key={e.product._id} Product={e} />
     })}
     <div className="cartGrossProfit">
       <div className="cartGrossProfitBox">
         <div className='total'>
           <p>Gross Total: </p>
           <p>{`₹${cartItems.reduce(
             (acc, item) => acc + item.quantity * item.product.price,
             0
           )}`}</p>
         </div>
         <div className="checkOutBtn">
           <button onClick={checkoutHandler}>Check Out</button>
         </div>
       </div>
     </div>
   </div>)
   }
   
   </>
    
  )
}

export default Cart
