import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config/config";
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (!formData.email || !formData.password) {
        Swal.fire({
          icon: "error",
          title: "Please fill all required fields!",
          showConfirmButton: true,
          customClass: {
            confirmButton: "bg-[#e87318] text-white hover:bg-orange-700",
          },
        });
        return;
      } else {
        const response = await axios.post(`${config.apiUrl}/login/`, formData);
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("authUserId",response.data.user_id);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setFormData({
        email: "",
        password: "",
      });
      setError(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 "
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? (
                  <i className="fa fa-eye-slash"></i>
                ) : (
                  <i className="fa fa-eye"></i>
                )}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 px-4 rounded-lg font-semibold text-white transition duration-300 hover:opacity-90"
            style={{ backgroundColor: "#2898f6" }}
          >
            {loading ? "Logining" : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold hover:underline"
              style={{ color: "#e87318" }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
