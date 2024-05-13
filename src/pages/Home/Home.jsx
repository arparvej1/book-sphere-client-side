import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import AllCategoryCard from "../Books/AllCategory/AllCategoryCard";
import HomeBookCard from "./HomeBookCard";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
// --------------- Swiper Start ------------------------
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { BiSolidCategoryAlt } from "react-icons/bi";
// --------------- Swiper End ------------------------

const Home = () => {
  const { loginCheck } = useContext(AuthContext);
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
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loginCheck();
  }, []);

  return (
    <div>
      <Helmet>
        <title> BookSphere - Library </title>
      </Helmet>
      {/* ---------- slider banner start ------------ */}
      <div className='mb-10 mt-5'>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          navigation={true}
          modules={[Autoplay, Navigation, Pagination]}
          className="mySwiper">
          {
            books.slice(6, 10).map(book => <SwiperSlide key={book._id}>
              <div className="w-full">
                <div className='relative'>
                  <img src={book.image} className="w-full lg:h-[600px]" />
                  <div className='absolute md:top-32 md:left-32 lg:top-48 lg:left-48 text-white bg-[#00000071] p-10 rounded-2xl flex flex-col gap-3'>
                    <h3 className='text-3xl  font-medium '>{book.name}</h3>
                    <h3 className='text-xl font-semibold'>Author: {book.author}</h3>
                    <div className="flex gap-2">
                      <BiSolidCategoryAlt className='text-2xl' />
                      <span>
                        {book.category}
                      </span>
                    </div>
                    <div className='max-w-96'>
                      <p>
                        {book.shortDescription}
                      </p>
                      <p>
                        <Link to={`/book/${book._id}`} className='flex gap-1 items-center text-[#1266e3] font-semibold'><span>Continue</span> <IoIosArrowRoundForward className='text-3xl' /></Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </SwiperSlide>)
          }
        </Swiper>
      </div>
      {/* ---------- slider banner End ------------ */}
      {/* ------------ books card start ------------- */}
      <div>
        < h3 className="font-semibold md:mt-10 text-xl md:text-2xl lg:text-3xl text-base-content mx-auto text-center"> Explore Our Diverse Collection</h3>
        <p className="my-5 md:my-8 text-center md:w-2/3 mx-auto">Welcome to our virtual library! Immerse yourself in a curated world of knowledge and imagination. Explore our diverse collection. Whether you're seeking inspiration, information, or simply a captivating read, begin your journey of discovery with us today!</p>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {
            books.sort(function () { return 0.5 - Math.random() }).slice(0, 6).map(book => <HomeBookCard
              key={book._id} book={book}
            ></HomeBookCard>)
          }
        </div>
        <div>
          {
            loading &&
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }
        </div>
      </div>
      {/* ------------- books card end -------------- */}
      {/* ------------ books category card start ------------- */}
      <div className="border-t-2 rounded-2xl mt-5 md:mt-10 border-info">
        <div className="max-w-screen-xl mx-5 mt-5 md:mt-10 xl:px-5 2xl:px-0 xl:mx-auto">
          < h3 className="font-semibold text-xl md:text-2xl lg:text-3xl text-base-content mx-auto text-center">Books Categories</h3>
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
    </div>
  );
};

export default Home;