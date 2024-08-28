import React from "react";
import logo from "../assets/images/logo.jpg";
import { Link } from "react-router-dom";
const Navbar = ({ handleLogout }) => {
  return (
    <>
      <nav className="flex justify-between">
        <Link to="/home">
          <img src={logo} alt="LOGO" className="h-20 w-auto" />
        </Link>

        <button
          onClick={handleLogout}
          className=" text-white bg-red-600 hover:bg-red-900 focus:ring-4
          focus:outline-none focus:ring-primary-300 font-medium text-md
          px-6"
          style={{ height: "3rem" }}
        >
          LOG OUT
        </button>
      </nav>
    </>
  );
};

export default Navbar;
