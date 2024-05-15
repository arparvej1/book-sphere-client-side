import { Link } from "react-router-dom";
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
import { ToastContainer } from "react-toastify";


const AllBooks = () => {
  const { loginCheck } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const activeLibrarian = CheckLibrarian();
  const [displayLayout, setDisplayLayout] = useState(localStorage.getItem('displayLayout') ? localStorage.getItem('displayLayout') : 'list');

  // ----------------- pagination -----------------------
  const [filterQty, setFilterQty] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [count, setCount] = useState(0);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const callBooksCount = async () => {
    axios.get(`${import.meta.env.VITE_VERCEL_API}/booksCount?filterQty=${filterQty}`)
      .then(function (response) {
        // handle success
        setCount(response.data.count)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  const callLoadBooks = async () => {
    axios.get(`${import.meta.env.VITE_VERCEL_API}/booksLimit?page=${currentPage}&size=${itemsPerPage}&filterQty=${filterQty}`)
      .then(function (response) {
        // handle success
        setBooks(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    callBooksCount();
    callLoadBooks();
  }, [currentPage, itemsPerPage, filterQty]);

  const handleItemsPerPage = e => {
    const val = parseInt(e.target.value);
    console.log(val);
    setItemsPerPage(val);
    setCurrentPage(0);
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  // ------------------- pagination end ------------------

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

  const handleFilter = async (filterBy) => {
    setCurrentPage(0);
    if (filterBy === 'All') {
      setFilterQty(2);
    } else if (filterBy === 'Available') {
      setFilterQty(1);
    } else if (filterBy === 'Not') {
      setFilterQty(0);
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
      {/* ------------------------- all books display start ------------------ */}
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
                        <th className="md:text-sm lg:text-lg">{(currentPage * itemsPerPage) + idx + 1}</th>
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
      {/* ------------------------- all books display start ------------------ */}
      <div className='text-center my-10'>
        <p className="mb-8 font-semibold">Current page: {currentPage + 1}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button className="btn" onClick={handlePrevPage}>Prev</button>
          {
            pages.map(page => <button
              // className={currentPage === page ? 'selected' : undefined}
              className={`btn ${currentPage === page ? 'bg-accent text-accent-content' : undefined}`}
              onClick={() => setCurrentPage(page)}
              key={page}
            >{page + 1}</button>)
          }
          <button className="btn" onClick={handleNextPage}>Next</button>
          <select className="btn bg-base-100 border-2 text-base-content w-20" value={itemsPerPage} onChange={handleItemsPerPage}>
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="48">48</option>
          </select>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllBooks;