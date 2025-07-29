console.log("Starting main.tsx...");

import { createRoot } from "react-dom/client";
console.log("Imported createRoot");

import App from "./App.tsx";
console.log("Imported App");

import "./index.css";
console.log("Imported index.css");

console.log("About to render App...");
createRoot(document.getElementById("root")!).render(<App />);
console.log("App rendered successfully");
