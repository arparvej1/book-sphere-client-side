import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";

const BorrowedBooksCard = ({ borrowBook, myBorrowBooks, setMyBorrowBooks }) => {
  const { _id, borrowDate, bookReturnDate, borrowBookName, bookCategory, bookImage, borrowBookId } = borrowBook;
  const [currentBook, setCurrentBook] = useState({});

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_VERCEL_API}/book/${borrowBookId}`)
      .then(function (response) {
        // handle success
        setCurrentBook(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, [])

  const updateStock = () => {
    axios.patch(`${import.meta.env.VITE_VERCEL_API}/book/${borrowBookId}`, { quantity: parseInt(currentBook.quantity) + 1 })
      .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  const handleBookReturn = _id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, return it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${import.meta.env.VITE_VERCEL_API}/borrow/${_id}`)
          .then(function (response) {
            // handle success
            console.log(response.data);
            if (response.data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your item has been deleted.',
                'success'
              )
              updateStock();
              const remaining = myBorrowBooks.filter(i => i._id !== _id);
              setMyBorrowBooks(remaining);
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      }
    })

  }

  return (
    <div className='border-2 rounded-2xl p-5 flex flex-col justify-between'>
      <div className='col-span-1 flex flex-col md:flex-row gap-5 space-y-3 my-5'>
        <div className='flex justify-center items-center'>
          <img className='rounded-2xl max-h-60' src={bookImage} alt={borrowBookName} />
        </div>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-col gap-3 justify-center items-center md:items-start'>
            <h3 className='font-semibold text-2xl'>{borrowBookName}</h3>
            <p>Category: {bookCategory}</p>
            <p>Borrow Date: {borrowDate}</p>
            <p>Return Date: {bookReturnDate}</p>
          </div>
          <button onClick={() => handleBookReturn(_id)} className='btn bg-secondary w-full text-secondary-content'>Book Return</button>
        </div>
        <div className='flex gap-5 justify-center'>
        </div>
      </div>
    </div>
  );
};

BorrowedBooksCard.propTypes = {
  borrowBook: PropTypes.object,
  myBorrowBooks: PropTypes.array,
  setMyBorrowBooks: PropTypes.func
}

export default BorrowedBooksCard;