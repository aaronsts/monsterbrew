"use client";

import React from "react";
import { createMarkdownPage } from "@/lib/generateMarkdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useCreaturesStoreV2 } from "@/store/creatureStore";

export default function ExportMarkdown() {
	const { creature } = useCreaturesStoreV2();

	const handleMarkdownClick = () => {
		if (!creature) return;
		createMarkdownPage(creature);
	};

	return (
		<DropdownMenuItem onClick={handleMarkdownClick}>Markdown</DropdownMenuItem>
	);
}
