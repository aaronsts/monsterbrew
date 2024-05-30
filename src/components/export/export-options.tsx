"use client";

import ExportMarkdown from "./markdown";
import ExportPdf from "./pdf";
import ExportJson from "./json";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger } from "../ui/sheet";

export default function ExportOptions() {
	return (
		<div>
			<Sheet>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="primary">Export Creature</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Export Options</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<SheetTrigger>JSON</SheetTrigger>
						</DropdownMenuItem>
						<ExportPdf />
						<ExportMarkdown />
					</DropdownMenuContent>
					<div className="flex items-center md:self-end gap-3"></div>
				</DropdownMenu>
				<ExportJson />
			</Sheet>
		</div>
	);
}
