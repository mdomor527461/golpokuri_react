import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";

export default function StoryInteractions({
  story,
  likeCount = 0,
  initialLiked = false,
  onLike,
}) {
  const storyUrl = window.location.href;
  const storyTitle = story?.title || "Amazing Story";

  return (
    <div className="mx-auto max-w-3xl mt-8 ">
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-white/40 p-6">
        <div className="flex justify-around items-center">
          <LikeButton
            initialLiked={initialLiked}
            likeCount={likeCount}
            onLike={onLike}
          />

          

          <ShareButton storyTitle={storyTitle} storyUrl={storyUrl} />
        </div>
      </div>
    </div>
  );
}
