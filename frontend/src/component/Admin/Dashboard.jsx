import React, { Fragment, useEffect } from "react";
import SideBar from "./SideBar.jsx";
import "./dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Chart from "chart.js/auto";
import { Line, Doughnut } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getAdminProduct } from "../../actions/productActions.js";
import { useAlert } from "react-alert";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userActions.js";
Chart.register(CategoryScale);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrder);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  let totalSale =
    orders && orders.reduce((total, order) => total + order.totalPrice, 0);

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const lineState = {
    labels: ["INITIAL CAPITAL", "PROFIT"],
    datasets: [
      {
        label: "NET AMOUNT",
        backgroundColor: ["rgb(66 138 147)"],
        hoverBackgroudColor: ["rgb(66 ,138, 147, 0.5)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["OUT OF STOCK", "IN STOCK", "IN ORDER"],
    datasets: [
      {
        backgroundColor: ["#368fed", "#e3306e", "lightgreen"],
        hoverBackgroudColor: ["4B5000", "35014F"],
        data: [outOfStock, products.length - outOfStock, 40],
      },
    ],
  };
  return (
    <div className="dashboard">
      <SideBar />
      <div className="dashboardContainer">
        <Typography component={"h1"}>
          Dashboard <QueryStatsIcon fontSize="large" />
        </Typography>
        <div className="dashboardSummary">
          <div className="dashboardSummaryBox2">
            <Link to={"/admin/products"}>
              <div className="topPopDiv">
                <Inventory2Icon />
              </div>
              <p>Products</p>
              <p>{products.length}</p>
              <hr />
            </Link>
            <Link to={"/admin/orders"}>
              <div className="topPopDiv">
                <EqualizerIcon />
              </div>
              <p>Orders</p>
              <p>{orders && orders.length}</p>
              <hr />
            </Link>
            <Link to={"/admin/users"}>
              <div className="topPopDiv">
                <PersonAddIcon />
              </div>
              <p>Users</p>
              <p>{users.length}</p>
              <hr />
            </Link>
          </div>
          <div>
            <p>
              Total Amount <br />
              {totalSale}
            </p>
          </div>
        </div>

        <div className="charts">
          <div className="lineChart">
            <Line data={lineState} />
          </div>
          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
