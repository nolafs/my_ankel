import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import aspectRatio from '@tailwindcss/aspect-ratio';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.tsx', './src/**/*.css'],
  safelist: [
    'bg-white',
    {
      pattern: /grid-cols-\d+/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        neutral: 'var(--color-neutral)',
        base: 'var(--color-base)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        lesson: 'hsl(var(--lesson-background))',
        'lesson-foreground': 'hsl(var(--lesson-foreground))',
        warning: 'hsl(var(--warning))',
        'warning-foreground': 'hsl(var(--warning-foreground))',
        body: '#404F65',
        heading: '#2A3342',
        success: {
          '100': '#7ed321',
          DEFAULT: '#4CAF50',
        },
        danger: {
          '100': '#d85554',
          DEFAULT: '#F44336',
        },
        error: {
          '100': '#d85554',
          DEFAULT: '#F44336',
        },
        info: {
          DEFAULT: '#17A2B8',
        },
        light: {
          '50': '#f8f9fd',
          '100': '#f8f8f8',
          DEFAULT: '#F8F9FA',
        },
        dark: {
          '50': '#111111',
          '100': '#171621',
          DEFAULT: '#333333',
        },
        white: {
          DEFAULT: '#FFFFFF',
          inverse: '#f6f2ed',
          catskill: '#f5f7fa',
        },
        orange: {
          '100': '#ff4c24',
          '200': '#ff4d24',
          '300': '#fa7d61',
          DEFAULT: '#ef6f31',
          light: 'rgba(239,111,49,0.1)',
        },
        yellow: {
          '100': '#ffbb00',
          DEFAULT: '#f6b500',
        },
        gray: {
          '50': '#f6f7f9',
          '100': '#eceef2',
          '200': '#d4dae3',
          '300': '#aebacb',
          '400': '#8896AB',
          '500': '#627895',
          '600': '#556987',
          '700': '#404e64',
          '800': '#374255',
          '900': '#2A3342',
        },
        blue: {
          '100': '#7288e8',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '2rem',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [aspectRatio, typography, forms, animate],
} satisfies Config;
