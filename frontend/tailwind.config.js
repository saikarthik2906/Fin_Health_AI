/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // The specific dark background shades from the screenshot
        background: {
          DEFAULT: '#0f111a', // Main deeply dark background
          card: '#161b2a',    // Slightly lighter for cards
          input: '#1c2333',   // Input fields
        },
        primary: {
          glow: '#4ade80',    // Neon Green
          accent: '#8b5cf6',  // Purple accent
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(74, 222, 128, 0.15)', // Green subtle glow
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}