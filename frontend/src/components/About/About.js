import React from 'react'
import { AiOutlineYoutube } from 'react-icons/ai'
import { AiOutlineInstagram } from 'react-icons/ai'
import "./_About.scss"
import Title from '../Title'


const About = () => {
    return (
        <>
        <Title title={"About"}/>
      
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <h1>About Us</h1>

                <div>
                    <div>
                        <img
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/tripleayt/image/upload/v1631555947/products/jpyibarlaxawvcvqjv5b.png"
                            alt="Founder"
                        />
                        <p>Akash Sikder</p>
                        {/* <button onClick={visitInstagram} color="primary">
                            Visit Instagram
                        </button> */}
                        <span>
                            This is a sample wesbite made by @AkashSikder.
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <h2>Our Brands</h2>

                        <AiOutlineYoutube className="youtubeSvgIcon" />
                        <AiOutlineInstagram className="instagramSvgIcon" />

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default About
