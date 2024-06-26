import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap text-sm font-short transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cararra-500  disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-zinc-300",
	{
		variants: {
			variant: {
				default:
					"bg-transparent text-cararra-950 hover:bg-cararra-100 sketch-border dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90",
				primary:
					"bg-cararra-600 border-2 border-cararra-800 text-cararra-50 hover:bg-cararra-800 sketch-border px-3 py-1 font-short transition-all",
				secondary:
					"bg-transparent border-2 border-pewter-300 text-pewter-900 hover:bg-pewter-100 sketch-border px-3 py-1 font-short transition-all",
				destructive:
					"bg-transparent border-2 border-danger-300 text-danger-950 hover:bg-danger-100 sketch-border px-3 py-1 font-short transition-all",
				outline:
					"bg-transparent font-short border-cararra-600 border  text-cararra-950 hover:bg-cararra-200 sketch-border transition-colors",

				ghost:
					" hover:bg-danger-100 sketch-border  dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
				link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",
			},
			size: {
				default: "h-8 px-3 py-1",
				sm: "h-8 px-3 text-xs",
				lg: "h-10  px-8",
				icon: "h-8 w-8 p-1.5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
