import React from "react";

export default function NavbarButton({ onClick, title }) {
  return (
    <p
      className="block py-2 px-3 font-semibold text-white bg-blue-700 rounded md:bg-transparent md:text-gray-700 md:p-0 md:dark:text-blue-500 hover:underline hover:cursor-pointer"
      aria-current="page"
      onClick={onClick}
    >
      {title}
    </p>
  );
}
