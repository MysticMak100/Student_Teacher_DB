import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import useAuth from "../../states/useAuth";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const EditTeacher = () => {
  const navigate = useNavigate();
  const [dt, setDT] = useState({});
  const { id } = useParams();
  const { setAuth } = useAuth();

  //logout
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

  const loadDetails = async () => {
    try {
      const token = Cookies.get("accessToken");

      const user = await axios.get(
        `https://student-teacher-db.onrender.com/teacher/edit/${id}`,
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

    const { name, subject, classs, ph, addresss } = dt;

    // Validation: Check if any field is empty
    if (!name || !subject || !classs || !ph || !addresss) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const token = Cookies.get("accessToken");

      const res = await axios.put(
        `https://student-teacher-db.onrender.com/teacher/edit/${id}`,
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
      alert("error while editing teacher", error);
    }
    navigate("/teachers");
  };

  return (
    <section className="bg-gray-900">
      <div className="px-6 mx-auto h-screen pt-6">
        <Navbar handleLogout={handleLogout} />
        <div className="flex flex-col items-center justify-center mx-auto pt-6">
          <h1 className="text-4xl font-bold pb-6 text-white">
            Edit Teacher's Details
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
                      value={dt.name}
                      onChange={(e) => changeHandler(e)}
                      name="name"
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
                      value={dt.subject}
                      onChange={(e) => changeHandler(e)}
                      name="subject"
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
                      value={dt.classs}
                      onChange={(e) => changeHandler(e)}
                      name="classs"
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
                      value={dt.ph}
                      onChange={(e) => changeHandler(e)}
                      name="ph"
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
                    value={dt.addresss}
                    onChange={(e) => changeHandler(e)}
                    name="addresss"
                    id="addresss"
                    className="border text-sm focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    onClick={handleSave}
                    className="mr-4 w-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800"
                  >
                    Save
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

export default EditTeacher;
