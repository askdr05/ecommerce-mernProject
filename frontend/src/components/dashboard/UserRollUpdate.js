import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx"
import { MdOutlineMail, MdAccountTree } from "react-icons/md"
import { clearError } from '../../redux/slices/user/userLoginSlice';
import { getUserDetails, userRollUpdate } from '../../redux/slices/user/userApi';
import { clearUsersSliceError, usersStateReset } from '../../redux/slices/user/usersSlice';
const UserRollUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // const alert = useAlert();

    const { id } = useParams();

   
    const {user, loading: updateLoading, success: userUpdateSuccess, error } = useSelector(state => state.users)


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

   

    useEffect(() => {

        if (user&&user._id !== id) {
            dispatch(getUserDetails(id));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if (error) {
            alert(error);
            dispatch(clearUsersSliceError());
        }

        if (userUpdateSuccess) {
            alert("user updated Successfully");
            navigate("/admin/users");
            dispatch(usersStateReset());
        }
        // dispatch(getUserDetails(id))
        // setName(user.name);
        // setEmail(user.email);
        // setRole(user.role);
    }, [dispatch, error, navigate, userUpdateSuccess,id,user]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(userRollUpdate({ id, myForm }));
    };
    return (
        <>
            {/* <MetaData title="Create Product" /> */}
            <div className="dashboard">
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateUserSubmitHandler}
                    >
                        <h1>Update User</h1>

                        <div>
                            <RxAvatar size={22} />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <MdOutlineMail size={22} />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <MdAccountTree size={22} />
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">Choose Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        <button
                            id="createProductBtn"
                            type="submit"
                            disabled={
                                updateLoading ? true : false || role === "" ? true : false
                            }
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserRollUpdate
