import React from "react";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import Notes from "./Notes";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <NavBar />
      <Notes />
      <Footer />
    </div>
  );
};

export default HomePage;
