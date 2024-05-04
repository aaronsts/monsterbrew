import { STAT_NAMES } from "@/lib/constants";

import { FormItem, FormLabel } from "../ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useState } from "react";

import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface ISavingThrows {
	statList: { name: string; value: string }[];
	setStatList: React.Dispatch<
		React.SetStateAction<{ name: string; value: string }[]>
	>;
}

export default function SavingThrows({ statList, setStatList }: ISavingThrows) {
	const [stat, setStat] = useState<string>();

	const onSelectSkill = (e: string) => {
		setStat(e);
	};

	const addSavingThrow = () => {
		const statToAdd = STAT_NAMES.find((s) => s.value === stat);
		if (!statToAdd) return;
		if (statList.includes(statToAdd)) {
			return;
		}
		setStatList([...statList, statToAdd]);
	};

	const removeSavingThrow = (event: React.MouseEvent<HTMLElement>) => {
		if (!event.currentTarget.dataset.index) return;
		const index = parseInt(event.currentTarget.dataset.index);
		const newStatList = statList.filter((_, i) => i !== index);
		setStatList(newStatList);
	};

	return (
		<FormItem>
			<FormLabel>Saving Throws</FormLabel>
			<div className="flex gap-2 pb-3 items-center">
				<Select onValueChange={onSelectSkill}>
					<SelectTrigger data-testid="saving-throws" className="capitalize">
						<SelectValue
							className="placeholder:text-zinc-400"
							placeholder="Select a skill"
						/>
					</SelectTrigger>
					<SelectContent>
						{STAT_NAMES.map((type, i) => (
							<SelectItem key={type.value + i} value={type.value}>
								{type.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button
					data-testid="saving-throw-button"
					type="button"
					onClick={addSavingThrow}
				>
					Add
				</Button>
			</div>
			<ul>
				{statList.map((stat, i) => (
					<li
						key={stat.value + i}
						className="flex gap-2 justify-between h-10 items-center border-t first:border-t-0"
					>
						<p className="capitalize">{stat.name}</p>
						<button
							onClick={removeSavingThrow}
							data-index={i}
							className="group"
							type="button"
						>
							<Trash2 className="w-4 h-4 group-hover:text-red-400 transition-colors" />
						</button>
					</li>
				))}
			</ul>
		</FormItem>
	);
}
