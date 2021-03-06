import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebase";
import "./commentInput.css";

const CommentInput = ({ id, comments }) => {
  const [comment, setComment] = useState("");

  const user = useSelector(selectUser);

  const addComment = (e) => {
    let commentsArray = comments ? [...comments] : [];
    e.preventDefault();
    if (comment.trim() !== "") {
      commentsArray.push({
        comment: comment,
        username: user.username,
      });

      db.collection("posts")
        .doc(id)
        .update({
          comments: commentsArray,
        })
        .then(function () {
          setComment("");
          console.log("comment added");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="commentInput">
      <form className="commentInputForm" onSubmit={addComment}>
        <input
          placeholder="Add a comment..."
          className="commentInput_textarea"
          rows="1"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button type="submit" className="commentInput_button">
          Send
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
