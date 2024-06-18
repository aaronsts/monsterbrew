import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CONDITION_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ConditionTypesInput() {
	const { creature, updateCreature } = useCreaturesStoreV2();
	const [condition, setCondition] = useState<string>();
	const [conditionList, setConditionList] = useState<string[]>([]);

	const onSelectCondition = (e: string) => {
		setCondition(e);
	};

	useEffect(() => {
		const conditionImmunities =
			creature.condition_immunities?.split(", ").filter((con) => con !== "") ||
			[];
		setConditionList(conditionImmunities);
	}, [creature.condition_immunities]);

	const addCondition = () => {
		const conditionToAdd = CONDITION_TYPES.find((cnd) => cnd === condition);
		if (!conditionToAdd) return;
		if (conditionList.includes(conditionToAdd)) return;
		const newConditionList = [...conditionList, conditionToAdd];
		setConditionList(newConditionList);
		updateCreature({ condition_immunities: newConditionList.join(", ") });
	};

	const removeCondition = (event: React.MouseEvent<HTMLElement>) => {
		if (!event.currentTarget.dataset.index) return;
		const index = parseInt(event.currentTarget.dataset.index);
		const newConditionList = conditionList.filter((_, i) => i !== index);
		setConditionList(newConditionList);
		updateCreature({ condition_immunities: newConditionList.join(", ") });
	};

	return (
		<div className="flex flex-col gap-1">
			<div className="space-y-0.5">
				<Label>Condition Types</Label>
				<div className="flex gap-2 items-center">
					<Select onValueChange={onSelectCondition}>
						<SelectTrigger className="capitalize">
							<SelectValue
								className="placeholder:text-zinc-400"
								placeholder="Condition type"
							/>
						</SelectTrigger>
						<SelectContent>
							{CONDITION_TYPES.map((type, i) => (
								<SelectItem className="capitalize" key={type + i} value={type}>
									{type}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Button type="button" variant="secondary" onClick={addCondition}>
						Add
					</Button>
				</div>
			</div>
			<div className="space-y-2">
				{conditionList.length > 0 && <h4>Creature is immune to being:</h4>}
				<ul className="font-short gap-2 flex flex-wrap">
					{conditionList.map((cnd, i) => (
						<li
							key={cnd + i}
							className="flex gap-1 px-3 text-cararra-950 py-1 justify-between items-center sketch-border border-cararra-300 border bg-cararra-100"
						>
							<p className="capitalize">{cnd}</p>
							<button
								onClick={removeCondition}
								data-index={i}
								className="group"
								type="button"
							>
								<Trash2 className="w-4 h-4 group-hover:text-danger-500 transition-colors" />
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
