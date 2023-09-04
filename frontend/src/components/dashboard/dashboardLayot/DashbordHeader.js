import React from 'react'
import { FaBars } from "react-icons/fa"
import "./_DashbordHeader.scss"

const DashbordHeader = ({handelshow,heading}) => {
  return (
    <div className='dashBordHeader'>
       <FaBars className='dashboard_menu' size={26} onClick={handelshow} />
       <span>{heading}</span>
    </div>
  )
}

export default DashbordHeader
