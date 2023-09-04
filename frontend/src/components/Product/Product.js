import React, { useState } from 'react'
import './_product.scss'
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProductsReview, getProductDetails } from '../../redux/slices/products/productApi';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from '../ReviewCard/ReviewCard';
import { addToCart } from '../../redux/slices/cartSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Rating } from 'react-simple-star-rating'
import { clearError, reviewStateReset } from '../../redux/slices/products/reviewSlice';
import Title from '../Title';
const Product = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)

    const { product, loading } = useSelector((state) => state.productDetails)
    
    const {reviewUpdated,reviewError} = useSelector((state) => state.review)
    const increaseQuantity = () => {
        if (quantity < product.Stock) {
            let qty = quantity + 1
            setQuantity(qty)
        }

    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            let qty = quantity - 1
            setQuantity(qty)
        }

    }
    const handelAddCart = () => {
        dispatch(addToCart({ product, quantity }))
    }

    const [show, setShow] = useState(false);
    const [comment, setComment] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [rating, setRating] = useState(0)
    const handleRating = (rate) => {
        setRating(rate)
        console.log(rate)

    }

   

   

    const handleReviewSubmit = ()=>{
        dispatch(createProductsReview({rating,comment,id}))
        setShow(false)
    }




    useEffect(() => {
        dispatch(getProductDetails(id))
        if(reviewUpdated===true){
            alert("review uploaded")
            // console.log("review uploaded")
            dispatch(reviewStateReset())
        }
        if(reviewError){
            alert(reviewError)
            dispatch(clearError())
        }
    }, [dispatch, id,reviewUpdated,reviewError])

    const options = {
        edit: false,
        color: 'rbg(20,20,20,0.1)',
        activeColor: "tomato",
        value: product.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 23 : 25
    }

    return (
        <>
        <Title title={`product - ${id}`}/>
            {loading ? <span>loading..</span> :

                <div className='main'>
                    <div className='product_container'>
                        <div style={{ opacity: product.Stock < 1 && 0.5 }}>
                            <Carousel slide={false} variant="dark" >
                                {product.images && product.images.map((e, i) => {
                                    return <Carousel.Item key={i}><img className='product_carouselImg' key={e.url} src={e.url} alt={`${i} slide`} /></Carousel.Item>
                                }
                                )}
                            </Carousel>
                        </div>
                        <div className='product_details'>
                            <div className='product_details1'>
                                <h2>{product.name}</h2>
                                <p>product # {product._id}</p>
                            </div>
                            <hr />
                            <div className='product_details2'>
                                <ReactStars {...options} />
                                <span>({product.numOfReviews} Reviews)</span>
                            </div>
                            <hr />
                            <div className='product_details3'>
                                <h1>₹{product.price}</h1>
                                <div className='button'>
                                    <div className='button_qnty'>
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input type='number' readOnly value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button disabled={product.Stock > 0 ? false : true} className='cart' onClick={handelAddCart}>Add to Cart</button>
                                </div>
                            </div>
                            <p>Status:
                                <b style={{ color: product.Stock ? 'green' : "red" }}>In Stock</b>
                            </p>

                            <hr />
                            <div className='product_details4'>
                                Description:<p>{product.description}</p>
                            </div>

                            <button className='submitReviews' onClick={handleShow} >Submit Reviews</button>
                            <div>
                                <Modal centered show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title style={{fontWeight:"600"}}>Submit Reviews</Modal.Title>
                                    </Modal.Header>
                                    <p className='review_rating'>
                                        <Rating
                                            onClick={handleRating}
                                            allowFraction
                                        />
                                    </p>
                                    <Modal.Body >
                                        <textarea  className='review_content' placeholder='Review' value={comment} onChange={(e)=>setComment(e.target.value)}>
                                        {comment}
                                        </textarea>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button style={{fontWeight:"600"}} variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button style={{backgroundColor:"tomato",borderWidth:"0",fontWeight:"600"}}  onClick={handleReviewSubmit}>
                                            Submit
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </div >
                    <hr />
                    <h1 className='reviews_heading'>reviews</h1>
                    <hr />
                    <div className='review_container'>
                        <div className='reviews'>
                            {product.reviews && product.reviews[0] ?
                                product.reviews.map((e, i) => {
                                    return <ReviewCard key={e._id} review={e} />
                                }) :
                                <p className='noreviews'> No Reviews Yet</p>
                            }
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default Product
