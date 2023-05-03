/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			mono: ["Iosevka", ...defaultTheme.fontFamily.mono],
		},
		extend: {},
	},
	plugins: [require('@tailwindcss/typography')],
}
