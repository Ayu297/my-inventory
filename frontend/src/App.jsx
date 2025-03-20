import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Template from "./Template";
import AddEditPage from "./pages/AddEditPage/AddEditPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Category from "./pages/LandingPage/components/Category";
import BestSeller from "./pages/LandingPage/components/BestSeller";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/best-seller",
        element: <BestSeller />,
      },
      {
        path: "/category",
        element: (
            <Category />
        ),
      },
      
      {
        path: "/register-update",
        element: (
            <ProtectedRoute>
              <AddEditPage />
            </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />
  ;
}

export default App;
