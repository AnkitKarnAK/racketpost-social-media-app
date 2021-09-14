import React from "react";
import profilePicIcon from "../../assets/profile-icon.svg";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "./profile.css";
import { useSelector } from "react-redux";
import { logoutUser, selectUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { Sidebar } from "../sidebar/Sidebar";
import { BottomNavbar } from "../bottomNavbar/BottomNavbar";

const Profile = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      {user ? (
        <>
          <Sidebar />
          <BottomNavbar />
          <div className="profile-container">
            <h1>Profile page</h1>
            <div className="profile-user-info">
              <img
                className="avatar"
                src={user?.profileUrl ? user.profileUrl : profilePicIcon}
                alt="avatar"
              />
              <span className="profile-user-name">{user?.username}</span>
            </div>
            <div className="profile-user-email">{user?.email}</div>
            <div className="profile-links">
              <Link to="/">Home</Link>
              <Link to={`/users/${user.userId}`}>My Posts</Link>
            </div>
            <div className="profile-logout-container">
              <button
                onClick={logoutHandler}
                className="button-primary profile-logout-button"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default Profile;
