export default function ReadButton({ label }) {
  return (
    <button
      className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-5 rounded font-bold"
    >
      {label}
    </button>
  );
}
