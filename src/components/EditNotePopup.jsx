import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/EditNotePopup.css";
import { FaTimes } from "react-icons/fa";

const EditNotePopup = ({ note, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://ubade.pythonanywhere.com/api/notes",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id: parseInt(note.id),
            title: title || note.title,
            body: body || note.body,
            color: "string", // Modify or remove this line as needed
          }),
        }
      );

      if (response.ok) {
        const updatedNote = { ...note, title, body };
        onSubmit(updatedNote);
      } else {
        console.error("Note update failed");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const characterCount = note.body.length;
  const titleCount = note.title.length;

  return (
    <div className="editnote-popup">
      <div className="card">
        <header>
          <h3>Update the note</h3>
          <FaTimes className={"x"} onClick={onCancel} />
        </header>
        <form onSubmit={handleSubmit}>
          <div className="note-title">
            <label>Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={50}
            />
            <small className="character-count">{titleCount}/50 </small>
          </div>
          <div className="note-body">
            <label>Description</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              maxLength={400}
            />
            <small className="character-count">{characterCount}/400 </small>
          </div>
          <div className="buttons">
            <button type="submit">update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditNotePopup.propTypes = {
  note: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditNotePopup;
