import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

const Front = () => {
  return (
    <div>
      <section className="bg-gray-900">
        <div className="px-6 mx-auto h-screen pt-6">
          <nav className="flex justify-between">
            <Link to="/">
              <img src={logo} className="h-20 w-auto" />
            </Link>
          </nav>
          <div className="h-max flex justify-center mt-40">
            <div>
              <h1 className="text-7xl font-bold text-blue-200">
                STUDENT-TEACHER DATABASE
              </h1>
              <div className="flex justify-center mt-8">
                <Link
                  to="/login"
                  className=" text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-10 py-6 text-center text-lg mr-3"
                >
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  className=" text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-10 py-6 text-center text-lg ml-3"
                >
                  REGISTER
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Front;
