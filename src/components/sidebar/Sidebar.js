import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdChat } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { RiFileUserLine } from "react-icons/ri";

import "./sidebar.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

export const Sidebar = () => {
  const user = useSelector(selectUser);

  return (
    <div className="sidebar-nav">
      <ul className="links-container">
        <NavLink
          end
          to="/"
          className="secondary-color"
          //   activeClassName="primary-color"
        >
          <li>
            <FaHome />
            <span className="link-name">Home</span>
          </li>
        </NavLink>
        <NavLink
          to="/users"
          className="secondary-color"
          //   activeClassName="primary-color"
        >
          <li>
            <HiUsers />
            <span className="link-name">Users</span>
          </li>
        </NavLink>
        <NavLink
          to={`/users/${user?.userId}`}
          className="secondary-color"
          //   activeClassName="primary-color"
        >
          <li>
            <RiFileUserLine />
            <span className="link-name">My Posts</span>
          </li>
        </NavLink>
        <a
          href="https://racketchat.netlify.app"
          target="_blank"
          rel="noreferrer"
          className="secondary-color"
        >
          <li>
            <MdChat />
            <span className="link-name">RacketChat</span>
          </li>
        </a>
      </ul>
    </div>
  );
};
