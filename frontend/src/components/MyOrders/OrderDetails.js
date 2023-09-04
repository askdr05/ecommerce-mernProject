import React, { useEffect } from 'react'
import "./_OrderDetails.scss"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearError } from '../../redux/slices/order/orderSlice'
import { orderDetails } from '../../redux/slices/order/orderApi'
import { Link } from 'react-router-dom'
import Title from '../Title'
const OrderDetails = () => {
    const {OrderDetails,error} = useSelector(state=>state.order)
    const dispatch = useDispatch()
     
    const {id} = useParams()

    useEffect(()=>{
        console.log(OrderDetails)
        if(error){
            alert(error)
            dispatch(clearError())
        }
        dispatch(orderDetails(id))
    },[error,dispatch,id])
  return (
    <>
    <Title title = {`Order details`}/>
    <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <h1 >
                Order #{OrderDetails && OrderDetails._id}
              </h1 >
              <h2>Shipping Info</h2>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{OrderDetails.user && OrderDetails.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {OrderDetails.shippingInfo && OrderDetails.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {OrderDetails.shippingInfo &&
                      `${OrderDetails.shippingInfo.address}, ${OrderDetails.shippingInfo.city}, ${OrderDetails.shippingInfo.state}, ${OrderDetails.shippingInfo.pinCode}, ${OrderDetails.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <h2>Payment</h2>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                        OrderDetails.paymentInfo &&
                        OrderDetails.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {OrderDetails.paymentInfo &&
                    OrderDetails.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{OrderDetails.totalPrice && OrderDetails.totalPrice}</span>
                </div>
              </div>

              <h2>Order Status</h2>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    style={{color : OrderDetails.orderStatus && OrderDetails.orderStatus === "Delivered"
                        ? "green"
                        : "red"
                    }}
                  >
                    {OrderDetails.orderStatus && OrderDetails.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <h2>Order Items:</h2>
              <div className="orderDetailsCartItemsContainer">
                {OrderDetails.orderItems &&
                  OrderDetails.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
    </>
  )
}

export default OrderDetails
