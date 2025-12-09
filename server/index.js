import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./aiRoutes.js";

dotenv.config(); // Loads environment variables from .env file (GEMINI API_KEY, PORT NUM)

const app = express();
const PORT = process.env.PORT || 5001; 

app.use(cors()); // Enables CORS so React FrontEnd can call API

app.use(express.json()); // Automatically parses JSON requests

app.use("/api", aiRoutes); // Mounts AI routes at /api

app.get("/", (req, res) => { // Health check  
    res.send("CareerCraft AI backend (GenAI) is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});