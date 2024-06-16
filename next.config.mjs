/** @type {import('next').NextConfig} */
import { config } from "dotenv";
config();

const nextConfig = {
	i18n: {
		locales: ["en"],
		defaultLocale: "en"
	},
	env: {
		API_KEY: process.env.API_KEY,
		AUTH_DOMAIN: process.env.AUTH_DOMAIN,
		PROJECT_ID: process.env.PROJECT_ID,
		STORAGE_BUCKET: process.env.STORAGE_BUCKET,
		MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
		APP_ID: process.env.APP_ID
	}
};

export default nextConfig;
