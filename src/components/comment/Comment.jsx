import "./comment.css";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <div className="commentBox">
        <strong>{comment.username}</strong> {comment.comment}
      </div>
    </div>
  );
};

export default Comment;
