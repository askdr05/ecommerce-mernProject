import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, userPasswordUpdate } from '../../redux/slices/user/userApi'
import { useNavigate } from 'react-router-dom'
import { clearError, reSetState } from '../../redux/slices/user/userUpdateSlice'
import {MdVpnKey} from "react-icons/md"
import { BiLockOpen } from "react-icons/bi"

import "./_UserPasswordUpdate.scss"
import Title from '../Title'
const UserPasswordUpdate = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { error, isUpdated, loading } = useSelector(state => state.updatedUser)

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const updatePasswordSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(userPasswordUpdate(myForm))
    }

    useEffect(()=>{
        if (error) {
            alert(error);
            dispatch(clearError());
        }

        if (isUpdated) {
            alert("Password Updated Successfully");
            dispatch(loadUser());

            navigate("/myaccount");
            dispatch(reSetState())
        }
    },[dispatch, error, navigate, isUpdated])
    return (
       <>
       <Title title={`Password Update`}/>
        <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <MdVpnKey size={22} />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

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
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
       </>
    )
}

export default UserPasswordUpdate
