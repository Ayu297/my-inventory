import React from "react";
import Hero from "./components/Hero";
import Category from "./components/Category";
import BestSeller from "./components/BestSeller";

export default function LandingPage() {
  return (
    <div className="bg-gray-200">
      <Hero />
      <BestSeller />
      <Category />
    </div>
  );
}
