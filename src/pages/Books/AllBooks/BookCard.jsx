import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BookCard = ({ book, activeLibrarian, handleDelete }) => {
  const { _id, name, image, author, rating, quantity, category } = book;

  return (
    <div>
      <div className='col-span-1 space-y-3 border-2 p-5 my-5 rounded-2xl'>
        <div className='flex justify-center items-center'>
          <img className='rounded-2xl' src={image} alt={name} />
        </div>
        <div className='flex flex-col gap-3 justify-center'>
          <h3 className='font-semibold text-2xl'>{name}</h3>
          <p>Author: {author}</p>
          <p>Rating: {rating}</p>
          <p>Category: {category}</p>
          <p>Category: {quantity}</p>
        </div>
        <div className='flex gap-5 justify-center'>
          {
            activeLibrarian ? <>
              <Link to={`/update-book/${_id}`} className='btn bg-accent text-accent-content'>Update</Link>
              <button onClick={() => handleDelete(_id)} className='btn bg-secondary text-secondary-content'>Delete</button>
            </>
              : undefined
          }
          <Link to={`/book/${_id}`} className={`btn bg-primary text-primary-content ${!activeLibrarian ? 'w-full' : undefined}`}>Details</Link>
        </div>
      </div>
    </div>
  );
};


BookCard.propTypes = {
  book: PropTypes.object,
  handleDelete: PropTypes.func,
  activeLibrarian: PropTypes.bool

}

export default BookCard;