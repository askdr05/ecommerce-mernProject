import React from 'react'
import { Outlet, Navigate, } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import Redirect  from 'react-router-dom'

const ProtectedRoute = ({loggedIn}) => {  

    // if (!loggedIn) {
    //     return <Navigate to="/login" replace />
    // }
    return (
       loggedIn?<Outlet/>:<Navigate to="/login"  />
    )
}

export default ProtectedRoute
