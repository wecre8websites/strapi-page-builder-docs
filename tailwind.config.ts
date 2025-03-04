// tailwind config is required for editor support

import type { Config } from "tailwindcss";

const config: Config = {
// const config: Pick<Config, "content" | "presets"> = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", './content/**/*.{md,mdx}', "./components/**/*.{js,jsx,ts,tsx}"],
  // presets: [sharedConfig],
  theme: {
    extend: {
    }
  },
  plugins: []
};

export default config;
