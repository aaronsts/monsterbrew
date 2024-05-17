"use client";
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

import { ChevronDown, Check } from "lucide-react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { forwardRef, useEffect, useState } from "react";

type IOption = {
	label: string;
	value: string;
};

interface IComboboxProps {
	options: IOption[];
	value?: string;
	onChange: (value: string) => void;
}

const ComboBoxResponsive = forwardRef<HTMLButtonElement, IComboboxProps>(
	({ options, value, onChange }: IComboboxProps, ref) => {
		const [open, setOpen] = useState(false);
		const [selectedOption, setSelectedOption] = useState<IOption | null>(null);
		const isChallengeRating = options[0].hasOwnProperty("prof");

		useEffect(() => {
			if (!isChallengeRating) {
				const option = options.find((opt) => opt.label === value);
				if (!option) return;
				setSelectedOption(option);
			} else {
				const option = options.find((opt) => opt.value === value);
				if (!option) return;
				setSelectedOption(option);
			}
		}, [isChallengeRating, options, value]);

		const isDesktop = useMediaQuery("(min-width: 768px)");

		if (isDesktop) {
			return (
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						{value ? (
							<Button
								variant="secondary"
								className="text-zinc-800 w-full border-cararra-300 border hover:bg-cararra-100  flex justify-between text-sm font-normal"
							>
								{isChallengeRating
									? `${selectedOption?.label} (+${selectedOption?.value} XP)`
									: selectedOption?.label}
								<ChevronDown strokeWidth={1} />
							</Button>
						) : (
							<Button
								variant="secondary"
								className="text-pewter-500 border border-cararra-300 hover:bg-cararra-100 flex w-full justify-between text-sm font-normal"
							>
								Select type ...
								<ChevronDown strokeWidth={1} />
							</Button>
						)}
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0" align="start">
						<Command>
							<CommandInput placeholder="Filter type..." />
							<CommandList>
								<CommandEmpty>No type found.</CommandEmpty>
								<CommandGroup>
									{options.map((option) => (
										<CommandItem
											key={option.value}
											onSelect={() => {
												onChange(option.value === value ? "" : option.value);
												setSelectedOption(option);
												setOpen(false);
											}}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													value === option.value ? "opacity-100" : "opacity-0"
												)}
											/>

											{isChallengeRating
												? `${option?.label} (+${option?.value} XP)`
												: option?.label}
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			);
		}

		return (
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerTrigger asChild>
					{value ? (
						<Button
							variant="secondary"
							className="text-pewter-800 border font-short border-cararra-300   hover:bg-cararra-100 flex w-full justify-between text-sm font-normal"
						>
							{selectedOption?.label}
							<ChevronDown strokeWidth={1} />
						</Button>
					) : (
						<Button
							variant="secondary"
							className="text-pewter-500 border font-short border-cararra-300  hover:bg-cararra-100 flex w-full justify-between text-sm font-normal"
						>
							Select type ...
							<ChevronDown strokeWidth={1} />
						</Button>
					)}
				</DrawerTrigger>
				<DrawerContent>
					<div className="mt-4 border-t">
						<Command>
							<CommandInput placeholder="Filter type..." />
							<CommandList>
								<CommandEmpty>No type found.</CommandEmpty>
								<CommandGroup>
									{options.map((option) => (
										<CommandItem
											key={option.value}
											onSelect={() => {
												onChange(option.value === value ? "" : option.value);
												setSelectedOption(option);
												setOpen(false);
											}}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													value === option.value ? "opacity-100" : "opacity-0"
												)}
											/>
											{option.label}
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</div>
				</DrawerContent>
			</Drawer>
		);
	}
);

ComboBoxResponsive.displayName = "ComboBoxResponsive";

export { ComboBoxResponsive };
