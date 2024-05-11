import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HomeBookCard = ({ book }) => {
  const { _id, name, image, author, rating, category } = book;
 
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
        </div>
        <div className='flex gap-5 justify-center'>
          <Link to={`/book/${_id}`} className='btn bg-primary text-primary-content'>Details</Link>
        </div>
      </div>
    </div>
  );
};


HomeBookCard.propTypes = {
  book: PropTypes.object
}

export default HomeBookCard;