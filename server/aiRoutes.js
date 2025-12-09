// aiRoutes.js - all AI routes using direct REST calls instead of the SDK

import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Read API key from .env
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Debug: make sure we actually have a key
console.log(
  "Gemini key debug: length =",
  GEMINI_API_KEY?.length,
  ", startsWith =",
  GEMINI_API_KEY?.slice(0, 8)
);

/**
 * Helper: call Gemini REST API directly using fetch.
 * Uses v1 endpoint and the gemini-1.5-flash model.
 */
async function callModel({ system, user }) {
  const model = "gemini-2.5-flash"; // v1 model name

  const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

  // We’ll shove system + user into a single text prompt.
  const prompt = `${system.trim()}\n\nUSER INPUT:\n${user.trim()}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini HTTP ${response.status}: ${errText}`);
  }

  const data = await response.json();

  // Extract the text from the first candidate
  const text =
    data.candidates?.[0]?.content?.parts
      ?.map((p) => p.text || "")
      .join("") || "";

  return text || JSON.stringify(data, null, 2);
}

/*
     1) Job Description Summarizer
     Input: jobDescripton (string)
     Output: Json text with summary, skills, tech-stack, tites
*/

router.post("/analyze-job", async(req, res) => {
    const{jobDescription} = req.body; // Extracts job description

    if(!jobDescription)
    {
        return res.status(400).json({error: "Job description is required"});
    }

    const system = 
    ` You are an AI assistant that analyzes internship job descriptions for software / tech roles.
      Return structured JSON with fields: 
      - title (string)
      - company (string / null)
      - location (string / null)
      - required skills (string / null)
      - preferred skills (string / null)
      - tech stack (array of strings)
      - responsibilities (string / null)
      - summary (short paragraph summarizing the job description for recruiters).
    `;

    const user =   // User text that includes the Job Description and instructions to output JSON
    ` Analyze the following job description and extract the relevant information (only with valid JSON):
      ${jobDescription}
    `;

    try{
        const result = await callModel({system, user});
        // Sends Gemini's response back to the client (frontend)
        res.json({result});
    }
    catch(err)
    {
        console.error("Gemini /analyze-job error:", err);
        res.status(500).json({error: "Failed to analyze job description"});
    }
});




/*
     2) Resume Tailor
     Input: resumeText (string), jobDescription (string)
     Output: tailored bullet points, missing skills filled in 
*/

router.post("/tailor-resume", async(req, res)=> {
    const {resumeText, jobDescription} = req.body; // Extracts resume text & job description

    if(!resumeText || !jobDescription)
    {
        return res.status(400).json({error: "Resume and Job description are required"});
    }

    const system = `
    You are an expert technical recruiter and resume coach for software internships.
    Given a base resume and a job description, you will:
    1) Identify overlapping skills & experiences
    2) Identify missing vital skills from job description
    3) Suggest 3-6 improved bullet points to better align the resume with the job description
    Returns a concise markdown response with clear headings and bullet listings.
    `;

    const user = `
    Base resume (plain text): 
    ${resumeText}

    Job Description: 
    ${jobDescription}

    Now perform the analysis and suggestions as instructed.
    `;

    try{
        const result = await callModel({system, user});
        res.json({result});
    }
    catch(err)
    {
        console.error("Gemini /tailor-resume error:", err);
        res.status(500).json({error: "Failed to tailor resume."});
    }
});



/*
     3) Cover Letter Generator
     Input: resumeText (string), jobDescription (string), aboutMe (optional)
     Output: 3-5 paragraph cover letter
*/

router.post("cover-letter", async(req, res) => {
    const {resumeText, jobDescription, aboutMe} = req.body;

    const system = `
    You are an expert career coach that crafts compelling cover letters for software internships.
    Write a consice, impactful, cover letter (3 - 5 short paragraphs) tailored to the job,
    using the candidate's background and 'about me' notes. 
    `;

    const user = `
    Resume: 
    ${resumeText}

    Job Description:
    ${jobDescription}
    
    Aboute Me (tone, goals, personal details):
    ${aboutMe || ""}

    Write the cover letter now.
    `;

    try{
        const result = await callModel({system, user});
        res.json({result});
    }
    catch(err)
    {
        console.error("Gemini /cover-letter error:", err);
        res.status(500).json({error: "Failed to generate cover letter."});
    }
});

/*
     4) Interview Coach
     Input: jobDescription, optional focus
     Output: behavioral & technical questions with sample answers
*/

router.post("/interview-coach", async(req, res) => {
    const{jobDescription, focus} = req.body;

    const system = `
    You are an interview coach for software internships.
    Given a job description, generate:
        - 5 behavioral questions with STAR-style sample answers.
        - 5 technical or role-specific questions with brief model answers.

    Return the output in markdown with clear headings.
    `;

    const user = `
    Job description:
    ${jobDescription}

    Focus area (optional): ${focus || "general software internship"}

    Generate the questions and answers now.
    `;

    try{
        const result = await callModel({system, user});
        res.json({result});
    }
    catch(err)
    {
        console.error("Gemini /interview-coach error:", err);
        res.status(500).json({error: "Failed to generate interview prep."});
    }
});

export default router;