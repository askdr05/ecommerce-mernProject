import React from 'react';
import "./_ProductCard.scss";
import { Link } from "react-router-dom";
import tshirt from "../../images/tshirt.webp";
import ReactStars from 'react-rating-stars-component';
const ProductCard = ({product}) => {
  const options={
    edit:false,
    color: 'rbg(20,20,20,0.1)',
    activeColor:"tomato",
    value:product.ratings,
    isHalf: true,
    size:window.innerWidth <600? 20: 25
  }
  return (
 <Link className='product' to ={`/products/${product._id}`}>
  <img src={(product.images&&product.images[0])?product.images[0].url:tshirt} alt={product.name}/>
  <p>{product.name}</p>
  <div className='product_ratings_reviews'>
    <ReactStars {...options}/> <span>({product.numOfReviews} reviews)</span>
  </div>
  <span className='product_price'>{product.price}</span>

 
 </Link>
  )
}

export default ProductCard
