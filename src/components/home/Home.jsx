import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const Home = () => {
  const user = useSelector(selectUser);
  return <div>Home page {user?.displayName}</div>;
};

export default Home;
