import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AllCategoryCard = ({ category }) => {
  const { categoryName, categoryPhoto } = category;

  return (
    <Link to={`/category/${categoryName}`} className='p-5 my-5 rounded-2xl border-2 border-info flex flex-col justify-between gap-3 bg-secondary-content'>
      <div className='flex flex-col gap-3'>
        <div className=''>
          <img className='rounded-2xl' src={categoryPhoto} alt={categoryName} />
        </div>
        <h3 className='font-semibold text-2xl'>{categoryName}</h3>
      </div>
    </Link>
  );
};

AllCategoryCard.propTypes = {
  category: PropTypes.object
}

export default AllCategoryCard;