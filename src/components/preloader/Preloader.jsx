export default function Preloader() {
  return (
    <section className="px-4 md:px-16 py-10 bg-white">
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
        {/* Animated spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-t-blue-400 rounded-full animate-spin animate-reverse"></div>
        </div>
        
        {/* Loading text with animation */}
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Loading Stories</h3>
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
        
        {/* Skeleton cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 w-full max-w-6xl">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 animate-pulse">
              <div className="h-32 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};