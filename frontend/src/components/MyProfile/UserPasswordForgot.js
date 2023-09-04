import { useDispatch, useSelector } from "react-redux"
import "./_UserPasswordForgot.scss"
import React, { useEffect, useState } from 'react'
import { userForgotPassword } from "../../redux/slices/user/userApi"
import { clearError, reSetState } from "../../redux/slices/user/userPasswordReset"
import { MdOutlineMail } from "react-icons/md"
import Title from "../Title"


const UserPasswordForgot = () => {
    const dispatch = useDispatch()

    const { error, message, loading }  = useSelector(state=>state.userPasswordReset)
    
    const [email, setEmail] = useState("")

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("email", email);
        dispatch(userForgotPassword(myForm));
      };

      useEffect(()=>{
        if (error) {
            alert(error);
            dispatch(clearError());
          }
      
          if (message) {
            alert(message);
            dispatch(reSetState())
          }
      },[error,dispatch,message,reSetState])

  return (
   <>
   <Title title={`Forget Password`}/>
    <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                <MdOutlineMail className='icons' size={22} />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
   
   </>
  )
}

export default UserPasswordForgot
