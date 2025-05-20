import { StarIcon } from "@heroicons/react/20/solid";

export default function Story({ image, title, description, rating }) {
  const stars = Array(5)
    .fill(0)
    .map((_, i) => (
      <StarIcon
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 text-center animate-pop-in hover:scale-[1.03] transition-all duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-36 object-cover rounded-lg mb-4 animate-bounce-slow"
      />
      <h3 className="text-md font-bold text-[#20204A] text-xl text-left">{title}</h3>
      <div className="flex justify-start gap-1 my-2">{stars}</div>
      <p className="text-sm text-gray-600 whitespace-pre-line text-left">{description}</p>
      <p className="text-orange-600 font-bold mt-2 hover:underline cursor-pointer text-left">
        Read more
      </p>
    </div>
  );
}
