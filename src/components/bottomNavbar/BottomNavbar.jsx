import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { RiFileUserLine } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import "./bottomNavbar.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

export const BottomNavbar = () => {
  const user = useSelector(selectUser);

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
          <HiUsers />
          <p>
            <small>Users</small>
          </p>
        </div>
      </NavLink>
      <NavLink
        to={`/users/${user?.userId}`}
        className="secondary-color"
        //   activeClassName="primary-color"
      >
        <div className="footer--item">
          <RiFileUserLine />
          <p>
            <small>My Posts</small>
          </p>
        </div>
      </NavLink>
    </footer>
  );
};
