import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="bg-top bg-center bg-no-repeat bg-[url('https://images.hukumonline.com/frontend/lt5c24324708883/lt5c35c5db8631a.jpg')] bg-gray-700 bg-blend-multiply">
      <div className="px-4 mx-auto max-w-screen-xl flex flex-col justify-start items-start py-24 lg:py-56">
        <h1 className="my-4 text-3xl font-light tracking-wide leading-none text-white md:text-5xl lg:text-6xl">
        Manage your inventory with ease.
        </h1>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <a
            href="/category-list"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Go to category list
          </a>
        </div>
      </div>
    </section>
  );
}
