import { StarIcon } from "@heroicons/react/20/solid";

export default function Story({ image_url, title, content, review }) {
  const stars = Array(5)
    .fill(0)
    .map((_, i) => (
      <StarIcon
        key={i}
        className={`w-5 h-5 ${
          i < review ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 text-center animate-pop-in hover:scale-[1.03] transition-all duration-300">
      <img
        src={image_url}
        alt={title}
        className="w-full h-36 object-cover rounded-lg mb-4 animate-bounce-slow"
      />
      <h3 className="text-md font-bold text-[#20204A] text-xl text-left">
        {title.slice(0, 20)}
        {title.length > 20 && "..."}
      </h3>
      <div className="flex justify-start gap-1 my-2">{stars}</div>
      <p className="text-sm text-gray-600 whitespace-pre-line text-left">
        {content.slice(0, 40)}
        {content.length > 40 && "..."}
      </p>

      <p className="text-orange-600 font-bold mt-2 hover:underline cursor-pointer text-left">
        Read more
      </p>
    </div>
  );
}
