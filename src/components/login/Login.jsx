import { useRef, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log("login handler run");
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

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">RacketChat</h3>
          <span className="loginDesc">Connect with your friends</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={loginHandler}>
            <input
              placeholder="Email"
              type="email"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              maxLength="50"
              required
              className="loginInput"
              ref={email}
              onBlur={emailValidator}
            ></input>
            <div className="loginInputError">{emailError}</div>
            <input
              placeholder="Password"
              type="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              maxLength="20"
              required
              className="loginInput"
              ref={password}
              onBlur={passwordValidator}
            ></input>
            <div className="loginInputError">{passwordError}</div>
            <button className="loginButton" type="submit">
              "Login"
            </button>
            <span className="loginForgot">Forget Password?</span>
            <button className="loginSignupButton">
              <Link to="/signup">Create your account</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
