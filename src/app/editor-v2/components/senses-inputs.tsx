import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import { type Senses } from "@/types/monster5e";
import React from "react";

export default function SensesInputs() {
	const { creature, updateCreature } = useCreaturesStoreV2();

	const senses: Senses = {};
	creature.senses?.split(",").forEach((s) => {
		const sense = s.trim().split(" ");
		switch (sense[0]) {
			case "blindsight":
				senses["blindsight"] = parseInt(sense[1]);
				break;
			case "darkvision":
				senses["darkvision"] = parseInt(sense[1]);
				break;
			case "tremorsense":
				senses["tremorsense"] = parseInt(sense[1]);
				break;
			case "truesight":
				senses["truesight"] = parseInt(sense[1]);
				break;
			case "passive":
				senses["passivePerception"] = parseInt(sense[2]);
				break;
			default:
				break;
		}
	});

	console.log(senses);

	function handleChange(event: React.FormEvent<HTMLInputElement>) {
		updateCreature({
			[event.currentTarget.id]: event.currentTarget.value,
		});
	}
	return (
		<div className="grid grid-cols-4 gap-x-3 gap-y-1">
			<div className="flex justify-between col-span-5">
				<h3>Senses</h3>
				<p className="font-yatra text-sm">
					passive perception: <span>{senses.passivePerception}</span>
				</p>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="blindsight">Blindsight</Label>
				<div className="relative">
					<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 z-10">
						ft.
					</span>
					<Input
						placeholder="0"
						onChange={handleChange}
						id="blindsight"
						defaultValue={senses.blindsight}
					/>
				</div>
			</div>
			<div className="space-y-0.5  ">
				<Label htmlFor="darkvision">Darkvision</Label>
				<div className="relative">
					<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 z-10">
						ft.
					</span>
					<Input
						placeholder="0"
						onChange={handleChange}
						id="darkvision"
						defaultValue={senses.darkvision}
						type="number"
					/>
				</div>
			</div>
			<div className="space-y-0.5  ">
				<Label htmlFor="tremorsense">Tremorsense</Label>
				<div className="relative">
					<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 z-10">
						ft.
					</span>
					<Input
						placeholder="0"
						onChange={handleChange}
						id="tremorsense"
						defaultValue={senses.tremorsense}
						type="number"
					/>
				</div>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="truesight">Truesight</Label>
				<div className="relative w-full">
					<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 z-10">
						ft.
					</span>
					<Input
						placeholder="0"
						onChange={handleChange}
						id="truesight"
						defaultValue={senses.truesight}
						type="number"
					/>
				</div>
			</div>
			<div className="space-y-0.5 col-span-5">
				<Label htmlFor="sensesOther">Other</Label>
				<Input
					onChange={handleChange}
					id="sensesOther"
					placeholder="Extra notes..."
				/>
			</div>
		</div>
	);
}
