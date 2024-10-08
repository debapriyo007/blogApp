import React, { useContext } from 'react';
import { IF } from '../url';
import { UserContext } from '../context/UserContext';

const HomePost = ({ post }) => {
  const { user } = useContext(UserContext);

  return (
    <div className='w-full'>
      <div className='w-full flex flex-col md:flex-row mt-14 space-y-4 md:space-y-0 md:space-x-4'>
        {/* Left side */}
        <div className='w-full md:w-[35%] h-[200px] flex justify-center items-center overflow-hidden rounded-lg shadow-md'>
          <img src={IF + post.photo} alt="" className='h-full w-full object-cover' />
        </div>

        {/* Right Side */}
        <div className='flex flex-col w-full md:w-[65%]'>
          <h1 className='text-2xl font-bold mb-2 md:mb-4 md:text-2xl font-headingFont'>
            {post.title}
          </h1>
          <div className='flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4'>
            <p className='font-usernameDate'>@{post.username}</p>
            <div className='flex space-x-2 text-sm'>
              <p className='font-usernameDate'>{new Date(post.updatedAt).toString().slice(3, 15)}</p>
              <p className='font-usernameDate'>{new Date(post.updatedAt).toString().slice(16, 21)}</p>
            </div>
          </div>
          <p className='text-md md:text-md font-paraFont'>{post.desc.slice(0, 300) + " ...Read more"}</p>
        </div>
      </div>
      <hr className='my-8 border-t border-gray-300' />
    </div>
  );
};

export default HomePost;