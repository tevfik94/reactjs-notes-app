import React from "react";
import "../styles/DeletePopup.css";

const DeletePopup = ({ deleteConfirmed, onCancel }) => {
  return (
    <div className="delete-popup">
      <div className="inner">
        <p>Are you sure you want to delete this note?</p>
        <div className="buttons">
          <button onClick={deleteConfirmed}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
