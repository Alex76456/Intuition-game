module.exports = {
	extends: 'next/core-web-vitals',
	rules: {
		'no-unused-vars': 'error',
		'no-undef': 'error',
		'no-const-assign': 'error',
		'no-undef-init': 'error',
		'no-undef-init': 'error',
	},
	ignorePatterns: ['node_modules/', '.next/'],
	settings: {
		'import/resolver': {
			alias: [
				['@constants', '.src/constants'],
				['@pages', './pages'],
				['@styles', '.src/styles'],
				['@utils', '.src/utils'],
				['@allTypes', '.src/allTypes'],
				['@redux', './src/redux'],
			],
		},
	},
}
