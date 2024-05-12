import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import BorrowedBooksCard from "./BorrowedBooksCard";

const BorrowedBooks = () => {
  const { user, loginCheck } = useContext(AuthContext);
  const borrowList = useLoaderData();
  const [myBorrowBooks, setMyBorrowBooks] = useState([]);

  useEffect(() => {
    const filtered = borrowList.filter(book => book?.borrowUserUid?.includes(user.uid));
    setMyBorrowBooks(filtered);
  }, [])


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