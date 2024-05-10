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
import { IGetCreatures } from "@/app/editor/page";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";

type Option = {
	slug: string;
	name: string;
};

interface ICreatureListSelect {
	options: IGetCreatures["results"];
	setValue: Dispatch<SetStateAction<string>>;
}

export function CreatureListSelect({ options, setValue }: ICreatureListSelect) {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);

	useEffect(() => {
		if (!selectedStatus) return;
		setValue(selectedStatus.slug);
	}, [selectedStatus, setValue]);

	if (isDesktop) {
		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="secondary" className="justify-start">
						{selectedStatus ? (
							<>{selectedStatus.name}</>
						) : (
							<>Search Creatures...</>
						)}
						<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0" align="start">
					<StatusList
						setOpen={setOpen}
						options={options}
						setSelectedStatus={setSelectedStatus}
					/>
				</PopoverContent>
			</Popover>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="secondary" className="justify-start">
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
					<StatusList
						options={options}
						setOpen={setOpen}
						setSelectedStatus={setSelectedStatus}
					/>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

function StatusList({
	setOpen,
	setSelectedStatus,
	options,
}: {
	setOpen: (open: boolean) => void;
	setSelectedStatus: (status: Option | null) => void;
	options: IGetCreatures["results"];
}) {
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
