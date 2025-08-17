/** tailwind.config.js */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1500px",
      "3xl": "1780px",
    },
    extend: {
      colors: {
        // Brand greens (matches the dark green bars/cards in screenshots)
        primary: {
          50: "#F1F5F1",
          100: "#E4ECE3",
          200: "#C8DAC7",
          300: "#A5C0A3",
          400: "#7DA47A",
          500: "#5C8759",
          600: "#46623C", // use this for solid banners/buttons
          700: "#3A5132",
          800: "#2C3F26",
          900: "#1E2C1A",
        },

        // Saffron / festival accent (for “Book now” CTA)
        accent: {
          50: "#FFF7E8",
          100: "#FFEAC2",
          200: "#FFD285",
          300: "#FFBB47",
          400: "#FFAA1F",
          500: "#F59E0B", // default accent
          600: "#D98706",
          700: "#B86D05",
          800: "#925604",
          900: "#5C3502",
        },

        // Supporting neutrals from screenshots
        linen: "#EDE5D8", // scroll / paper background
        linenSecondary: "#D9CDBE",
        sage: "#E8EFE6", // soft green background sections
        heading: "#1F2E1E", // deep ink for titles
        body: "#4A4A4A", // paragraph text
        placeholder: "#707070",
        white: "#FFFFFF",
        black: "#000000",

        gray: {
          50: "#FBFBFB",
          100: "#F1F1F1",
          150: "#F4F4F4",
          200: "#F9F9F9",
          300: "#E6E6E6",
          350: "#E9ECEF",
          400: "#999999",
          500: "#D8D8D8",
          600: "#3A3A3A",
          700: "#292929",
          800: "#707070",
          900: "#343D48",
        },
      },

      fontSize: {
        "10px": ".625rem",
      },

      spacing: {
        "430px": "430px",
        "450px": "450px",
        "500px": "500px",
        "64vh": "64vh",
      },

      minHeight: { "50px": "50px" },

      scale: { 80: "0.8", 85: "0.85", 300: "3", 400: "4" },

      animation: { shine: "shine 1s", shineRTL: "shineRTL 1s" },
      keyframes: {
        shine: { "100%": { left: "125%" } },
        shineRTL: { "100%": { right: "125%" } },
      },

      backgroundImage: {
        "hero-gradient":
          "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)",
        "app-pattern": "url('/assets/images/app-pattern.png')",
      },

      boxShadow: {
        cart: "0 3px 6px rgba(0,0,0,0.12)",
        product: "0 6px 12px rgba(0,0,0,.08)",
        listProduct: "0 2px 4px rgba(0,0,0,.08)",
        navigation: "0 3px 6px rgba(0, 0, 0, 0.16)",
        navigationReverse: "0 -3px 6px rgba(0, 0, 0, 0.16)",
        header: "0 2px 3px rgba(0, 0, 0, 0.08)",
        vendorCard: "1px 1px 4px rgba(0, 0, 0, 0.12)",
        vendorCardHover: "0 6px 18px rgba(0, 0, 0, 0.12)",
        subMenu: "1px 2px 3px rgba(0, 0, 0, 0.08)",
        bottomNavigation: "0 -2px 3px rgba(0, 0, 0, 0.06)",
        cookies: "0 -2px 3px rgba(0, 0, 0, 0.04)",
        avatar: "0px 15px 30px rgba(0, 0, 0, 0.16)",
        cta: "0 8px 24px rgba(245, 158, 11, 0.35)", // accent glow
      },
    },

    fontFamily: {
      // Primary: Roboto everywhere
      sans: [
        "'Roboto'",
        "system-ui",
        "-apple-system",
        "'Segoe UI'",
        "Arial",
        "sans-serif",
      ],
      heading: ["'Roboto'", "'Segoe UI'", "sans-serif"],
      body: ["'Roboto'", "'Open Sans'", "sans-serif"],
      satisfy: ["'Satisfy'", "cursive"],
      segoe: ["'Segoe UI'", "sans-serif"],
    },
  },

  plugins: [require("@tailwindcss/forms")({ strategy: "class" })],
};
