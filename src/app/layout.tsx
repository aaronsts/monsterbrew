import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MainNavigation } from "@/components/main-nav";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";
import Providers from "./providers";

import "@fontsource/yatra-one";
import "@fontsource/short-stack";
import "@fontsource-variable/roboto-condensed";
import PlausibleProvider from "next-plausible";

export const metadata: Metadata = {
	metadataBase: new URL("https://www.monsterbrew.app/"),
	alternates: {
		canonical: "./",
	},

	title: "Monsterbrew | Homebrewing monsters with ease",
	description:
		"Create custom 5e Dungeons & Dragons monsters effortlessly with an intuitive D&D homebrew tool!",
	openGraph: {
		title: "Monsterbrew | Homebrewing monsters with ease",
		description:
			"Create custom 5e Dungeons & Dragons monsters effortlessly with an intuitive D&D homebrew tool!",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Providers>
			<html lang="en">
				<PlausibleProvider domain="monsterbrew.vercel.app" />
				<body className="min-h-screen flex flex-col h-full text-cararra-950 selection:bg-tower-600 selection:text-tower-100 bg-white antialiased">
					<MainNavigation />
					<main
						className={cn(
							"max-w-7xl pb-6 mx-auto w-full px-3 data-[scroll-locked]:pl-3 data-[scroll-locked]:pr-3 lg:px-6"
						)}
					>
						{children}
					</main>
					<Footer />
					<Toaster />
				</body>
			</html>
		</Providers>
	);
}
