"use client";

import { BookCheck, BookText, BookX } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			toastOptions={{
				classNames: {
					toast:
						"group toast sketch-border border space-x-2 font-short group-[.toaster]:bg-cararra-100 group-[.toaster]:text-cararra-950 group-[.toaster]:border-cararra-600 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-zinc-950 dark:group-[.toaster]:text-zinc-50 dark:group-[.toaster]:border-zinc-800",
					description:
						"group-[.toast]:text-zinc-500 dark:group-[.toast]:text-zinc-400",
					actionButton:
						"group-[.toast]:bg-zinc-900 group-[.toast]:text-zinc-50 dark:group-[.toast]:bg-zinc-50 dark:group-[.toast]:text-zinc-900",
					cancelButton:
						"group-[.toast]:bg-zinc-100 group-[.toast]:text-zinc-500 dark:group-[.toast]:bg-zinc-800 dark:group-[.toast]:text-zinc-400",
				},
			}}
			{...props}
			icons={{
				success: <BookCheck className="text-cararra-800" />,
				error: <BookX className="text-cararra-800" />,
				info: <BookText className="text-cararra-800" />,
			}}
		/>
	);
};

export { Toaster };
