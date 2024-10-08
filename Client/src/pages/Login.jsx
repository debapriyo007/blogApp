import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { URL } from '../url';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form inputs
  const validateForm = () => {
    let valid = true;

    if (!email) {
      toast.error("Email is required!");
      valid = false;
    } else if (!validateEmail(email)) {
      toast.error("Please enter a valid email!");
      valid = false;
    }

    if (!password) {
      toast.error("Password is required!");
      valid = false;
    } else if (password.length < 5) {
      toast.error("Password must be at least 5 characters!");
      valid = false;
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return; // Stop the login process if validation fails

    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data);
      toast.success("Login Successful!");
      navigate("/");
    } catch (err) {
      toast.error(`${err.response}`);
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer font-headingFont">
              Login Account
            </h1>
            <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer font-usernameDate">
              Create an account to enjoy all the experience!
            </p>
          </div>

          <div className="space-y-4">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="font-usernameDate block text-md py-3 px-4 rounded-lg w-full border outline-black placeholder:font-usernameDate"
              type="email"
              placeholder="Enter your email"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              className="font-usernameDate block text-md py-3 px-4 rounded-lg w-full border outline-black placeholder:font-usernameDate"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="text-center mt-6">
            <button
              onClick={handleLogin}
              className="w-full py-2 text-xl text-white bg-black rounded-lg hover:bg-slate-800 transition-all font-usernameDate"
            >
              Log in
            </button>
            <p className="mt-4 text-sm font-usernameDate">
              Don't Have An Account?{" "}
              <span className="underline cursor-pointer font-usernameDate">
                <Link to="/register">Register</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
