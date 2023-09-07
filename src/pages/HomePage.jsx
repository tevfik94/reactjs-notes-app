import React, { useState } from "react";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import Notes from "./Notes";
import "../styles/HomePage.css";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState([]); // Initialize your notes state here

  const handleSearch = (searchTerm) => {
    // Implement filtering logic here
    // For example, you can use the `filter` method to filter notes
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setNotes(filteredNotes);
    setSearchTerm(searchTerm); // Update the search term state
  };

  return (
    <div className="homepage">
      <NavBar searchTerm={searchTerm} onSearch={handleSearch} />
      <Notes notes={notes} searchTerm={searchTerm} />
      <Footer />
    </div>
  );
};

export default HomePage;
