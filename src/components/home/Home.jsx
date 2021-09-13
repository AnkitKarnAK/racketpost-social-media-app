import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

import { Sidebar } from "..//sidebar/Sidebar";
import { BottomNavbar } from "..//bottomNavbar/BottomNavbar";

const Home = () => {
  const user = useSelector(selectUser);
  return (
    <div>
      <Sidebar />

      <BottomNavbar />
      {user?.displayName}
    </div>
  );
};

export default Home;
