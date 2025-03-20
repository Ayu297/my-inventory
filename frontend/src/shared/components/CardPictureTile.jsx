import React from "react";

export default function CardPictureTile({
  image,
  imageOnClick,
  category,
  categoryOnClick,
  name,
  seller,
  sellerOnClick,
  price,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg hover:cursor-pointer w-64 h-64 object-cover" src={image} alt={name} onClick={imageOnClick} />
      <div className="p-5">
        <p className="text-sm font-normal text-gray-700 dark:text-gray-400 hover:underline hover:cursor-pointer" onClick={categoryOnClick}>
          {category}
        </p>
        <p className="py-1 text-md font-semibold text-gray-900 dark:text-white hover:underline hover:cursor-pointer" onClick={imageOnClick}>
          {name}
        </p>
        <p className="text-sm font-normal text-gray-700 dark:text-gray-400 hover:underline hover:cursor-pointer" onClick={sellerOnClick}>
          {seller}
        </p>
      </div>
    </div>
  );
}
