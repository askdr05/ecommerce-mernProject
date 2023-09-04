import React from 'react'
import "./_contact.scss"
import { BsTelephone } from "react-icons/bs"
import { FiMail } from "react-icons/fi"
import Title from '../Title'
import Header from '../Header/Header'
import Footer from '../footer/Footer'
const ContactPage = () => {

  return (
    <>
    <Title title={"Contact"}/>
    <Header/>
      <div className="contactContainer">
        <h2>Contact Us</h2>
        <div>
          <div>
            <BsTelephone />
            <h5>By Phone</h5>
            <p>(Monday to Friday, 9am to 4pm)</p>
            <span>1-877-930-7483</span>
          </div>
          <div>
            <FiMail />
            <h5>By Email</h5>
            <p>(24 X 7)</p>
            <span>contactEcommarce@gmail.com</span>
          </div>
        </div>

      </div>
      <Footer/>
    </>
  )
}

export default ContactPage
