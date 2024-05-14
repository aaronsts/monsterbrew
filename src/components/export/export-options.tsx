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

import { useCreaturesStore } from "@/store/zustand";
import CopyButton from "../copy-button";
import UseReactToPrintHookReturn, { useReactToPrint } from "react-to-print";

interface ExportOptionsProps {
	content: () => null;
}

export default function ExportOptions({ content }: ExportOptionsProps) {
	const { creature } = useCreaturesStore();

	const handlePrint = useReactToPrint({
		content: content,
		documentTitle: `${creature?.name}`,
		removeAfterPrint: true,
	});

	const exportData = () => {
		const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
			JSON.stringify(creature)
		)}`;
		const link = document.createElement("a");
		link.href = jsonString;
		link.download = `${creature.name}.json`;

		link.click();
	};

	return (
		<div className="flex flex-col md:flex-row gap-3">
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
				<SheetContent className="md:max-w-lg space-y-3 h-full">
					<SheetHeader>
						<SheetTitle className="flex flex-col md:flex-row md:gap-3 items-start md:items-center">
							Format: Open5e
							<Button type="button" onClick={exportData} variant="primary">
								Download JSON
							</Button>
						</SheetTitle>
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
