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
import { useCreatureFormStore } from "@/store/creatureForm";

export default function SavingThrows() {
	const { savingThrows, setSavingThrows } = useCreatureFormStore();
	const [stat, setStat] = useState<string>();

	const onSelectSkill = (e: string) => {
		setStat(e);
	};

	const addSavingThrow = () => {
		const statToAdd = STAT_NAMES.find((s) => s.value === stat);
		if (!statToAdd) return;
		if (savingThrows.includes(statToAdd)) {
			return;
		}
		setSavingThrows([...savingThrows, statToAdd]);
	};

	const removeSavingThrow = (event: React.MouseEvent<HTMLElement>) => {
		if (!event.currentTarget.dataset.index) return;
		const index = parseInt(event.currentTarget.dataset.index);
		const newSavingThrows = savingThrows.filter((_, i) => i !== index);
		setSavingThrows(newSavingThrows);
	};

	return (
		<FormItem className="space-y-2">
			<FormLabel>Saving Throws</FormLabel>
			<div className="flex gap-2 items-center">
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
					variant="primary"
					data-testid="saving-throw-button"
					type="button"
					onClick={addSavingThrow}
				>
					Add
				</Button>
			</div>
			<ul className="font-short flex gap-2 pt-2 flex-wrap">
				{savingThrows.map((stat, i) => (
					<li
						key={stat.value + i}
						className="flex bg-cararra-100 border-cararra-300 gap-1 px-3 py-1 border justify-between items-center sketch-border"
					>
						<p className="capitalize">{stat.name}</p>
						<button
							onClick={removeSavingThrow}
							data-index={i}
							className="group border-2 p-1.5 sketch-border border-transparent transition-colors hover:border-danger-300"
							type="button"
						>
							<Trash2 className="w-4 h-4 group-hover:text-danger-400 transition-colors" />
						</button>
					</li>
				))}
			</ul>
		</FormItem>
	);
}
