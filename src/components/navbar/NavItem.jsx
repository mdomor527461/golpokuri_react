export default function NavItem() {
  return (
    <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-lg font-semibold text-[#1a1a1a]">
      <li className="hover:text-orange-500 transition duration-300 nav-item">Home</li>
      <li className="hover:text-orange-500 transition duration-300 nav-item">Read Story</li>
      <li className="hover:text-orange-500 transition duration-300 nav-item">Post Story</li>
      <li className="hover:text-red-500 transition duration-300 nav-item">Logout</li>
    </ul>
  );
}
