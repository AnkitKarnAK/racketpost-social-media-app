import Post from "../post/Post";
import "./feed.css";
import { useSelector } from "react-redux";
import { selectPosts } from "../../features/postsSlice";

const Feed = () => {
  const posts = useSelector(selectPosts);

  return (
    <div className="feed">
      {posts.map(({ id, post }) => {
        return <Post key={id} id={id} post={post} />;
      })}
    </div>
  );
};

export default Feed;
