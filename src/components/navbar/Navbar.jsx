import { NavLink } from "react-router-dom";

import userLoginIcon from "../../assets/user-login.svg";
import profileIcon from "../../assets/profile-icon.svg";
import homeIcon from "../../assets/home-icon.svg";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import "./navbar.css";

export const Navbar = () => {
  const user = useSelector(selectUser);

  return (
    <>
      <nav className="nav">
        <NavLink to="/" className="nav-header">
          <span className="nav-header-secondary">Racket</span>
          <span className="nav-header-primary">Post</span>
        </NavLink>
        <div className="nav-links">
          <div className="button-badge-container">
            <button className="nav-button">
              <NavLink
                to="/"
                className="nav-icon-container"
                // activeClassName="nav-link-active"
              >
                <img src={homeIcon} alt="home" className="nav-icons" />
                Home
              </NavLink>
            </button>
          </div>
          {user ? (
            <>
              <div className="button-badge-container">
                <button className="nav-button">
                  <NavLink
                    to="/profile"
                    className="nav-icon-container"
                    // activeClassName="nav-link-active"
                  >
                    <img
                      src={user?.profileUrl ? user.profileUrl : profileIcon}
                      alt="Profile"
                      className="nav-icons"
                    />
                    {user?.username ? user.username : "Profile"}
                  </NavLink>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="button-badge-container">
                <button className="nav-button">
                  <NavLink
                    to="/login"
                    className="nav-icon-container"
                    // activeClassName="nav-link-active"
                  >
                    <img
                      src={userLoginIcon}
                      alt="Login"
                      className="nav-icons"
                    />
                    Login
                  </NavLink>
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
