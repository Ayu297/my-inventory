import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconButton({ btnName, btnIcon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-3 me-3 rounded-lg border hover:bg-gray-200 hover:cursor-pointer"
    >
      <div className="flex">
        <FontAwesomeIcon icon={btnIcon} className="mt-1 ps-2" />
        <p className="font-semibold ps-3 pe-2">{btnName}</p>
      </div>
    </button>
  );
}
