module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			fontFamily: {
				dosis: ['Dosis', 'sans-serif']
			},
			boxShadow: {
				around: '0px 0px 43px 7px rgb(0 0 0 / 12%)'
			}
		}
	},
	plugins: [require('flowbite/plugin')]
};
