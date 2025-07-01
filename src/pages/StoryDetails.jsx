import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StarIcon, HeartIcon, SparklesIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import config from "../config/config";

export default function StoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const fetchStoryDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${config.apiUrl}/story/stories/${id}`,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setStory(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching story details:", err);
        setError("Failed to load story details");
        setLoading(false);

        if (err.response?.status === 401) {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      }
    };

    fetchStoryDetails();
  }, [id, navigate]);

  // Create floating sparkles effect
  useEffect(() => {
    const createSparkle = () => {
      const newSparkle = {
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 3,
      };
      setSparkles(prev => [...prev.slice(-5), newSparkle]);
    };

    const interval = setInterval(createSparkle, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setLiked(!liked);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-blue-100">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-8 border-yellow-200 border-t-orange-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <SparklesIcon className="h-8 w-8 text-orange-500 animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-orange-600 font-bold text-lg animate-bounce">
            Loading magical story... ✨
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-100 to-orange-100">
        <div className="text-center bg-white p-8 rounded-3xl shadow-2xl border-4 border-orange-200 animate-pulse">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-red-600 text-xl mb-4 font-bold">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-8 py-3 rounded-full hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-bold text-lg"
          >
            🏠 Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100">
        <div className="text-center">
          <div className="text-6xl mb-4">📖</div>
          <p className="text-orange-600 text-xl font-bold">Story not found</p>
        </div>
      </div>
    );
  }

  const stars = Array(5)
    .fill(0)
    .map((_, i) => (
      <StarIcon
        key={i}
        className={`w-8 h-8 transition-all duration-300 transform hover:scale-125 ${
          i < story.review ? "text-yellow-400 animate-pulse" : "text-gray-300"
        }`}
      />
    ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 via-blue-50 to-yellow-200 relative overflow-hidden">
      {/* Floating Sparkles */}
      {sparkles.map((sparkle) => (
        <SparklesIcon
          key={sparkle.id}
          className="absolute text-orange-400 animate-ping pointer-events-none"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            animationDelay: `${sparkle.delay}s`,
          }}
        />
      ))}

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-200 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute top-40 right-16 w-16 h-16 bg-blue-200 rounded-full animate-bounce opacity-30" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-200 rounded-full animate-bounce opacity-30" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-yellow-300 rounded-full animate-bounce opacity-30" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-6 py-3 rounded-full hover:from-orange-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg font-bold text-lg flex items-center gap-3 animate-pulse"
        >
          <span className="text-2xl">🏠</span>
          ← Back to Stories
        </button>

        {/* Story Card */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border-4 border-orange-200 transform hover:scale-[1.02] transition-all duration-500 animate-fade-in">
          {/* Image Container */}
          <div className="relative overflow-hidden">
            <img
              src={story.image_url}
              alt={story.title}
              className="w-full h-64 md:h-96 object-cover transform hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            {/* Like Button */}
            <button
              onClick={handleLike}
              className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
            >
              <HeartIcon className={`w-6 h-6 ${liked ? 'text-red-500 animate-pulse' : 'text-gray-400'}`} />
            </button>
          </div>

          <div className="p-8 md:p-12">
            {/* Category Badge */}
            <div className="mb-6 animate-bounce">
              <span className="inline-block bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-6 py-2 rounded-full text-lg font-bold cursor-pointer shadow-lg transform hover:scale-105 transition-all duration-300">
                ✨ {story.category_name}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent mb-6 animate-slide-in">
              {story.title}
            </h1>

            {/* Stars Rating */}
            <div className="flex items-center gap-4 mb-8 animate-slide-in" style={{animationDelay: '0.2s'}}>
              <div className="flex gap-1">{stars}</div>
              <span className="text-orange-700 text-xl font-bold bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-300">
                ({story.review}/5) ⭐
              </span>
            </div>

            {/* Story Content */}
            <div className="prose prose-lg max-w-none animate-slide-in" style={{animationDelay: '0.4s'}}>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl border-2 border-orange-200">
                <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg md:text-xl font-medium">
                  {story.content}
                </p>
              </div>
            </div>

            {/* Fun Elements */}
            <div className="mt-8 flex justify-center gap-4 animate-slide-in" style={{animationDelay: '0.6s'}}>
              <div className="text-4xl animate-bounce">📚</div>
              <div className="text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>🌟</div>
              <div className="text-4xl animate-bounce" style={{animationDelay: '0.4s'}}>🎭</div>
              <div className="text-4xl animate-bounce" style={{animationDelay: '0.6s'}}>🎨</div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}