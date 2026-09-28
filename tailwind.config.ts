import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./content/**/*.ts"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "var(--navy-900)",
          800: "var(--navy-800)",
          700: "var(--navy-700)",
        },
        lime: {
          DEFAULT: "var(--lime)",
          hover: "var(--lime-hover)",
        },
        "off-white": "var(--off-white)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        secondary: "var(--muted-text)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        serif: ["var(--font-serif)", "Iowan Old Style", "Georgia", "serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      boxShadow: {
        lift: "0 24px 60px -28px rgba(7, 27, 54, 0.45), 0 8px 20px -12px rgba(7, 27, 54, 0.25)",
        glow: "0 0 0 1px rgba(232, 255, 106, 0.55), 0 18px 50px -14px rgba(232, 255, 106, 0.45)",
        frame: "0 40px 100px -40px rgba(7, 27, 54, 0.6), 0 20px 40px -30px rgba(7, 27, 54, 0.5)",
      },
      keyframes: {
        marquee: {
          to: { transform: "translate3d(-50%, 0, 0)" },
        },
      },
      animation: {
        marquee: "marquee 70s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
