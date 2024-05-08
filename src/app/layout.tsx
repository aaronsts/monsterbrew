import type { Metadata } from "next";
import {
	Roboto_Condensed as FontSans,
	Yatra_One,
	Short_Stack,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MainNavigation } from "@/components/main-nav";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";

const font_sans = FontSans({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-sans",
});
const yatra_one = Yatra_One({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-yatra",
	weight: "400",
});

const short_stack = Short_Stack({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-short-stack",
	weight: "400",
});

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
				className={`min-h-screen text-cararra-950 selection:bg-tower-600 selection:text-tower-100 bg-white ${font_sans.variable} ${yatra_one.variable} ${short_stack.variable} antialiased`}
			>
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
