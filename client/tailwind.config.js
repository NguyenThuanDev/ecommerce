/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Đường dẫn đúng
  theme: {
    fontFamily: {
      main: ["Poppins", "sans-serif"]
    },
    extend: {
      width: {
        main: "1180px", // Thêm màu custom
      },
      backgroundColor: {
        main: '#ee3131'
      },
      colors: {
        main: '#ee3131'
      }
    },
  },
  plugins: [],
};
