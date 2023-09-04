import React from 'react'
import "./_Layout.scss"
import Footer from '../footer/Footer';
import Header from '../Header/Header';
import Sidebar from "../SideBar/Sidebar"
import { useState } from 'react';
const Layout = ({ children }) => {
    const [toggleMenubar, setToggleMenuBar] = useState(false)
    const handelMenuBar = () => {
        setToggleMenuBar((value) => !value)
    }
    return (
        <div className='app'>
            <Header handelMenuBar={handelMenuBar} />
            <div className='app_elements'>
            <Sidebar toggleMenubar={toggleMenubar} />
                {children}
            </div>
            <Footer />

        </div>
    )
}

export default Layout
