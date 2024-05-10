import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { Link, useLoaderData } from "react-router-dom";
import MyBookListCard from "./MyBookListCard";
import { Helmet } from "react-helmet-async";
import { IoIosArrowDown } from "react-icons/io";
import { ToastContainer } from "react-toastify";

const MyBookList = () => {
  const { user, loginCheck } = useContext(AuthContext);
  const books = useLoaderData();
  const [myItems, setMyItems] = useState([]);
  console.log(myItems);

  useEffect(() => {
    const filtered = books.filter(book => book?.userUid?.includes(user.uid));
    setMyItems(filtered);
  }, [])

  const handleFilter = (filterBy) => {
    if (filterBy === 'All') {
      const filtered = books.filter(book => book?.userUid?.includes(user.uid));
      setMyItems(filtered);
    } else if (filterBy === 'Available') {
      const filtered = books.filter(book => book?.quantity > 0 && book?.userUid?.includes(user.uid));
      setMyItems(filtered);
    } else if (filterBy === 'Not') {
      const filtered = books.filter(book => book?.quantity == 0 && book?.userUid?.includes(user.uid));
      setMyItems(filtered);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    loginCheck();
  }, []);

  return (
    <div>
      <Helmet>
        <title> My Book List | BookSphere </title>
      </Helmet>
      <h3 className="bg-base-300 w-full p-5 md:p-8 text-2xl md:text-5xl font-bold text-center rounded-3xl my-5">My Book List </h3>
      <div className='my-6 text-center'>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1 bg-[#23BE0A] hover:bg-[#22be0ac5] text-white w-52">Filter By <IoIosArrowDown className='text-2xl' />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link onClick={() => handleFilter('All')}>My All Books</Link></li>
            <li><Link onClick={() => handleFilter('Available')}>Available Stock</Link></li>
            <li><Link onClick={() => handleFilter('Not')}>Not Available</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-5xl mx-auto">
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {
            myItems.map(book => <MyBookListCard key={book._id} book={book}
              myItems={myItems} setMyItems={setMyItems}
            ></MyBookListCard>)
          }
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyBookList;