import React from "react";
import { Link } from "react-router-dom";
import { SiFacebook, SiTwitter, SiYoutube } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import download from "../images/download.jpeg";

const Footer = () => {
  return (
    <footer className="bg-indigo-600">
      {/* Flex Container */}
      <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0">
        {/* Logo and social links container */}
        <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start">
          <div className="mx-auto my-6 text-center text-white md:hidden">
            Copyright &copy; 2022, All Rights Reserved
          </div>
          {/* Logo */}
          <div>
            {/* <h1
              onClick={() => navigate("/")}
              className="text-3xl text-center font-bold text-white cursor-pointer"
            >
              Smiles.com
            </h1> */}
            <img src={download} alt="Loading..." className="h-14 w-40" />
          </div>
          {/* Social Links Container */}
          <div className="flex justify-center space-x-4">
            {/* Links 1 */}
            <span>
              <SiFacebook className="h-7 w-7 cursor-pointer text-blue-600" />
            </span>
            {/* Links 2 */}
            <a href="./video.mp4">
              <SiYoutube className="h-7 w-7 cursor-pointer text-red-600" />
            </a>
            {/* Links 3 */}
            <span>
              <SiTwitter className="h-7 w-7 cursor-pointer text-blue-400" />
            </span>
            {/* Links 4 */}
            <span>
              <RiInstagramFill className="h-7 w-7 cursor-pointer text-[#a8329d]" />
            </span>
          </div>
        </div>
        {/* List Container */}
        <div className="flex justify-around space-x-16 sm:space-x-32">
          <div className="flex flex-col space-y-3 text-white">
            <span className="hover:text-red-300">
              <Link to="/">Home</Link>
            </span>
            <span className="hover:text-red-300">
              <Link to="/campaigns">Campaigns</Link>
            </span>
            <span className="hover:text-red-300">
              <Link to="/testimonies">Testimony</Link>
            </span>
          </div>

          <div className="flex flex-col space-y-3 text-white">
            <span className="hover:text-red-300">
              <Link to="/contact-us">Contact Us</Link>
            </span>
            <span className="hover:text-red-300">
              <Link to="/about-us">About Us</Link>
            </span>
            <span className="hover:text-red-300">
              <Link to="/privacy-policy">Privacy Policy</Link>
            </span>
          </div>
        </div>

        {/* Input Container */}
        <div className="flex flex-col justify-between">
          <form>
            <div className="flex flex-1 justify-center lg:justify-end">
              <div className="w-full px-2 lg:px-6">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative text-indigo-200 focus-within:text-gray-400">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full rounded-md border border-transparent bg-indigo-400 bg-opacity-25 py-2 pl-10 pr-10 leading-5 text-indigo-100 placeholder-indigo-200 focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="hidden text-white md:block">
            Copyright &copy; 2022, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
