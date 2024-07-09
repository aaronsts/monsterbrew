"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import { ChevronDown } from "lucide-react";
import ExportJson from "./export-json";
import ExportMarkdown from "./export-markdown";

export default function ExportOptions() {
	return (
		<div>
			<Sheet>
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild>
						<Button variant="primary">
							Export Creature{" "}
							<ChevronDown strokeWidth={1.5} className="ml-1 h-6" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Export Options</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<SheetTrigger>JSON</SheetTrigger>
						</DropdownMenuItem>
						{/* <ExportPdf /> */}
						<ExportMarkdown />
					</DropdownMenuContent>
					<div className="flex items-center md:self-end gap-3"></div>
				</DropdownMenu>
				<ExportJson />
			</Sheet>
		</div>
	);
}
