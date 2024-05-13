"use client";

import { Button } from "../ui/button";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useReactToPrint } from "react-to-print";
import { useCallback, useRef } from "react";
import { useCreaturesStore } from "@/store/zustand";
import CopyButton from "../copy-button";

export default function ExportOptions() {
	const { creature } = useCreaturesStore();
	const componentRef = useRef(null);

	const reactToPrintContent = useCallback(() => {
		return componentRef.current;
	}, []);

	const handlePrint = useReactToPrint({
		content: reactToPrintContent,
		documentTitle: `${creature?.name}`,
		removeAfterPrint: true,
	});

	return (
		<div className="space-x-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="primary">Save as</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuItem onClick={handlePrint}>PDF</DropdownMenuItem>
					{/* <DropdownMenuItem onClick={exportData}>JSON</DropdownMenuItem> */}
				</DropdownMenuContent>
			</DropdownMenu>
			<Sheet>
				<SheetTrigger className="font-short border-2 hover:bg-tower-800 transition-colors bg-tower-600 text-white border-tower-800 px-3 py-1 sketch-border">
					Export Creature
				</SheetTrigger>
				<SheetContent className="w-[540px] space-y-3 h-full">
					<SheetHeader>
						<SheetTitle>Export to</SheetTitle>
					</SheetHeader>
					<div className="relative bg-cararra-200 rounded-md px-3 py-2 text-cararra-950 h-[600px]">
						<pre className="h-full overflow-auto whitespace-pre-wrap">
							<code>{JSON.stringify(creature, null, "  ")}</code>
						</pre>
						<div className="absolute top-3 right-3">
							<CopyButton value={JSON.stringify(creature, null, "  ")} />
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
