import { useRef, useState } from "react";
import "./signup.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectUser } from "../../features/userSlice";
import { auth, db } from "../../firebase";
import firebase from "firebase";

const Signup = () => {
  const username = useRef();
  const photoURL = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordAgainError, setPasswordAgainError] = useState("");
  const [serverError, setServerError] = useState("");

  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const signupHandler = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        email.current.value,
        password.current.value
      )
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: username.current.value,
            photoURL: photoURL.current?.value,
          })
          .then(() => {
            db.collection("users").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              email: userAuth.user.email,
              profileUrl:
                userAuth.user.photoURL ||
                "https://img.favpng.com/17/1/20/user-interface-design-computer-icons-default-png-favpng-A0tt8aVzdqP30RjwFGhjNABpm.jpg",
              username: userAuth.user.displayName,
              userId: userAuth.user.uid,
            });

            dispatch(
              loginUser({
                email: userAuth.user.email,
                userId: userAuth.user.uid,
                profileURL: userAuth.user.photoURL,
                username: userAuth.user.displayName,
              })
            );
            navigate("/");
          });
      })
      .catch((err) => {
        setServerError(err.message);
        console.log(err.message);
      });
  };

  const usernameValidator = () => {
    if (/[a-zA-Z0-9]{2,}$/.test(username.current.value)) {
      setUsernameError("");
    } else {
      setUsernameError("• Username can only contain alphabets & numbers");
    }
  };

  const emailValidator = () => {
    if (
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        email.current.value
      )
    ) {
      setEmailError("");
    } else {
      setEmailError("• Not a valid email");
    }
  };

  const passwordValidator = () => {
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/.test(password.current.value)) {
      setPasswordError("");
    } else {
      setPasswordError(
        "• Your password must be have at least\n8 characters long\n 1 uppercase & 1 lowercase character\n 1 number"
      );
    }
  };

  const passwordAgainValidator = () => {
    if (password.current.value === passwordAgain.current.value) {
      setPasswordAgainError("");
    } else {
      setPasswordAgainError("• Passwords do not match");
    }
  };

  return (
    <>
      {user ? (
        <Navigate to="/" replace />
      ) : (
        <div className="signup">
          <div className="signupWrapper">
            <div className="signupLeft">
              <h3 className="signupLogo">RacketPost</h3>
              <span className="signupDesc">Connect with your friends</span>
            </div>
            <div className="signupRight">
              <form className="signupBox" onSubmit={signupHandler}>
                <input
                  placeholder="Username"
                  type="text"
                  pattern="[a-zA-Z0-9]{2,}$"
                  maxLength="15"
                  required
                  className="signupInput"
                  ref={username}
                  onBlur={usernameValidator}
                ></input>
                <div className="signupInputError">{usernameError}</div>
                <input
                  placeholder="AvatarUrl (optional)"
                  type="text"
                  className="signupInput"
                  ref={photoURL}
                ></input>
                <input
                  placeholder="Email"
                  type="email"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  maxLength="50"
                  required
                  ref={email}
                  className="signupInput"
                  onBlur={emailValidator}
                ></input>
                <div className="signupInputError">{emailError}</div>
                <input
                  placeholder="Password"
                  type="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  maxLength="20"
                  required
                  className="signupInput"
                  ref={password}
                  onBlur={passwordValidator}
                ></input>
                <div className="signupInputError">{passwordError}</div>
                <input
                  placeholder="Password Again"
                  type="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  maxLength="20"
                  required
                  className="signupInput"
                  ref={passwordAgain}
                  onBlur={passwordAgainValidator}
                ></input>
                <div className="signupInputError">{passwordAgainError}</div>
                <button className="signupButton" type="submit">
                  Signup
                </button>
                {serverError && (
                  <div className="signupInputError">{serverError}</div>
                )}
                <span className="signupForgot">Forget Password?</span>
                <button className="signupLoginButton">
                  <Link to="/login"> Login into Account</Link>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
