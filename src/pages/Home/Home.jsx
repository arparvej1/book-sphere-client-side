import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import AllCategoryCard from "../Books/AllCategory/AllCategoryCard";
import HomeBookCard from "./HomeBookCard";
import axios from "axios";

const Home = () => {
  const { user, loginCheck } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_VERCEL_API}/books`)
      .then(function (response) {
        // handle success
        setBooks(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

    axios.get(`${import.meta.env.VITE_VERCEL_API}/category`)
      .then(function (response) {
        // handle success
        setCategoryList(response.data);
        setLoading2(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, [])

  return (
    <div>
      <Helmet>
        <title> BookSphere - Library </title>
      </Helmet>
      {/* ------------ banner start ------------- */}

      {/* ------------- banner end -------------- */}
      {/* ------------ books card start ------------- */}
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {
          books.map(book => <HomeBookCard
            key={book._id} book={book}
          ></HomeBookCard>)
        }
        {
          loading &&
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        }
      </div>
      {/* ------------- books card end -------------- */}
      {/* ------------ books category card start ------------- */}
      <div className="border-t-2 rounded-2xl mt-5 md:mt-10 border-info">
        <div className="max-w-screen-xl mx-5 mt-5 md:mt-10 xl:px-5 2xl:px-0 xl:mx-auto">
          < h3 className="font-semibold text-xl md:text-2xl lg:text-3xl text-base-content mx-auto text-center">Art & Craft Categories</h3>
          <p className="my-5 text-center md:w-2/3 mx-auto">BookSphere showcases a diverse range of art and craft categories, including ceramics, pottery, painting, sculpture, textile art, and woodworking, each offering unique handcrafted items to adorn your living spaces with elegance and charm.</p>
          {/* --- art & craft card --- */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {
              categoryList.sort(function () { return 0.5 - Math.random() }).slice(0, 6).map((category, idx) => <AllCategoryCard
                key={idx}
                category={category}
              ></AllCategoryCard>)
            }
          </div>
          {
            loading2 &&
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }
        </div>
      </div>
      {/* ------------- books category card end -------------- */}
      This is home.
    </div>
  );
};

export default Home;