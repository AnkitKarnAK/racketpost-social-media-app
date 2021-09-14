import "./userPosts.css";
import { useSelector } from "react-redux";
import { selectPosts } from "../../features/postsSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Post from "../post/Post";
import { Sidebar } from "../sidebar/Sidebar";
import { BottomNavbar } from "../bottomNavbar/BottomNavbar";

const UserPosts = () => {
  const { userId } = useParams();

  const posts = useSelector(selectPosts);

  const [selectedUserPosts, setSelectedUserPosts] = useState([]);

  useEffect(() => {
    const filterUserPosts = posts.filter(({ post }) => post.userId === userId);
    setSelectedUserPosts(filterUserPosts);
  }, [posts, userId]);

  return (
    <>
      <Sidebar />
      <BottomNavbar />
      <div className="userPosts-container">
        {selectedUserPosts.map(({ id, post }) => {
          return <Post key={id} id={id} post={post} />;
        })}
      </div>
    </>
  );
};

export default UserPosts;
