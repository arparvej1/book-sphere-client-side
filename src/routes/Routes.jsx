import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import AllBooks from "../pages/Books/AllBooks/AllBooks";
import AddBook from "../pages/Books/EditBook/AddBook";
import Login from "../pages/User/Login/Login";
import Register from "../pages/User/Register/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/all-books',
        element: <PrivateRoutes><AllBooks></AllBooks></PrivateRoutes>
      },
      {
        path: '/add-book',
        element: <PrivateRoutes><AddBook></AddBook></PrivateRoutes>
      },
    ]
  }
]);

export default router;
