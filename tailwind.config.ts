import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './layout/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '0.2',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        primary: ['var(--font-primary)'],
        secondary: ['var(--font-secondary)'],
        english: ['var(--font-english)'],
      },
      boxShadow: {
        card: 'var(--card-shadow)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        scale: {
          100: 'var(--colors-gray1)',
          200: 'var(--colors-gray2)',
          300: 'var(--colors-gray3)',
          400: 'var(--colors-gray4)',
          500: 'var(--colors-gray5)',
          600: 'var(--colors-gray6)',
          700: 'var(--colors-gray7)',
          800: 'var(--colors-gray8)',
          900: 'var(--colors-gray9)',
          1000: 'var(--colors-gray10)',
          1100: 'var(--colors-gray11)',
          1200: 'var(--colors-gray12)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('tailwindcss-animate'),
    nextui({
      themes: {
        light: {
          colors: {
            primary: '#7828c8',
          },
        },
        dark: {
          colors: {
            primary: '#9353d3',
          },
        },
      },
    }),
  ],
}
export default config
