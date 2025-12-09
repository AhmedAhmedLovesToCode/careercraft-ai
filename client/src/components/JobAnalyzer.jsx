// Job Analyzer -> Analyzes job descriptions, and returns a structed JSON

import React, {useState} from "react";

const API_BASE = "http://localhost:5001/api";

export default function JobAnalyzer() {
    const [jobDescription, setJobDescription] = useState(""); // Stores the job description input
    const [output, setOutput] = useState(""); // Output from the GenAI backend (string)
    const [loading, setLoading] = useState(false); // Whether a request is currently in-flight
  
    // Calls the backend /analyze-job endpoint
    const handleAnalyze = async () => {
      setLoading(true);
      setOutput("");
  
      try {
        const res = await fetch(`${API_BASE}/analyze-job`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Send the job description in the request body
          body: JSON.stringify({ jobDescription }),
        });
  
        const data = await res.json();
  
        if (data.error) {
          // If the backend sent an error message, show it
          setOutput("Error: " + data.error);
        } else {
          // data.result contains the Gemini response text
          // We expect JSON, so attempt to parse for pretty printing
          try {
            const parsed = JSON.parse(data.result);
            setOutput(JSON.stringify(parsed, null, 2));
          } catch {
            // If parsing fails, just show the raw text
            setOutput(data.result);
          }
        }
      } catch (err) {
        setOutput("Network error: " + err.message);
      } finally {
        setLoading(false);
      }
    };


    return(
        <div className="glass-card">
            <div className="mb-3 flex items-center justifty-between gap-3">
                <div>
                    <h2 className="text-base font-semibold text-slate-50 md:text-lg">
                        Job Description Analyzer
                    </h2>
                    <p className="text-xs text-slate-400 md:text-sm">
                        Paste any internship posing and get a structured breakdown of title, skills, 
                        responsibilities, and tech stack using Gemini.
                    </p>
                </div>

                {/* Small pill badge to show steps */}
                <span className="inline-flex items-center rounded-full border border-indigo-400/60 bg-indigo-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-100">
                    Step 1 * Understand the role
                </span>
            </div>

            {/* Large textarea for job description input */}
            <textarea
                rows={10}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none ring-indigo-500/50 transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1"
                placeholder="Paste the job description here (LinkedIn, Handshake, etc.).."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
            />

            {/* Analyze button with loading state */}
            <button
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 px-4 py-2 text-xs font-semibold text-slate-50 shadow-lg shadow-indigo-500/30 transition-transform hover:scale-[1.02] hover:shadow-indigo-400/40 hover:cursor-pointer disabled:opacity-60"
                onClick={handleAnalyze}
                disabled={loading|| !jobDescription.trim()}
            >
                {loading ? (
                    <>
                        {/* Simple spinner circle */}
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-100 border-t-transparent"/>
                        Analyzing...
                    </>
                ) : (
                    <>
                        <span className="h-2 w-2 rounded-full bg-emerald-300"/>
                        Analyze Job
                    </>
                )}
            </button>

            {/* Output from Gemini (JSON or text) */}
            {output && (
                <div className="output-area">
                    {/* <>pre preserves spacing and new lines */}
                    <pre className="whitespace-pre-wrap break-words">
                        {output}
                    </pre>
                </div>
            )}
        </div>
    );
}