import React from 'react';
import './styles.css'; // Importing the separate CSS file

const App = () => {
  // Function to handle the "Go Home" button click.
  // It redirects the user to the root URL of the site.
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    // Main container using Tailwind CSS for a full-screen, centered layout.
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 text-white font-sans overflow-hidden">
      
      {/* The main content card, centered and styled with rounded corners and a shadow. */}
      <div className="text-center p-8 bg-gray-800 rounded-xl shadow-lg border-2 border-gray-700 max-w-lg w-full">
        
        {/* The floating ghost animation element. */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* The 404 text is large and bold, with a cool, floating animation. */}
            <h1 className="text-9xl font-extrabold text-white animate-float-slow">
              404
            </h1>
          </div>
          {/* SVG for the ghost icon. */}
          <svg
            className="w-48 h-48 mx-auto text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        
        {/* The main heading for the page. */}
        <h2 className="text-4xl font-bold mt-8 mb-2 text-white">
          Whoops, looks like you're lost.
        </h2>
        
        {/* A descriptive paragraph explaining the error. */}
        <p className="text-gray-400 text-lg mb-8">
          The page you're looking for doesn't seem to exist.
        </p>
        
        {/* The call-to-action button to navigate back to the home page. */}
        <button
          onClick={handleGoHome}
          className="bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default App;
