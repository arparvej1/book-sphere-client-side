import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../../provider/AuthProvider";

const BookDetails = () => {
  const { user } = useContext(AuthContext);
  const books = useLoaderData();
  const { bookId } = useParams();
  const book = books.find(book => book._id === bookId);
  const { _id, name, image, author, category, quantity, rating, shortDescription, contents } = book;
  const [borrowList, setBorrowList] = useState([]);

  const loadBorrow = () => {
    fetch(`${import.meta.env.VITE_VERCEL_API}/borrow`)
      .then(res => res.json())
      .then(data => {
        setBorrowList(data);
      })
  }

  useEffect(() => {
    loadBorrow()
  }, [])
  console.log(borrowList);

  const handleBorrow = () => {
    if (borrowList.find(borrow => borrow.borrowBookId.includes(_id) && borrow.borrowEmail.includes(user.email))) {
      toast.warn('Already borrowed the book!');
      return;
    } else if (borrowList.filter(borrow => borrow.borrowEmail.includes(user.email)).length >= 3) {
      toast.warn('Maximum number of books borrowed!');
      return;
    }
    document.getElementById('borrowAdd').showModal();
    console.log('handleBorrow');
  }
  const handleAddBorrow = (e) => {
    e.preventDefault();
    if (borrowList.find(borrow => borrow.borrowBookId.includes(_id) && borrow.borrowEmail.includes(user.email))) {
      toast.warn('Already borrowed the book!');
      return;
    }
    const form = e.target;
    const borrowDate = form.borrowDate.value;
    const bookReturnDate = form.bookReturnDate.value;
    const borrowBook = { borrowDate, bookReturnDate, borrowEmail: user.email, borrowBookId: _id };
    console.log(borrowBook);
    // --------- send server start -----
    fetch(`${import.meta.env.VITE_VERCEL_API}/borrow`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(borrowBook)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.acknowledged) {
          toast.success('Borrow the book!')
        }
        form.reset();
        loadBorrow()
      })
    // --------- send server end -----
  }

  return (
    <>
      <Helmet>
        <title> {name} | BookSphere </title>
      </Helmet>
      {/* ---------------- book details ------------------- */}
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
          <hr />
          <div>
            <button onClick={handleBorrow} className="btn bg-white hover:text-white hover:bg-[#23BE0A] border-gray-500 px-6">Borrow</button>
          </div>
        </div>
      </div>
      {/* ---------- modal category add --------- */}
      <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="borrowAdd" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg text-center">Book Borrow Form</h3>
            <form
              onSubmit={handleAddBorrow}
              className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5">
                <label className="flex flex-col gap-1 w-full">
                  <span>Borrow Date</span>
                  <input type="date" name="borrowDate" value={new Date().toISOString().substring(0, 10)} className="input input-bordered w-full" required />
                </label>
                <label className="flex flex-col gap-1 w-full">
                  <span>Book Return Date</span>
                  <input type="date" name="bookReturnDate" min={new Date().toISOString().substring(0, 10)} className="input input-bordered w-full" required />
                </label>
              </div>
              <div className="gap-5">
                <label className="flex flex-col gap-1 w-full">
                  <input type="submit" value="Borrow" className="btn bg-secondary text-secondary-content w-full" />
                </label>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      <ToastContainer />
    </>
  );
};

export default BookDetails;