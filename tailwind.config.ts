/** @type {import('tailwindcss').Config} */
import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            h1: {
              color: theme('colors.gray.900'),
              lineHeight: '1.8',
            },
            h2: {
              color: theme('colors.gray.900'),
              lineHeight: '1.75',
            },
            h3: {
              color: theme('colors.gray.900'),
              lineHeight: '1.7',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.100'),
            h1: {
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            h3: {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
