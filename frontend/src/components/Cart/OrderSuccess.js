import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillCheckCircle } from "react-icons/ai"
import "./_OrderSuccess.scss"
import Title from '../Title'
import CheckOutSteps from './CheckOutSteps'

const OrderSuccess = () => {
  return (
    <>
      <Title title={"Order Success"} />
      <div className="orderSuccess">
       {/* <CheckOutSteps activeStep={3}/> */}
        <AiFillCheckCircle size={22} />

        <h2>Your Order has been Placed successfully </h2>
        <Link to="/orders">View Orders</Link>
      </div>
    </>
  )
}

export default OrderSuccess
