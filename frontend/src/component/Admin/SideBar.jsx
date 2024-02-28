import React from "react";
import "./sideBar.css";
import { TreeView, TreeItem } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Link } from "react-router-dom";
import logo from "../../images/Buy-it-logo.svg";

const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to={"/"}>
        <img src={logo} alt="Buy-It" />
      </Link>
      <Link to={"/admin/dashboard"}>
        <DashboardIcon /> Dashboard
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<KeyboardDoubleArrowUpIcon />}
          defaultExpandIcon={<KeyboardDoubleArrowDownIcon />}
        >
          <TreeItem nodeId="1" label="Products"  >
            <Link to={"/admin/products"}>
              <TreeItem sx={{ fontSize: 34}} nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to={"/admin/product"}>
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to={"/admin/orders"}>
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to={"/admin/users"}>
        <p>
          <PeopleIcon />
          Users
        </p>
      </Link>
      <Link to={"/admin/reviews"}>
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default SideBar;
