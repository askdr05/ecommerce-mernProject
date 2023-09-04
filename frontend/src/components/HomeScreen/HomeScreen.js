import React, { useEffect, useState } from 'react'
import "./_HomeScreen.scss"
import ProductCard from '../ProductCard/ProductCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/slices/products/productApi';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Title from '../Title';

const HomeScreen = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const { data, loading, Error, productCount, resultPerPage } = useSelector((state) => state.allProducts)
  // const { keyword } = useParams()
  

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
    
}

  useEffect(() => {
    if (Error) {
      alert(Error)
    }
    dispatch(getAllProducts({currentPage}))
  }, [dispatch, Error,currentPage])

  return (

    <>
    <Title title={"Home"}/>
      {loading ? <span>loading</span> :
        <Container className='HomeScreen'>
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

      }
    </>




  )
}

export default HomeScreen

