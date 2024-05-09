import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MainNavigation } from "@/components/main-nav";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";

import "@fontsource/yatra-one";
import "@fontsource/short-stack";
import "@fontsource-variable/roboto-condensed";
import Head from "next/head";

export const metadata: Metadata = {
	metadataBase: new URL("https://monsterbrew.vercel.app/"),
	title: "Monsterbrew | Homebrewing monsters with ease",
	description:
		"Create homebrew monsters for Dungeons & Dragons 5e now with ease.",
	alternates: {
		canonical: "./",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="min-h-screen text-cararra-950 selection:bg-tower-600 selection:text-tower-100 bg-white $ antialiased">
				<MainNavigation />
				<main
					className={cn(
						"max-w-7xl mx-auto px-3 data-[scroll-locked]:pl-3 data-[scroll-locked]:pr-3 lg:px-6"
					)}
				>
					{children}
				</main>
				<Footer />

				<Toaster />
			</body>
		</html>
	);
}
