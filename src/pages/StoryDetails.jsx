import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  StarIcon,
  HeartIcon,
  SparklesIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Touch/swipe states
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const pageRef = useRef(null);

  // Configuration
  const LINES_PER_PAGE = window.innerWidth <= 768 ? 10 : 25;
  const WORDS_PER_LINE = 10;

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

  // Split story content into pages
  useEffect(() => {
    if (story?.content) {
      const words = story.content.split(" ");
      const wordsPerPage = LINES_PER_PAGE * WORDS_PER_LINE;
      const storyPages = [];

      for (let i = 0; i < words.length; i += wordsPerPage) {
        const pageWords = words.slice(i, i + wordsPerPage);
        storyPages.push(pageWords.join(" "));
      }

      setPages(storyPages);
    }
  }, [story]);

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
      setSparkles((prev) => [...prev.slice(-5), newSparkle]);
    };

    const interval = setInterval(createSparkle, 2000);
    return () => clearInterval(interval);
  }, []);

  // Handle touch events for swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentPage < pages.length - 1) {
      nextPage();
    }
    if (isRightSwipe && currentPage > 0) {
      prevPage();
    }
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") prevPage();
      if (e.key === "ArrowRight") nextPage();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentPage, pages.length]);

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
        className={`w-6 h-6 transition-all duration-300 transform hover:scale-125 ${
          i < story.review ? "text-yellow-400 animate-pulse" : "text-gray-300"
        }`}
      />
    ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 relative overflow-hidden">
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
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-200 rounded-full animate-bounce opacity-20"></div>
        <div
          className="absolute top-40 right-16 w-16 h-16 bg-blue-200 rounded-full animate-bounce opacity-20"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-24 h-24 bg-orange-200 rounded-full animate-bounce opacity-20"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 right-10 w-12 h-12 bg-yellow-300 rounded-full animate-bounce opacity-20"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-6 py-3 rounded-full hover:from-orange-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg font-bold text-lg flex items-center gap-3"
          >
            <span className="text-2xl">🏠</span>← Back to Stories
          </button>
          <div>
            <span className="badge bg-orange-500 mx-10 text-white rounded-lg p-3">
              {story.read_count} Readers
            </span>
            {/* Like Button */}
            <button
              onClick={handleLike}
              className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
            >
              <HeartIcon
                className={`w-6 h-6 ${
                  liked ? "text-red-500 animate-pulse" : "text-gray-400"
                }`}
              />
            </button>
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

        {/* Book Pages Container */}
        <div className="relative">
          {/* Page Display */}
          <div
            ref={pageRef}
            className="bg-white shadow-2xl rounded-2xl min-h-[600px] mx-auto max-w-3xl border-4 border-orange-200 relative overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
              background: "linear-gradient(45deg, #fefefe 0%, #f9f9f9 100%)",
              boxShadow:
                "0 20px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            {/* Page Content */}
            <div
              className={`p-12 h-full transition-all duration-300 ${
                isTransitioning
                  ? "opacity-0 transform scale-95"
                  : "opacity-100 transform scale-100"
              }`}
            >
              {/* Page Header */}
              <div className="border-b-2 border-orange-200 pb-4 mb-8">
                <div className="flex justify-between items-center">
                  <div className="text-orange-600 font-semibold text-lg">
                    📖 {story.title}
                  </div>
                  <div className="text-orange-500 font-bold text-lg">
                    Page {currentPage + 1} of {pages.length}
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-800 leading-relaxed text-lg font-medium min-h-[400px]">
                  {pages[currentPage]?.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 text-justify">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Page Footer */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <div className="bg-orange-100 px-4 py-2 rounded-full border border-orange-200">
                  <span className="text-orange-700 font-bold">
                    {currentPage + 1} / {pages.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Page Turn Effect Overlay */}
            {isTransitioning && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
            )}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg transition-all duration-300 ${
              currentPage === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-orange-100 hover:scale-110 active:scale-95"
            }`}
          >
            <ChevronLeftIcon className="w-8 h-8 text-orange-600" />
          </button>

          <button
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
            className={`hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg transition-all duration-300 ${
              currentPage === pages.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-orange-100 hover:scale-110 active:scale-95"
            }`}
          >
            <ChevronRightIcon className="w-8 h-8 text-orange-600" />
          </button>
        </div>

        {/* Navigation Instructions */}
        <div className="text-center mt-8 text-orange-600 font-medium">
          <p className="mb-2">
            📱 Swipe left/right or use arrow keys to navigate
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <span>← Previous Page</span>
            <span>•</span>
            <span>Next Page →</span>
          </div>
        </div>

        {/* Page Progress Bar */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="bg-orange-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-400 to-yellow-400 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-orange-600 font-medium">
            <span>Start</span>
            <span>
              {Math.round(((currentPage + 1) / pages.length) * 100)}% Complete
            </span>
            <span>End</span>
          </div>
        </div>
      </div>
    </div>
  );
}
