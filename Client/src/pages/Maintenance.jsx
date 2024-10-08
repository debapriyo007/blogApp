import React from 'react';
import { FaTools } from 'react-icons/fa';

const Maintenance = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-4">
      <div className="text-center">
        <FaTools className="text-gray-500 mb-6 mx-auto" size="16vw" />
        <h1 className="text-2xl md:text-5xl font-semibold text-gray-700">Site Under Maintenance</h1>
        <p className="text-sm md:text-xl text-gray-600 mt-4">We're currently working on improvements. Please check back later.</p>
      </div>
    </div>
  );
}

export default Maintenance;
