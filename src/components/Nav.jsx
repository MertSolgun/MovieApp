import React, { useContext } from "react";
import "flowbite";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import "flowbite/dist/flowbite.css";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import movieLogo from "./movieLogo.png";

const Nav = () => {
  const { logOut, currentUser } = useContext(AuthContext);
  const { email, displayName, photoURL } = currentUser || {
    email: "",
    displayName: "",
  };

  return (
    <div>
      <Navbar fluid rounded className="bg-gray-200">
        <Navbar.Brand as={Link} to="/" className="flex gap-3">
          <img src={movieLogo} alt="" className="rounded-xl navlogo" />
          <span className="font-bold text-lg xl:text-xl">
            Pulling You into the World of Film
          </span>
        </Navbar.Brand>

        <div className="flex md:order-2 px-2 gap-3 navitem">
          <Flowbite>
            <DarkThemeToggle />
          </Flowbite>
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img={photoURL} rounded />}
          >
            {currentUser ? (
              <Dropdown.Header>
                <span className="block text-sm">{displayName}</span>
                <span className="block truncate text-sm font-medium">
                  {email}
                </span>
                <Dropdown.Item onClick={logOut}>Log out</Dropdown.Item>
              </Dropdown.Header>
            ) : (
              <>
                <Dropdown.Item as={Link} to="/login">
                  Login
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/register">
                  Register
                </Dropdown.Item>
              </>
            )}

            <Dropdown.Divider />
          </Dropdown>
        </div>
        <Navbar.Collapse></Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Nav;
