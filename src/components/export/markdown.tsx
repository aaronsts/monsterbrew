"use client";

import React from "react";
import { Button } from "../ui/button";
import { useCreaturesStore } from "@/store/zustand";
import { createMarkdownPage } from "@/lib/generateMarkdown";

export default function ExportMarkdown() {
	const { creature } = useCreaturesStore();

	const handleMarkdownClick = () => {
		createMarkdownPage(creature);
	};

	return (
		<Button variant="primary" onClick={handleMarkdownClick}>
			Save Markdown
		</Button>
	);
}
