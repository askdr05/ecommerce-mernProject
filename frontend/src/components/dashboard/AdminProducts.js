import React, { useEffect } from 'react'
import "./_AdminProducts.scss"
import { useDispatch, useSelector } from 'react-redux';
// import { getAllAdminProducts } from '../../../../BackEnd/controllers/productControllers';
import { clearError } from '../../redux/slices/products/productsSlice';
import { Link } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { deleteProduct, getAllAdminProducts } from '../../redux/slices/products/productApi';
// import DashboardSidebar from './dashboardLayot/DashboardSidebar';
import { AiTwotoneEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { ClearError, productStateReset } from '../../redux/slices/products/ProductSlice';

const AdminProducts = () => {
    const dispatch = useDispatch();

    // const alert = useAlert();

    const { Error, data } = useSelector((state) => state.allProducts);
    const { error, success,message } = useSelector((state) => state.product);




    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 300, flex: 0.5, filter: true },

        {
            field: "name",
            headerName: "Name",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            // type: "number",
            minWidth: 150,
            flex: 0.3,
            sortable: true,
            unSortIcon: true
        },

        {
            field: "price",
            headerName: "Price",
            // type: "number",
            minWidth: 200,
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
                        <Link style={{ textDecoratio: false, color: 'black', margin: 10 }} to={`/admin/updateProduct/${params.data.id}`}>
                            <AiTwotoneEdit size={22} />
                            {/* jhgjhgbjkn */}
                        </Link>


                       <MdDelete onClick={() => dispatch(deleteProduct(params.data.id))} size={22} />
                    </>
                );
            },
        },
    ];

    const rows = [];

    data &&
        data.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.Stock,
                price: item.price,
                name: item.name,
            });
        });

    useEffect(() => {
        if (Error) {
            //   alert(Error);
            dispatch(clearError());
        }
        console.log(rows)

        if (error) {
          alert(error);
          dispatch(ClearError());
        }

        if (success) {
          alert(message);
        //   history.push("/admin/dashboard");
          dispatch(productStateReset());
        }

        dispatch(getAllAdminProducts());
    }, [dispatch, alert, Error,error,success,message]);
    return (

        <div className='griid_container ag-theme-alpine'>
            <AgGridReact
                rowData={rows}
                columnDefs={columns}
                pagination={true}
                enableCellTextSelection={true}
            />
        </div>

    )
}

export default AdminProducts
