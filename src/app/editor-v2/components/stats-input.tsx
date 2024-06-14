import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateStatBonus } from "@/lib/calculations";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import React from "react";

export default function StatInput() {
	const { creature, updateCreature, challengeRating, savingThrows } =
		useCreaturesStoreV2();

	function handleChange(event: React.FormEvent<HTMLInputElement>) {
		const stat = event.currentTarget.id;
		const value = parseInt(event.currentTarget.value) || 0;
		const profBonus = challengeRating().prof;
		const statBonus = Math.floor(value / 2) - 5;
		const saveBonus = profBonus + statBonus;

		if (savingThrows.includes(stat)) {
			updateCreature({
				[stat]: event.currentTarget.value,
				[`${stat}_save`]: saveBonus,
			});
		} else {
			updateCreature({
				[stat]: event.currentTarget.value,
			});
		}
	}

	return (
		<div className="grid grid-cols-6 gap-3">
			<div className="space-y-0.5">
				<Label htmlFor="strength">
					STR{" "}
					<span className="text-zinc-500">
						{calculateStatBonus(creature.strength)}
					</span>
				</Label>
				<Input
					onChange={handleChange}
					id="strength"
					value={creature.strength}
					placeholder="ex. 27"
					type="number"
				/>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="dexterity">
					DEX{" "}
					<span className="text-zinc-500">
						{calculateStatBonus(creature.dexterity)}
					</span>
				</Label>
				<Input
					onChange={handleChange}
					id="dexterity"
					value={creature.dexterity}
					placeholder="ex. 27"
					type="number"
				/>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="constitution">
					CON{" "}
					<span className="text-zinc-500">
						{calculateStatBonus(creature.constitution)}
					</span>
				</Label>
				<Input
					onChange={handleChange}
					id="constitution"
					value={creature.constitution}
					placeholder="ex. 27"
					type="number"
				/>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="intelligence">
					INT{" "}
					<span className="text-zinc-500">
						{calculateStatBonus(creature.intelligence)}
					</span>
				</Label>
				<Input
					onChange={handleChange}
					id="intelligence"
					value={creature.intelligence}
					placeholder="ex. 27"
					type="number"
				/>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="wisdom">
					WIS{" "}
					<span className="text-zinc-500">
						{calculateStatBonus(creature.wisdom)}
					</span>
				</Label>
				<Input
					onChange={handleChange}
					id="wisdom"
					value={creature.wisdom}
					placeholder="ex. 27"
					type="number"
				/>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="charisma">
					CHA{" "}
					<span className="text-zinc-500">
						{calculateStatBonus(creature.charisma)}
					</span>
				</Label>
				<Input
					onChange={handleChange}
					id="charisma"
					value={creature.charisma}
					placeholder="ex. 27"
					type="number"
				/>
			</div>
		</div>
	);
}
