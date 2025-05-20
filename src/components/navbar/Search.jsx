import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search() {
  return (
    <div className="flex items-center gap-2 border px-3 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 w-[300px]">
      <MagnifyingGlassIcon className="h-5 w-5 text-orange-400" />
      <input
        type="text"
        placeholder="Search..."
        className="outline-none text-sm text-gray-700"
      />
    </div>
  );
}
