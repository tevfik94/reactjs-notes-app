import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/Notes.css";
import { FiPlus } from "react-icons/fi";
import { BiPencil, BiTrash } from "react-icons/bi";
import { AiOutlineEllipsis } from "react-icons/ai";
import { BsEmojiFrown } from "react-icons/bs";
import DeletePopup from "../components/DeletePopup";
import NewNotePopup from "../components/NewNotePopup";
import EditNotePopup from "../components/EditNotePopup";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNotePopup, setNewNotePopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const toggleMenu = (id) => {
    setShowMenu(!showMenu);
    setSelectedNoteId(id);
  };

  useEffect(() => {
    fetch("https://ubade.pythonanywhere.com/api/notes", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Fetched Notes:", data);
        setNotes(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleNewNoteClicked = () => {
    setNewNotePopup(true);
  };

  const handleNewNoteSubmited = (newNote) => {
    setNotes([...notes, newNote]);
    setNewNotePopup(false);
    fetchNotes();
  };

  const fetchNotes = () => {
    fetch("https://ubade.pythonanywhere.com/api/notes", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
      })
      .catch((error) => console.log(error));
  };

  const [selectedDeleteNoteId, setSelectedDeleteNoteId] = useState(null);
  const toggleDeletePopup = (id) => {
    setSelectedDeleteNoteId(id === selectedDeleteNoteId ? null : id);
  };
  const handleDeleteCanceled = () => {
    setSelectedDeleteNoteId(null);
  };

  const handleDeleteConfirmed = (id) => {
    fetch("https://ubade.pythonanywhere.com/api/notes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then(() => {
        // remove the deleted note from the state
        setNotes(notes.filter((note) => note.id !== id));
      })
      .catch((error) => console.log(error));

    setSelectedDeleteNoteId(false);
  };

  const [selectedEditNote, setSelectedEditNote] = useState(null); // New state

  const handleEdit = (note) => {
    toggleMenu(note.id); // Open the context menu for the selected note
    setSelectedEditNote(note);
  };
  const handleNoteUpdate = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    setSelectedEditNote(null); // Close the popup
    fetchNotes();
    // Close the context menu
    if (selectedNoteId === updatedNote.id) {
      setShowMenu(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showMenu &&
        !event.target.closest(".settings") // Check if the click is not within the menu
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="notes-page">
      <NavBar notes={notes} />
      <div className="notes">
        <li className="add-note">
          <FiPlus className="icon" onClick={handleNewNoteClicked} />
          {newNotePopup && (
            <NewNotePopup
              onSubmit={(newNote) => handleNewNoteSubmited(newNote)}
              onCancel={() => setNewNotePopup(false)}
            />
          )}

          <p>Add new Note</p>
        </li>

        {notes.length === 0 ? (
          <p className="no-notes">
            No notes to display. <BsEmojiFrown className="emoji" />
          </p>
        ) : (
          notes.map(({ id, title, body, created }, index) => (
            <li className="note" key={`${id}-${index}`}>
              <div className="details">
                <p>{title}</p>
                <span>{body}</span>
              </div>
              <div className="bottom-content">
                <span>{formatDate(created)}</span>

                <div
                  className={`settings ${
                    showMenu && selectedNoteId === id ? "show" : ""
                  }`}
                >
                  <AiOutlineEllipsis
                    className="icon"
                    onClick={() => toggleMenu(id)}
                  />

                  <ul className={"menu"}>
                    <li
                      onClick={() => handleEdit({ id, title, body, created })}
                    >
                      <BiPencil />
                      Edit
                    </li>

                    <li onClick={() => toggleDeletePopup(id)}>
                      <BiTrash />
                      Delete
                    </li>
                  </ul>
                  {selectedDeleteNoteId === id && (
                    <DeletePopup
                      onCancel={handleDeleteCanceled}
                      deleteConfirmed={() => handleDeleteConfirmed(id)}
                    />
                  )}
                  {selectedEditNote && selectedEditNote.id === id && (
                    <EditNotePopup
                      note={selectedEditNote}
                      onSubmit={handleNoteUpdate}
                      onCancel={() => setSelectedEditNote(null)}
                    />
                  )}
                </div>
              </div>
            </li>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;
