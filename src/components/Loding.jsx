import { SparklesIcon } from "@heroicons/react/20/solid";
export default function Loading({ text }) {
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
          {text}... ✨
        </p>
      </div>
    </div>
  );
}
