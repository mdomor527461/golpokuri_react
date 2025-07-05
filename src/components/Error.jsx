import { useNavigate } from "react-router-dom";

export default function Error({ error, displayText }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-100 to-orange-100">
      <div className="text-center bg-white p-8 rounded-3xl shadow-2xl border-4 border-orange-200 animate-pulse">
        <div className="text-6xl mb-4">😢</div>
        <p className="text-red-600 text-xl mb-4 font-bold">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-8 py-3 rounded-full hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-bold text-lg"
        >
          {displayText}
        </button>
      </div>
    </div>
  );
}
