import PropTypes from 'prop-types';
import Swal from "sweetalert2";

const BorrowedBooksCard = ({ borrowBook, myBorrowBooks, setMyBorrowBooks }) => {
  const { _id, borrowDate, bookReturnDate, borrowBookName, bookCategory, bookImage } = borrowBook;

  const handleBookReturn = _id => {
    console.log(_id);

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
        fetch(`${import.meta.env.VITE_VERCEL_API}/borrow/${_id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your item has been deleted.',
                'success'
              )
              const remaining = myBorrowBooks.filter(i => i._id !== _id);
              setMyBorrowBooks(remaining);
            }
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