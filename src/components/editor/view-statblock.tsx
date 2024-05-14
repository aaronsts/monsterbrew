"use client";
import Statblock from "../statblock/statblock";
import ExportOptions from "../export/export-options";

export default function ViewStatblock() {
	return (
		<div className="w-full space-y-2">
			<div className="flex flex-col md:flex-row gap-3">
				<ExportOptions />
			</div>
			<Statblock />
		</div>
	);
}
