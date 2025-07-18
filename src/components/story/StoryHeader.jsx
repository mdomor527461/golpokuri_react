import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config/config";
import Swal from "sweetalert2";

export default function StoryHeader({ story }) {
  const navigate = useNavigate();

  const [filledStars, setFilledStars] = useState([
    false,
    false,
    false,
    false,
    false,
  ]); // Initialize state for stars
  const [rateCount, setRateCount] = useState(0); // Initialize rateCount

  const token = localStorage.getItem("authToken");
  const authUserId = localStorage.getItem("authUserId");

  // Prefill stars based on the `story.user_rating.rating_number` on initial load
  useEffect(() => {
    if (story.user_rating && story.user_rating.rating_number) {
      const ratingNumber = story.user_rating.rating_number;
      const newFilledStars = Array(5).fill(false); // Reset all stars to false
      for (let i = 0; i < ratingNumber; i++) {
        newFilledStars[i] = true; // Mark the stars up to the rating number as filled
      }
      setFilledStars(newFilledStars); // Update the stars state
      setRateCount(ratingNumber); // Set the rate count to the user's rating
    }
  }, [story.user_rating]); // Re-run when `story.user_rating` changes

  const toggleStar = (index) => {
    const newFilledStars = [...filledStars];
    newFilledStars[index] = !newFilledStars[index];
    setFilledStars(newFilledStars);
  };

  useEffect(() => {
    let trueCount = filledStars.filter((item) => item === true).length;
    setRateCount(trueCount);
  }, [filledStars]);

  const handleRating = async () => {
    try {
      // Send the updated rating to the backend
      const response = await axios.post(
        `${config.apiUrl}/story/rating/`,
        {
          rating: rateCount,
          story: story.id,
          user: authUserId,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire("Success", "Story Rating Updated Successfully");
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

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
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                onClick={() => toggleStar(index)}
                className="w-8 h-12 cursor-pointer transition-colors duration-200 hover:scale-110 transform"
                viewBox="0 0 24 24"
                fill={filledStars[index] ? "#fbbf24" : "none"} // yellow if filled, otherwise transparent
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
          </div>
          <button
            onClick={handleRating}
            className="text-orange-700 text-lg font-bold bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-300 cursor-pointer transition-transform transform hover:scale-105 hover:bg-yellow-200"
          >
            Rate this story
          </button>
        </div>
      </div>
    </>
  );
}
