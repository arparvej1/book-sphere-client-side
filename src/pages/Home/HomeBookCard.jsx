import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HomeBookCard = ({ book }) => {
  const { _id, name, image, author, rating, category } = book;

  return (
    <div className='border-2 rounded-2xl p-5 flex flex-col justify-between'>
      <div className='col-span-1 space-y-3  my-5'>
        <div className='flex justify-center items-center'>
          <img className='rounded-2xl' src={image} alt={name} />
        </div>
        <div className='flex flex-col gap-2 justify-center'>
          <h3 className='font-semibold text-2xl'>{name}</h3>
          <p>Author: {author}</p>
          <p>Rating: {rating}</p>
          <p>Category: {category}</p>
        </div>
      </div>
      <div className='flex gap-5 justify-center'>
        <Link to={`/book/${_id}`} className='btn w-full bg-primary text-primary-content'>Details</Link>
      </div>
    </div>
  );
};


HomeBookCard.propTypes = {
  book: PropTypes.object
}

export default HomeBookCard;