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

export default function ExportJson() {
	const { creature } = useCreaturesStore();

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
		<Sheet>
			<SheetTrigger className="bg-transparent px-3 h-9 font-short border-cararra-600 border  text-cararra-950 hover:bg-cararra-200 sketch-border transition-colors">
				JSON
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
	);
}
