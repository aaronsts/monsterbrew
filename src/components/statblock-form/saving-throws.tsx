import { ALL_SKILLS, STAT_NAMES } from "@/lib/constants";

import { FormItem, FormLabel } from "../ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { IChildForm } from "./ability-scores";
import { useState } from "react";

import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export default function SavingThrows({ form }: IChildForm) {
	const [stat, setStat] = useState<string>();

	const [statList, setStatList] = useState<string[]>([]);

	const onSelectSkill = (e: string) => {
		setStat(e);
	};

	const addSavingThrow = () => {
		const statToAdd = STAT_NAMES.find((s) => s === stat);
		if (!statToAdd) return;
		if (statList.includes(statToAdd)) {
			return;
		}
		setStatList([...statList, statToAdd]);
	};

	const removeSavingThrow = (event: React.MouseEvent<HTMLElement>) => {
		if (!event.currentTarget.dataset.index) return;
		const index = parseInt(event.currentTarget.dataset.index);
		const newConditionList = statList.filter((_, i) => i !== index);
		setStatList(newConditionList);
	};

	return (
		<FormItem>
			<FormLabel>Saving Throws</FormLabel>
			<div className="flex gap-2 pb-3 items-center">
				<Select onValueChange={onSelectSkill}>
					<SelectTrigger className="capitalize">
						<SelectValue
							className="placeholder:text-zinc-400"
							placeholder="Select a skill"
						/>
					</SelectTrigger>
					<SelectContent>
						{STAT_NAMES.map((type, i) => (
							<SelectItem className="uppercase" key={type + i} value={type}>
								{type}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button type="button" onClick={addSavingThrow}>
					Add
				</Button>
			</div>
			<ul>
				{statList.map((stat, i) => (
					<li
						key={stat + i}
						className="flex gap-2 justify-between h-10 items-center border-t first:border-t-0"
					>
						<p className="capitalize">{stat}</p>
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
