import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		extend: {
			colors: {
				white: "hsl(45, 22.2%, 96.5%)",
				cararra: {
					"50": "hsl(45, 22.2%, 96.5%)",
					"100": "hsl(45, 23.1%, 89.8%)",
					"200": "hsl(45, 23.3%, 83.1%)",
					"300": "hsl(42.6, 22%, 72.4%)",
					"400": "hsl(37.3, 22.6%, 61%)",
					"500": "hsl(35.1, 22.2%, 53.1%)",
					"600": "hsl(31.2, 21.1%, 48.2%)",
					"700": "hsl(28.6, 20.4%, 40.4%)",
					"800": "hsl(26.3, 18.6%, 33.7%)",
					"900": "hsl(25, 16.9%, 27.8%)",
					"950": "hsl(25.7, 18.9%, 14.5%)",
				},
			},
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
				yatra: ["var(--font-yatra)"],
				short: ["var(--font-short-stack)"],
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
		},
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
