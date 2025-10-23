/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores Primárias
        primary: {
          DEFAULT: '#00D26A',
          light: '#E8F9F0',
          dark: '#00B359',
        },
        // Cores Secundárias
        secondary: {
          orange: '#FF8C1A',
          'orange-light': '#FFF4E6',
        },
        // Cores de Macros
        macro: {
          protein: {
            DEFAULT: '#00D26A',
            light: '#E8F9F0',
          },
          carbs: {
            DEFAULT: '#FF6666',
            light: '#FFE8E8',
          },
          fats: {
            DEFAULT: '#FF9900',
            light: '#FFF4E0',
          },
          water: {
            DEFAULT: '#3399FF',
            light: '#E8F4FF',
          },
        },
        // Cores de Texto
        text: {
          primary: '#1A1A1A',
          secondary: '#666666',
          tertiary: '#999999',
        },
        // Cores de Background
        bg: {
          primary: '#FAFAFA',
          secondary: '#F5F5F5',
        },
        // Cores de Borda (CORRIGIDO - sem conflito)
        'border-gray': {
          light: '#E5E5E5',
          medium: '#D4D4D4',
        },
        // Cores de Dicas
        tips: {
          food: {
            bg: '#F9FFF9',
            border: '#D4F4DD',
          },
          water: {
            bg: '#F0F9FF',
            border: '#BAE6FD',
          },
          general: {
            bg: '#FFF9E6',
            border: '#FFE599',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '40px',
      },
      spacing: {
        '18': '4.5rem',
      },
      borderRadius: {
        'DEFAULT': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 4px 12px rgba(0, 210, 106, 0.15)',
      },
    },
  },
  plugins: [],
}