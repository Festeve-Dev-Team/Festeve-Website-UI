/** @type {import('next-i18next').UserConfig} */
const path = require("path");
module.exports = {
	i18n: {
		locales: [
			// Existing languages
			"en", "de", "es", "ar", "he", "zh",
			// Indian languages
			"hi", "bn", "te", "ta", "mr", "gu", "kn",
			"ml", "pa", "ur", "as", "brx", "doi", "ks",
			"kok", "mai", "mni", "ne", "or", "sa", "sat", "sd"
		],
		defaultLocale: "en",
		localeDetection: false,
	},
	localePath: path.resolve("./public/locales"),
};
