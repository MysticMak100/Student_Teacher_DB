import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useAuth from "../../states/useAuth";
import Navbar from "../Navbar";

const StudentDB = () => {
  const [datafound, setDatafound] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  // logout
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
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getStudents = async () => {
    try {
      const token = Cookies.get("accessToken"); // Get the token from cookies

      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await axios.get("/api/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log(res.data);
      setData(res.data);
      setDatafound(true);
    } catch (error) {
      console.error("Error fetching students", error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const deleteStudent = async (_id) => {
    try {
      const token = Cookies.get("accessToken"); // Get the token from cookies

      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await axios.delete(`/api/student/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      alert(res.data.status);
      getStudents(); // Refresh the data after deleting
    } catch (error) {
      console.error("Error deleting student", error);
    }
  };

  //teachers
  const getting = async () => {
    // try {
    //   const token = Cookies.get("accessToken");
    //   console.log(token); // Assuming you have the token in cookies
    //   const res = await axios.get("/api/teachers", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //     withCredentials: true,
    //   });
    //   console.log(res.data);
    //   setData(res.data);
    //   setDatafound(true);
    // } catch (error) {
    //   console.log("Error", error);
    // }

    navigate("/teachers");
  };
  return (
    <section className="bg-gray-900">
      <div className="px-6 mx-auto h-screen pt-6">
        <Navbar handleLogout={handleLogout} />

        <div className="flex justify-between mt-10">
          <div>
            <button
              onClick={getting}
              className=" text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  px-3 py-1 text-center text-lg mr-4"
            >
              Teachers
            </button>
            <Link
              to="/students"
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  px-3 py-1 text-center text-lg ml-4"
            >
              Students
            </Link>
          </div>
          <Link
            to="/add_student"
            className=" text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-3 py-1 text-center text-lg"
          >
            Add
          </Link>
        </div>
        {datafound ? (
          data.length !== 0 ? (
            <table class="mt-5 text-white w-full text-center table-fixed">
              <thead className="border-b-2 text-lg">
                <tr>
                  <th>Name</th>
                  <th>Father's Name</th>
                  <th>Roll no.</th>
                  <th>Class</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((el, ind) => {
                  const {
                    _id,
                    type,
                    name,
                    fname,
                    roll,
                    classs,
                    phnum,
                    addresss,
                  } = el;
                  if (type === "student") {
                    return (
                      <tr key={ind} className="my-3">
                        <td>{name}</td>
                        <td>{fname}</td>
                        <td>{roll}</td>
                        <td>{classs}</td>
                        <td>{phnum}</td>
                        <td>{addresss}</td>
                        <td>
                          <Link
                            to={`/student/edit/${_id}`}
                            className=" text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  px-3 py-1 text-center text-md mr-2"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteStudent(_id)}
                            className=" text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium px-3 py-1 text-center text-md ml-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          ) : (
            <h1 className="text-2xl font-bold text-white text-center mt-20">
              No Student Added
            </h1>
          )
        ) : (
          <h1 className="text-2xl font-bold text-white text-center mt-20">
            Loading...
          </h1>
        )}
      </div>
    </section>
  );
};

export default StudentDB;
