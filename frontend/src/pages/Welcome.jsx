// src/pages/Welcome.jsx
import React from 'react';

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-gray-800">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-green-700 mb-4">Welcome to Exam Sheet Marking App</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your all-in-one solution for managing, marking, and analyzing exam sheets effortlessly. Let's get started!
        </p>
        <button
          className="px-6 py-3 text-white bg-green-500 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-200"
          onClick={() => alert('Redirect to Dashboard or next action')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
