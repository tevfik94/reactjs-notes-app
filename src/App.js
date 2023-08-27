import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LoginSignup from "./pages/LoginSignup";
import Notes from "./pages/Notes";
import HomePage from "./pages/HomePage";

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
    {
      path: "/homepage",
      element: <HomePage />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
