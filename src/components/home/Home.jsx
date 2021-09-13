// import { useSelector } from "react-redux";
// import { selectUser } from "../../features/userSlice";

import { Sidebar } from "..//sidebar/Sidebar";
import { BottomNavbar } from "..//bottomNavbar/BottomNavbar";
import "./home.css";
import CreatePost from "../createPost/CreatePost";

const Home = () => {
  // const user = useSelector(selectUser);
  return (
    <div>
      <Sidebar />

      <BottomNavbar />
      <div className="home-container">
        <CreatePost />
      </div>
    </div>
  );
};

export default Home;
