import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import Comment from '../components/Comment';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { URL, IF } from '../url';
import { UserContext } from '../context/UserContext';
import Loader from '../components/Loader';

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPost(res.data);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  const handelDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/" + postId, { withCredentials: true });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const handelAddComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(URL + "/api/comments/create", {
        comment: comment,
        author: user.username,
        postId: postId,
        userId: user._id
      }, { withCredentials: true });
      fetchPostComments();
      setComment("");
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className='px-4 md:px-[200px] mt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <h1 className='text-2xl font-bold text-black md:text-3xl font-headingFont'>
              {post.title}
            </h1>
            {user?._id === post?.userId && (
              <div className='flex items-center justify-center space-x-2 mt-4 md:mt-0'>
                <p className='cursor-pointer' onClick={() => navigate("/edit/" + postId)}><BiEdit size={22} /></p>
                <p className='cursor-pointer' onClick={handelDeletePost}><MdDelete size={22} /></p>
              </div>
            )}
          </div>

          <div className='flex flex-col md:flex-row items-center justify-between mt-2 md:mt-4'>
            <p className='text-gray-600 font-usernameDate'>@{post.username}</p>
            <div className='flex space-x-2 text-gray-600'>
              <p className='font-usernameDate'>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p className='font-usernameDate'>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <img src={IF + post.photo} className='rounded-md w-full mx-auto h-auto mt-8' alt='' />
          <p className='mx-auto mt-8 text-gray-800 font-paraFont'>{post.desc}</p>
          <div className='flex items-center mt-8 space-x-4 font-semibold'>
            <p className='text-lg'>Categories:</p>
            <div className='flex justify-center items-center space-x-2'>
              {post.categories?.map((c, i) => (
                <div key={i} className='bg-gray-300 rounded-lg px-3 py-1'>{c}</div>
              ))}
            </div>
          </div>

          <div className='flex flex-col mt-4'>
            <h3 className='mt-6 mb-4 font-semibold text-lg'>Comments:</h3>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} post={post} />
            ))}
          </div>

          {/* Write a Comment */}
          <div className='flex flex-col mt-4 md:flex-row space-x-2'>
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              className='h-12 border rounded-md border-gray-400 md:w-[90%] outline-none px-4 mt-4 md:mt-0'
              placeholder='Write a comment'
            />
            <button
              onClick={handelAddComment}
              className='rounded-md bg-black text-white px-4 py-3 md:w-[14%] mt-4 md:mt-0'
            >
               Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;