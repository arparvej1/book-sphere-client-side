import PropTypes from 'prop-types';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyBookListCard = ({ book, myItems, setMyItems }) => {
  const { _id, name, image, author, rating, quantity, category } = book;

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
              const remaining = myItems.filter(i => i._id !== _id);
              setMyItems(remaining);
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
      <div className='col-span-1 space-y-3 my-5'>
        <div className='flex justify-center items-center'>
          <img className='rounded-2xl' src={image} alt={name} />
        </div>
        <div className='flex flex-col gap-3 justify-center'>
          <h3 className='font-semibold text-2xl'>{name}</h3>
          <p>Author: {author}</p>
          <p>Rating: {rating}</p>
          <p>Stock: {quantity}</p>
          <p>Category: {category}</p>
        </div>
      </div>
      <div className='flex gap-5 justify-center'>
        <Link to={`/update-book/${_id}`} className='btn bg-accent text-accent-content'>Update</Link>
        <button onClick={() => handleDelete(_id)} className='btn bg-secondary text-secondary-content'>Delete</button>
        <Link to={`/book/${_id}`} className='btn bg-primary text-primary-content'>Details</Link>
      </div>
    </div>
  );
};

MyBookListCard.propTypes = {
  book: PropTypes.object,
  myItems: PropTypes.array,
  setMyItems: PropTypes.func
}

export default MyBookListCard;