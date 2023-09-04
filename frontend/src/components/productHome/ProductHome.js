import React, { useEffect, useState } from 'react'
import "./_ProductHome.scss"
import ProductCard from '../ProductCard/ProductCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/slices/products/productApi';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';


// impor Too
import { clearFilter, setPriceRange, setRatings } from '../../redux/slices/filterSlice';
import Title from '../Title';

const HomeScreen = () => {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    // const [ratings, setRatings] = useState()
    // const [priceRange, setPriceRange] = useState([])
    const { data, loading, Error, productCount, resultPerPage } = useSelector((state) => state.allProducts)
    const { priceRange, ratings } = useSelector((state) => state.filter)
    const { keyword, category } = useParams()
    const marks = { 0: "0★", 1: "1★", 2: "2★", 3: "3★", 4: "4★", 5: "5★" }
    // const priceMarks = { 0: "0", 1: "200000" }
    // const ratingsMarks = ["0★", "1★", "2★", "3★", "4★", "5★" ]

    const handelSubmit = (e) => {

        const productData = { keyword, currentPage, priceRange, category, ratings }
        console.log(productData)
        dispatch(getAllProducts(productData))

    }

    const handelPriceChange = (value) => {

        dispatch(setPriceRange(value))

    }
    const handelRatings = (value) => {

        dispatch(setRatings(value))

    }


    const setCurrentPageNo = (e) => {
        setCurrentPage(e)


    }

    useEffect(() => {
        if (Error) {

            alert(Error)
        }
        dispatch(getAllProducts({ keyword, currentPage, category }))

    }, [dispatch, Error, keyword, currentPage, category])

    return (

        <>
            <Title title={"Products"} />
            {loading ? <span>loading</span> :

                <div className='Products'>
                    {(data&&data[0])&&
                    <div className='Products_filter'>
                        <p>Filter</p>
                        <div className='filterSlide'>
                            <div className='pricedivMain'>
                                <p>Price</p>
                                <p>
                                    <label >min:</label>
                                    <input type="text" readOnly value={priceRange[0]} />
                                    <label >max:</label>
                                    <input type="text" readOnly value={priceRange[1]} />
                                </p>
                                <Slider
                                    range
                                    min={0}
                                    max={200000}
                                    allowCross={false}
                                    trackStyle={{ backgroundColor: "tomato" }}
                                    value={priceRange}
                                    handleStyle={{ borderColor: "tomato" }}
                                    onChange={value => handelPriceChange(value)} />


                            </div>
                            <hr />
                            <div className='ratingsDivMain'>
                                <p>Ratings</p>
                                <div className='ratingsDiv'>
                                    <Slider
                                        value={ratings}
                                        //    reverse
                                        min={0}
                                        max={5}
                                        marks={marks}
                                        activeDotStyle={{ borderColor: "grey" }}
                                        dotStyle={{ borderColor: "tomato" }}
                                        trackStyle={{ backgroundColor: "grey" }}
                                        railStyle={{ backgroundColor: 'tomato' }}
                                        handleStyle={{ borderColor: "tomato" }}
                                        onChange={value => handelRatings(value)}
                                    />
                                    {/* {ratingsMarks.map((e)=><span>{`Above ${e}`}</span>)} */}
                                </div>
                            </div>
                            <button onClick={handelSubmit}>apply</button>
                        </div>
                    </div>
                    
                    }

                    <Container className='Products_Home'>
                        <Row >
                            {data && data.map((e) => {
                                console.log(e.id)
                                return <Col key={e._id} lg={3} md={4}><ProductCard product={e} /></Col>
                            })}
                        </Row>
                        {resultPerPage < productCount && (
                            <div className='paginationBox'>
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="⟩"
                                    prevPageText="⟨"
                                    lastPageText="»"
                                    firstPageText="«"
                                    pageRangeDisplayed={2}
                                    itemClass='page-item'
                                    linkClass='page-link'
                                    activeClass='pageItemActive'
                                    activeLinkClass='pageLinkActive'

                                />
                            </div>
                        )}
                    </Container>
                </div>

            }
        </>




    )
}

export default HomeScreen

