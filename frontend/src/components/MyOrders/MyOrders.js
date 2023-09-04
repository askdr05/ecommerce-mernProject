import React, { useEffect } from 'react'
import "./_MyOrders.scss"
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';

import { FiExternalLink } from "react-icons/fi"
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../redux/slices/order/orderSlice';
import { Orders } from '../../redux/slices/order/orderApi';
import Title from '../Title';

const MyOrders = () => {
  const dispatch = useDispatch()
  const { loading, error, myOrders } = useSelector(state => state.order)

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      resizable: true,
      minWidth: 200,
      flex: 0.7,
      filter: true,
      cellRenderer: (params) => <Link to={`/order/${params.data.id}`} style={{textDecoration:"none",color:"black"}}>

        {params.data.id}

      </Link>,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellStyle: (params) => (params.value === "Delivered" ? { color: "green" } : { color: "red" }),
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      //   type: "number",
      minWidth: 10,
      flex: 0.3,
      sortable: true,
      unSortIcon: true
    },

    {
      field: "amount",
      headerName: "Amount",
      //   type: "number",
      minWidth: 100,
      flex: 0.5,
      sortable: true,
      unSortIcon: true
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 10,
      //   type: "number",
      cellRenderer: (params) => <Link to={`/order/${params.data.id}`}>

        <FiExternalLink size={22} />

      </Link>,
    },
  ];

  const rows = [];

  myOrders &&
    myOrders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert(error)
      dispatch(clearError())

    }
    dispatch(Orders())
  }, [dispatch, error])
  return (
    <>
      <Title title={"Oders"} />
      <div className='griid_container ag-theme-alpine'>
        <AgGridReact
          rowData={rows}
          columnDefs={columns}
        />
      </div>
    </>
  )
}

export default MyOrders
