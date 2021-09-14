const User = ({ dbUser }) => {
  return (
    <div className="user">
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
