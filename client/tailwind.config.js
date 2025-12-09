/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          "grid-slate":
            "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.16) 1px, transparent 0)",
        },
        boxShadow: {
          glow:
            "0 18px 40px rgba(0,0,0,0.8), 0 0 40px rgba(129,140,248,0.6)",
        },
        keyframes: {
          "card-fade": {
            "0%": { opacity: 0, transform: "translateY(10px) scale(0.98)" },
            "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
          },
          "gradient-move": {
            "0%": { backgroundPosition: "0% 50%" },
            "100%": { backgroundPosition: "100% 50%" },
          },
          float: {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-6px)" },
          },
        },
        animation: {
          "card-fade": "card-fade 0.5s ease-out forwards",
          "gradient-move": "gradient-move 12s ease infinite alternate",
          float: "float 6s ease-in-out infinite",
        },
      },
    },
    plugins: [],
  };
  