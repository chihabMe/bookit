import { type Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "440px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        //primary: "#ffad0a",
        primary: "#e59500",

        "bg-light": "#fff",
        "bg-dark": "#1C1B22",
        text: "#383838",
        title: "#141414",
        "text-dark": "#939393",
        "title-dark": "#e2e2e2",
      },
    },
  },
  plugins: [],
});
