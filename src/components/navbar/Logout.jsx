import React, { useState } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "../../styles/Logout.css";

const Logout = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
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
        window.history.replaceState(null, "", "/");
        navigate("/");
      } else {
        throw new Error("Logout faild");
      }
    } catch (error) {
      console.error(error);
    }
    setShowConfirmation(false);
  };

  const toggleConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };
  return (
    <div>
      <RiLogoutBoxRLine onClick={toggleConfirmation} title="Logout" />
      {showConfirmation && (
        <div className="logout">
          <div className="inner">
            <p>Are you sure you want to logout?</p>
            <div className="buttons">
              <button onClick={handleLogout}>Yes</button>
              <button onClick={toggleConfirmation}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
