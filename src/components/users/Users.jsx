import { useEffect, useState } from "react";
import { BottomNavbar } from "../bottomNavbar/BottomNavbar";
import { Sidebar } from "../sidebar/Sidebar";
import "./users.css";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import User from "./User";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection("users")
      .orderBy("username")
      .onSnapshot((snapshot) => {
        setAllUsers(
          snapshot.docs
            .map((doc) => ({ user: doc.data() }))
            .filter((dbUser) => dbUser.user.userId !== user?.userId)
        );
      });
  }, [user?.userId]);

  return (
    <div>
      <Sidebar />
      <BottomNavbar />
      <div className="users-container">
        {allUsers.map(({ user: dbUser }) => {
          return <User key={dbUser.userId} dbUser={dbUser} />;
        })}
      </div>
    </div>
  );
};

export default Users;
