import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { AiTwotoneEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { clearError, orderStateReset } from '../../redux/slices/order/orderSlice';
import { adminDeleteOrders, getAdminOrders } from '../../redux/slices/order/orderApi';

const OrderList = () => {
    const dispatch = useDispatch();

    // const alert = useAlert();

    const { adminOrders, error, success: isDeleted } = useSelector(state => state.order)




    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.5, filter: true },

        {
            field: "status",
            headerName: "Status",
            minWidth: 100,
            flex: 1,
            cellStyle: (params) => (params.value === "Delivered" ? { color: "green" } : { color: "red" }),
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            //   type: "number",
            minWidth: 200,
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
            minWidth: 150,
            // type: "number",
            sortable: false,
            cellRenderer: (params) => {
                return (
                    < >
                        <Link style={{ textDecoratio: false, color: 'black', margin: 10 }} to={`/admin/updateOrder/${params.data.id}`}>
                            <AiTwotoneEdit size={22} />
                            {/* jhgjhgbjkn */}
                        </Link>


                        <MdDelete size={22} onClick={() => dispatch(adminDeleteOrders(params.data.id))} />
                    </>
                );
            },
        },
    ];

    const rows = [];

    adminOrders &&
        adminOrders.forEach((item) => {
            rows.push({
                id: item._id,
                itemsQty: item.orderItems.length,
                amount: item.totalPrice,
                status: item.orderStatus,
            });
        });

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearError());
        }
        console.log(rows)


        if (isDeleted) {
            alert("Order Deleted");
            //   history.push("/admin/dashboard");
            dispatch(orderStateReset());
        }

        dispatch(getAdminOrders());
    }, [dispatch, alert, error, isDeleted]);
    return (

        <div className='griid_container ag-theme-alpine'>
            <AgGridReact
                rowData={rows}
                columnDefs={columns}
                pagination={true}
                enableCellTextSelection={true}
                // copyHeadersToClipboard={true}
            />
        </div>

    )
}

export default OrderList
