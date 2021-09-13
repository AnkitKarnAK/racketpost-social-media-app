import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import "./createPost.css";
import { RiImageAddFill } from "react-icons/ri";

const CreatePost = () => {
  const user = useSelector(selectUser);

  const [caption, setCaption] = useState("");

  const inputFileHandler = (e) => {};
  const imageUploadHandler = (e) => {
    console.log("image uplader run");
  };

  return (
    <div className="createPost">
      {user ? (
        <div className="createPost_wrapper">
          <div className="createPost_header"> Create Post</div>
          <div className="createPost_content">
            <textarea
              rows="3"
              placeholder="What's on your mind?"
              className="createPost_contentTextarea"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
          </div>
          <div className="createPost_bottom">
            <div className="createPost_imageUpload">
              <label htmlFor="file-input">
                <RiImageAddFill />
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={inputFileHandler}
              />
            </div>
            <button
              className={
                caption.trim().length
                  ? "button-tertiary"
                  : "button-tertiary disabled"
              }
              disabled={!caption.trim().length}
              onClick={imageUploadHandler}
            >
              Upload
            </button>
          </div>
        </div>
      ) : (
        <>
          <button className="button-primary createPostLoginButton">
            <Link to="/login">Login</Link>
          </button>
          <div className="createPostLoginText">to Post & Comment</div>
        </>
      )}
    </div>
  );
};

export default CreatePost;
