"use client";
import * as React from "react";
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

type IOption = {
	label: string;
	value: string;
};

interface IComboboxProps {
	options: IOption[];
	value?: string;
	onChange: (value: string) => void;
}

const ComboBoxResponsive = React.forwardRef<HTMLButtonElement, IComboboxProps>(
	({ options, value, onChange }: IComboboxProps, ref) => {
		const [open, setOpen] = React.useState(false);
		const [selectedOption, setSelectedOption] = React.useState<IOption | null>(
			null
		);
		const isDesktop = useMediaQuery("(min-width: 768px)");

		if (isDesktop) {
			return (
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						{value ? (
							<Button
								variant="outline"
								className="text-zinc-800 w-full flex justify-between text-sm font-normal"
							>
								{selectedOption?.label}
								<ChevronDown strokeWidth={1} />
							</Button>
						) : (
							<Button
								variant="outline"
								className="text-zinc-500 flex w-full justify-between text-sm font-normal"
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

											{option.label}
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
							variant="outline"
							className="text-zinc-800 flex w-full justify-between text-sm font-normal"
						>
							{selectedOption?.label}
							<ChevronDown strokeWidth={1} />
						</Button>
					) : (
						<Button
							variant="outline"
							className="text-zinc-500 flex w-full justify-between text-sm font-normal"
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