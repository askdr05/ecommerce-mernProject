
import React, { useEffect, useState } from 'react'
import './App.css';
import Layout from './components/Layout/Layout';
import HomeScreen from './components/HomeScreen/HomeScreen';
import Product from './components/Product/Product';
import ProductHome from "./components/productHome/ProductHome"
import { loadUser } from './redux/slices/user/userApi';
import UserProfile from './components/MyProfile/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import UpadteProfile from './components/MyProfile/UpadteProfile';
import UserPasswordUpdate from './components/MyProfile/UserPasswordUpdate';
import UserPasswordForgot from './components/MyProfile/UserPasswordForgot';
import ResetPassword from './components/MyProfile/ResetPassword';
// import { clearError } from './redux/slices/user/userLoginSlice';

import {
  Routes,
  Route,
  // Navigate,
  // useNavigate,
} from "react-router-dom";
import LoginSignUp from './components/LoginSignUp/LoginSignUp';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import ShippingInfo from './components/Cart/ShippingInfo';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import axios from 'axios';
import PayMentPage from './components/Cart/PayMentPage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/MyOrders/MyOrders';
import OrderDetails from './components/MyOrders/OrderDetails';
import Dashboard from './components/dashboard/Dashboard';
import AdminProducts from './components/dashboard/AdminProducts';
// import DashboardSidebar from './components/dashboard/dashboardLayot/DashboardSidebar';
import DashboardLayout from './components/dashboard/dashboardLayot/DashboardLayout';
import CreatProduct from './components/dashboard/CreatProduct';
import UpdateProduct from './components/dashboard/UpdateProduct';
import OrderList from './components/dashboard/OrderList';
import OrederUpdate from './components/dashboard/OrederUpdate';
import AllUsers from './components/dashboard/AllUsers';
import UserRollUpdate from './components/dashboard/UserRollUpdate';
import ProductReviewsProcess from './components/dashboard/ProductReviewsProcess';
import ContactPage from './components/Contact/ContactPage';
import About from './components/About/About';






const App = () => {
  const dispatch = useDispatch()
  const { loggedIn, user } = useSelector(state => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/sendStripeApikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    dispatch(loadUser())
    getStripeApiKey()
    // dispatch(clearError())
    console.count()
  }, [dispatch])

  return (

    <Routes>

      <Route path='/' exact element={<Layout><HomeScreen /></Layout>} />
      <Route path='/products/:id' exact element={<Layout><Product /></Layout>} />
      <Route path='/Search/:keyword' exact element={<Layout><ProductHome /></Layout>} />
      <Route path='/category/:category' exact element={<Layout><ProductHome /></Layout>} />
      <Route path='/login' exact element={<LoginSignUp />} />
      <Route path='/contact' exact element={<ContactPage/>} />
      <Route path='/about' exact element={<About/>} />

      {/* {(loggedIn )&&<Route path='/myaccount' exact element = {<Layout><UserProfile/></Layout>}/>} */}
      {/* <Route  path='/myaccount' exact element = {<ProtectedRoute><Layout><UserProfile/></Layout></ProtectedRoute>}/> */}

      <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
        <Route path='/myaccount' exact element={<Layout><UserProfile /></Layout>} />
        <Route path='/myorder' exact element={<Layout></Layout>} />
        <Route path='/me/update' exact element={<UpadteProfile />} />
        <Route path='/me/update/password' exact element={<UserPasswordUpdate />} />
        <Route path='/shipping' exact element={<Layout><ShippingInfo /></Layout>} />
        <Route path='/confirmOrder' exact element={<Layout><ConfirmOrder /></Layout>} />
        <Route path='/success' exact element={<Layout><OrderSuccess /></Layout>} />
        <Route path='/orders' exact element={<Layout><MyOrders /></Layout>} />
        <Route path='/order/:id' exact element={<Layout><OrderDetails /></Layout>} />

        {stripeApiKey && <Route path='/process/payment' exact element={
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Layout><PayMentPage /></Layout>
          </Elements>
        } />}

        <Route path='/admin/dashboard' exact element={<DashboardLayout heading={"Dashboard"} ><Dashboard /></DashboardLayout>} />
        <Route path='/admin/products' exact element={<DashboardLayout heading={"Products"} ><AdminProducts /></DashboardLayout>} />
        <Route path='/admin/product' exact element={<DashboardLayout heading={"Products"} ><CreatProduct /></DashboardLayout>} />
        <Route path='/admin/updateProduct/:id' exact element={<DashboardLayout heading={"Products"} ><UpdateProduct /></DashboardLayout>} />
        <Route path='/admin/orders' exact element={<DashboardLayout heading={"Products"} ><OrderList /></DashboardLayout>} />
        <Route path='/admin/updateOrder/:id' exact element={<DashboardLayout heading={"Products"} ><OrederUpdate /></DashboardLayout>} />
        <Route path='/admin/users' exact element={<DashboardLayout heading={"Products"} ><AllUsers /></DashboardLayout>} />
        <Route path='/admin/updateUser/:id' exact element={<DashboardLayout heading={"Products"} ><UserRollUpdate /></DashboardLayout>} />
        <Route path='/admin/reviews' exact element={<DashboardLayout heading={"Products"} ><ProductReviewsProcess /></DashboardLayout>} />
      </Route>
      <Route path='/password/forget' exact element={<UserPasswordForgot />} />
      <Route path='/password/reset/:token' exact element={<ResetPassword />} />
      <Route path='/myCart' exact element={<Layout><Cart /></Layout>} />



    </Routes>
  )
}

export default App




