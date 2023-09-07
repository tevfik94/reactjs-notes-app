import { RiUser2Fill } from "react-icons/ri";
import "../../styles/Navbar.css";
import ExportNotes from "./ExportNotes";
import Logout from "./Logout";
import ThemeChanger from "./ThemeChanger";
import SearchBar from "./SearchBar";

const NavBar = ({ onSearch, notes }) => {
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
          <ExportNotes notes={notes} />
        </li>
        <li>
          <Logout />
        </li>
        <li>
          <RiUser2Fill title="user" />
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
