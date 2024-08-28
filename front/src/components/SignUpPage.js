import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
const SignUpPage = () => {
  const navigate = useNavigate();
  const [userdetails, setUserdetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserdetails({
      ...userdetails,
      [name]: value,
    });
  };

  const registerHandle = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = userdetails;
    if (password !== confirmPassword) {
      alert("passwords do not match");
      setUserdetails({ ...userdetails, password: "", confirmPassword: "" });
    } else {
      if (!name || !email || !password || !confirmPassword) {
        alert("Please add all fields");
      }
      if (name && email && password && password === confirmPassword) {
        axios.post("/api/register", userdetails).then((res) => {
          alert(res.data.status);
          // console.log(res.data)
          navigate("/login");
        });
      }
    }
  };
  return (
    <section className="bg-blue-200">
      <nav className="flex justify-between p-6">
        <Link to="/">
          <img src={logo} alt="LOGO" className="h-20 w-auto" />
        </Link>
      </nav>
      <div className="flex flex-col items-center justify-start px-6 py-2 h-screen">
        <div className="w-full  shadow border max-w-md bg-gray-900 border-gray-700">
          <div className="p-6 space-y-6">
            <h1 className="font-bold text-center text-4xl text-white">
              SIGN UP
            </h1>
            <form className="space-y-6" action="post">
              <div>
                <label
                  htmlhtmlFor="name"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={userdetails.name}
                  onChange={changeHandler}
                  className="border text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-grey-900 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Email
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
                  Password
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
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  value={userdetails.confirmPassword}
                  onChange={changeHandler}
                  className="border text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-grey-900 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="mr-2 w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                  />
                </div>
                <div classNameName="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-300">
                    I accept the{" "}
                    <Link
                      className="font-medium hover:underline text-primary-500"
                      to="#"
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                onClick={registerHandle}
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800"
              >
                CREATE ACCOUNT
              </button>
              <p className="text-white text-sm">
                Already having an account?{" "}
                <Link
                  to="/login"
                  className="font-medium hover:underline dark:text-primary-500"
                >
                  LOGIN HERE
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
