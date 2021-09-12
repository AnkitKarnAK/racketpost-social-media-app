import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";

import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "./features/userSlice";
import { auth } from "./firebase";
import Home from "./components/home/Home";
import { Navbar } from "./components/navbar/Navbar";
import { Sidebar } from "./components/sidebar/Sidebar";
import { BottomNavbar } from "./components/bottomNavbar/BottomNavbar";

function App() {
  // const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          loginUser({
            uid: authUser.uid,
            displayName: authUser.displayName,
            email: authUser.email,
            photoURL: authUser.photoURL,
          })
        );
      } else {
        dispatch(logoutUser());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <BottomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
