import React from 'react';
import { IF } from '../url';

const ProfilePost = ({ p }) => {
  return (
    <div className='w-full flex flex-col md:flex-row mt-7'>
      {/* left side */}
      <div className='w-full md:w-[55%] h-[300px] md:h-[300px] flex justify-center items-center rounded-md'>
        <img
          src={IF + p.photo}
          alt=""
          className='h-full w-full object-cover border shadow-md border-gray-200 rounded-t-md md:rounded-l-md md:rounded-t'
        />
      </div>

      {/* right Side */}
      <div className='flex flex-col w-full md:w-[85%] h-[300px] border shadow-sm border-gray-200 p-4 md:p-10 rounded-b-md md:rounded-r-md md:rounded-b-none'>
        <h1 className='text-lg md:text-xl font-bold mb-2 md:mb-4 font-headingFont'>
          {p.title}
        </h1>
        <div className='flex flex-col md:flex-row mb-2 text-sm font-semibold justify-between text-gray-500 space-y-2 md:space-y-0 md:space-x-4 md:mb-4'>
          <p>@{p.username}</p>
          <div className='flex space-x-2'>
            <p className='text-sm'>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
            <p className='text-sm'>{new Date(p.updatedAt).toString().slice(16, 21)}</p>
          </div>
        </div>
        <p className='text-sm md:text-md overflow-y-auto font-paraFont'>{p.desc}</p>
      </div>
    </div>
  );
};

export default ProfilePost;