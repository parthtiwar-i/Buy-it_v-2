import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";
import {
  clearError,
  deleteOrder,
  getAllOrders,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";

const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { orders, loading, error } = useSelector((state) => state.allOrder);
  const { isDeleted, error: deleteError } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      dispatch(clearError());
      alert.error(error);
    }
    if (deleteError) {
      dispatch(clearError());
      alert.error(deleteError);
    }
    if (isDeleted) {
      alert.success("Order Deleted Successsfully ");
      navigate("/admin/orders");
      dispatch({
        type: DELETE_ORDER_RESET,
      });
    }
    dispatch(getAllOrders());
  }, [dispatch, alert, error, isDeleted, deleteError, navigate]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const columns = [
    { field: "id", headerName: "OrderID", width: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row["status"] === "Delivered" ? "redColor" : "greenColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Quantity",
      type: "number",
      width: 150,
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 270,
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 150,
      type: "number",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.id}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() => {
                deleteOrderHandler(params.id);
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

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        amount: item.totalPrice,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
      });
    });

  return (
    <Fragment>
      <MetaData title={"ALL ORDERS - ADMIN"} />

      <div className="dashboard">
        <SideBar />

        <div className="productListContainer">
          <h1 className="productListHeading">All Orders</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            autoHeight={true}
            className="productListTable"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
