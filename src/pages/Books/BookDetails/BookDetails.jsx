import { useLoaderData, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const BookDetails = () => {
  const books = useLoaderData();
  const { bookId } = useParams();
  const book = books.find(book => book._id === bookId);
  const { name, image, author, category, quantity, rating, shortDescription, contents } = book;

  return (
    <div className="grid md:grid-cols-2 gap-12 my-10">
      <div className=" bg-base-300 rounded-3xl p-16">
        <img className="w-full" src={image} alt={name} />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-4xl">{name}</h3>
        <hr />
        <p className="text-justify"><span className="font-bold">By:</span> {author}</p>
        <hr />
        <p className="text-justify"><span className="font-bold">Category:</span> {category}</p>
        <hr />
        <p className="text-justify"><span className="font-bold">Short Description:</span> {shortDescription}</p>
        <hr />
        <p className="text-justify"><span className="font-bold">Stock:</span> {quantity}</p>
        <hr />
        <p className="text-justify"><span className="font-bold">Rating:</span> {rating}</p>
        <hr />
        <p className="text-justify"><span className="font-bold">Contents:</span> {contents}</p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookDetails;