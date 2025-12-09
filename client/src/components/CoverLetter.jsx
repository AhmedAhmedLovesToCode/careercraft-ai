// Generates a tailored cover letter from GenAI

import React, {useState} from "react";

const API_BASE = "http://localhost:5001/api";

export default function CoverLetter()
{
    const[resumeText, setResumeText] = useState("");
    const[jobDescription, setJobDescription] = useState("");
    const[aboutMe, setAboutMe] = useState("");

    const[output, setOutput] = useState(""); // Returns the output (cover letter)
    const[loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        setOutput("");

        try{
            const res = await fetch(`${API_BASE}/cover-letter`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({resumeText, jobDescription, aboutMe}),
            });
    
            const data = await res.json();
    
            if(data.error) 
            {
                setOutput("Error: " + data.error);
            }
            else 
            {
                setOutput(data.result);
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
                        Cover Letter AI
                    </h2>
                    <p className="text-xs text-slate-400 md:text-sm">
                        Generate a concise, role-specific cover letter using your resume,
                        the job description, and your personal story - all powered by Gemini.
                    </p>
                </div>

                <span className="inline-flex items-center rounded-full border border-fuchsia-400/60 bg-fuchsia-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-fuchsia-100">
                    Step 3 * Tell your story
                </span>
            </div>

            {/* Resume textarea */}
            <label className="mb-1 block text-xs font-medium text-slate-300">
                Resume Text
            </label>
            <textarea
                rows={5}
                className="mb-3 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none ring-indigo-500/50 transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1"
                placeholder="Paste your resume text..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
            />

            {/* Job description textarea */}
            <label className="mb-1 block text-xs font-medium text-slate-300">
                Job description
            </label>
            <textarea
                rows={5}
                className="mb-3 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none ring-indigo-500/50 transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1"
                placeholder="Paste the internship posting here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
            />

            {/* About me textarea */}
            <label className="mb-1 block text-xs font-medium text-slate-300">
                About you (tone, goals, personal details)
            </label>
            <textarea
                rows={4}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none ring-indigo-500/50 transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1"
                placeholder="Short blurb about your interests, tone, goals…"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
            />

            {/* Generate cover letter button */}
            <button
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 px-4 py-2 text-xs font-semibold text-slate-50 shadow-lg shadow-fuchsia-500/30 transition-transform hover:scale-[1.02] hover:shadow-fuchsia-400/40 hover:cursor-pointer disabled:opacity-60"
                onClick={handleGenerate}
                disabled={
                loading || !resumeText.trim() || !jobDescription.trim()
                }
            >
                {loading ? (
                <>
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-100 border-t-transparent" />
                    Writing…
                </>
                ) : (
                <>
                    <span className="h-2 w-2 rounded-full bg-fuchsia-300" />
                    Generate Cover Letter
                </>
                )}
            </button>

            {/* Output cover letter from Gemini */}
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