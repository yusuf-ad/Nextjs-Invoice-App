import type { Config } from "tailwindcss";

function withOpacity(variableName: string) {
  return ({ opacityValue }: { opacityValue?: number }): string => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
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
        skin: {
          white: withOpacity("--color-white")({ opacityValue: 1.0 }),
          black: withOpacity("--color-black")({ opacityValue: 1.0 }),
          purple: withOpacity("--color-purple")({ opacityValue: 1.0 }),
          heliotrope: withOpacity("--color-heliotrope")({ opacityValue: 1.0 }),
          mirage: withOpacity("--color-mirage")({ opacityValue: 1.0 }),
          ebony: withOpacity("--color-ebony")({ opacityValue: 1.0 }),
          selago: withOpacity("--color-selago")({ opacityValue: 1.0 }),
          baliHai: withOpacity("--color-bali-hai")({ opacityValue: 1.0 }),
          shipCove: withOpacity("--color-ship-cove")({ opacityValue: 1.0 }),
          vulcan: withOpacity("--color-vulcan")({ opacityValue: 1.0 }),
          burntSienna: withOpacity("--color-burnt-sienna")({
            opacityValue: 1.0,
          }),
          monaLisa: withOpacity("--color-mona-lisa")({ opacityValue: 1.0 }),
          whisper: withOpacity("--color-whisper")({ opacityValue: 1.0 }),
          offWhite: withOpacity("--color-off-white")({ opacityValue: 1.0 }),
          mirage2: withOpacity("--color-mirage2")({ opacityValue: 1.0 }),
          darkAccent: withOpacity("--color-dark-accent")({ opacityValue: 1.0 }),
          fadedOrange: withOpacity("--color-faded-orange")({
            opacityValue: 1.0,
          }),
          green: withOpacity("--color-green")({ opacityValue: 1.0 }),
          orange: withOpacity("--color-orange")({ opacityValue: 1.0 }),
          gray: withOpacity("--color-gray")({ opacityValue: 1.0 }),
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
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
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
