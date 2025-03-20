import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const FloatingActionButton = ({ onClick, btnName }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-10 right-10 shadow-lg bg-sky-700 text-white p-4 rounded-full shadow-lg hover:bg-sky-800"
    >
      <div className="flex">
        <FontAwesomeIcon icon={faAdd} className="mt-1 ps-2"/>
        <p className="font-semibold text-white ps-3 pe-2">{btnName}</p>
      </div>
    </button>
  );
};

export default FloatingActionButton;