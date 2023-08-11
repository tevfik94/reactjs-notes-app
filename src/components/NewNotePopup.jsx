import React, { useState } from "react";
import "../styles/NewNotePopup.css";

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
      <div className="inner">
        <h3>New Note</h3>
        <form onSubmit={handleSubmit}>
          <div className="note-title">
            <input
              type="text"
              name="title"
              value={note.title}
              onChange={handleChange}
              placeholder="Title"
              maxLength={100}
            />
            <small className="character-count">{titleCount}/100 </small>
          </div>
          <div className="note-body">
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
            <button type="submit">Submit</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewNotePopup;
