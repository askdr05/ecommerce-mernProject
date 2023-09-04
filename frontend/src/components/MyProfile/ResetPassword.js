import React, { useEffect, useState } from 'react'
import './_ResetPassword.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BiLockOpen } from "react-icons/bi"
import { clearError, reSetState } from '../../redux/slices/user/userPasswordReset'
import { userPasswordReset } from '../../redux/slices/user/userApi'
import Title from '../Title'

const ResetPassword = () => {
    const {token} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {error,success,loading} = useSelector(state=> state.userPasswordReset)

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const resetPasswordSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(userPasswordReset({token,myForm}))
    }

    useEffect(()=>{
     if(error){
        alert(error)
        dispatch(clearError())
     }
     if(success){
        alert('Password Reset Done Successfully')
        navigate('/login')
        dispatch(reSetState())
     }
    },[error,dispatch,success,navigate])
  return (
    <>
    <Title title={`Password Reset`}/>
      <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div className="loginPassword">
                  <BiLockOpen size={22}/>
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <BiLockOpen  size={22}/>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Reset"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
    </>
  )
}

export default ResetPassword
