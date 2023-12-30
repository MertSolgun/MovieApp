import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import GoogleIcon from "../assets/icons/GoogleIcon";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const { googleSign } = useContext(AuthContext);

  const { Login, forgotPassword } = useContext(AuthContext);
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = login;
    Login(email, password);
    setLogin({ email: "", password: "" });
  };

  return (
    <div className="loginForm mx-auto ">
      <form
        className="shadow-md rounded px-8 border pt-6 mt-10 pb-8 mb-4 bg-gray-200 dark:bg-gray-900"
        onSubmit={handleSubmit}
      >
        <div className="text-center mx-auto items-center text-center justify-between text-3xl">
          <h1 className="text-blue-800  text-center mx-auto dark:text-white">
            Sign in
          </h1>
        </div>
        <div className="mb-6">
          <label
            className="block text-black text-sm font-bold mb-2 dark:text-white"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow bg-gray-300 appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            onChange={handleChange}
            value={login.email}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700  dark:text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow bg-gray-300 appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={login.password}
            onChange={handleChange}
          />
        </div>
        <div className="grid  grid-cols-1 text-center gap-5 mx-auto  items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <span
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            onClick={() => forgotPassword(login.email)}
          >
            Forgot Password?
          </span>
          <button
            className="bg-blue-500 p-3 px-1  flex   mx-auto items-center justify-center hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={googleSign}
          >
            Continue with Google
            <span>
              <GoogleIcon className="items-center mx-auto" />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
