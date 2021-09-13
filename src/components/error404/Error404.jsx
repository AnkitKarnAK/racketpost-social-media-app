import React from "react";
import error404Icon from "../../assets/error404-icon.svg";
import { Link } from "react-router-dom";
import "./error404.css";

function Error404() {
  return (
    <div className="no-item-container">
      <div className="no-item-image-container">
        <img src={error404Icon} alt="no page found" />
      </div>
      <div className="no-item-content-head">Error 404: Page not found </div>
      <div className="no-item-content-text">
        Page you're trying to access doesn't exists in this route.
      </div>
      <Link to="/">
        <button className="button-primary"> Go to Home </button>
      </Link>
    </div>
  );
}

export default Error404;
