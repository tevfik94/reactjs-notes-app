import "../../styles/Navbar.css";
import Logout from "./Logout";
import ThemeChanger from "./ThemeChanger";
import SearchBar from "./SearchBar";

const NavBar = ({ onSearch }) => {
  return (
    <div className="navbar">
      <h1>Notes App</h1>
      <ul className="navbar-links">
        <li>
          <SearchBar onSearch={onSearch} />
        </li>
        <li>
          <ThemeChanger />
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
