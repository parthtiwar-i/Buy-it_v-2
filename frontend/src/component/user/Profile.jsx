import React, { Fragment, useEffect } from "react";
import "./profile.css";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profile-container">
            <div>
              <h1>My Profile</h1>
              {user.avatar && (
                <img src={user.avatar.image_url} alt={user.name} />
              )}
              <Link to={"/me/update"}>Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.CreatedAt).substring(0, 10)}</p>
              </div>

              <div>
                <Link to={"/orders"}>Orders</Link>
                <Link to={"/password/update"}>Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
