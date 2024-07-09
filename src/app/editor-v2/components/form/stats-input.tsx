import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateStatBonus } from "@/lib/calculations";
import { ALL_SKILLS } from "@/lib/constants";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import React from "react";

export default function StatInput() {
	const {
		creature,
		updateCreature,
		challengeRating,
		savingThrows,
		skills: skillsArray,
	} = useCreaturesStoreV2();

	function handleChange(event: React.FormEvent<HTMLInputElement>) {
		console.log(event.currentTarget.value, creature);
		if (!creature) return;
		const stat = event.currentTarget.id;
		const value = parseInt(event.currentTarget.value) || 0;
		const profBonus = challengeRating().prof;
		const statBonus = Math.floor(value / 2) - 5;
		const saveBonus = profBonus + statBonus;

		if (skillsArray.length > 0) {
			skillsArray.forEach((entry) => {
				const skill = ALL_SKILLS.find((skl) => skl.name === entry.name);
				if (!skill) return;
				const skillModifier = skill.expert
					? statBonus + challengeRating().prof * 2
					: statBonus + challengeRating().prof;
				if (skill?.stat === stat) {
					updateCreature({
						[stat]: event.currentTarget.value,
						skills: { ...creature.skills, [skill.name]: skillModifier },
						[`${stat}_save`]: savingThrows.includes(stat) ? saveBonus : null,
					});
				}
			});
		} else {
			updateCreature({
				[stat]: event.currentTarget.value,
				[`${stat}_save`]: savingThrows.includes(stat) ? saveBonus : null,
			});
		}
	}

	return (
		<div className="grid grid-cols-6 gap-3">
			<div className="space-y-0.5">
				<Label htmlFor="strength">
					STR{" "}
					<span className="text-zinc-500">
						{calculateStatBonus(creature?.strength || 10)}
					</span>
				</Label>
				<Input
					onChange={handleChange}
					id="strength"
					value={creature?.strength ?? ""}
					placeholder="ex. 27"
					type="number"
				/>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="dexterity">
					DEX{" "}
					<span className="text-zinc-500">
						{calculateStatBonus(creature?.dexterity || 10)}
					</span>
				</Label>
				<Input
					onChange={handleChange}
					id="dexterity"
					value={creature?.dexterity ?? ""}
					placeholder="ex. 27"
					type="number"
				/>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="constitution">
					CON{" "}
					<span className="text-zinc-500">
						{calculateStatBonus(creature?.constitution || 10)}
					</span>
				</Label>
				<Input
					onChange={handleChange}
					id="constitution"
					value={creature?.constitution ?? ""}
					placeholder="ex. 27"
					type="number"
				/>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="intelligence">
					INT{" "}
					<span className="text-zinc-500">
						{calculateStatBonus(creature?.intelligence || 1 - 0)}
					</span>
				</Label>
				<Input
					onChange={handleChange}
					id="intelligence"
					value={creature?.intelligence ?? ""}
					placeholder="ex. 27"
					type="number"
				/>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="wisdom">
					WIS{" "}
					<span className="text-zinc-500">
						{calculateStatBonus(creature?.wisdom || 10)}
					</span>
				</Label>
				<Input
					onChange={handleChange}
					id="wisdom"
					value={creature?.wisdom ?? ""}
					placeholder="ex. 27"
					type="number"
				/>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="charisma">
					CHA{" "}
					<span className="text-zinc-500">
						{calculateStatBonus(creature?.charisma || 10)}
					</span>
				</Label>
				<Input
					onChange={handleChange}
					id="charisma"
					value={creature?.charisma ?? ""}
					placeholder="ex. 27"
					type="number"
				/>
			</div>
		</div>
	);
}
