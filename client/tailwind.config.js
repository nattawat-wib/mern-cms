// const main_theme = require("./src/style/theme")

module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		screens: {
			sm: '600px',
			md: '900px',
			lg: '1200px',
			xl: '1536px',
		},
		extend: {
			colors: {
				primary: "#64B5F6",
				"primary-light": "#ffafcc"
			}
		},
	},
	plugins: [],
	// important: true,
}