import React, { Fragment, useState } from "react";
import "./Header.css";
import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logoutUser } from "../../../actions/userActions";


const UserOptions = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  const dashboard = () => {
    navigate("/dashboard");
  };
  const orders = () => {
    navigate("/orders");
  };
  const account = () => {
    navigate("/account");
  };
  const logout = () => {
    dispatch(logoutUser());
    alert.success("Logged Out Successfully");
  };

  const options = [
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <ExitToAppIcon />, name: "Log Out", func: logout },
  ];
  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <Fragment>
        <Backdrop open= {open}  />
      <SpeedDial
      className="speedDial"
        ariaLabel={"speed dial tooltip example"}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        // direction="top"
        tooltipplacement = "top"
        icon={
          <img
            className="speedDialIcon"
            src={
              user.avatar.image_url ? user.avatar.image_url : "./Profile.png"
            }
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
          key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
