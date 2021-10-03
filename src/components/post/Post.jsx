import "./post.css";
import Comment from "../comment/Comment";
import generateId from "../../utils/generateId";
import { db, storage } from "../../firebase";
import CommentInput from "../commentInput/CommentInput";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Like from "../like/Like";

const Post = ({ post, id }) => {
  const user = useSelector(selectUser);

  const deletePost = () => {
    // delete image from firebase storage
    var imageRef = storage.refFromURL(post.imageUrl);
    imageRef
      .delete()
      .then(function () {
        console.log("Image deleted successfully");
      })
      .catch(function (error) {
        console.log(error);
      });

    // delete post from firebase firestore
    db.collection("posts")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

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
        {user && user.userId === post.userId && (
          <button onClick={deletePost} className="postDelete">
            Delete
          </button>
        )}
      </div>
      <div className="postCenter">
        <img className="postImage" src={post.imageUrl} alt="" />
      </div>
      <div className="postBottom">
        <div className="postCaption">
          <Like id={id} likes={post.likes} />
          <strong>{post.username}</strong> {post.caption}
        </div>
      </div>
      {post?.comments &&
        post.comments.map((comment) => (
          <Comment key={generateId()} comment={comment} />
        ))}
      {user && <CommentInput id={id} comments={post.comments} />}
    </div>
  );
};

export default Post;
