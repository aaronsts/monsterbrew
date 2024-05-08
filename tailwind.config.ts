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
				tower: {
					"50": "hsl(200, 20%, 97.1%)",
					"100": "hsl(190, 18.7%, 93.7%)",
					"200": "hsl(192, 21.1%, 86.1%)",
					"300": "hsl(193.3, 20.3%, 73.9%)",
					"400": "hsl(192, 20.2%, 66.1%)",
					"500": "hsl(191.5, 19%, 48.4%)",
					"600": "hsl(194, 21.4%, 39.4%)",
					"700": "hsl(194.1, 20.7%, 32.2%)",
					"800": "hsl(195, 20%, 27.5%)",
					"900": "hsl(196.4, 18%, 23.9%)",
					"950": "hsl(196, 18.5%, 15.9%)",
				},
				norway: {
					"50": "hsl(100, 17.6%, 96.7%)",
					"100": "hsl(105, 21.1%, 92.5%)",
					"200": "hsl(105, 21.1%, 85.1%)",
					"300": "hsl(102.9, 20.2%, 66.1%)",
					"400": "hsl(103.5, 18.7%, 58%)",
					"500": "hsl(103.3, 18.6%, 45.3%)",
					"600": "hsl(103.8, 20%, 36.3%)",
					"700": "hsl(103.4, 19.5%, 29.2%)",
					"800": "hsl(102.9, 17.1%, 24.1%)",
					"900": "hsl(105.9, 16.5%, 20.2%)",
					"950": "hsl(109.1, 21.6%, 10%)",
				},

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

				danger: {
					"50": "hsl(0, 14.3%, 97.3%)",
					"100": "hsl(0, 20%, 94.1%)",
					"200": "hsl(0, 22.2%, 89.4%)",
					"300": "hsl(0, 20.4%, 81.8%)",
					"400": "hsl(0, 20.2%, 66.1%)",
					"500": "hsl(0, 19.2%, 60.2%)",
					"600": "hsl(0, 15.9%, 50.6%)",
					"700": "hsl(0, 16.4%, 41.8%)",
					"800": "hsl(0, 15.6%, 35.3%)",
					"900": "hsl(0, 14.1%, 30.6%)",
					"950": "hsl(0, 16.5%, 15.5%)",
				},

				pewter: {
					"50": "hsl(180, 5.9%, 96.7%)",
					"100": "hsl(145.7, 12.7%, 89.2%)",
					"200": "hsl(147.7, 11.7%, 78.2%)",
					"300": "hsl(150, 10.5%, 66.3%)",
					"400": "hsl(151.3, 9.1%, 50.4%)",
					"500": "hsl(152.7, 10.8%, 40%)",
					"600": "hsl(151.6, 11.8%, 31.6%)",
					"700": "hsl(152, 11.3%, 26.1%)",
					"800": "hsl(152.7, 9.9%, 21.8%)",
					"900": "hsl(153.3, 9.3%, 19%)",
					"950": "hsl(156, 9.8%, 10%)",
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
