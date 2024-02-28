import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import LaunchIcon from "@mui/icons-material/Launch";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { clearError, myOrders } from "../../actions/orderAction";
import "./myOrders.css";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);

  const { orders, loading, error } = useSelector((state) => state.myOrders);

  const columns = [
    { field: "id", headerName: "OrderID", width: 300, flex: 1 },
    { field: "status", headerName: "Status", width: 150, flex: 0.5, 
    cellClassName : (params)=> {
      return params.row["status"] === "Delivered"? "redColor" : "greenColor"
    }
    },
    {
      field: "itemsQuantity",
      headerName: "Items Quantity",
      type: "number",
      width: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      width: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQuantity: item.orderItems.length,
        id: item._id,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            desableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography className="myOrdersHeading">
            {user.name}'s Orders
          </Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
