import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import config from "../config/config";
import Loading from "../components/Loding";
import Error from "../components/Error";
import StoryHeader from "../components/story/StoryHeader";
import StoryContent from "../components/story/StoryContents";
import StoryProgress from "../components/story/StoryProgress";
import StoryInteractions from "../components/story/StoryInteractions";

export default function StoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sparkles, setSparkles] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  const handleLike = (isLiked) => {
    setLiked(isLiked);
    // Here you can also make an API call to update the like status on the server
    // updateLikeStatus(story.id, isLiked);
  };

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
        // Set initial values from API response
        setLiked(response.data.isLiked || false);
        setLikeCount(response.data.likeCount || 0);
        setCommentCount(response.data.commentCount || 0);
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
      setSparkles((prev) => [...prev.slice(-5), newSparkle]);
    };

    const interval = setInterval(createSparkle, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Loading text={"Loading Story"} />;
  }
  if (error) {
    return <Error error={error} displayText={"🏠 Go Back Home"} />;
  }

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
        <StoryHeader story={story} />

        {/* Book Pages Container */}
        <StoryContent story={story} />

        {/* Page Progress Bar */}
        <StoryProgress story={story} />

        {/* Story Interactions */}
        <StoryInteractions
          story={story}
          likeCount={likeCount}
          commentCount={commentCount}
          initialLiked={liked}
          onLike={handleLike}
        />
      </div>
    </div>
  );
}
