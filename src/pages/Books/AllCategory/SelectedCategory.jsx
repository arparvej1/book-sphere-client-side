import { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../provider/AuthProvider";
import BookCard from "../AllBooks/BookCard";

const SelectedCategory = () => {
  const books = useLoaderData();
  const { categoryName } = useParams();
  const [categoryItems, setCategoryItems] = useState([]);
  const { loginCheck } = useContext(AuthContext);

  useEffect(() => {
    const filtered = books.filter(item => item.category.includes(categoryName));
    setCategoryItems(filtered);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loginCheck();
  }, []);

  return (
    <div>
      <Helmet>
        <title> {categoryName} | BookSphere </title>
      </Helmet>
      <h3 className="bg-base-300 w-full p-5 md:p-8 text-2xl md:text-5xl font-bold text-center rounded-3xl my-5">{categoryName}</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {
          categoryItems.sort(function () { return 0.5 - Math.random() }).map((item, idx) => <BookCard
            key={idx}
            book={item}
          ></BookCard>)
        }
      </div>
      <ToastContainer />
    </div>
  );
};

export default SelectedCategory;