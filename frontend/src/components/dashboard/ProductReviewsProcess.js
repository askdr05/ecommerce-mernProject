import React, { useEffect, useState } from 'react'
import "./_ProductReviewsProcess.scss"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { MdDelete } from "react-icons/md"
import { getAllReviews, deleteReviews } from '../../redux/slices/products/productApi';
import { clearError, reviewStateReset } from '../../redux/slices/products/reviewSlice';
const ProductReviewsProcess = () => {
    const dispatch = useDispatch();

    const [productId, setProductId] = useState("");

    const { loading, reviews, reviewDeleted, reviewError } = useSelector(state => state.review)
    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 250, flex: 0.5, filter: true },

        {
            field: "user",
            headerName: "User",
            minWidth: 150,
            flex: 0.4,

        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 0.6,
        },

        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 100,
            flex: 0.4,
            cellStyle: (params) => (params.value >= 3 ? { color: "green" } : { color: "red" }),
        },


        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 100,
            type: "number",
            sortable: false,
            cellRenderer: (params) => {
                return (
                    <MdDelete size={22} onClick={() => dispatch(deleteReviews({ reviewId: params.data.id, productId }))} />
                );
            },
        },
    ];

    const rows = [];

    reviews &&
        reviews.forEach((item) => {
            rows.push({
                id: item._id,
                rating: item.rating,
                comment: item.comment,
                user: item.name,
            });
        });

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    };

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }
        if (reviewError) {
            alert(reviewError);
            dispatch(clearError());
        }

        if (reviewDeleted) {
            alert("Review Deleted Successfully");
            //   history.push("/admin/reviews");
            dispatch(reviewStateReset());
        }
    }, [dispatch, alert, reviewError, reviewDeleted, productId]);


    return (
        <>

            {/* <div className='productReviews'> */}
            <div className="productReviewsContainer">
                <form
                    className="productReviewsForm"
                    onSubmit={productReviewsSubmitHandler}
                >
                    <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

                    <div>

                        <input
                            type="text"
                            placeholder="Product Id"
                            required
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                        />
                    </div>

                    <button
                        id="createProductBtn"
                        type="submit"
                        disabled={
                            loading ? true : false || productId === "" ? true : false
                        }
                    >
                        Search
                    </button>
                </form>

                {reviews && reviews.length > 0 ? (
                    <div className='griid_container ag-theme-alpine' >
                        <AgGridReact
                            rowData={rows}
                            columnDefs={columns}
                            pagination={true}
                            paginationPageSize={10}
                            
                        />
                    </div>

                ) : (
                    <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                )}
            </div>

            {/* </div> */}
        </>
    )
}

export default ProductReviewsProcess
