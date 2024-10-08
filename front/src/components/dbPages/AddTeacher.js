import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../states/useAuth";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const AddTeacher = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  // logout
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

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    subject: "",
    classs: "",
    ph: "",
    addresss: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewTeacher({
      ...newTeacher,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, subject, classs, ph, addresss } = newTeacher;

    // Validation: Check if any field is empty
    if (!name || !subject || !classs || !ph || !addresss) {
      alert("Please fill all fields.");
      return;
    }

    const token = Cookies.get("accessToken");
    // Assuming you have the token in cookies
    axios
      .post("https://student-teacher-db.onrender.com/add_teacher", newTeacher, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        alert(res.data.status);
        navigate("/teachers");
      });
  };

  return (
    <section className="bg-gray-900">
      <div className="px-6 mx-auto h-screen pt-6">
        <Navbar handleLogout={handleLogout} />
        <div className="flex flex-col items-center justify-center mx-auto pt-6">
          <h1 className="text-3xl font-bold pb-6 text-white">
            Add New Teacher's Details
          </h1>
          <div className="w-full shadow border max-w-md bg-black border-gray-700">
            <div className="p-6 space-y-6">
              <form className="space-y-6" action="post">
                <div className="flex justify-between">
                  <div className="w-full mr-4">
                    <label
                      for="name"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Teacher's Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newTeacher.name}
                      onChange={changeHandler}
                      id="name"
                      className="border text-sm focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="w-full ml-4">
                    <label
                      for="subject"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={newTeacher.subject}
                      onChange={changeHandler}
                      id="subject"
                      className="border text-sm focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-full mr-4">
                    <label
                      for="classs"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Class
                    </label>
                    <input
                      type="number"
                      name="classs"
                      value={newTeacher.classs}
                      onChange={changeHandler}
                      id="classs"
                      className="border text-sm focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="w-full ml-4">
                    <label
                      for="ph"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Phone number
                    </label>
                    <input
                      type="number"
                      name="ph"
                      value={newTeacher.ph}
                      onChange={changeHandler}
                      id="ph"
                      className="border text-sm focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="addresss"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="addresss"
                    value={newTeacher.addresss}
                    onChange={changeHandler}
                    id="addresss"
                    className="border text-sm focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="mr-4 w-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800"
                  >
                    Add
                  </button>
                  <Link
                    to="/teachers"
                    className="ml-4 w-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800"
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

export default AddTeacher;
