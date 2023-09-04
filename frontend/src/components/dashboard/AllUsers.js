
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { AiTwotoneEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { adminDeleteUsers, getAllUsers } from '../../redux/slices/user/userApi';
import { clearUsersSliceError, usersStateReset } from '../../redux/slices/user/usersSlice';

const AllUsers = () => {
    const dispatch = useDispatch();
    const {users,error,success:isDeleted} = useSelector(state=>state.users)
    const columns = [
        { field: "id", headerName: "User ID", minWidth: 300, flex: 0.5, filter: true },

        {
            field: "email",
            headerName: "Email",
            minWidth: 100,
            flex: 1,

        },
        {
            field: "name",
            headerName: "Name",
            //   type: "number",
            minWidth: 200,
            flex: 0.3,
            // sortable: true,
            // unSortIcon: true 
        },

        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 100,
            flex: 0.5,
            cellStyle: (params) => (params.value === "admin" ? { color: "green" } : { color: "red" }),
            // sortable: true,
            // unSortIcon: true 
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
                        <Link style={{ textDecoratio: false, color: 'black', margin: 10 }} to={`/admin/updateUser/${params.data.id}`}>
                            <AiTwotoneEdit size={22} />
                            {/* jhgjhgbjkn */}
                        </Link>


                        <MdDelete size={22} onClick={() => dispatch(adminDeleteUsers(params.data.id))} />
                    </>
                );
            },
        },
    ];

    const rows = [];


    users &&
        users.forEach((item) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
                name: item.name,
            });
        });

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearUsersSliceError());
        }
        console.log(rows)


        if (isDeleted) {
            alert("User Deleted");
            //   history.push("/admin/dashboard");
            dispatch(usersStateReset());
        }

        dispatch(getAllUsers());
    }, [dispatch, alert, error, isDeleted]);
    return (

        <div className='griid_container ag-theme-alpine'>
            <AgGridReact
                rowData={rows}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
            />
        </div>

    )
}

export default AllUsers
