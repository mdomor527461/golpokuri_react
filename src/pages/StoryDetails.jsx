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
import ShowReactorsModal from "../components/modals/ShowReactorsModal";


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
  const token = localStorage.getItem("authToken");
  const [isOpen, setIsOpen] = useState(false);
  const [reactData, setReactData] = useState({
    story: "",
    type: "",
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  
  const fetchStoryDetails = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/story/stories/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      // console.log(response.data);
      setStory(response.data);
      setReactData({
        story: response.data.id,
        type: "love",
      });
      // Set initial values from API response
      setLiked(response.data.user_reaction || false);
      setLikeCount(response.data.all_user_reacts.length || 0);
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

  useEffect(() => {
    fetchStoryDetails();
  }, [id, navigate]);

  const handleLike = async (isLiked) => {
    try {
      setLiked(isLiked);

      if (isLiked) {
        // React করবো
        await axios.post(`${config.apiUrl}/story/react/`, reactData, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });

        // React করার পর fresh data আনবো
        await fetchStoryDetails();
      } else {
        // Unlike করার আগে fresh story আনবো, যাতে user_reaction.id নিশ্চিত করা যায়
        await fetchStoryDetails();

        const reactionId = story?.user_reaction?.id;

        if (!reactionId) {
          console.warn("No user_reaction id found for delete");
          return;
        }

        // এখন safely delete করবো
        await axios.delete(
          `${config.apiUrl}/story/react/delete/${reactionId}`,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Delete করার পর আবার fresh data আনবো
        await fetchStoryDetails();
      }
    } catch (error) {
      console.error(
        "❌ handleLike error:",
        error.response?.data || error.message
      );
    }
  };

  const showReactors = () => {
    openModal();
  };

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
          showReactors={showReactors}
        />
        <ShowReactorsModal story = {story} closeModal={closeModal} isOpen={isOpen}  />
      </div>

    
    </div>
  );
}
