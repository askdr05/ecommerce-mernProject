// import React, { useEffect, useState } from 'react'
import "./_Sidebar.scss"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../redux/slices/user/userApi'
import { useEffect } from "react"
import { clearError } from "../../redux/slices/user/userLoginSlice"
import { clearFilter } from "../../redux/slices/filterSlice"

const Sidebar = ({ toggleMenubar }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const { user, loggedIn, loggedOutMessage } = useSelector(state => state.user)
  const handelLogout = () => {
    dispatch(logOut())
  }


  const handelClick = (e) => {
    dispatch(clearFilter())
    navigate(`/category/${e.target.innerText}`)
    console.log(user.role)
  }
  // useEffect(() => {
  //   if (loggedOutMessage) {
  //     // alert(loggedOutMessage)
  //     dispatch(clearError())
  //   }
  // })
  return (
    <>
      <div className={toggleMenubar ? 'Sidebar_Active' : 'Sidebar'}>
        <ul className='SidebarContainer'>
          <Link className='link' to={'/'}><li>HOME</li></Link>
          <hr />
          <li className='dropdown'> CATEGORIES
            <ul className='dropdown_menu'>
              {categories.map((e,i) => {
                return <ul key={i}>< hr />
                  <li onClick={handelClick}>{e}</li>
                </ul>

              })}

            </ul>
          </li>
          <hr />
          <Link className='link' to={"/orders"}><li> MY ORDERS </li></Link>
          <hr />
          <Link className='link' to={"/contact"}><li> CONTACT US </li></Link>
          <hr />
          <Link className='link' to={"/about"}><li> ABOUT </li></Link>
          <hr />

          {loggedIn && (<>
            <li onClick={handelLogout} >log out</li>
            <hr />
          </>)}
        </ul>
      </div>
    </>

  )
}

export default Sidebar
