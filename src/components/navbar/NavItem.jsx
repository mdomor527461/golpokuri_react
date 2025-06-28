import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config/config";
export default function NavItem() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // 1. Call the backend logout API to destroy the session (or invalidate the token)
      const response = await axios.post(
        `${config.apiUrl}/logout/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Logged out successfully");
      }
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
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
          to="/post-story"
          className={({ isActive }) =>
            `hover:text-orange-500 transition duration-300 ${
              isActive ? "text-orange-500 font-bold" : ""
            }`
          }
        >
          Dashboard
        </NavLink>
      </li>

      {localStorage.getItem("authToken") ? (
        <li className="nav-item">
          <span
            className="hover:text-red-500 transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </span>
        </li>
      ) : (
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
      )}
    </ul>
  );
}
