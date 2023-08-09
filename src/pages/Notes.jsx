import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/Notes.css";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { BiPencil, BiTrash } from "react-icons/bi";
import { AiOutlineEllipsis } from "react-icons/ai";
import DeletePopup from "../components/DeletePopup";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [deletePopup, setDeletePoup] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
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
  }, []);

  const handleDeleteClicked = () => {
    setDeletePoup(true);
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

    setDeletePoup(false);
  };

  const handleCancel = () => {
    setDeletePoup(false);
  };

  const handleEdit = (id) => {
    navigate(`/notes/edit/${id}`);
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [showMenu, setShowMenu] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const toggleMenu = (id) => {
    setShowMenu(!showMenu);
    setSelectedNoteId(id);
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
      <NavBar />
      <div className="notes">
        <li className="add-note">
          <FiPlus className="icon" />
          <p>Add new Note</p>
        </li>
        {notes.length === 0 ? (
          <p>No notes to display</p>
        ) : (
          notes.map(({ id, title, body, created }) => (
            <li className="note" key={id}>
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
                    <li onClick={() => handleEdit(id)}>
                      <BiPencil />
                      Edit
                    </li>
                    <li onClick={handleDeleteClicked}>
                      <BiTrash />
                      Delete
                    </li>
                  </ul>

                  {deletePopup && (
                    <DeletePopup
                      onCancel={handleCancel}
                      deleteConfirmed={() => handleDeleteConfirmed(id)}
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
