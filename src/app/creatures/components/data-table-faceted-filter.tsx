import * as React from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
// import { Separator } from "@/registry/new-york/ui/separator"

interface DataTableFacetedFilterProps<TData, TValue> {
	column?: Column<TData, TValue>;
	title?: string;
	options: {
		label: string;
		value: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
}

export function DataTableFacetedFilter<TData, TValue>({
	column,
	title,
	options,
}: DataTableFacetedFilterProps<TData, TValue>) {
	const facets = column?.getFacetedUniqueValues();
	const selectedValues = new Set(column?.getFilterValue() as string[]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="sm" className="h-8 border-dashed">
					<PlusCircledIcon className="mr-2 h-4 w-4" />
					{title}
					{selectedValues?.size > 0 && (
						<div className="ml-1 space-x-1 flex">
							{selectedValues.size > 2 ? (
								<Badge className=" ">{selectedValues.size} selected</Badge>
							) : (
								options
									.filter((option) => selectedValues.has(option.value))
									.map((option) => {
										return title === "CR" ? (
											<Badge key={option.value} className=" ">
												{option.value}
											</Badge>
										) : (
											<Badge key={option.value} className=" ">
												{option.label}
											</Badge>
										);
									})
							)}
						</div>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command>
					<CommandInput placeholder={title} />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = selectedValues.has(option.value);
								return (
									<CommandItem
										key={option.value}
										onSelect={() => {
											if (isSelected) {
												selectedValues.delete(option.value);
											} else {
												selectedValues.add(option.value);
											}
											const filterValues = Array.from(selectedValues);
											column?.setFilterValue(
												filterValues.length ? filterValues : undefined
											);
										}}
									>
										<div
											className={cn(
												"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
												isSelected
													? "bg-primary text-primary-foreground"
													: "opacity-50 [&_svg]:invisible"
											)}
										>
											<CheckIcon className={cn("h-4 w-4")} />
										</div>
										{title === "CR" ? (
											<span>
												{option.value}{" "}
												<span className="text-zinc-400">
													({option.label} XP)
												</span>
											</span>
										) : (
											<span>{option.label}</span>
										)}
										{facets?.get(option.value) && (
											<span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
												{facets.get(option.value)}
											</span>
										)}
									</CommandItem>
								);
							})}
						</CommandGroup>
						{selectedValues.size > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() => column?.setFilterValue(undefined)}
										className="justify-center text-center"
									>
										Clear filters
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
