import { useState } from "react";
import { HeartIcon } from "@heroicons/react/20/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

export default function LikeButton({
  initialLiked = false,
  likeCount = 0,
  onLike,
  showReactors
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(likeCount);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = () => {
    setIsAnimating(true);
    const newLikedState = !liked;
    setLiked(newLikedState);
    setCount((prev) => (newLikedState ? prev + 1 : prev - 1));

    if (onLike) {
      onLike(newLikedState);
    }
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <button className="relative" onClick={handleLike}>
        {liked ? (
          <HeartIcon
            className={`w-8 h-8 text-red-500 ${
              isAnimating ? "animate-bounce scale-125" : ""
            } transition-all duration-300`}
          />
        ) : (
          <HeartOutline className="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-colors duration-300" />
        )}

        {/* Heart particles effect */}
        {isAnimating && liked && (
          <>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-75"></div>
            <div
              className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping opacity-75"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="absolute -top-1 -left-1 w-1 h-1 bg-red-300 rounded-full animate-ping opacity-75"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </>
        )}
      </button>

      <button onClick={showReactors}
        className={`text-lg font-medium transition-colors duration-300 ${
          liked ? "text-red-500" : "text-gray-600 group-hover:text-red-400"
        }`}
      >
        {count > 0 ? count : "0"}
      </button>
    </div>
  );
}
