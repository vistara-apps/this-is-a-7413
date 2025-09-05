/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(220 80% 50%)',
        accent: 'hsl(160 70% 45%)',
        success: 'hsl(140 60% 40%)',
        error: 'hsl(0 70% 50%)',
        surface: 'hsl(0 0% 100%)',
        bg: 'hsl(225 10% 98%)',
        textPrimary: 'hsl(220 15% 20%)',
        textSecondary: 'hsl(220 10% 40%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'full': '9999px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(0 0% 0% / 0.12)',
        'modal': '0 6px 16px hsla(0 0% 0% / 0.16), 0 2px 8px hsla(0 0% 0% / 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}