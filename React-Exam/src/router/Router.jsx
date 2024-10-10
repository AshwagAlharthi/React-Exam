import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import "../index.css";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import DisplayBooks from "../pages/DisplayBooks";
import Search from "../pages/Search";
import BooksDetails from "../pages/BooksDetails";
import FavoriteBooks from "../pages/favoriteBooks";
import ReadBook from "../pages/ReadBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/displayBooks",
    element: <DisplayBooks />,
  },
  {
    path: "/search/:keyword",
    element: <Search />,
  },
  {
    path: "/booksDetails/:book",
    element: <BooksDetails />,
  },
  {
    path: "/favoriteBooks",
    element: <FavoriteBooks />,
  },
  {
    path: "/readbook",
    element: <ReadBook />,
  },
]);

export default router;
