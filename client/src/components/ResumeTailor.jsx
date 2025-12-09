// Compares Resume vs JobDescription, and suggests improvements

import React, {useState} from "react";

const API_BASE = "http://localhost:5001/api";

export default function ResumeTailor(){
    
    const[resumeText, setResumeText] = useState(""); // State for resume
    const[jobDescription, setJobDescription] = useState(""); // State for Job Description
    const[output, setOutput] = useState(""); // State for Output
    const[loading, setLoading] = useState(false); // State for Loading

    const handleTailor = async () => {      // Calls back-end
        setLoading(true);
        setOutput("");

        try{
            const res = await fetch(`${API_BASE}/tailor-resume`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({resumeText, jobDescription}),
            });

            const data = res.json();

            if(!data.error)
            {
                setOutput("Error: " + data.error);
            }
            else
            {
                setOutput(data.result); // Result text from Gemini
            }
        }
        catch(err)
        {
            setOutput("Network Error: " + err.message);
        }
        finally
        {
            setLoading(false);
        }
    };


    return(
        <div className="glass-card">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold text-slate-50 md:text-lg"> 
                        Resume Tailor
                    </h2>
                    <p className="text-xs text-slate-400 md:text-sm">
                        Compare your baseline resume with a job description, see overlapping skills, missing
                        keywords, & get tailored bullet points powered by GenAI.
                    </p>
                </div>

                <span className="inline-flex items-center rounded-full border border-emerald-400/60 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-100">
                    Step 2 * Align your resume
                </span>
            </div>

            {/* Resume input textarea */}
            <label className="mb-1 block text-xs font-medium text-slate-300">
                Baseline resume (plain text)
            </label>

            <textarea
                rows={7}
                className="mb-3 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none ring-indigo-500/50 transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1"
                placeholder="Paste your resume text here (export from PDF or copy from your doc)..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
            />

            {/* Job Description textarea */}
            <label className="mb-1 block text-xs font-medium text-slate-300">
                Target Job Description
            </label>

            <textarea
                rows={7}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none ring-indigo-500/50 transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1"
                placeholder="Paste the internship posting here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
            />

            {/* Tailor button */}
            <button
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 px-4 py-2 text-xs font-semibold text-slate-50 shadow-lg shadow-emerald-500/30 transition-transform hover:scale-[1.02] hover:shadow-emerald-400/40 hover:cursor-pointer disabled:opacity-60"
                onClick={handleTailor}
                disabled={
                    loading || !resumeText.trim() || !jobDescription.trim()
                }
            >
                {loading ? (
                    <>
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-100 border-t-transparent"/>
                        Tailoring...
                    </>
                ) : (
                    <>
                        <span className="h-2 w-2 rounded-full bg-emerald-300"/>
                        Tailor Resume
                    </>
                )}
            </button>

            {/* Output text from Gemini */}
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