/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        borderAlert: "hsl(var(--border-alert))",
        borderTertinary: "hsl(var(--border-tertinary))",

        input: "hsl(var(--input))",
        inputAlert: "hsl(var(--input-alert))",
        inputTertinary: "hsl(var(--input-tertinary))",
        
        ring: "hsl(var(--ring))",
        ringSuccess: "hsl(var(--ring-success))", //custom
        ringAlert: "hsl(var(--ring-alert))", //custom
        ringWarning: "hsl(var(--ring-warning))", //custom
        ringTertiary: "hsl(var(--ring-tertiary))", //custom
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        //custom
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
         //custom
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
         //custom
        alert: {
          DEFAULT: "hsl(var(--alert))",
          foreground: "hsl(var(--alert-foreground))",
        },
         //custom
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        mutedWarning: {
          DEFAULT: "hsl(var(--muted-warning))",
          foreground: "hsl(var(--muted-warning-foreground))",
        },
        mutedSuccess: {
          DEFAULT: "hsl(var(--muted-success))",
          foreground: "hsl(var(--muted-foreground))",//same
        },
        mutedAlert: {
          DEFAULT: "hsl(var(--muted-alert))",
          foreground: "hsl(var(--muted-alert-foreground))",//same
        },
        mutedTertinary: {
          DEFAULT: "hsl(var(--muted-tertinary))",
          foreground: "hsl(var(--muted-tertinary-foreground))",//same
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        accentWarning: {
          DEFAULT: "hsl(var(--accent-warning))",
          foreground: "hsl(var(--accent-warning-foreground))",
        },
        accentSuccess: {
          DEFAULT: "hsl(var(--accent-success))",
          foreground: "hsl(var(--accent-foreground))",//same
        },
        accentAlert: {
          DEFAULT: "hsl(var(--accent-alert))",
          foreground: "hsl(var(--accent-alert-foreground))",
        },
        accentTertinary: {
          DEFAULT: "hsl(var(--accent-tertinary))",
          foreground: "hsl(var(--accent-tertinary-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        popoverWarning: {
          DEFAULT: "hsl(var(--popover-warning))",
          foreground: "hsl(var(--popover-warning-foreground))",
        },
        popoverSuccess: {
          DEFAULT: "hsl(var(--popover-success))",
          foreground: "hsl(var(--popover-success-foreground))",
        },
        popoverAlert: {
          DEFAULT: "hsl(var(--popover-alert))",
          foreground: "hsl(var(--popover-alert-foreground))",
        },
        popoverTertinary: {
          DEFAULT: "hsl(var(--popover-tertinary))",
          foreground: "hsl(var(--popover-tertinary-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        cardWarning: {
          DEFAULT: "hsl(var(--card-warning))",
          foreground: "hsl(var(--card-warning-foreground))",
        },
        cardAlert: {
          DEFAULT: "hsl(var(--card-alert))",
          foreground: "hsl(var(--card-alert-foreground))",
        },
        cardSuccess: {
          DEFAULT: "hsl(var(--card-success))",
          foreground: "hsl(var(--card-success-foreground))",
        },
        cardTertinary: {
          DEFAULT: "hsl(var(--card-tertinary))",
          foreground: "hsl(var(--card-tertinary-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}