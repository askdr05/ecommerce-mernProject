import React, { useState } from 'react'
import "./_ShippingInfo.scss"
import { useDispatch, useSelector } from 'react-redux'
import { Country, State, City } from 'country-state-city';
import { useNavigate } from 'react-router-dom';
import { saveShippingInfo } from '../../redux/slices/cartSlice';
import CheckOutSteps from './CheckOutSteps';
import { MdOutlinePinDrop, MdLocationCity } from "react-icons/md"
import { AiOutlineHome, AiOutlinePhone, AiOutlineGlobal } from "react-icons/ai"
import { RiUserLocationLine } from "react-icons/ri"
import Title from '../Title';

const ShippingInfo = () => {

    const dispatch = useDispatch()
    const { shippingInfo } = useSelector(state => state.cart)
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();
        if (phoneNo.length < 10 || phoneNo.length > 10) {
            alert("Phone Number should be 10 digits Long");
            return;
        }
        dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }))
        navigate("/confirmOrder")
    }
    return (
        <>
            <Title title={"Shipping Details"} />
            <div className="shippingContainer">
                <CheckOutSteps activeStep={0} />
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>

                    <form
                        className="shippingForm"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                    >
                        <div>
                            <AiOutlineHome />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <MdLocationCity />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <MdOutlinePinDrop />
                            <input
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>

                        <div>
                            <AiOutlinePhone />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                size="10"
                            />
                        </div>

                        <div>
                            <AiOutlineGlobal />
                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {country && (
                            <div>

                                <RiUserLocationLine />
                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}

                        <input
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>

        </>
    )
}

export default ShippingInfo
