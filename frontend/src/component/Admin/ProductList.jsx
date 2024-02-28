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
  deleteProduct,
  getAdminProduct,
} from "../../actions/productActions";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { products, loading, error } = useSelector((state) => state.products);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.product
  );

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
      alert.success("Product Deleted Successsfully ");
      navigate("/admin/dashboard");
      dispatch({
        type: DELETE_PRODUCT_RESET,
      });
    }
    dispatch(getAdminProduct());
  }, [dispatch, alert, error, isDeleted, deleteError, navigate]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 150,
      type: "number",
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 270,
      type: "number",
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
            <Link to={`/admin/product/${params.id}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() => {
                deleteProductHandler(params.id);
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        price: item.price,
        name: item.name,
        stock: item.stock,
      });
    });

  return (
    <Fragment>
      <MetaData title={"ALL PRODUCTS - ADMIN"} />

      <div className="dashboard">
        <SideBar />

        <div className="productListContainer">
          <h1 className="productListHeading">All Products</h1>

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

export default ProductList;
