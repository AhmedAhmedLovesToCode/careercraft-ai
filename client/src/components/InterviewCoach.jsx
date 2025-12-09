// Generates behavioral & technical interview questions

import React, {useState} from "react";

const API_BASE = "http://localhost:5001/api";

export default function InterviewCoach()
{
    const[jobDescription, setJobDescription] = useState(""); // Inputs job description
    const[focus, setFocus] = useState(""); // Inputs focus
    const[output, setOutput] = useState("");
    const[loading, setLoading] = useState(false);

    const handleGenerate = async () => { // calls back-end interview coach
        setLoading(true);
        setOutput("");

        try{
            const res = await fetch(`${API_BASE}/interview-coach`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({jobDescription, focus}),
            });

            const data = await res.json();
            
            if(data.eror)
            {
                setOutput("Error: " + data.error);
            }
            else
            {
                setOutput(data.result); // Gemini returns questions and answers
            }
        } catch(err){
            setOutput("Network Error: " + err.message);
        }
        finally{
            setLoading(false);
        }
    };

    

    return(
        <div className="glass-card">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold text-slate-50 md:text-lg">
                        Interview Coach
                    </h2>
                    <p className="text-xs text-slate-400 md:text-sm">
                        Get behavioral (STAR) and technical questions tailored to the 
                        posting, with model answers you can study and rewrite in your own voice.
                    </p>
                </div>
                <span className="inline-flex items-center rounded-full border border-sky-400/60 bg-sky-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-100">
                    Set 4 * Practice your pitch
                </span>
            </div>

            {/* Job description text area */}
            <label className="mb-1 block text-xs font-medium text-slate-300">
                Job description
            </label>

            <textarea
                rows={7}
                className="mb-3 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none ring-indigo-500/50 transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1"
                placeholder="Paste the internship posting here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
            />

            {/* Focus field */}
            <label className="mb-1 block text-xs font-medium text-slate-300">
                Focus area (optional)
            </label>

            <input
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none ring-indigo-500/50 transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1"
                placeholder="e.g. backend, frontend, data, ML, security..."
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
            />

            {/* Generate button */}
            <button
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-4 py-2 text-xs font-semibold text-slate-50 shadow-lg shadow-sky-500/30 transition-transform hover:scale-[1.02] hover:shadow-sky-400/40 hover:cursor-pointer disabled:opacity-60"
                onClick={handleGenerate}
                disabled={loading || !jobDescription.trim()}
            >
                {loading ? (
                <>
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-100 border-t-transparent" />
                    Generating…
                </>
                ) : (
                <>
                    <span className="h-2 w-2 rounded-full bg-sky-300" />
                    Generate Interview Prep
                </>
                )}
            </button>

            {/* Output from Gemini */}
            {output && (
                <div className="output-area">
                    <pre className="whitespace-pre-wrap break-words">
                        {output}
                    </pre>
                </div>
            )}
        </div>
    );
}