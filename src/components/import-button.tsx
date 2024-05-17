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

export default function ImportButton() {
	const { setCreature } = useCreaturesStore();
	const [importedStatblock, setImportedStatblock] = useState<Monster5e | null>(
		null
	);

	const handleClick = () => {
		if (!importedStatblock) return;
		console.log(importedStatblock);
		// setCreature(importedStatblock);
	};

	const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const importedJson: Monster5e = JSON.parse(event.currentTarget.value);
		setImportedStatblock(importedJson);
	};

	const readFileOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const uploadedFile = e.target.files[0];
		const fileReader = new FileReader();
		fileReader.onloadend = () => {
			try {
				setImportedStatblock(JSON.parse(fileReader.result as string));
			} catch (e) {
				toast.error("Not a valid JSON file");
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
