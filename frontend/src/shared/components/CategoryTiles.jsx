import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function CategoryTiles({ icon, text, onClick }) {
  return (
    <div className="bg-white w-60 rounded-md p-5 shadow flex flex-row hover:underline hover:cursor-pointer" onClick={onClick}>
      <FontAwesomeIcon icon={icon} className="ps-1 pe-4 text-gray-500" />
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-400">{text}</p>
    </div>
  );
}
