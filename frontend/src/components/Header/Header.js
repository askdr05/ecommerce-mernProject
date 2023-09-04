import React, { useState } from 'react'
import './_Header.scss'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../images/logo.png"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { FaBars } from "react-icons/fa"
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { clearFilter, setPriceRange } from '../../redux/slices/filterSlice'

const Header = ({ handelMenuBar }) => {
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState("")
  const navigate = useNavigate()
  const { loggedIn, user } = useSelector((state) => state.user)
  const { cartItems } = useSelector((state) => state.cart)

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {loggedIn? "my account":"login/register"}
    </Tooltip>)

  const handelUser = () => {
    navigate("/myaccount")
  }

  const handelSubmit = (e) => {

    e.preventDefault()
    dispatch(clearFilter())
    console.log(keyword)
    if (keyword.trim()) {
      navigate(`/Search/${keyword}`)
    }
    // else {
    //   navigate('/')
    // }
    setKeyword("")

  }
  return (
    <div className='Header' >
      <FaBars className='Header_menu' size={26} onClick={() => handelMenuBar()} />
      <Link to={'/'}>
        <img src={logo} alt='ecommerce' className='Header_logo' />
      </Link>
      <form onSubmit={(e) => handelSubmit(e)}>
        <input type='text' placeholder='Search' onChange={(e) => setKeyword(e.target.value)} />
        <button type='submit'  >
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className='Header_icons'>
        <Link to={"/myCart"}><AiOutlineShoppingCart className='cart' size={28} /></Link>

        {cartItems[0] && <span className="cart_items">{cartItems.length}</span>}
       
        <>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <img src={user && user.avatar ? user.avatar.url : 'https://cdn-icons-png.flaticon.com/512/147/147144.png'} alt='avatar' onClick={handelUser} />
          </OverlayTrigger>

        </>
      </div>
    </div>
  )
}

export default Header
