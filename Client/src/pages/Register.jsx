import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url.js';
import toast from 'react-hot-toast';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form inputs
  const validateForm = () => {
    if (!username) {
      toast.error('Username is required!');
      return false;
    }

    if (!email) {
      toast.error('Email is required!');
      return false;
    } else if (!validateEmail(email)) {
      toast.error('Please enter a valid email!');
      return false;
    }

    if (!password) {
      toast.error('Password is required!');
      return false;
    } else if (password.length < 5) {
      toast.error('Password must be at least 5 characters!');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return; // Stop form submission if validation fails

    try {
      const res = await axios.post(URL + '/api/auth/register', {
        username,
        email,
        password,
      });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      toast.success('Register Successful!');
      navigate('/login');
    } catch (err) {
      toast.error('Something went wrong!');
      setTimeout(() => {}, 2000);
    }
  };

  return (
    <>
      <div className='min-h-screen flex justify-center items-center'>
        <div className='py-12 px-12 bg-white rounded-2xl shadow-xl z-20'>
          <div>
            <h1 className='text-3xl font-bold text-center mb-4 cursor-pointer font-headingFont'>
              Create An Account
            </h1>
            <p className='w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer font-usernameDate'>
              Create an account to enjoy all the experience!
            </p>
          </div>

          <div className='space-y-4'>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className='block text-md py-3 px-4 rounded-lg w-full border outline-black font-usernameDate placeholder:font-usernameDate'
              type='text'
              placeholder='Enter your username'
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className='block text-md py-3 px-4 rounded-lg w-full border outline-black font-usernameDate placeholder:font-usernameDate'
              type='email'
              placeholder='Enter your email'
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className='block text-md py-3 px-4 rounded-lg w-full border outline-black font-usernameDate placeholder:font-usernameDate'
              type='password'
              placeholder='Enter your password'
            />
          </div>

          <div className='text-center mt-6'>
            <button
              onClick={handleRegister}
              className='w-full py-2 text-xl text-white bg-black rounded-lg hover:bg-slate-800 transition-all font-usernameDate'
            >
              Register
            </button>
            <p className='mt-4 text-sm font-usernameDate'>
              Already Have An Account?{' '}
              <span className='underline cursor-pointer font-usernameDate'>
                <Link to='/login'>Log in</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
