import type { Metadata } from "next";
import { Roboto_Condensed as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MainNavigation } from "@/components/main-nav";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	title: "Monsterbrew | Homebrewing monsters with ease",
	description: "Homebrew your monsters now.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen max-w-6xl mx-auto px-3 data-[scroll-locked]:pl-3 data-[scroll-locked]:pr-3 lg:px-6 bg-white font-sans antialiased",
					fontSans.variable
				)}
			>
				<MainNavigation />
				{children}
				<Toaster />
			</body>
		</html>
	);
}
