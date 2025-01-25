import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import aspectRatio from "@tailwindcss/aspect-ratio";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import animate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: ["./src/**/*.tsx"],
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
					DEFAULT: '#4CAF50',
					100: '#7ed321',
				},
				danger: {
					DEFAULT: '#F44336',
					100: '#d85554',
				},
				error: {
					DEFAULT: '#F44336',
					100: '#d85554',
				},
				info: {
					DEFAULT: '#17A2B8',
				},
				light: {
					DEFAULT: '#F8F9FA',
					50: '#f8f9fd',
					100: '#f8f8f8',
				},
				dark: {
					DEFAULT: '#333333',
					50: '#111111',
					100: '#171621',
				},
				white: {
					DEFAULT: '#FFFFFF',
					inverse: '#f6f2ed',
					catskill: '#f5f7fa',
				},
				orange: {
					DEFAULT: '#ef6f31',
					light: 'rgba(239,111,49,0.1)',
					100: '#ff4c24',
					200: '#ff4d24',
					300: '#fa7d61',
				},
				yellow: {
					DEFAULT: '#f6b500',
					100: '#ffbb00',
				},
				gray: {
					50: '#f6f7f9',
					100: '#eceef2',
					200: '#d4dae3',
					300: '#aebacb',
					400: '#8896AB',
					500: '#627895',
					600: '#556987',
					700: '#404e64',
					800: '#374255',
					900: '#2A3342',
				},
				blue: {
					100: '#7288e8',
				},
			},
  		fontFamily: {
  			sans: [
  				'var(--font-geist-sans)',
                    ...fontFamily.sans
                ]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
				'4xl': '2rem',
  		},
  	}
  },
  plugins: [aspectRatio, typography, forms , animate],
} satisfies Config;
