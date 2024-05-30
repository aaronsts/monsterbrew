"use client";

import React from "react";
import { Button } from "../ui/button";
import { useCreaturesStore } from "@/store/zustand";
import { createMarkdownPage } from "@/lib/generateMarkdown";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export default function ExportMarkdown() {
	const { creature } = useCreaturesStore();

	const handleMarkdownClick = () => {
		createMarkdownPage(creature);
	};

	return (
		<DropdownMenuItem onClick={handleMarkdownClick}>Markdown</DropdownMenuItem>
	);
}
