"use client";

import ExportMarkdown from "./markdown";
import ExportPdf from "./pdf";
import ExportJson from "./json";

export default function ExportOptions() {
	return (
		<div className="flex items-center md:self-end gap-3">
			<ExportPdf />
			<ExportMarkdown />
			<ExportJson />
		</div>
	);
}
