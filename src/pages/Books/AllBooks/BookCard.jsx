import PropTypes from 'prop-types';

const BookCard = ({ book }) => {
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
          <p>Stock: {quantity}</p>
          <p>Category: {category}</p>
        </div>
        {/* <div className='flex gap-5 justify-center'>
          <Link to={`/update-book/${_id}`} className='btn bg-accent text-accent-content'>Update</Link>
          <button onClick={() => handleDelete(_id)} className='btn bg-secondary text-secondary-content'>Delete</button>
          <Link to={`/book/${_id}`} className='btn bg-primary text-primary-content'>Details</Link>
        </div> */}
      </div>
    </div>
  );
};


BookCard.propTypes = {
  book: PropTypes.object
}

export default BookCard;