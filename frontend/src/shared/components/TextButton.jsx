import React from "react";

export default function TextButton({
  btnName,
  onClick,
  btnColor,
  textColor,
  hoverColor,
}) {
  return (
    <button
      onClick={onClick}
      className={`${btnColor} ${textColor} rounded-full border hover:${hoverColor} hover:cursor-pointer mb-2`}
    >
      <p className="font-semibold p-2">{btnName}</p>
    </button>
  );
}
