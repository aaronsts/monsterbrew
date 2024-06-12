"use client";

import * as React from "react";

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
import { ChevronDown } from "lucide-react";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import { calculateHP } from "@/lib/calculations";
import { Monster5e } from "@/types/monster5e";

type Option = {
	value: string;
	label: string;
	hit_die?: number;
};

interface ResponsiveComboBoxProps {
	options: Option[];
	name: string;
}

export function ResponsiveComboBox({ options, name }: ResponsiveComboBoxProps) {
	const { creature } = useCreaturesStoreV2();
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [selectedOption, setSelectedOption] = React.useState<Option | null>(
		null
	);

	React.useEffect(() => {
		const option =
			options.find(
				(priority) => priority.label === creature[name as keyof Monster5e]
			) || null;
		setSelectedOption(option);
	}, [creature, name, options, selectedOption]);

	if (isDesktop) {
		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className="w-full flex border-cararra-300 hover:bg-cararra-100 justify-between"
					>
						{selectedOption ? (
							<>
								{selectedOption.label}{" "}
								{name === "challenge_rating" && `(${selectedOption.value} XP)`}
							</>
						) : (
							<span className="text-zinc-400">Set {name}</span>
						)}
						<ChevronDown strokeWidth={1} />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0" align="start">
					<OptionList
						setOpen={setOpen}
						name={name}
						options={options}
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
					/>
				</PopoverContent>
			</Popover>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button
					variant="outline"
					className="w-full flex border-cararra-300 hover:bg-cararra-100 justify-between"
				>
					{selectedOption ? (
						<>
							{selectedOption.label}{" "}
							{name === "challenge_rating" && `(${selectedOption.value} XP)`}
						</>
					) : (
						<span className="text-zinc-400">Set {name}</span>
					)}
					<ChevronDown strokeWidth={1} />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mt-4 border-t">
					<OptionList
						setOpen={setOpen}
						name={name}
						options={options}
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
					/>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

function OptionList({
	setOpen,
	name,
	options,
	selectedOption,
	setSelectedOption,
}: {
	setOpen: (open: boolean) => void;
	name: string;
	options: Option[];
	selectedOption: Option | null;
	setSelectedOption: (status: Option | null) => void;
}) {
	const { updateCreature } = useCreaturesStoreV2();

	return (
		<Command>
			<CommandInput placeholder="Filter..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{options.map((option) => (
						<CommandItem
							className="flex justify-between"
							key={option.value}
							value={option.value}
							onSelect={() => {
								setSelectedOption(option);
								updateCreature({ [name]: option.label });
								setOpen(false);
							}}
						>
							{option.label}{" "}
							<span className="text-zinc-400">
								{option.hit_die && `d${option.hit_die}`}
								{name === "challenge_rating" && `${option.value} XP`}
							</span>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
