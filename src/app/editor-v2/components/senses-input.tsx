"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreaturesStoreV2 } from "@/store/creatureStore";

export default function SensesInput() {
	const { creature, updateCreature } = useCreaturesStoreV2();

	const senses = creature.senses?.split("passive") || "";

	function handleChange(event: React.FormEvent<HTMLInputElement>) {
		updateCreature({
			[event.currentTarget.id]: event.currentTarget.value,
		});
	}
	return (
		<div className="grid grid-cols-4 gap-x-3 gap-y-1">
			<div className="space-y-0.5 col-span-4">
				<Label htmlFor="senses">Senses</Label>
				<Input
					placeholder=""
					onChange={handleChange}
					id="senses"
					value={senses[0]}
				/>
			</div>
			<div className="space-y-0.5 col-span-4">
				<Label htmlFor="languages">Languages</Label>
				<Input
					placeholder=""
					onChange={handleChange}
					id="languages"
					value={creature.languages}
				/>
			</div>
			{/* <div className="space-y-0.5">
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
						type="number"
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
			</div> */}
		</div>
	);
}
