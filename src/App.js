import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LoginSignup from "./pages/LoginSignup";
import Notes from "./pages/Notes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginSignup />,
    },
    {
      path: "/notes",
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
