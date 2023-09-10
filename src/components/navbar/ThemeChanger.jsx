import React from "react";
import { RiSunFill, RiMoonFill } from "react-icons/ri";
import { useTheme } from "../../contexts/ThemeContext";

const ThemeChanger = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div>
      <button onClick={toggleTheme}>
        {/* {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} */}
        {isDarkMode ? <RiSunFill /> : <RiMoonFill />}
      </button>
    </div>
  );
};

export default ThemeChanger;
