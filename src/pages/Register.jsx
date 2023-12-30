import React, { useState } from "react";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const { googleSign } = useContext(AuthContext);

  const { register } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, firstName, lastName } = info;
    const displayName = `${firstName} ${lastName}`;
    console.log(displayName);
    register(email, password, displayName);
    setInfo({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="registerForm mx-auto">
      <form
        className="shadow-md rounded border mt-10 px-8 pt-6 pb-8 mb-4 bg-gray-200 dark:bg-gray-900 "
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-2xl text-center">Sign Up</h1>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className="shadow bg-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            type="text"
            name="firstName"
            value={info.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className="shadow bg-gray-300 a appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            type="text"
            name="lastName"
            value={info.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow bg-gray-300 a appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            value={info.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow  bg-gray-300 appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={info.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex  flex-col gap-3 items-center justify-between">
          <div className="flex flex-col items-center gap-3 mx-auto">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
            <button
              className="bg-blue-500  flex p-3 mx-auto items-center justify-center hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={googleSign}
            >
              Continue with Google
              <GoogleIcon className="items-center mx-auto" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
