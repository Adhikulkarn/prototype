import { NavLink } from "react-router-dom";
import { useState } from "react"; // Import useState

export default function InfluencerNavbar({ tokens }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* LEFT */}
        <h1 className="text-lg font-semibold text-blue-600">
          Influencer Panel
        </h1>

        {/* Hamburger menu button for mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* RIGHT - Desktop view */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">

          <NavLink
            to="/influencer"
            end
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "hover:text-blue-600 transition pb-1"
            }
          >
            Campaigns
          </NavLink>

          <NavLink
            to="/influencer/chats"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "hover:text-blue-600 transition pb-1"
            }
          >
            My Chats
          </NavLink>

          <NavLink
            to="/influencer/profile"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "hover:text-blue-600 transition pb-1"
            }
          >
            Profile
          </NavLink>

          {/* Tokens */}
          <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-blue-200">
            {tokens} Tokens
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="text-red-500 hover:text-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile menu - conditionally rendered */}
      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink
            to="/influencer"
            end
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)} // Close menu on click
          >
            Campaigns
          </NavLink>
          <NavLink
            to="/influencer/chats"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)} // Close menu on click
          >
            My Chats
          </NavLink>
          <NavLink
            to="/influencer/profile"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)} // Close menu on click
          >
            Profile
          </NavLink>
          <div className="block px-3 py-2 text-base font-medium text-blue-700">
            {tokens} Tokens
          </div>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:text-red-600 hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
