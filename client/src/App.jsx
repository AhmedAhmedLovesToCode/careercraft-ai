import React, {useState} from "react";
import JobAnalyzer from "./components/JobAnalyzer";
import ResumeTailor from "./components/ResumeTailor";
import CoverLetter from "./components/CoverLetter";
import InterviewCoach from "./components/InterviewCoach";


const TABS = [
  { id: "job", label: "Job Analyzer" },
  { id: "resume", label: "Resume Tailor" },
  { id: "cover", label: "Cover Letter AI" },
  { id: "interview", label: "Interview Coach" },
];

export default function App() {
  
  const[activeTab, setActiveTab] = useState("job"); // Tracks which tab is currently active

  const renderActiveTab = () => {
    switch(activeTab)
    {
      case "job":
        return <JobAnalyzer />;
      case "resume":
        return <ResumeTailor />;
      case "cover":
        return <CoverLetter />;
      case "interview":
        return <InterviewCoach />;
      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top header with animated gradient background */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-sky-500/20 bg-[length:200%_200%] animate-gradient-move">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 md:py-5">
          <div className="flex items-center gap-3">
            {/* Floating logo badge */}
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950/80 shadow-xl shadow-black/60 ring-1 ring-indigo-400/80 animate-float">
              <span className="text-lg font-semibold text-indigo-300">
                AI
              </span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-50 md:text-xl">
                CareerCraft AI
              </h1>
              <p className="text-xs text-slate-300 md:text-sm">
                GenAI Internship Coach · React · Tailwind · Node · Gemini
              </p>
            </div>
          </div>

          <div className="hidden text-xs text-slate-200 md:block">
            Built by{" "}
            <span className="font-semibold text-indigo-200">
              Ahmed Ahmed
            </span>
          </div>
        </div>
      </header>

      {/* Main content container */}
      <main className="relative mx-auto flex max-w-6xl gap-4 px-4 py-4 md:px-6 md:py-6">
        {/* Decorative background grid */}
        <div className="pointer-events-none absolute inset-0 bg-grid-slate opacity-40" />

        {/* Desktop sidebar navigation */}
        <aside className="relative z-10 hidden w-60 flex-shrink-0 flex-col gap-2 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-3 shadow-xl shadow-black/70 md:flex">
          <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Tools
          </h2>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={[
                "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors",
                activeTab === tab.id
                  ? "bg-gradient-to-r from-indigo-500/90 via-purple-500/80 to-sky-500/80 text-slate-50 shadow-md shadow-indigo-500/30"
                  : "text-slate-300 hover:bg-slate-800/70",
              ].join(" ")}
            >
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <span className="ml-2 h-1 w-1 rounded-full bg-slate-50" />
              )}
            </button>
          ))}
          <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs text-slate-400">
            Quick tip: Paste a real job description from{" "}
            <span className="font-semibold text-slate-200">LinkedIn</span> or{" "}
            <span className="font-semibold text-slate-200">Handshake</span> to
            see how the GenAI pipeline responds.
          </div>
        </aside>

        {/* Catered for mobile devices (buttons) */}
        <div className="relative z-10 mb-3 grid w-full grid-cols-2 gap-2 md:hidden">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={[
                "rounded-xl px-3 py-2 text-xs font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-slate-50 shadow-md shadow-indigo-500/30"
                  : "border border-slate-800 bg-slate-950/80 text-slate-300",
              ].join(" ")}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active tab content panel */}
        <section className="relative z-10 flex-1 pb-6">
          {renderActiveTab()}
        </section>
      </main>
    </div>
  );
}