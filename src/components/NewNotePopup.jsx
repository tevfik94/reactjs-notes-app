import React, { useState } from "react";
import "../styles/NewNotePopup.css";
import { FaTimes } from "react-icons/fa";

const NewNotePopup = ({ onSubmit, onCancel }) => {
  const [note, setNote] = useState({
    title: "",
    body: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "body" && value.length > 400) {
      return;
    }
    if (name === "title" && value.length > 100) {
      return;
    }
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    // Make the API call here to create the new note
    fetch("https://ubade.pythonanywhere.com/api/notes", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("API Response:", data);
        onSubmit(data); // Notify the parent component about the new note
      })
      .catch((error) => {
        console.log(error);
        // handle error if needed
      });
  };
  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  const characterCount = note.body.length;
  const titleCount = note.title.length;
  return (
    <div className="newnote-popup">
      <div className="card">
        <header>
          <h3>Add a new note</h3>
          <FaTimes className={"x"} onClick={handleCancel} />
        </header>
        <form onSubmit={handleSubmit}>
          <div className="note-title">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={note.title}
              onChange={handleChange}
              maxLength={50}
              autoComplete="none"
            />
            <small className="character-count">{titleCount}/50 </small>
          </div>
          <div className="note-body">
            <label>Description</label>
            <textarea
              name="body"
              value={note.body}
              onChange={handleChange}
              placeholder="Your Note"
              maxLength={400}
            />
            <small className="character-count">{characterCount}/400 </small>
          </div>
          <div className="buttons">
            <button type="submit">Add Note</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewNotePopup;
