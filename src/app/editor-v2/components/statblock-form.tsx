"use client";

import { monster_sizes, monster_types } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ResponsiveComboBox } from "@/components/ui/combo-responsive";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import { calculateHP } from "@/lib/calculations";

export default function StatblockForm() {
	const [customHP, setCustomHP] = useState(false);
	const { creature, updateCreature } = useCreaturesStoreV2();

	function handleChange(event: React.FormEvent<HTMLInputElement>) {
		if (event.currentTarget.id === "hit_dice" && !customHP) {
			const amount = parseInt(event.currentTarget.value);
			const hp = calculateHP(amount, creature.constitution, creature.size);
			updateCreature({
				[event.currentTarget.id]: hp,
			});
		} else {
			updateCreature({
				[event.currentTarget.id]: event.currentTarget.value,
			});
		}
	}

	useEffect(() => {
		if (customHP) return;
		const amount = parseInt(creature.hit_dice.split("d")[0]);
		const hp = calculateHP(amount, creature.constitution, creature.size);
		updateCreature({
			hit_dice: hp,
		});
	}, [
		creature.size,
		creature.constitution,
		creature.hit_dice,
		updateCreature,
		customHP,
	]);

	return (
		<div className="grid grid-cols-3 gap-x-3 gap-y-1 h-fit">
			<div className="space-y-0.5 col-span-2">
				<Label htmlFor="name">Name</Label>
				<Input
					onChange={handleChange}
					id="name"
					name="name"
					defaultValue={creature.name}
					placeholder="ex. Ancient Black Dragon"
				/>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="type">Type</Label>
				<ResponsiveComboBox name="type" options={monster_types} />
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="size">Size</Label>
				<ResponsiveComboBox name="size" options={monster_sizes} />
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="alignment">Alignment</Label>
				<Input
					onChange={handleChange}
					id="alignment"
					defaultValue={creature.alignment}
					placeholder="ex. Chaotic Evil"
				/>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="armor_class">Armor Class (AC)</Label>
				<Input
					onChange={handleChange}
					id="armor_class"
					defaultValue={creature.armor_class}
					placeholder="ex. 22"
					type="number"
				/>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="armor_desc">AC Description</Label>
				<Input
					onChange={handleChange}
					id="armor_desc"
					defaultValue={creature.armor_desc}
					placeholder="ex. Natural Armor"
				/>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="hit_dice" className="flex items-center gap-2">
					{customHP ? "Hit Dice Formula" : "Hit Dice Amount"}
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Info className="w-4 text-cararra-700" />
							</TooltipTrigger>
							<TooltipContent>
								<p>
									Hit Dice is based <br /> on a creatures&apos; <br /> Size and
									Constitution
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</Label>
				{customHP ? (
					<Input
						onChange={handleChange}
						id="hit_dice"
						defaultValue={creature.hit_dice}
						placeholder="ex. 21d12 + 147"
					/>
				) : (
					<Input
						onChange={handleChange}
						id="hit_dice"
						type="number"
						defaultValue={parseInt(creature.hit_dice.split("d")[0])}
						placeholder="ex. 21"
					/>
				)}
			</div>
			<div className="space-y-0.5">
				<span className="h-8 block"></span>
				<div className="flex items-center space-x-2">
					<Checkbox
						id="customHp"
						onCheckedChange={(e: boolean) => setCustomHP(e)}
					/>
					<Label
						htmlFor="customHp"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Custom HP
					</Label>
				</div>
			</div>
		</div>
	);
}
