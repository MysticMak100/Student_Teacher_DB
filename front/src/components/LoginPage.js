import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

const LoginPage = () => {
  const navigate = useNavigate();

  const [userdetails, setUserdetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserdetails({
      ...userdetails,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = userdetails;
    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }
    axios
      .post("https://student-teacher-db.onrender.com/login", userdetails)
      .then((res) => {
        alert(res.data.status);
        const { status } = res.data;
        console.log(status);
        if (status === "login successful") {
          Cookies.set("accessToken", res.data.accessToken);
          Cookies.set("refreshToken", res.data.refreshToken);
          navigate("/home");
        }
        if (status === "user not found") {
          navigate("/register");
        }
        if (status === "incorrect password") {
          setUserdetails({ ...userdetails, password: "" });
        }
      });
  };
  return (
    <section className="bg-blue-300">
      <nav className="flex justify-between p-6 ">
        <Link to="/">
          <img src={logo} alt="LOGO" className="h-20 w-auto" />
        </Link>
      </nav>
      <div className="flex flex-col items-center justify-start px-6 py-20 h-screen">
        <div className="w-full  shadow border max-w-md bg-gray-900 border-gray-700">
          <div className="p-6 space-y-6">
            <h1 className="font-bold text-4xl text-white">LOG IN</h1>
            <form className="space-y-6" action="post">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your Email :
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={userdetails.email}
                  onChange={changeHandler}
                  className="border text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-grey-900 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password :
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={userdetails.password}
                  onChange={changeHandler}
                  className="border text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-grey-900 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                onClick={handleLogin}
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800"
              >
                LOG IN
              </button>
              <p className="text-sm text-white">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium hover:underline dark:text-primary-500"
                >
                  SIGN UP HERE
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
