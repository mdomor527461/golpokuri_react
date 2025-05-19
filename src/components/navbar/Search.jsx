import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search() {
  return (
    <div className="flex items-center gap-2 border px-3 py-2 rounded">
      <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
      <input type="text" placeholder="Search..." className="outline-none w-full" />
    </div>
  );
}
