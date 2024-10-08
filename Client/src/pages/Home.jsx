import React, { useContext, useEffect, useState } from "react";
import HomePost from "../components/HomePost";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import axios from "axios";
import { URL } from "../url";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  
  const [visibleCount, setVisibleCount] = useState(5); // State to manage visible posts

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResult(true);
      } else {
        setNoResult(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [search]);

  // Handler for the 'More' button
  const handleShowMore = () => {
    setVisibleCount(posts.length); // Show all posts
  };

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResult ? (
          <>
            {/* Display only the number of posts based on visibleCount */}
            {posts.slice(0, visibleCount).map((post) => (
              <Link key={post._id} to={user ? `/posts/post/${post._id}` : "/login"}>
                <HomePost post={post} />
              </Link>
            ))}
            {/* Show 'More' button only if there are hidden posts */}
            {visibleCount < posts.length && (
              <div className="flex justify-center mt-4">
                <button
                  className="bg-black text-white py-2 px-7 rounded"
                  onClick={handleShowMore}
                >
                  More
                </button>
              </div>
            )}
          </>
        ) : (
          <h1 className="text-2xl text-center font-bold mt-52">
            No Post available! <span className="text-3xl">🥱</span>
          </h1>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
