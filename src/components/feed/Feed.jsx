import Post from "../post/Post";
import "./feed.css";
import { useState, useEffect } from "react";
import { db } from "../../firebase";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);

  return (
    <div className="feed">
      {posts.map(({ id, post }) => {
        return <Post key={id} id={id} post={post} />;
      })}
    </div>
  );
};

export default Feed;
