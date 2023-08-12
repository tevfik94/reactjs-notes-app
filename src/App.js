import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LoginSignup from "./pages/LoginSignup";
import Notes from "./pages/Notes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/reactjs-notes-app",
      element: <LoginSignup />,
    },
    {
      path: "/reactjs-notes-app/notes",
      element: <Notes />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
