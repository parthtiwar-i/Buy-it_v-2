import React, { Fragment, useEffect, useRef, useState } from "react";
import "./updatePassword.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  loadUser,
  updatePassword,
} from "../../actions/userActions";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Password Updated SuccessFully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);
  return (
    <Fragment>
      <MetaData title={"Update Password"} />
      <div className="updatePasswordContainer">
        <div className="updatePasswordBox">
          <h2 className="updatePasswordHeading">Update Passwod</h2>
          <form
            className="updatePasswordForm"
            encType="multipart/form-data"
            onSubmit={updatePasswordSubmit}
          >
            <div className="updatePassword">
              <VpnKeyIcon />
              <input
                type="password"
                name="password"
                placeholder="Old Password"
                required
                value={oldPassword}
                onChange={(e)=>{setOldPassword(e.target.value)}}
              />
            </div>
            <div className="updatePassword">
              <LockIcon />
              <input
                type="password"
                name="password"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e)=>{setNewPassword(e.target.value)}}
              />
            </div>
            <div className="updatePassword">
              <LockIcon />
              <input
                type="password"
                name="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
              />
            </div>
            <input
              type="submit"
              value={"Update Password"}
              className="updatePasswordBtn"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
