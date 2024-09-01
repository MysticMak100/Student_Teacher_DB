import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import useAuth from "../../states/useAuth";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const EditStudent = () => {
  const navigate = useNavigate();
  const [dt, setDT] = useState({});
  const { id } = useParams();

  const { setAuth } = useAuth();

  //logout
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "/api/logout",
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

  const loadDetails = async () => {
    try {
      const token = Cookies.get("accessToken");

      const user = await axios.get(
        `https://student-teacher-db.onrender.com/student/edit/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setDT(user.data);
    } catch (error) {
      alert("Error", error);
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDT({
      ...dt,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const { name, fname, roll, classs, phnum, addresss } = dt;

    // Validation: Check if any field is empty
    if (!name || !fname || !roll || !classs || !phnum || !addresss) {
      alert("Please fill all fields.");
      return;
    }
    try {
      const token = Cookies.get("accessToken");

      const res = await axios.put(
        `https://student-teacher-db.onrender.com/student/edit/${id}`,
        dt,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      alert(res.data.status);
    } catch (error) {
      alert("error while editing student", error);
    }
    navigate("/students");
  };

  return (
    <section className="bg-gray-900">
      <div className="px-6 mx-auto h-screen pt-6">
        <Navbar handleLogout={handleLogout} />
        <div className="flex flex-col items-center justify-center mx-auto pt-6">
          <h1 className="text-3xl font-bold pb-6 text-white">Edit Student</h1>
          <div className="w-full rounded-lg shadow border max-w-md bg-gray-800 border-gray-700">
            <div className="p-6 space-y-6">
              <form className="space-y-6" action="post">
                <div className="flex justify-between">
                  <div className="w-full mr-4">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Student's Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={dt.name}
                      onChange={changeHandler}
                      id="name"
                      className="border text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div className="w-full ml-4">
                    <label
                      htmlFor="fname"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Father's Name
                    </label>
                    <input
                      type="text"
                      name="fname"
                      value={dt.fname}
                      onChange={changeHandler}
                      id="fname"
                      className="border text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      required=""
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-full mr-4">
                    <label
                      htmlFor="roll"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Roll Number
                    </label>
                    <input
                      type="number"
                      name="roll"
                      value={dt.roll}
                      onChange={changeHandler}
                      id="roll"
                      className="border text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div className="w-full ml-4">
                    <label
                      htmlFor="classs"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Class
                    </label>
                    <input
                      type="number"
                      name="classs"
                      value={dt.classs}
                      onChange={changeHandler}
                      id="classs"
                      className="border text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      required=""
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phnum"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phnum"
                    id="phnum"
                    value={dt.phnum}
                    onChange={changeHandler}
                    className="border text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="addresss"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="addresss"
                    id="addresss"
                    value={dt.addresss}
                    onChange={changeHandler}
                    className="border text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={handleSave}
                    type="submit"
                    className="mr-4 w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800"
                  >
                    Save
                  </button>
                  <Link
                    to="/students"
                    className="ml-4 w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800"
                  >
                    Go back
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditStudent;
