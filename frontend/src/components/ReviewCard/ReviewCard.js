import "./_ReviewCard.scss"
import React from 'react'
import ReactStars from 'react-rating-stars-component';
const ReviewCard = ({review}) => {
    const options = {
        edit: false,
        color: 'rbg(20,20,20,0.1)',
        activeColor: "tomato",
        value: review.rating,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25
    }
  return (
    <div className="ReviewCard">
      <img src='https://cdn-icons-png.flaticon.com/512/147/147144.png' alt="user" />
      <span>{review.name}</span>
      <ReactStars {...options} />
      <p>{review.comment}</p>

    </div>
  )
}

export default ReviewCard
