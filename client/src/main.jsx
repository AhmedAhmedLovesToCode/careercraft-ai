// main.jsx - React entry point. This is where we mount <App /> to the DOM.

import React from "react";
// Import the createRoot API from react-dom/client (React 18+ / 19)
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css"; // Tailwind + custom styles

// Grab the root DOM element from index.html
const container = document.getElementById("root");

// Safety check: make sure the element exists
if (!container) {
  throw new Error("Root element with id 'root' not found");
}

// Create a React root and render the app into it
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
