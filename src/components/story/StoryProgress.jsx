import { useState, useEffect } from "react";
export default function StoryProgress({ story }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);
  // Configuration
  const LINES_PER_PAGE = window.innerWidth <= 768 ? 10 : 25;
  const WORDS_PER_LINE = 10;
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
  return (
    <>
      {" "}
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
    </>
  );
}
