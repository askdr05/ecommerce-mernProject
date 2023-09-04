import React, { useEffect, useRef, useState } from 'react'
import CheckOutSteps from './CheckOutSteps'
import { useSelector, useDispatch } from 'react-redux'
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import { BsFillCreditCard2BackFill } from "react-icons/bs"
import { BsCalendar2EventFill } from "react-icons/bs"
import { MdVpnKey } from "react-icons/md"


import "./_PayMent.scss"
// import { json } from 'body-parser';
import { useNavigate } from 'react-router-dom';
import { clearError } from '../../redux/slices/order/orderSlice';
import { createOrder } from '../../redux/slices/order/orderApi';
import Title from '../Title';
import { clearCart } from '../../redux/slices/cartSlice';

const PayMentPage = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)
    const { error } = useSelector(state => state.order)

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const orderItems = []
    cartItems.forEach(element => {
        orderItems.push({
            name: element.product.name,
            price: element.product.price,
            quantity: element.quantity,
            image: element.product.images && element.product.images[0]?element.product.images[0].url:"no image availabel",
            product: element.product._id,

        })
    });

    const order = {
        shippingInfo,
        orderItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;

                alert(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    dispatch(createOrder(order));
                    dispatch(clearCart())
                    navigate("/success");
                } else {
                    alert("There's some issue while processing payment ");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        if (error) {
            alert(error)
            dispatch(clearError())
        }
    }, [dispatch, error, alert])
    return (
        <>
        <Title title={"Payment"}/>
            <div className="paymentContainer">
                <CheckOutSteps activeStep={2} />
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <h2>Card Info</h2>
                    <div>
                        <BsFillCreditCard2BackFill />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <BsCalendar2EventFill />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <MdVpnKey />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </>
    )
}

export default PayMentPage
