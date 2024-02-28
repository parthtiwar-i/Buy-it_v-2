import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productReviews.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import {
  clearError,
  deleteReview,
  getAllReviews,
} from "../../actions/productActions";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { reviews, loading, error } = useSelector((state) => state.reviews);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.deleteReview
  );

  useEffect(() => {
    if (productId && productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      dispatch(clearError());
      alert.error(error);
    }
    if (deleteError) {
      dispatch(clearError());
      alert.error(deleteError);
    }
    if (isDeleted) {
      alert.success("Review Deleted Successsfully ");
      navigate("/admin/reviews");
      dispatch({
        type: DELETE_REVIEW_RESET,
      });
    }
  }, [dispatch, alert, error, isDeleted, productId, deleteError, navigate]);

  const deleteReviewsHandler = (id, productId) => {
    dispatch(deleteReview(id, productId));
  };

  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 250, flex: 0.3 },
    {
      field: "user",
      headerName: "User",
      minWidth: 10,
      flex: 0.3,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 100,
      type: "number",
      flex: 0.1,
      classes: (params) => {
        return params.row["rating"] >= 3 ? "greenColor" : "redColor";
      },
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 100,
      type: "number",
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() => {
                deleteReviewsHandler(params.id, productId);
              }}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
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
        user: item.name,
        comment: item.comment,
      });
    });

  return (
    <Fragment>
      <MetaData title={"ALL REVIEWS - ADMIN"} />

      <div className="dashboard">
        <SideBar />

        <div className="productReviewsContainer">
          <form
            className="productReviewsForm updateReviewForm"
            encType="multipart/form-data"
            onSubmit={productReviewSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">All Reviews</h1>

            <div>
              <StarBorderPurple500Icon />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            <Button
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
              type="submit"
              id="createProductBtn"
            >
              Find Review
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableRowSelectionOnClick
              autoHeight={true}
              className="productListTable"
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
