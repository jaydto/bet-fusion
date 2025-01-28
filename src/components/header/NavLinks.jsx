import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const location = useLocation();

  // Define the links and their details (icons, text, paths)
  const links = [
    {
      path: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          className="nuxt-icon !size-4 mr-2 text-yellow-400"
        >
          <path
            fill="currentColor"
            d="M10 3.5a1.5 1.5 0 0 1 3 0V4a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-.5a1.5 1.5 0 0 0 0 3h.5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-.5a1.5 1.5 0 0 0-3 0v.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1h-.5a1.5 1.5 0 0 1 0-3H4a1 1 0 0 0 1-1V6a1 1 0 0 1 1-1h3a1 1 0 0 0 1-1z"
          ></path>
        </svg>
      ),
      text: "Casino",
      buttonClass: "active-btn-display", // Add this class to hide on mobile
      buttonClassMobile: "active", // Add this class to hide on mobile
    },
    {
      path: "/promotions",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          className="nuxt-icon !size-4 mr-2 text-red-600"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0 1 12 2v5h4a1 1 0 0 1 .82 1.574l-7 10A1 1 0 0 1 8 18v-5H4a1 1 0 0 1-.82-1.573l7-10a1 1 0 0 1 1.12-.38"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      text: "Promotions",
      buttonClass: "active-btn-display", // Add this class to hide on mobile
      buttonClassMobile: "hidden-mobile-class", // Add this class to hide on mobile
    },
  ];

  return (
    <div className="flex items-left lg:items-center justify-start lg:justify-left space-x-2 no-scrollbar overflow-scroll py-0.5 px-3 py-2">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.path}
          aria-current={location.pathname === link.path ? "page" : undefined}
        >
          <button
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground py-0 lg:py-2 px-3 lg:px-4 h-8 lg:h-9 font-medium shadow ${
              location.pathname === link.path ? link.buttonClass : ""
            } ${link.buttonClassMobile}`}
          >
          
            {link.icon}
            {link.text}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
