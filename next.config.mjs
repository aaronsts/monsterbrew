import { withSentryConfig } from "@sentry/nextjs";
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withSentryConfig(nextConfig, {
	// For all available options, see:
	// https://github.com/getsentry/sentry-webpack-plugin#options

	org: "changing-views-media",
	project: "monsterbrew",
	authToken: process.env.SENTRY_AUTH_TOKEN,
	tunnelRoute: "/monitoring-tunnel",

	silent: false,
	widenClientFileUpload: true,

	// Transpiles SDK to be compatible with IE11 (increases bundle size)
	transpileClientSDK: true,

	// Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
	// This can increase your server load as well as your hosting bill.
	// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
	// side errors will fail.
	// tunnelRoute: "/monitoring",

	// Hides source maps from generated client bundles
	hideSourceMaps: true,

	// Automatically tree-shake Sentry logger statements to reduce bundle size
	disableLogger: true,

	// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
	// See the following for more information:
	// https://docs.sentry.io/product/crons/
	// https://vercel.com/docs/cron-jobs
	automaticVercelMonitors: true,
});
