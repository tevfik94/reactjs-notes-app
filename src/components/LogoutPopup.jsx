import React from "react";
import "../styles/LogoutPopup.css";

const LogoutPopup = ({ onLogoutConfirmed, onCancel }) => {
  return (
    <div className="logout-popup">
      <div className="inner">
        <p>Are you sure you want to logout?</p>
        <div className="buttons">
          <button onClick={onLogoutConfirmed}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
