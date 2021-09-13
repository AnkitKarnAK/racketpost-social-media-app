import "./post.css";
import Comment from "../comment/Comment";
import generateId from "../../utils/generateId";

const Post = ({ post, id }) => {
  return (
    <div className="post">
      <div className="postHeader">
        <div className="postHeaderLeft">
          <img
            className="postProfilePic"
            src={post.profileUrl}
            alt={post.username}
          />

          <p className="postUsername">{post.username}</p>
        </div>
        <button className="postDelete">Delete</button>
      </div>
      <div className="postCenter">
        <img className="postImage" src={post.imageUrl} alt="" />
      </div>
      <div className="postBottom">
        <div className="postCaption">
          <strong>{post.username}</strong> {post.caption}
        </div>
      </div>
      {post?.comments &&
        post.comments.map((comment) => (
          <Comment key={generateId()} comment={comment} />
        ))}
    </div>
  );
};

export default Post;
