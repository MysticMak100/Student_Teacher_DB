import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import useAuth from "../states/useAuth";
import Navbar from "./Navbar";

const Home = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://student-teacher-db.onrender.com/logout",
        {},
        { withCredentials: true }
      );

      if (response.data.status === "logout successful") {
        // Clear cookies
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");

        setAuth(null);

        alert("Logout successful");
        navigate("/login");
        // Redirect to login page
        // Redirect to login page
      } else {
        alert("Failed to logout");
      }
    } catch (error) {
      alert("Error logging out:", error);
    }
  };

  return (
    <>
      <section className="bg-gray-900">
        <div className="px-6 mx-auto h-screen pt-6">
          <Navbar handleLogout={handleLogout} />

          <div className="h-max flex justify-center mt-40">
            <div>
              <h1 className="text-7xl font-bold text-blue-200 p-5">
                CHOOSE A ROLE
              </h1>
              <div className="flex justify-center mt-4">
                <Link
                  to="/teachers"
                  className=" text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none cdfocus:ring-primary-300 font-medium px-10 py-6 text-center text-lg mr-3"
                >
                  TEACHER
                </Link>
                <Link
                  to="/students"
                  className=" text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  px-10 py-6 text-center text-lg ml-3"
                >
                  STUDENT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
