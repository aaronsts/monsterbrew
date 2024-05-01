"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function CreatureListSelect({
	creatures,
}: {
	creatures: { slug: string; name: string }[];
}) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	const loadCreature = () => {
		console.log(value);
	};

	return (
		<div className="flex gap-3">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] font-normal justify-between"
					>
						{value
							? creatures.find((creature) => creature.slug === value)?.name
							: "Select creature..."}
						<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandInput placeholder="Search creature..." className="h-9" />
						<CommandEmpty>No creature found.</CommandEmpty>
						<CommandGroup>
							{creatures.map((creature) => (
								<CommandItem
									key={creature.slug}
									value={creature.slug}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									{creature.name}
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4",
											value === creature.slug ? "opacity-100" : "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
			<Button onClick={loadCreature}>Load Creature</Button>
		</div>
	);
}
