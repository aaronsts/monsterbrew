import { CONDITION_TYPES, DAMAGE_TYPES } from "@/lib/constants";

import { FormItem, FormLabel } from "../ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { IChildForm } from "./ability-scores";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface IConditions extends IChildForm {
	damageList: string[];
	setDamageList: Dispatch<SetStateAction<string[]>>;
	conditionList: string[];
	setConditionList: Dispatch<SetStateAction<string[]>>;
}

export default function Conditions({
	form,
	setDamageList,
	damageList,
	conditionList,
	setConditionList,
}: IConditions) {
	const [damage, setDamage] = useState<string>();
	const [condition, setCondition] = useState<string>();
	const { setValue } = form;
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

	useEffect(() => {
		setValue("condition_immunities", conditionList.join(", "));
	}, [conditionList, setValue]);

	useEffect(() => {
		const immunities = damageList
			.filter((dmg) => dmg.includes("immune"))
			.map((dmg) => dmg.replace("immune to ", ""));
		const vulnerabilities = damageList
			.filter((dmg) => dmg.includes("vulnerable"))
			.map((dmg) => dmg.replace("vulnerable to ", ""));
		const resistances = damageList
			.filter((dmg) => dmg.includes("resistant"))
			.map((dmg) => dmg.replace("resistant to ", ""));

		setValue("damage_immunities", immunities.join(", "));
		setValue("damage_resistances", resistances.join(", "));
		setValue("damage_vulnerabilities", vulnerabilities.join(", "));
	}, [damageList, setValue]);

	return (
		<>
			<FormItem>
				<FormLabel>Damage Types</FormLabel>
				<div className="flex gap-2 pb-3 items-center">
					<Button
						variant="secondary"
						className="bg-norway-400 border-norway-400 text-norway-50 hover:bg-norway-300"
						type="button"
						onClick={addDamage}
						data-damage="vulnerable"
					>
						Vulnerable
					</Button>
					<Button
						className="bg-tower-400 border-tower-400 text-tower-50 hover:bg-tower-300 "
						type="button"
						variant="secondary"
						onClick={addDamage}
						data-damage="resistant"
					>
						Resistant
					</Button>
					<Button
						type="button"
						variant="secondary"
						className="bg-danger-400 border-danger-400 text-danger-50 hover:bg-danger-300"
						onClick={addDamage}
						data-damage="immune"
					>
						Immune
					</Button>
					<p className="font-normal px-2 text-lg">to:</p>
					<Select onValueChange={onSelectDamage}>
						<SelectTrigger className="capitalize">
							<SelectValue
								data-testid="damage-type"
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
								className="group border-2 p-1.5 sketch-border border-transparent transition-colors hover:border-danger-300"
								type="button"
							>
								<Trash2 className="w-4 h-4 group-hover:text-danger-400 transition-colors" />
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
					<Button type="button" variant="primary" onClick={addCondition}>
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
								className="group border-2 p-1.5 sketch-border border-transparent transition-colors hover:border-danger-300"
								type="button"
							>
								<Trash2 className="w-4 h-4 group-hover:text-danger-400 transition-colors" />
							</button>
						</li>
					))}
				</ul>
			</FormItem>
		</>
	);
}
