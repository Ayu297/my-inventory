import React from "react";
import NavbarButton from "./NavbarButton";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <Logo
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                navigate("/");
              }}
              type="button"
              className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
              type="button"
              className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Log In
            </button>
          )}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <NavbarButton
              title="Home"
              onClick={() => {
                navigate("/");
              }}
            />
            <NavbarButton
              title="Category"
              onClick={() => {
                navigate("/category");
              }}
            />
            <NavbarButton
              title="Best Seller"
              onClick={() => {
                navigate("/best-seller");
              }}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
}
