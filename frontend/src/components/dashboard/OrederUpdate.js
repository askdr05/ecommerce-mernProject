import React, { useEffect, useState } from 'react'
import "./_OrederUpdate.scss"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearError, orderStateReset } from '../../redux/slices/order/orderSlice'
import { orderDetails, updateOrder } from '../../redux/slices/order/orderApi'
import { Link } from 'react-router-dom'
import { MdAccountTree } from "react-icons/md"
const OrederUpdate = () => {

    const [status, setStatus] = useState("");

    const {loading,OrderDetails,error,success:isUpdated} = useSelector(state=>state.order)
    const dispatch = useDispatch()
     
    const {id} = useParams()

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("status", status);
    
        dispatch(updateOrder({id, myForm}));
      };

    useEffect(()=>{
        console.log(OrderDetails)
        if(error){
            alert(error)
            dispatch(clearError())
        }
        if(isUpdated){
            alert("order updated")
            dispatch(orderStateReset())
        }
        dispatch(orderDetails(id))
    },[error,dispatch,id,alert,isUpdated])
    return (
        <div className='orderUpdateContainer'>
            <div className="orderUpdatePage">
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
                                className={
                                    OrderDetails.orderStatus && OrderDetails.orderStatus === "Delivered"
                                        ? "greenColor"
                                        : "redColor"
                                }
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
            <div className='progressContainer'
                style={{
                    display: OrderDetails.orderStatus === "Delivered" ? "none" : "block",
                   
                }}
            >
                <form
                    className="updateOrderForm"
                    onSubmit={updateOrderSubmitHandler}
                >
                    <h1>Process Order</h1>

                    <div>
                        <MdAccountTree />
                        <select onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Choose Category</option>
                            {OrderDetails.orderStatus === "Processing" && (
                                <option value="Shipped">Shipped</option>
                            )}

                            {OrderDetails.orderStatus === "Shipped" && (
                                <option value="Delivered">Delivered</option>
                            )}
                        </select>
                    </div>

                    <button
                        id="createProductBtn"
                        type="submit"
                        disabled={
                            loading ? true : false || status === "" ? true : false
                        }
                    >
                        Process
                    </button>
                </form>

            </div>
        </div>
    )
}

export default OrederUpdate
