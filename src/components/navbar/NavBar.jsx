import { RiUser2Fill } from "react-icons/ri";
import "../../styles/Navbar.css";
import ExportNotes from "./ExportNotes";
import Logout from "./Logout";
import ThemeChanger from "./ThemeChanger";

const NavBar = () => {
  return (
    <div className="navbar">
      <h1>Notes App</h1>
      <ul className="navbar-links">
        <li>
          <input type="text" />
        </li>
        <li>
          <ThemeChanger />
        </li>

        <li>
          <ExportNotes />
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
