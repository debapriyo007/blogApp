import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import Menu from './Menu';
import { UserContext } from '../context/UserContext';
import { GiNotebook } from "react-icons/gi";
import { RxCrossCircled } from "react-icons/rx";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [showMessage, setShowMessage] = useState(true);
  const navigate = useNavigate();
  const path = useLocation().pathname; // this is for showing the search bar or not

  const showMenu = () => {
    setMenu(!menu);
  };

  const dismissMessage = () => {
    setShowMessage(false);
  };

  const { user } = useContext(UserContext);

  return (
    <>
      {showMessage && (
        <div className='bg-gradient-to-r from-black to-slate-800 p-4 flex justify-between items-center text-center'>
         
          <p className='text-white mx-auto md:text-[16px]  text-[13px] font-black '>When you perfrom some operation do it twice❗️</p>
          <RxCrossCircled className='cursor-pointer text-white' onClick={dismissMessage} size={22} />
        </div>
      )}
      <div className='sticky top-0 z-10 flex items-center justify-between px-4 md:px-[200px] py-4 shadow-sm bg-white'>
        <div className='flex items-center gap-1 md:gap-2'>
          <div><GiNotebook className='' size={23} /></div>
          <div><Link to='/'><h1 className='flex gap-2 text-sm md:text-xl font-black font-usernameDate'>Blog-Market</h1></Link></div>
        </div>

        {path === "/" && (
          <div className='flex justify-center items-center space-x-0 gap-2 md:gap-3'>
            <input
              onChange={(e) => setPrompt(e.target.value)}
              className='border border-gray-300 rounded-full outline-none py-1 px-3 md:px-4 md:py-2 placeholder:font-usernameDate font-usernameDate w-36 md:w-64 transition duration-200 ease-in-out focus:border-black focus:ring-1 focus:ring-black text-sm md:text-md'
              placeholder='Search a post...'
              type="text"
            />
            <p onClick={() => navigate(prompt ? "?search=" + prompt : "/")} className='bg-black text-white py-1 px-3 md:px-5 md:py-2 rounded-full cursor-pointer transition duration-200 ease-in-out hover:bg-gray-800'><BsSearch size={20}  /></p>
          </div>
        )}

        <div className='hidden md:flex items-center justify-center space-x-2 md:space-x-4'>
          {user ? (
            <h3>
              <Link className='bg-black text-white px-4 py-2 rounded-md cursor-pointer text-md font-usernameDate' to='/write'>Write</Link>
            </h3>
          ) : (
            <Link className='bg-black text-white px-4 py-2 rounded-md cursor-pointer text-sm font-usernameDate' to='/login'>Login</Link>
          )}

          {user ? (
            <div onClick={showMenu}>
              <p className='cursor-pointer relative'><FaBars size={21} /></p>
              {menu && <Menu />}
            </div>
          ) : (
            <Link className='bg-black text-white px-4 py-2 rounded-md cursor-pointer text-sm font-usernameDate' to='/register'>Register</Link>
          )}
        </div>

        <div onClick={showMenu} className='md:hidden text-lg'>
          <p className='cursor-pointer relative'><FaBars size={21} /></p>
          {menu && <Menu />}
        </div>
      </div>
    </>
  );
};

export default Navbar;