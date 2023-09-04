import React, { useEffect, useState } from 'react'

// import DashboardSidebar from './dashboardLayot/DashboardSidebar'
import "./_Dashboard.scss"
import { useDispatch, useSelector } from 'react-redux';
import { getAllAdminProducts } from '../../redux/slices/products/productApi';
import { Link } from 'react-router-dom';
import { Doughnut,Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale, LinearScale, PointElement, LineController, LineElement  } from "chart.js";
import { getAdminOrders } from '../../redux/slices/order/orderApi';
const Dashboard = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.allProducts);

  const {adminOrders} = useSelector(state=>state.order)

  // const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  data &&
  data.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAllAdminProducts());
    dispatch(getAdminOrders())
    // dispatch(getAllUsers());
  }, [dispatch]);
  ChartJS.register(ArcElement,CategoryScale,LinearScale,PointElement,LineElement );
  let totalAmount = 0;
  // orders &&
  //   orders.forEach((item) => {
  //     totalAmount += item.totalPrice;
  //   });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, data.length - outOfStock],
        fill: true,
      },
    ],
  };

  return (
    <div className="dashboard">
      {/* <MetaData title="Dashboard - Admin Panel" />
      <Sidebar /> */}

      <div className="dashboardContainer">
        {/* <h2 component="h1">Dashboard</h2> */}

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> {totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{data && data.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{adminOrders && adminOrders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              {/* <p>{users && users.length}</p> */}
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard

