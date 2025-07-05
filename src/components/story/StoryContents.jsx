import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
export default function StoryContent({ story }) {
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

  return (
    <>
      {" "}
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
    </>
  );
}
