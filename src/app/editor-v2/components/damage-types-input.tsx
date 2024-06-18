import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { calculateDamageTypes } from "@/lib/calculations";
import { DAMAGE_TYPES } from "@/lib/constants";
import { capitalize, cn } from "@/lib/utils";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function DamageTypesInput() {
	const { creature, updateCreature } = useCreaturesStoreV2();
	const [damage, setDamage] = useState<string>();
	const [damageList, setDamageList] = useState<string[]>([]);

	const onSelectDamage = (e: string) => {
		setDamage(e);
	};
	useEffect(() => {
		const damages = calculateDamageTypes(creature);
		setDamageList(damages);
	}, [creature]);

	const addDamage = (event: React.MouseEvent<HTMLElement>) => {
		const damageCondition = event.currentTarget.dataset.damage;
		const damageToAdd = DAMAGE_TYPES.find((dmg) => dmg === damage);

		if (!damageToAdd) return;
		const element = damageList.find((dmg) => dmg.includes(damageToAdd));
		const newDamageList = [...damageList];

		console.log(damageCondition, damageToAdd, damageList);

		if (element) {
			const index = damageList.indexOf(element);
			newDamageList[index] = `${damageCondition} to ${damageToAdd}`;
			setDamageList(newDamageList);
		} else {
			newDamageList.push(`${damageCondition} to ${damageToAdd}`);
			setDamageList(newDamageList);
		}

		const immunities = newDamageList
			.filter((dmg) => dmg.includes("immune"))
			.map((dmg) => dmg.replace("immune to ", ""));
		const vulnerabilities = newDamageList
			.filter((dmg) => dmg.includes("vulnerable"))
			.map((dmg) => dmg.replace("vulnerable to ", ""));
		const resistances = newDamageList
			.filter((dmg) => dmg.includes("resistant"))
			.map((dmg) => dmg.replace("resistant to ", ""));

		updateCreature({
			damage_immunities: immunities.join(", "),
			damage_resistances: resistances.join(", "),
			damage_vulnerabilities: vulnerabilities.join(", "),
		});
	};

	const removeDamage = (event: React.MouseEvent<HTMLElement>) => {
		if (!event.currentTarget.dataset.index) return;
		const index = parseInt(event.currentTarget.dataset.index);
		const newDamageList = damageList.filter((_, i) => i !== index);
		setDamageList(newDamageList);
	};

	return (
		<div className="flex flex-col gap-1">
			<div className="space-y-0.5">
				<Label>Damage Types</Label>
				<div className="flex gap-2 items-center">
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
					<Select onValueChange={onSelectDamage}>
						<SelectTrigger data-testid="saving-throws" className="capitalize">
							<SelectValue
								className="placeholder:text-zinc-400"
								placeholder="Select a skill"
							/>
						</SelectTrigger>
						<SelectContent>
							{DAMAGE_TYPES.map((stat, i) => (
								<SelectItem key={stat + i} value={stat}>
									{capitalize(stat)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
			{damageList.length > 0 && (
				<ul className="font-short flex gap-2 pt-2 flex-wrap">
					{damageList.map((dmg, i) => (
						<li
							key={dmg + i}
							className={cn(
								"flex gap-1 px-3 py-1 border justify-between items-center sketch-border ",
								dmg.includes("vulnerable") &&
									"bg-norway-100 border-norway-300 text-norway-950",
								dmg.includes("resistant") &&
									"bg-tower-100 border-tower-300 text-tower-950",
								dmg.includes("immune") &&
									"bg-danger-100 border-danger-300 text-danger-950"
							)}
						>
							<p className="capitalize">{dmg}</p>
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
			)}
		</div>
	);
}
