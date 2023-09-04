import React from 'react'
import "./_DashboardSidebar.scss"
import logo from "../../../images/logo.png"
import { BiAddToQueue } from "react-icons/bi"
import { MdPostAdd, MdOutlineReviews, MdOutlineDashboardCustomize } from "react-icons/md"
import { AiOutlineUnorderedList } from "react-icons/ai"
import { BsPeople, BsArrowDownUp } from "react-icons/bs"
// import { BiAddToQueue } from "react-icons/bi"
import { Link } from 'react-router-dom'

const DashboardSidebar = ({ show }) => {
    return (
        <>
            <div className={show ? 'DashboardSidebar_show' : 'DashboardSidebar'}>
                <Link to="/">
                    <img src={logo} alt="Ecommerce" />
                </Link>
                <div className='DashboardSidebarContainer'>
                    <Link className='link' to={'/admin/dashboard'}>
                        <p>
                            <MdOutlineDashboardCustomize size={22} />
                            <span>DASHBOARD</span>
                        </p>
                    </Link>
                    <hr />
                    <div >
                        <BsArrowDownUp />
                        <span>PRODUCTS</span>
                        <div className='dropdownMenu'>
                            {/* <hr /> */}
                            <Link to="/admin/products">
                                <p>
                                    <MdPostAdd size={22} />
                                    <span>ALL</span></p>
                            </Link>
                            <hr />
                            <Link to="/admin/product">
                                <p>
                                    <BiAddToQueue size={22} />
                                    <span>CREAT</span></p>
                            </Link>
                        </div>
                    </div>
                    <hr />
                    <Link to={"/admin/orders"}>
                        <p>
                            <AiOutlineUnorderedList size={22} />
                            <span>ORDERS</span></p>
                    </Link>
                    <hr />
                    <Link to={"/admin/users"}>
                        <p>
                            <BsPeople size={22} />
                            <span>USERS</span></p>
                    </Link>
                    <hr />
                    <Link to={"/admin/reviews"}>
                        <p>
                            <MdOutlineReviews size={22} />
                            <span>REVIEWS</span></p>
                    </Link>
                    <hr />

                </div>
            </div>
        </>
    )
}

export default DashboardSidebar
