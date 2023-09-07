import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm); // Pass the search term back to the parent component
  };

  return (
    <input
      type="text"
      placeholder="Search notes..."
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
