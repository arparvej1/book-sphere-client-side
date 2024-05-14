import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import BorrowedBooksCard from "./BorrowedBooksCard";
import axios from "axios";

const BorrowedBooks = () => {
  const { user, loginCheck } = useContext(AuthContext);
  const [myBorrowBooks, setMyBorrowBooks] = useState([]);

  const callMyBorrow = async () => {
    axios.get(`${import.meta.env.VITE_VERCEL_API}/borrow?email=${user?.email}`, { withCredentials: true })
      .then(function (response) {
        // handle success
        setMyBorrowBooks(response.data);
        // setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    callMyBorrow();
  }, []);

  
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
        <div className="grid gap-3 grid-cols-1 lg:grid-cols-2">
          {
            myBorrowBooks.map(borrowBook => <BorrowedBooksCard
              key={borrowBook._id}
              borrowBook={borrowBook}
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