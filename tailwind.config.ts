import { type Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        //primary: "#ffad0a",
        primary: "#e59500",

        "bg-light": "#fff",
        "bg-dark": "#383131",
        text: "383838",
        title: "#141414",
        "text-dark": "939393",
        "title-dark": "e2e2e2",
      },
    },
  },
  plugins: [],
});
