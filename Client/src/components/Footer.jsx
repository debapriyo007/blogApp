import React from 'react';
import { Instagram, Facebook, Github } from "lucide-react";
import { GiNotebook } from "react-icons/gi";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-black w-full flex mt-20">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-center text-white">
          <GiNotebook size={30} />
          <h1 className="text-2xl font-bold ml-2">
            <span className='text-white'></span>
            Blog 
            <span className='text-back'> Market</span>
          </h1>
        </div>

        <p className="text-md mx-auto mt-6 max-w-md text-center leading-relaxed text-white">
        <p className='font-black'> "Sharing Ideas, One Post at a Time"</p>
        Thank you for visiting! Follow us for more stories, insights, and inspiration. Let's stay connected!


        </p>

        <ul className="text-sm mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <Link to= '/' className="text-white transition hover:text-white/75 hover:underline" href="#"> About Us</Link>
          </li>
          <li>
            <Link to= '/' className="text-white transition hover:text-white/75 hover:underline" href="#"> Contact Us</Link>
          </li>
          <li>
            <Link to= '/register' className="text-white transition hover:text-white/75 hover:underline" href="#">Register</Link>
          </li>
        </ul>

        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-white transition hover:text-white/75"
            >
              <Instagram size={24} />
            </a>
          </li>
          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-white transition hover:text-white/75"
            >
              <Facebook size={26} />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/debapriyo007/"
              rel="noreferrer"
              target="_blank"
              className="text-white transition hover:text-white/75"
            >
              <Github size={26} />
            </a>
          </li>
        </ul>

        {/* <p className=" underline text-[12px]  text-center text-white mt-12">
        Copyright 2023. All right reserved by @debu
        </p> */}
      </div>
    </footer>
  );
};

export default Footer;