"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useCreaturesStore } from "@/store/zustand";
import { useQuery } from "@tanstack/react-query";
import { getCreature } from "@/services/creatures";
import LoadingSpinner from "./ui/loading-spinner";
import { useSearchParams } from "next/navigation";

type Option = {
	slug: string;
	name: string;
};

export function CreatureListSelect() {
	const searchParams = useSearchParams();
	const [open, setOpen] = useState(false);
	const { setSelectedCreature, selectedCreature } = useCreaturesStore();
	const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);

	const isDesktop = useMediaQuery("(min-width: 768px)");

	useEffect(() => {
		const paramsCreature = searchParams.get("creature");
		if (searchParams.get("creature") !== null) {
			setSelectedCreature(paramsCreature as string);
			return;
		}
		if (!selectedStatus) return;
		setSelectedCreature(selectedStatus.slug);
	}, [searchParams, selectedStatus, setSelectedCreature]);

	const { isLoading } = useQuery({
		queryKey: ["creature", selectedCreature],
		queryFn: () => getCreature(selectedCreature),
	});

	if (isDesktop) {
		return (
			<div className="flex items-center gap-3">
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button variant="secondary" className="w-56 flex justify-between">
							{selectedStatus ? (
								<span>{selectedStatus.name}</span>
							) : (
								<span>Search Creatures...</span>
							)}
							<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0" align="start">
						<StatusList
							setOpen={setOpen}
							setSelectedStatus={setSelectedStatus}
						/>
					</PopoverContent>
				</Popover>
				{isLoading && <LoadingSpinner />}
			</div>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="secondary" className="w-full sm:w-56 justify-between">
					{selectedStatus ? (
						<>{selectedStatus.name}</>
					) : (
						<>Search Creatures...</>
					)}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mt-4 border-t">
					<StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
				</div>
			</DrawerContent>
		</Drawer>
	);
}

function StatusList({
	setOpen,
	setSelectedStatus,
}: {
	setOpen: (open: boolean) => void;
	setSelectedStatus: (status: Option | null) => void;
}) {
	const { creatures: options } = useCreaturesStore();

	return (
		<Command>
			<CommandInput placeholder="Filter Creatures..." />
			<CommandList>
				<CommandEmpty>No Creatures found.</CommandEmpty>
				<CommandGroup>
					{options.map((option) => (
						<CommandItem
							key={option.slug}
							value={option.slug}
							onSelect={(value) => {
								setSelectedStatus(
									options.find((priority) => priority.slug === value) || null
								);
								setOpen(false);
							}}
						>
							{option.name}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
