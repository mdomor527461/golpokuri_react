import { NavLink } from "react-router-dom";

export default function NavItem() {
  return (
    <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-lg font-semibold text-[#1a1a1a]">
      <li className="nav-item">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-orange-500 transition duration-300 ${
              isActive ? "text-orange-500 font-bold" : ""
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/read-story"
          className={({ isActive }) =>
            `hover:text-orange-500 transition duration-300 ${
              isActive ? "text-orange-500 font-bold" : ""
            }`
          }
        >
          Read Story
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/post-story"
          className={({ isActive }) =>
            `hover:text-orange-500 transition duration-300 ${
              isActive ? "text-orange-500 font-bold" : ""
            }`
          }
        >
          Post Story
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `hover:text-red-500 transition duration-300 ${
              isActive ? "text-red-500 font-bold" : ""
            }`
          }
        >
          Login
        </NavLink>
      </li>
    </ul>
  );
}
