import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import "./_userProfile.scss"
import Title from '../Title'

const UserProfile = () => {
  const { user, loading, loggedIn, error } = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedIn) {
      alert(error)
      navigate("/login")
    }
  }, [loggedIn, error, navigate])
  return (
    <>
     <Title title={`${user.name}'s Profile`}/>
      <div className="profileContainer">
        <div>
          <h1>My Profile</h1>
          <img src={user.avatar.url} alt={user.name} />
          <Link to="/me/update">Edit Profile</Link>
        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{user.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div>
            <h4>Joined On</h4>
            <p>{String(user.createdAt).slice(0, 11)}</p>
          </div>

          <div>
            <Link to="/orders">My Orders</Link>
            <Link to="/me/update/password">Change Password</Link>
            {(loggedIn && user.role === "admin") &&
              <Link className='link' to={"/admin/dashboard"}>
                DASSHBOARD
              </Link>
            }
          </div>
        </div>
      </div>


    </>
  )
}



export default UserProfile
