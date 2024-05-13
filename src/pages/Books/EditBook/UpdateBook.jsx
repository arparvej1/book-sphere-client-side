import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CheckLibrarian from "../../User/Librarian/CheckLibrarian";

const UpdateBook = () => {
  const { user, loginCheck } = useContext(AuthContext);
  const books = useLoaderData();
  const { bookId } = useParams();
  const book = books.find(i => i._id === bookId);
  const { _id, name, image, category, quantity, author, rating, shortDescription, contents } = book;
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const activeLibrarian = CheckLibrarian();

  const loadCategory = () => {
    axios.get(`${import.meta.env.VITE_VERCEL_API}/category`)
      .then(function (response) {
        // handle success
        setCategoryList(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    loadCategory()
  }, [])

  const handleUpdateItem = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const quantity = form.quantity.value;
    const author = form.author.value;
    const rating = form.rating.value;
    const image = form.image.value;
    const contents = form.contents.value;
    const shortDescription = form.shortDescription.value;
    const completeItem = { name, category, quantity, author, rating, image, contents, shortDescription, userUid: user.uid, userEmail: user.email, userName: user.displayName }

    // --------- send server start -----
    axios.put(`${import.meta.env.VITE_VERCEL_API}/book/${_id}`, completeItem)
      .then(function (response) {
        // handle success
        console.log(response.data);
        if (response.data.modifiedCount > 0) {
          Swal.fire({
            title: 'Success!',
            text: 'Book Updated Successfully',
            icon: 'success',
            confirmButtonText: 'Okay'
          })
          navigate(`/book/${_id}`)
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    // --------- send server end -----
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    loginCheck();
  }, []);

  if (!activeLibrarian) return <h3 className="bg-base-300 w-full p-5 md:p-8 text-2xl md:text-5xl font-bold text-center rounded-3xl my-5">Only Librarian Update Book </h3>;

  return (
    <div>
      <Helmet>
        <title> Update Book | BookSphere </title>
      </Helmet>
      <div className="max-w-4xl mx-auto mt-5 bg-accent text-accent-content p-5 md:p-8 lg:p-10 rounded-xl">
        <h3 className="text-2xl md:text-3xl text-center mb-6 font-semibold mx-auto">Add Book</h3>
        <form
          onSubmit={handleUpdateItem}
          className="flex flex-col gap-5">
          <div className="gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Book Name</span>
              <input type="text" name="name" defaultValue={name} placeholder="Items Name" className="input input-bordered w-full" required />
            </label>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Category Name</span>
              <div className="flex gap-1">
                <select name="category" className="select select-bordered w-full">
                  {
                    categoryList.map(i => <option
                      key={i._id}
                      value={i.categoryName}
                      selected={category === i.categoryName ? true : false}
                    >{i.categoryName}</option>)
                  }
                </select>
              </div>
            </label>
            <label className="flex flex-col gap-1 w-full">
              <span>Stock</span>
              <input type="text" name="quantity" defaultValue={quantity} placeholder="Quantity" className="input input-bordered w-full" required />
            </label>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Author</span>
              <input type="text" name="author" defaultValue={author} placeholder="Author" className="input input-bordered w-full" required />
            </label>
            <label className="flex flex-col gap-1 w-full">
              <span>Rating</span>
              <input type="text" name="rating" defaultValue={rating} placeholder="Rating" className="input input-bordered w-full" required />
            </label>
          </div>
          <div className="gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Photo URL</span>
              <input type="text" name="image" defaultValue={image} placeholder="Photo URL" className="input input-bordered w-full" required />
            </label>
          </div>
          <div className="grid md:grid-cols-1 gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Short Description</span>
              <input type="text" name="shortDescription" defaultValue={shortDescription} placeholder="Short Description" className="input input-bordered w-full" required />
            </label>
          </div>
          <div className="gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Contents</span>
              <textarea name="contents" defaultValue={contents} placeholder="Contents" className="textarea textarea-bordered h-24 w-full" required ></textarea>
            </label>
          </div>
          <div className="grid md:grid-cols-2 gap-5 border-[2px] p-4 border-info">
            <label className="flex flex-col gap-1 w-full">
              <span>User Name</span>
              <input type="text" name="userName" value={user?.displayName} placeholder="User Name" className="input input-bordered text-base-content bg-base-200 w-full" />
            </label>
            <label className="flex flex-col gap-1 w-full">
              <span>User Email</span>
              <input type="text" name="userEmail" value={user?.email} placeholder="User Email" className="input input-bordered text-base-content bg-base-200 w-full" />
            </label>
          </div>
          <div className="gap-5">
            <label className="flex flex-col gap-1 w-full">
              <input type="submit" value="Add New Item" className="btn bg-primary text-primary-content w-full" />
            </label>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateBook;