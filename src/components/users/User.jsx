import { useNavigate } from "react-router";

const User = ({ dbUser }) => {
  const gotoUserPosts = (dbUser) => {
    navigate(`/users/${dbUser.userId}`);
  };

  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        gotoUserPosts(dbUser);
      }}
      className="user"
    >
      <div className="userHeader">
        <div className="userHeaderLeft">
          <img
            className="userProfilePic"
            src={dbUser.profileUrl}
            alt={dbUser.username}
          />

          <p className="userUsername">{dbUser.username}</p>
        </div>

        <div className="userDelete">{dbUser.email}</div>
      </div>
    </div>
  );
};

export default User;
