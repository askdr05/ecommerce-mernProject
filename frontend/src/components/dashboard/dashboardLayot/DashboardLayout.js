import React, { useState } from 'react'
import DashboardSidebar from './DashboardSidebar'
import DashbordHeader from './DashbordHeader'

const DashboardLayout = ({children,heading}) => {

    const [show,setShow] = useState(false)

    const handelshow = () => {
        setShow((value) => !value)
    }
  return (
    <div className='app'>
    <DashbordHeader handelshow={handelshow} heading={heading} />
    <div className='app_elements'>
    <DashboardSidebar show={show} />
        {children}
    </div>
    {/* <Footer /> */}
    {/* <div>{heading}</div> */}

</div>
  )
}

export default DashboardLayout
