import { ChangeEvent, MouseEvent, useState } from "react";
import { Button } from "./ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useCreaturesStore } from "@/store/zustand";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Monster5e } from "@/types/monster5e";
import { tetraToOpen5e } from "@/lib/converter";

export default function ImportButton() {
	const { setCreature } = useCreaturesStore();
	const [importedStatblock, setImportedStatblock] = useState<Monster5e | null>(
		null
	);

	const handleClick = () => {
		if (!importedStatblock) return;
		setCreature(importedStatblock);
	};

	const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const importedJson = JSON.parse(event.currentTarget.value);
		setImportedStatblock(importedJson);
	};

	const readFileOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const uploadedFile = e.target.files[0];
		const extension = uploadedFile.name.split(".")[1];
		const fileReader = new FileReader();
		fileReader.onloadend = () => {
			try {
				if (extension === "json") {
					setImportedStatblock(JSON.parse(fileReader.result as string));
				} else if (extension === "monster") {
					const statblock = tetraToOpen5e(
						JSON.parse(fileReader.result as string)
					);
					setImportedStatblock(statblock);
				} else {
					// Remove File from filelist if not json format
					e.target.value = "";
					throw Error;
				}
			} catch (e) {
				toast.error("Only JSON files are supported");
			}
		};
		if (uploadedFile !== undefined) fileReader.readAsText(uploadedFile);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="w-fit" variant="primary">
					Import Creature
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Import Creature</SheetTitle>
					<SheetDescription>
						Upload a file or paste a JSON string below.
					</SheetDescription>
				</SheetHeader>
				<div className="py-3 space-y-3">
					<div>
						<Label htmlFor="json-input">JSON</Label>
						<Textarea
							className="h-80 sketch-border-reset text-cararra-950 focus-visible:ring-cararra-600 bg-cararra-200 border-0 rounded-md"
							onChange={(e) => handleOnChange(e)}
							id="json-input"
						/>
					</div>
					<div>
						<Label htmlFor="file-upload">File upload</Label>
						<Input
							id="file-upload"
							type="file"
							onChange={(e) => readFileOnUpload(e)}
						/>
						<span className="italic text-zinc-600 text-sm">
							.monster files (
							<a
								className="underline hover:text-zinc-950"
								href="https://tetra-cube.com/dnd/dnd-statblock.html"
								rel="noopener noreferrer"
								target="_blank"
							>
								tetra-cube
							</a>
							) are still in beta.
						</span>
					</div>
				</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button variant="primary" onClick={handleClick} type="submit">
							Save changes
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
