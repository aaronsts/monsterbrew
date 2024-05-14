"use client";
import Statblock from "../statblock/statblock";
import ExportOptions from "../export/export-options";
import { Button } from "../ui/button";

export default function ViewStatblock() {
	return (
		<div className="w-full space-y-2">
			<div className="bg-white md:sticky z-30 top-16">
				<div className="flex flex-col md:flex-row md:justify-between gap-3">
					<Button size="sm" variant="secondary">
						Edit
					</Button>
					<ExportOptions />
				</div>
			</div>
			<Statblock />
		</div>
	);
}
