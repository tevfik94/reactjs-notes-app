import React, { useState } from "react";
import "../styles/Navbar.css";
import { FiDownload, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import LogoutPopup from "./LogoutPopup";

const NavBar = () => {
  const navigate = useNavigate();
  const [logoutPopup, setLogoutPopup] = useState(false);
  const handleLogout = () => {
    setLogoutPopup(true);
  };
  const handleLogoutConfirmed = async () => {
    try {
      const response = await fetch(
        "https://ubade.pythonanywhere.com/api/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/reactjs-notes-app");
      } else {
        throw new Error("Logout faild");
      }
    } catch (error) {
      console.error(error);
    }

    setLogoutPopup(false);
  };
  const handleCancel = () => {
    setLogoutPopup(false);
  };

  return (
    <div className="navbar">
      <h1>Notes App</h1>
      <ul className="navbar-links">
        <li>
          <FiDownload title="Download notes" />
        </li>
        <li>
          <FiLogOut title="Logout" onClick={handleLogout} />
        </li>
      </ul>
      {logoutPopup && (
        <LogoutPopup
          onCancel={handleCancel}
          onLogoutConfirmed={handleLogoutConfirmed}
        />
      )}
    </div>
  );
};

export default NavBar;
