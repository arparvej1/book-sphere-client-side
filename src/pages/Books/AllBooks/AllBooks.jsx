import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(books);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_VERCEL_API}/books`)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <title> All Books | BookSphere </title>
      </Helmet>
      <h3 className="bg-base-300 w-full p-5 md:p-8 text-2xl md:text-5xl font-bold text-center rounded-3xl my-5">All Books </h3>
      <div className="max-w-4xl mx-auto">
        <div className="overflow-x-auto">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th></th>
                <td className="md:text-sm lg:text-lg">Book Name</td>
                <td className="md:text-sm lg:text-lg">Author</td>
                <td className="md:text-sm lg:text-lg">Stock</td>
                <td className="md:text-sm lg:text-lg">Rating</td>
                <td className="md:text-sm lg:text-lg"></td>
              </tr>
            </thead>
            <tbody>
              {
                books.map((book, idx) => <tr key={book._id} className="md:text-sm lg:text-lg">
                  <th className="md:text-sm lg:text-lg">{idx + 1}</th>
                  <td className="md:text-sm lg:text-lg">{book.name}</td>
                  <td className="md:text-sm lg:text-lg">{book.author}</td>
                  <td className="md:text-sm lg:text-lg">{book.quantity}</td>
                  <td className="md:text-sm lg:text-lg">{book.rating}</td>
                  <td className="md:text-sm lg:text-lg"><Link to={`/book/${book._id}`} className="btn btn-link">View Details</Link></td>
                </tr>)
              }
            </tbody>
          </table>
          {
            loading &&
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default AllBooks;