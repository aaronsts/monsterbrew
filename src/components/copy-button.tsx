"use client";

import { CheckIcon, ClipboardIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

interface CopyButtonProps {
	value: string;
}

export async function copyToClipboardWithMeta(value: string, event?: Event) {
	navigator.clipboard.writeText(value);
}

export default function CopyButton({ value }: CopyButtonProps) {
	const [hasCopied, setHasCopied] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setHasCopied(false);
		}, 2000);
	}, [hasCopied]);
	return (
		<Button
			size="icon"
			variant="primary"
			className="bg-cararra-200 border-cararra-200 hover:bg-cararra-400 hover:border-cararra-400 text-cararra-800"
			onClick={() => {
				copyToClipboardWithMeta(value);
				setHasCopied(true);
			}}
		>
			<span className="sr-only">Copy</span>
			{hasCopied ? <CheckIcon /> : <ClipboardIcon />}
		</Button>
	);
}
