import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";

import { useCreaturesStore } from "@/store/zustand";
import CopyButton from "../copy-button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { exportConverter } from "@/lib/converter";
import { Monster5e } from "@/types/monster5e";
import { ImprovedInitiativeStatblock } from "@/types/improvedInitiative";

export default function ExportJson() {
	const { creature } = useCreaturesStore();
	const [format, setFormat] = useState("open5e");
	const [jsonOutput, setJsonOutput] = useState<
		Monster5e | ImprovedInitiativeStatblock
	>(creature);

	const exportData = () => {
		const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
			JSON.stringify(jsonOutput)
		)}`;
		const link = document.createElement("a");
		link.href = jsonString;
		link.download = `${creature.name}.json`;
		link.click();
	};

	useEffect(() => {
		if (format === "improved-initiative") {
			const formattedStatblock = exportConverter(creature);
			setJsonOutput(formattedStatblock);
		} else {
			setJsonOutput(creature);
		}
	}, [creature, format]);

	return (
		<SheetContent className="md:max-w-lg space-y-3 h-full">
			<SheetHeader>
				<SheetTitle className="flex flex-col md:flex-row md:gap-3 items-start md:items-center">
					Format:
					<Select value={format} onValueChange={(e) => setFormat(e)}>
						<SelectTrigger className="w-[205px]">
							<SelectValue placeholder="Select format" />
							<SelectContent>
								<SelectItem value="open5e">Open5e</SelectItem>
								<SelectItem value="improved-initiative">
									Improved Initiative
								</SelectItem>
							</SelectContent>
						</SelectTrigger>
					</Select>
					<Button type="button" onClick={exportData} variant="primary">
						Download JSON
					</Button>
				</SheetTitle>
			</SheetHeader>
			<div className="relative bg-cararra-200 rounded-md px-3 py-2 text-cararra-950 h-[600px]">
				<pre className="h-full overflow-auto whitespace-pre-wrap">
					<code>{JSON.stringify(jsonOutput, null, "  ")}</code>
				</pre>
				<div className="absolute top-3 right-3">
					<CopyButton value={JSON.stringify(jsonOutput, null, "  ")} />
				</div>
			</div>
		</SheetContent>
	);
}
