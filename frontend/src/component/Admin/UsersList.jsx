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
import { clearError, deleteUser, getAllUsers } from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { users, error } = useSelector((state) => state.allUsers);
  const {
    isDeleted,
    error: deleteError,
    message,
  } = useSelector((state) => state.profile);

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
      alert.success(message);
      navigate("/admin/users");
      dispatch({
        type: DELETE_USER_RESET,
      });
    }
    dispatch(getAllUsers());
  }, [dispatch, alert, error, isDeleted, deleteError, navigate]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 0.3,
    },
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.8 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      type: "number",
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 270,
      type: "number",
      flex: 0.5,
      cellClassName: (params) => {
        return params.row["role"] === "admin" ? "greenColor" : "redColor";
      },
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
            <Link to={`/admin/user/${params.id}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() => {
                deleteUserHandler(params.id);
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

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        name: item.name,
        email: item.email,
      });
    });

  return (
    <Fragment>
      <MetaData title={"ALL USERS - ADMIN"} />

      <div className="dashboard">
        <SideBar />

        <div className="productListContainer">
          <h1 className="productListHeading">All Users</h1>

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

export default UserList;
