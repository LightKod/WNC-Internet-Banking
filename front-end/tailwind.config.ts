import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        falling: {
          '0%': {
            transform: 'translateY(-20vh) rotate(0deg)'
          },
          '50%': {
            transform: 'translateY(50vh) rotate(180deg)'
          },
          '100%': {
            transform: 'translateY(100vh) rotate(360deg)'
          }
        }
      },
      animation: {
        TienVaoNhuNuoc_1: 'falling 3s linear 0s infinite',
        TienVaoNhuNuoc_2: 'falling 5s linear 1s infinite',
        TienVaoNhuNuoc_3: 'falling 4s linear 2s infinite',
        TienVaoNhuNuoc_4: 'falling 5s linear 3s infinite',
        TienVaoNhuNuoc_5: 'falling 3s linear 4s infinite',
        TienVaoNhuNuoc_6: 'falling 4s linear 5s infinite',
        TienVaoNhuNuoc_7: 'falling 5s linear 6s infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
export default config;
