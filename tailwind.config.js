/** @type {import('tailwindcss').Config} */
export default {
  content: {
    relative:true,
    files: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ]
  },
  theme: {
    extend: {
      backgroundImage: {
        'background-image': "url('/Users/keshavkumar/Desktop/typeScript/Frontend/src/assets/Background.png')",
        'gradient-linear-right': 'linear-gradient(to right,#3d176b,#3d176b,#3E2679,#4392E1,#00FFFF)',
        'gradient-linear': 'linear-gradient(#3d176b,#3d176b,#3E2679,#4392E1,#00FFFF)',
      }
    },
  },
  plugins: [],
}