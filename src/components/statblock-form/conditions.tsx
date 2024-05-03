import { ALL_SKILLS, CONDITION_TYPES, DAMAGE_TYPES } from "@/lib/constants";

import { FormField, FormItem, FormLabel } from "../ui/form";
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
import { Trash2, X } from "lucide-react";

export default function Conditions({ form }: IChildForm) {
	const [damage, setDamage] = useState<string>();
	const [damageList, setDamageList] = useState<string[]>([]);

	const [condition, setCondition] = useState<string>();
	const [conditionList, setConditionList] = useState<string[]>([]);

	const onSelectDamage = (e: string) => {
		setDamage(e);
	};

	const addDamage = (event: React.MouseEvent<HTMLElement>) => {
		const damageCondition = event.currentTarget.dataset.damage;
		const damageToAdd = DAMAGE_TYPES.find((dmg) => dmg === damage);

		if (!damageToAdd) return;
		const element = damageList.find((dmg) => dmg.includes(damageToAdd));

		if (element) {
			const index = damageList.indexOf(element);
			const newDamageList = [...damageList];
			newDamageList[index] = `${damageCondition} to ${damageToAdd}`;
			setDamageList(newDamageList);
			return;
		}
		setDamageList([...damageList, `${damageCondition} to ${damageToAdd}`]);
	};

	const removeDamage = (event: React.MouseEvent<HTMLElement>) => {
		if (!event.currentTarget.dataset.index) return;
		const index = parseInt(event.currentTarget.dataset.index);
		const newDamageList = damageList.filter((_, i) => i !== index);
		setDamageList(newDamageList);
	};

	const onSelectCondition = (e: string) => {
		setCondition(e);
	};

	const addCondition = () => {
		const conditionToAdd = CONDITION_TYPES.find((cnd) => cnd === condition);
		if (!conditionToAdd) return;
		if (conditionList.includes(conditionToAdd)) {
			return;
		}
		setConditionList([...conditionList, conditionToAdd]);
	};

	const removeCondition = (event: React.MouseEvent<HTMLElement>) => {
		if (!event.currentTarget.dataset.index) return;
		const index = parseInt(event.currentTarget.dataset.index);
		const newConditionList = conditionList.filter((_, i) => i !== index);
		setConditionList(newConditionList);
	};

	return (
		<>
			<FormItem>
				<FormLabel>Damage Types</FormLabel>
				<div className="flex gap-2 pb-3 items-center">
					<Button type="button" onClick={addDamage} data-damage="vulnerable">
						Vulnerable
					</Button>
					<Button type="button" onClick={addDamage} data-damage="resistant">
						Resistant
					</Button>
					<Button type="button" onClick={addDamage} data-damage="immune">
						Immune
					</Button>
					<p className="font-normal px-2 text-lg">to:</p>
					<Select onValueChange={onSelectDamage}>
						<SelectTrigger className="capitalize">
							<SelectValue
								className="placeholder:text-zinc-400"
								placeholder="Damage type"
							/>
						</SelectTrigger>
						<SelectContent>
							{DAMAGE_TYPES.map((type, i) => (
								<SelectItem className="capitalize" key={type + i} value={type}>
									{type}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				{damageList.length > 0 && <h3 className="font-medium">Creature is:</h3>}
				<ul>
					{damageList.map((damage, i) => (
						<li
							key={damage + i}
							className="flex gap-2 justify-between h-10 items-center border-t first:border-t-0"
						>
							<p className="capitalize">{damage}</p>
							<button
								onClick={removeDamage}
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

			<FormItem>
				<FormLabel>Condition Immunities</FormLabel>
				<div className="flex gap-2 pb-3 items-center">
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
					<Button type="button" onClick={addCondition}>
						Add
					</Button>
				</div>
				{conditionList.length > 0 && (
					<h3 className="font-medium">Creature is immune to being:</h3>
				)}
				<ul>
					{conditionList.map((cnd, i) => (
						<li
							key={cnd + i}
							className="flex gap-2 justify-between h-10 items-center border-t first:border-t-0"
						>
							<p className="capitalize">{cnd}</p>
							<button
								onClick={removeCondition}
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
		</>
	);
}
