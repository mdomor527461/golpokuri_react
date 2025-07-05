import { useState } from "react";
import {
  StarIcon,
  HeartIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
export default function StoryHeader({ story }) {

  const navigate = useNavigate();

  const stars = Array(5)
    .fill(0)
    .map((_, i) => (
      <StarIcon
        key={i}
        className={`w-6 h-6 transition-all duration-300 transform hover:scale-125 ${
          i < story.review ? "text-yellow-400 animate-pulse" : "text-gray-300"
        }`}
      />
    ));

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-6 py-3 rounded-full hover:from-orange-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg font-bold text-lg flex items-center gap-3"
        >
          <span className="text-2xl">🏠</span>← Go Back Home
        </button>
        <div>
          <span className="badge bg-orange-500 mx-10 text-white rounded-lg p-3">
            {story.read_count} Readers
          </span>
        </div>
      </div>
      <div className="relative overflow-hidden mb-8">
        <img
          src={story.image_url}
          alt={story.title}
          className="w-full h-64 md:h-96 object-cover transform hover:scale-110 transition-transform duration-700"
        />
      </div>
      {/* Story Header Info */}
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent mb-4 text-center">
        {story.title}
      </h1>
      <div className="text-center mb-8 md:flex justify-around items-center mt-4">
        <div className="mb-4">
          <span className="inline-block bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg">
            ✨ {story.category_name}
          </span>
        </div>

        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="flex gap-1">{stars}</div>
          <span className="text-orange-700 text-lg font-bold bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-300">
            ({story.review}/5) ⭐
          </span>
        </div>
      </div>
    </>
  );
}
