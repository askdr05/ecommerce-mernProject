import React, { useEffect, useState } from 'react'
import "./_updateProfile.scss"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RxAvatar } from "react-icons/rx"
import { MdOutlineMail } from "react-icons/md"
import { loadUser, userUpdate } from '../../redux/slices/user/userApi'
import { clearError, reSetState } from '../../redux/slices/user/userUpdateSlice'
import Title from '../Title'

const UpadteProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(state => state.user)
    const { error, isUpdated } = useSelector(state => state.updatedUser)

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('https://cdn-icons-png.flaticon.com/512/147/147144.png')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(userUpdate(myForm));
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }


        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (isUpdated) {
            alert("Profile Updated Successfully");
            dispatch(loadUser());

            navigate("/myaccount");
            dispatch(reSetState())
        }
    }, [dispatch, error, user, navigate, isUpdated])


    return (
        <>

            <Title title={`Update Profile`} />
            <div className="updateProfileContainer">
                <div className="updateProfileBox">
                    <h2 className="updateProfileHeading">Update Profile</h2>

                    <form
                        className="updateProfileForm"
                        encType="multipart/form-data"
                        onSubmit={updateProfileSubmit}
                    >
                        <div className="updateProfileName">
                            <RxAvatar className='icons' size={22} />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="updateProfileEmail">
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

                        <div id="updateProfileImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProfileDataChange}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Update"
                            className="updateProfileBtn"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpadteProfile
