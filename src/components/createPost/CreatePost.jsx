import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import "./createPost.css";
import { RiImageAddFill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import CircularProgress from "@material-ui/core/CircularProgress";
import generateId from "../../utils/generateId";
import { db, storage } from "../../firebase";
import firebase from "firebase";

const CreatePost = () => {
  const user = useSelector(selectUser);

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const inputFileHandler = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
      var imagePreview = document.getElementById("image-1-preview");
      var imagePreviewClose = document.getElementById("imagePreviewClose");
      imagePreview.src = selectedImageSrc;
      imagePreview.style.display = "block";
      imagePreviewClose.style.display = "block";
    }
  };

  const imageUploadHandler = (e) => {
    if (image) {
      var imageName = generateId();
      const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(`${imageName}.jpg`)
            .getDownloadURL()
            .then((imageUrl) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: imageUrl,
                username: user.displayName,
                profileUrl: user.photoURL,
              });
            });
          setProgress(0);
          setCaption("");
          setImage(null);
          var imagePreview = document.getElementById("image-1-preview");
          var imagePreviewClose = document.getElementById("imagePreviewClose");
          imagePreview.style.display = "none";
          imagePreviewClose.style.display = "none";
        }
      );
    }
  };

  const removeImage = () => {
    var imagePreview = document.getElementById("image-1-preview");
    var imagePreviewClose = document.getElementById("imagePreviewClose");
    imagePreview.style.display = "none";
    imagePreviewClose.style.display = "none";
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
            <div className="imagePreview">
              <img id="image-1-preview" alt="uploaded" />
              <div onClick={() => removeImage()} id="imagePreviewClose">
                <TiDelete />
              </div>

              {progress === 0 ? (
                <></>
              ) : (
                <CircularProgress
                  className="circularProgress"
                  variant="determinate"
                  value={progress}
                  thickness={5}
                />
              )}
            </div>
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
              {progress === 0
                ? "Post"
                : `${progress === 100 ? "Posted" : "posting.."}`}
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
