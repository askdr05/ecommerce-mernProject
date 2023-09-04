import React, { useEffect } from 'react'
import "./_CartProductCard.scss"
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
const CartProductCard = ({ Product }) => {
  const dispatch = useDispatch()
  // const { product, quantity } = Product
  const removeCart = () => {
    dispatch(removeFromCart(Product.product._id))
  }
  const increaseQuantity = ()=>{
    if(Product.quantity<Product.product.Stock){
        let quantity = Product.quantity+1
        dispatch(addToCart({product:Product.product,quantity}))
    
    }

}

const decreaseQuantity =()=>{
  if(Product.quantity>1){
    let quantity =Product.quantity-1
    dispatch(addToCart({product:Product.product,quantity}))

}

}
  return (
    // <Link className='CartProductCard' to={`/products/${Product.product._id}`}>
      <div className='CartProductCard'>
        <img src={Product.product.images&&Product.product.images[0]? Product.product.images[0].url:"no images"} />
        <span className='name'>{Product.product.name}</span>
        <div className='qty' >
          <span>Qty: </span>
          <div className='qty_button'>
            <button onClick={decreaseQuantity}>-</button>
            <input type='number' readOnly value={Product.quantity} />
            <button onClick={increaseQuantity}>+</button>
          </div>
        </div>
        <span>Subtotal: {Product.product.price * Product.quantity}</span>
        <button className='removeCart' onClick={removeCart}>Remove</button>
      </div>
    // </Link>

  )
}

export default CartProductCard
