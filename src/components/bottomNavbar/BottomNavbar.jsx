import { NavLink } from "react-router-dom";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { MdChat } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import "./bottomNavbar.css";

export const BottomNavbar = () => {
  return (
    <footer className="footer-nav">
      <NavLink
        end
        to="/"
        className="secondary-color"
        // activeClassName="primary-color"
      >
        <div className="footer--item">
          <FaHome />
          <p>
            <small>Home</small>
          </p>
        </div>
      </NavLink>
      <NavLink
        to="/users"
        className="secondary-color"
        // activeClassName="primary-color"
      >
        <div className="footer--item">
          <FaUserAlt />
          <p>
            <small>Users</small>
          </p>
        </div>
      </NavLink>
      <a
        href="https://racketchat.netlify.app"
        target="_blank"
        rel="noreferrer"
        className="secondary-color"
      >
        <div className="footer--item">
          <MdChat />
          <p>
            <small>RacketChat</small>
          </p>
        </div>
      </a>

      <NavLink
        to="/profile"
        className="secondary-color"
        // activeClassName="primary-color"
      >
        <div className="footer--item">
          <HiUsers />
          <p>
            <small>Profile</small>
          </p>
        </div>
      </NavLink>
    </footer>
  );
};
