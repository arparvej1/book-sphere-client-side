import { useLoaderData, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const BookDetails = () => {
  const books = useLoaderData();
  const { bookId } = useParams();
  const book = books.find(book => book._id === bookId);
  console.log(book);
  const { name, author, image, category, quantity, rating  } = book;
  return (
    <div className="grid md:grid-cols-2 gap-12 my-10">
      <div className="bg-[#f3f3f3] rounded-3xl p-16">
        <img className="w-full" src={image} alt={name} />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-4xl">{name}</h3>
        <p className="font-semibold">By: {author}</p>
        <hr />
        <p className="font-semibold">{category}</p>
        <hr />
        {/* <p className="text-justify"><span className="font-bold">Review:</span> {review}</p> */}
        {/* <p className='flex gap-3 items-center'>
          <span className="font-bold">Tag</span>
          {
            tags.map(tag => <span className='text-[#23BE0A] bg-[#23BE0A0D] py-1 px-3 rounded-xl'>{tag}</span>)
          }
        </p> */}
        <hr />
        <table className="w-2/3 md:w-full lg:w-2/3">
          <tr>
            <td>Stock:</td>
            <td className="font-semibold">{quantity}</td>
          </tr>
          <tr>
            <td>Rating:</td>
            <td className="font-semibold">
              {rating}</td>
          </tr>
          <tr>
            <td>Year of Publishing:</td>
            {/* <td className="font-semibold">{yearOfPublishing}</td> */}
          </tr>
          <tr>
            <td>Rating:</td>
            <td className="font-semibold">{rating}</td>
          </tr>
        </table>
        {/* <div className="flex gap-3">
          <button onClick={handleReadList} className="btn bg-white hover:text-white hover:bg-[#23BE0A] border-gray-500 px-6">Read</button>
          <button onClick={handleWishlist} className="btn text-white bg-[#50B1C9] hover:bg-[#148fad] px-6">Wishlist</button>
        </div> */}
        <div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;