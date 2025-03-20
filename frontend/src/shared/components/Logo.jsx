import React from "react";

export default function Logo({ onClick }) {
  return (
    <h5
      onClick={onClick}
      className="text-2xl font-semibold italic whitespace-nowrap text-white bg-green-500 p-4 hover:bg-red-600 hover:cursor-pointer"
    >
      MY-INVENTORY.
    </h5>
  );
}
