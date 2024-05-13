import { Link, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import BookCard from "./BookCard";
import { FaList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import CheckLibrarian from "../../User/Librarian/CheckLibrarian";
import { IoIosArrowDown } from "react-icons/io";


const AllBooks = () => {
  const { user, loginCheck } = useContext(AuthContext);
  // const loadBooks = useLoaderData();
  const [loadBooks, setLoadBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const activeLibrarian = CheckLibrarian();
  const [displayLayout, setDisplayLayout] = useState(localStorage.getItem('displayLayout') ? localStorage.getItem('displayLayout') : 'list');

  useEffect(() => {
    localStorage.setItem('displayLayout', displayLayout);
    const localDisplayLayout = localStorage.getItem('displayLayout');
    setDisplayLayout(localDisplayLayout);
  }, [displayLayout])

  const handleDisplayLayoutBtn = (layout) => {
    if (layout === 'grid') {
      setDisplayLayout('grid')
    } else {
      setDisplayLayout('list')
    }
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_VERCEL_API}/books?email=${user?.email}`, { withCredentials: true })
      .then(function (response) {
        // handle success
        setLoadBooks(response.data);
        setBooks(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, []);

  const handleFilter = (filterBy) => {
    if (filterBy === 'All') {
      // const filtered = books.filter(book => book?.userUid?.includes(user.uid));
      setBooks([...loadBooks]);
    } else if (filterBy === 'Available') {
      const filtered = loadBooks.filter(book => book?.quantity > 0);
      setBooks(filtered);
    } else if (filterBy === 'Not') {
      const filtered = loadBooks.filter(book => book?.quantity == 0);
      setBooks(filtered);
    }
  }

  const handleDelete = _id => {
    console.log(_id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${import.meta.env.VITE_VERCEL_API}/book/${_id}`)
          .then(function (response) {
            // handle success
            console.log(response.data);
            if (response.data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your item has been deleted.',
                'success'
              )
              const remaining = books.filter(i => i._id !== _id);
              setBooks(remaining);
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      }
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    loginCheck();
  }, []);

  return (
    <div>
      <Helmet>
        <title> All Books | BookSphere </title>
      </Helmet>
      <h3 className="bg-base-300 w-full p-5 md:p-8 text-2xl md:text-5xl font-bold text-center rounded-3xl my-5">All Books </h3>
      <div className='my-6 text-center'>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1 bg-[#23BE0A] hover:bg-[#22be0ac5] text-white w-52">Filter By <IoIosArrowDown className='text-2xl' />
          </div>
          <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link onClick={() => handleFilter('All')}>Show all books</Link></li>
            <li><Link onClick={() => handleFilter('Available')}>Show available books</Link></li>
            <li><Link onClick={() => handleFilter('Not')}>Not Available</Link></li>
          </ul>
        </div>
      </div>
      <div>
        <div className="flex justify-end items-center gap-2 my-5">
          <p className="font-semibold md:text-xl">Display Layout</p>
          <div>
            <span onClick={() => handleDisplayLayoutBtn('list')}
              className={`btn rounded-l-2xl rounded-r-none text-xl md:text-2xl ${displayLayout === 'list' ? 'bg-accent bg-opacity-50' : ''}`}><FaList /></span>
            <span onClick={() => handleDisplayLayoutBtn('grid')}
              className={`btn rounded-l-none rounded-r-2xl text-xl md:text-2xl ${displayLayout === 'grid' ? 'bg-accent bg-opacity-50' : ''}`}><IoGrid /></span>
          </div>
        </div>
        {/* --------------------- display view ------------------------- */}
        {
          displayLayout === 'list' ?
            <div className="max-w-4xl mx-auto">
              {/* books display list view */}
              <div className="overflow-x-auto">
                <table className="table table-xs table-pin-rows table-pin-cols">
                  <thead>
                    <tr>
                      <th></th>
                      <td className="md:text-sm lg:text-lg">Image</td>
                      <td className="md:text-sm lg:text-lg">Book Name</td>
                      <td className="md:text-sm lg:text-lg">Author</td>
                      <td className="md:text-sm lg:text-lg">Stock</td>
                      <td className="md:text-sm lg:text-lg">Rating</td>
                      <td className="md:text-sm lg:text-lg"></td>
                      {
                        activeLibrarian ?
                          <>
                            <td className="md:text-sm lg:text-lg"></td>
                            <td className="md:text-sm lg:text-lg"></td>
                          </>
                          : undefined
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      books.map((book, idx) => <tr key={book._id} className="md:text-sm lg:text-lg">
                        <th className="md:text-sm lg:text-lg">{idx + 1}</th>
                        <td className="md:text-sm lg:text-lg">
                          <img className="w-10" src={book.image} alt="" />
                        </td>
                        <td className="md:text-sm lg:text-lg">{book.name}</td>
                        <td className="md:text-sm lg:text-lg">{book.author}</td>
                        <td className="md:text-sm lg:text-lg">{book.quantity}</td>
                        <td className="md:text-sm lg:text-lg">{book.rating}</td>
                        <td className="md:text-sm lg:text-lg"><Link to={`/book/${book._id}`} className="btn btn-link">Details</Link></td>
                        {
                          activeLibrarian ?
                            <>
                              <td className="md:text-sm lg:text-lg">
                                <Link to={`/update-book/${book._id}`} className='btn btn-link'>Update</Link>
                              </td>
                              <td className="md:text-sm lg:text-lg">
                                <button onClick={() => handleDelete(book._id)} className='btn btn-link'>Delete</button>
                              </td>
                            </>
                            : undefined
                        }
                      </tr>)
                    }
                  </tbody>
                </table>
              </div>
            </div>
            :
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* books display card view */}
              {
                books.map(book => <BookCard
                  key={book._id} book={book}
                  books={books}
                  setBooks={setBooks}
                  activeLibrarian={activeLibrarian}
                  handleDelete={handleDelete}
                ></BookCard>)
              }
            </div>
        }
        {
          loading &&
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        }
      </div>
    </div>
  );
};

export default AllBooks;