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
import BookDetails from "../pages/Books/BookDetails/BookDetails";
import Profile from "../pages/User/Profile/Profile";
import UpdateProfile from "../pages/User/Profile/UpdateProfile";
import MyBookList from "../pages/Books/MyBookList/MyBookList";
import UpdateBook from "../pages/Books/EditBook/UpdateBook";
import BorrowedBooks from "../pages/Books/BorrowedBooks/BorrowedBooks";
import SelectedCategory from "../pages/Books/AllCategory/SelectedCategory";

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
        path: '/profile',
        element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
      },
      {
        path: '/update-profile',
        element: <PrivateRoutes><UpdateProfile></UpdateProfile></PrivateRoutes>
      },
      {
        path: '/all-books',
        element: <PrivateRoutes><AllBooks></AllBooks></PrivateRoutes>
      },
      {
        path: '/book/:bookId',
        element: <PrivateRoutes><BookDetails></BookDetails></PrivateRoutes>,
        loader: () => fetch(`${import.meta.env.VITE_VERCEL_API}/books`)
      },
      {
        path: '/add-book',
        element: <PrivateRoutes><AddBook></AddBook></PrivateRoutes>
      },
      {
        path: '/update-book/:bookId',
        element: <PrivateRoutes><UpdateBook></UpdateBook></PrivateRoutes>,
        loader: () => fetch(`${import.meta.env.VITE_VERCEL_API}/books`)
      },
      {
        path: '/my-book-list',
        element: <PrivateRoutes><MyBookList></MyBookList></PrivateRoutes>,
        loader: () => fetch(`${import.meta.env.VITE_VERCEL_API}/books`)
      },
      {
        path: '/borrowed-books',
        element: <PrivateRoutes><BorrowedBooks></BorrowedBooks></PrivateRoutes>,
        loader: () => fetch(`${import.meta.env.VITE_VERCEL_API}/borrow`)
      },
      {
        path: '/category/:categoryName',
        element: <PrivateRoutes><SelectedCategory></SelectedCategory></PrivateRoutes>,
        loader: () => fetch(`${import.meta.env.VITE_VERCEL_API}/books`)
      },
    ]
  }
]);

export default router;
