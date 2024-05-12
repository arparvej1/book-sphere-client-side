import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import BorrowedBooksCard from "./BorrowedBooksCard";
import axios from "axios";

const BorrowedBooks = () => {
  const { user, loginCheck } = useContext(AuthContext);
  const books = useLoaderData();
  const [borrowList, setBorrowList] = useState([]);
  const [myBorrowBooks, setMyBorrowBooks] = useState([]);
  const [myBorrowList, setMyBorrowList] = useState([]);

  const loadBorrow = () => {
    axios.get(`${import.meta.env.VITE_VERCEL_API}/borrow`)
      .then(function (response) {
        // handle success
        setBorrowList(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    loginCheck();
  }, []);



  return (
    <div>
      <Helmet>
        <title> My Borrowed Books | BookSphere </title>
      </Helmet>
      <h3 className="bg-base-300 w-full p-5 md:p-8 text-2xl md:text-5xl font-bold text-center rounded-3xl my-5">My Borrowed Books </h3>
      <div className="max-w-5xl mx-auto">
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {
            myBorrowBooks.map(book => <BorrowedBooksCard
              key={book._id}
              book={book}
              myBorrowBooks={myBorrowBooks}
              setMyBorrowBooks={setMyBorrowBooks}
            ></BorrowedBooksCard>)
          }
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BorrowedBooks;