import Stepper from 'react-stepper-horizontal';
import React from 'react'
import "./_stepper.scss"

const CheckOutSteps = ({ activeStep }) => {
    const steps = [
        { title: 'Shipping Info' },
        { title: 'Booking confirmation' },
        { title: 'Payment' },
    ];
    return (
        <div className='stepper'>
            <Stepper
                steps={steps}
                activeStep={activeStep}
                activeColor="tomato"
                completeColor="tomato"
                activeTitleColor="tomato"
                completeTitleColor="tomato"
                circleFontColor="white"
                completeBarColor="tomato"
            />
        </div>
    )
}

export default CheckOutSteps
