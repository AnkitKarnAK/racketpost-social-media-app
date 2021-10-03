import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebase";
import "./like.css";

const Like = ({ id, likes }) => {
  const user = useSelector(selectUser);

  const liked = likes?.find((like) => like === user?.userId);

  const handleLike = () => {
    let likesArray = likes ? [...likes] : [];
    if (liked) {
      likesArray = likesArray.filter((like) => like !== user?.userId);
    } else {
      likesArray.push(user.userId);
    }

    db.collection("posts")
      .doc(id)
      .update({
        likes: likesArray,
      })
      .then(function () {
        console.log("updated like");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="like">
      {user && (
        <span className="likeIcon" onClick={handleLike}>
          {liked ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
        </span>
      )}
      <span className="likeCount">
        {likes?.length}{" "}
        {likes?.length && (likes?.length > 1 ? "likes" : "like")}
      </span>
    </div>
  );
};

export default Like;
