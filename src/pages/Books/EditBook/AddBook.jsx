import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const AddBook = () => {
  const { user, loginCheck } = useContext(AuthContext);
  const [categoryList, setCategoryList] = useState([]);

  const loadCategory = () => {
    fetch(`${import.meta.env.VITE_VERCEL_API}/category`)
      .then(res => res.json())
      .then(data => {
        setCategoryList(data)
      })
  }

  useEffect(() => {
    loadCategory()
  }, [])

  const handleAddItem = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const quantity = form.quantity.value;
    const author = form.author.value;
    const rating = form.rating.value;
    const image = form.image.value;
    const contents = form.contents.value;
    const description = form.description.value;
    const completeItem = { name, category, quantity, author, rating, image, contents, description, userUid: user.uid, userEmail: user.email, userName: user.displayName }

    console.log(completeItem);

    // --------- send server start -----
    fetch(`${import.meta.env.VITE_VERCEL_API}/books`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(completeItem)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.acknowledged) {
          Swal.fire({
            title: 'Success!',
            text: 'Successfully Add Item!',
            icon: 'success',
            confirmButtonText: 'Okay'
          })
        }
        form.reset();
      })
    // --------- send server end -----
  }

  const handleAddBtn = () => {
    document.getElementById('categoryAdd').showModal();
  }
  const handleAddCategory = (e) => {
    e.preventDefault();
    const form = e.target;
    const categoryName = form.categoryName.value;
    const categoryPhoto = form.categoryPhoto.value;
    const category = { categoryName, categoryPhoto };
    console.log(category);
    // --------- send server start -----
    fetch(`${import.meta.env.VITE_VERCEL_API}/category`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(category)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.acknowledged) {
          toast.success('Successfully Add Category!')
        }
        form.reset();
        loadCategory();
      })
    // --------- send server end -----
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    loginCheck();
  }, []);

  return (
    <div>
      <Helmet>
        <title> Add Book | BookSphere </title>
      </Helmet>
      <div className="max-w-4xl mx-auto mt-5 bg-primary-content p-5 md:p-8 lg:p-10 rounded-xl">
        <h3 className="text-2xl md:text-3xl text-center mb-6 font-semibold mx-auto">Add Book</h3>
        <form
          onSubmit={handleAddItem}
          className="flex flex-col gap-5">
          <div className="gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Book Name</span>
              <input type="text" name="name" placeholder="Items Name" className="input input-bordered w-full" required />
            </label>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Category Name</span>
              <div className="flex gap-1">
                <select name="category" className="select select-bordered w-full">
                  {
                    categoryList.map(category => <option key={category._id} value={category.categoryName}>{category.categoryName}</option>)
                  }
                </select>
                {/* 
                <select name="category" className="select select-bordered w-full">
                  <option value="CCC">CCC</option>
                  
                </select> */}
                <span onClick={handleAddBtn} className="btn">Add</span>
              </div>
            </label>
            <label className="flex flex-col gap-1 w-full">
              <span>Stock</span>
              <input type="text" name="quantity" placeholder="Quantity" className="input input-bordered w-full" required />
            </label>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Author</span>
              <input type="text" name="author" placeholder="Author" className="input input-bordered w-full" required />
            </label>
            <label className="flex flex-col gap-1 w-full">
              <span>Rating</span>
              <input type="text" name="rating" placeholder="Rating" className="input input-bordered w-full" required />
            </label>
          </div>
          <div className="gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Photo URL</span>
              <input type="text" name="image" placeholder="Photo URL" className="input input-bordered w-full" required />
            </label>
          </div>
          <div className="grid md:grid-cols-1 gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Contents</span>
              <input type="text" name="contents" placeholder="Contents" className="input input-bordered w-full" required />
            </label>
          </div>
          <div className="gap-5">
            <label className="flex flex-col gap-1 w-full">
              <span>Description</span>
              <textarea name="description" placeholder="Description" className="textarea textarea-bordered h-24 w-full" required ></textarea>
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
      {/* ---------- modal category add --------- */}
      <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="categoryAdd" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg text-center">Add New Category</h3>
            <form
              onSubmit={handleAddCategory}
              className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5">
                <label className="flex flex-col gap-1 w-full">
                  <span>Category Name</span>
                  <input type="text" name="categoryName" placeholder="Category Name" className="input input-bordered w-full" required />
                </label>
                <label className="flex flex-col gap-1 w-full">
                  <span>Category Photo URL</span>
                  <input type="text" name="categoryPhoto" placeholder="Category Photo URL" className="input input-bordered w-full" required />
                </label>
              </div>
              <div className="gap-5">
                <label className="flex flex-col gap-1 w-full">
                  <input type="submit" value="Add Category" className="btn bg-secondary text-secondary-content w-full" />
                </label>
              </div>
            </form>
          </div>
        </dialog>

      </div>
      <ToastContainer />
    </div>
  );
};

export default AddBook;