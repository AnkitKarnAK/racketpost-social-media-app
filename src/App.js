import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";

import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "./features/userSlice";
import { auth, db } from "./firebase";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import { Navbar } from "./components/navbar/Navbar";
import Error404 from "./components/error404/Error404";
import Users from "./components/users/Users";
import UserPosts from "./components/userPosts/UserPosts";
import { addPosts } from "./features/postsSlice";

function App() {
  // const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          loginUser({
            userId: authUser.uid,
            username: authUser.displayName,
            email: authUser.email,
            profileUrl: authUser.photoURL,
          })
        );
      } else {
        dispatch(logoutUser());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        dispatch(
          addPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              post: {
                caption: doc.data().caption,
                username: doc.data().username,
                userId: doc.data().userId,
                imageUrl: doc.data().imageUrl,
                profileUrl: doc.data().profileUrl,
                comments: doc.data().comments,
                likes: doc.data().likes,
              },
            }))
          )
        );
      });
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId/" element={<UserPosts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
