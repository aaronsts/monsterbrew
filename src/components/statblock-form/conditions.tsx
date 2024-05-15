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
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreatureFormStore } from "@/store/creatureForm";

export default function Conditions({ form }: IChildForm) {
	const { damageList, setDamageList, conditionList, setConditionList } =
		useCreatureFormStore();

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
			<FormItem className="space-y-2">
				<FormLabel>Damage Types</FormLabel>
				<div className="flex flex-wrap lg:flex-nowrap gap-2 items-center">
					<Button
						variant="secondary"
						className="bg-norway-400  border-norway-400 text-norway-50 hover:bg-norway-300"
						type="button"
						onClick={addDamage}
						data-damage="vulnerable"
					>
						Vulnerable
					</Button>
					<Button
						className="bg-tower-400  border-tower-400 text-tower-50 hover:bg-tower-300 "
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
						className="bg-danger-400  border-danger-400 text-danger-50 hover:bg-danger-300"
						onClick={addDamage}
						data-damage="immune"
					>
						Immune
					</Button>
					<p className="font-yatra w-fit text-lg">to:</p>

					<Select onValueChange={onSelectDamage}>
						<SelectTrigger className=" capitalize">
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
				<div>
					{damageList.length > 0 && <h4>Creature is:</h4>}
					<ul className="font-short gap-2 flex flex-wrap">
						{damageList.map((damage, i) => (
							<li
								key={damage + i}
								className={cn(
									"flex gap-1 px-3 py-1 border justify-between items-center sketch-border ",
									damage.includes("vulnerable") &&
										"bg-norway-100 border-norway-300 text-norway-950",
									damage.includes("resistant") &&
										"bg-tower-100 border-tower-300 text-tower-950",
									damage.includes("immune") &&
										"bg-danger-100 border-danger-300 text-danger-950"
								)}
							>
								<p className="capitalize">{damage}</p>
								<button
									onClick={removeDamage}
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
			</FormItem>
			<FormItem className="space-y-2">
				<FormLabel>Condition Immunities</FormLabel>
				<div className="flex gap-2  items-center">
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
			</FormItem>
		</>
	);
}
