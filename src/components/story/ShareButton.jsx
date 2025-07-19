import { useState } from "react";
import { ShareIcon } from "@heroicons/react/20/solid";

export default function ShareButton({ storyTitle, storyUrl }) {
  const [isSharing, setIsSharing] = useState(false);

  // Check if Web Share API is supported
  const isWebShareSupported =
    typeof navigator !== "undefined" && "share" in navigator;

  // Handle direct sharing - no custom modal, straight to navigator
  const handleDirectShare = async () => {
    setIsSharing(true);

    try {
      if (isWebShareSupported) {
        // Check if the data can be shared
        const shareData = {
          title: storyTitle,
          text: `Check out: ${storyTitle}`,
          url: storyUrl,
        };

        // Check if the data is valid for sharing
        if (navigator.canShare && !navigator.canShare(shareData)) {
          throw new Error("Cannot share this data");
        }

        await navigator.share(shareData);
        console.log("Story shared successfully!");
      } else {
        // Fallback: copy the story URL to the clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(storyUrl);
          alert("Link copied to clipboard!");
        } else {
          // Fallback for older browsers
          const textArea = document.createElement("textarea");
          textArea.value = storyUrl;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          alert("Link copied to clipboard!");
        }
      }
    } catch (error) {
      console.error("Error sharing story:", error);

      // If sharing fails, fall back to clipboard
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(storyUrl);
          alert("Sharing failed, but link copied to clipboard!");
        } else {
          // Fallback for older browsers
          const textArea = document.createElement("textarea");
          textArea.value = storyUrl;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          alert("Sharing failed, but link copied to clipboard!");
        }
      } catch (clipboardError) {
        console.error("Error copying to clipboard:", clipboardError);
        alert("Sharing failed. Please copy the link manually.");
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      onClick={handleDirectShare}
      disabled={isSharing}
      className="group"
    >
      <ShareIcon className="w-8 h-8 text-gray-400 group-hover:text-orange-500 group-hover:scale-110 transition-colors duration-300" />
    </button>
  );
}
