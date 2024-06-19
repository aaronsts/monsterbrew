import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { calculateSavingThrowsv2 } from "@/lib/calculations";
import { CHALLENGE_RATINGS, STAT_NAMES_V2 } from "@/lib/constants";
import { capitalize } from "@/lib/utils";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import { Monster5e } from "@/types/monster5e";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function SavingThrowsInput() {
	const { creature, updateCreature, savingThrows, setSavingThrows } =
		useCreaturesStoreV2();
	const [stat, setStat] = useState<string>();

	const challengeRating = CHALLENGE_RATINGS.find(
		(cr) => creature?.challenge_rating === cr.label
	) || { label: "0", value: "10", prof: 2 };

	const onSelectSkill = (e: string) => {
		setStat(e);
	};

	useEffect(() => {
		if (!creature) return;
		const saves = calculateSavingThrowsv2(creature);
		setSavingThrows(saves);
	}, [creature, setSavingThrows]);

	const addSavingThrow = () => {
		if (!stat || !creature) return;
		if (savingThrows.includes(stat)) return;
		const profBonus = challengeRating?.prof || 0;

		const statBonus =
			Math.floor((creature[stat as keyof Monster5e] as number) / 2) - 5;
		const saveBonus = profBonus + statBonus;

		updateCreature({ [`${stat}_save`]: saveBonus });
		setSavingThrows([...savingThrows, stat]);
	};

	const removeSavingThrow = (event: React.MouseEvent<HTMLElement>) => {
		if (!event.currentTarget.dataset.index) return;
		const index = parseInt(event.currentTarget.dataset.index);
		const newSavingThrows = savingThrows.filter((_, i) => i !== index);
		const stat = savingThrows.find((_, i) => i === index);
		setSavingThrows(newSavingThrows);
		updateCreature({ [`${stat}_save`]: null });
	};

	return (
		<div className="flex flex-col gap-1">
			<div className="space-y-0.5">
				<Label>Saving Throws</Label>
				<div className="flex gap-2 items-center">
					<Select onValueChange={onSelectSkill}>
						<SelectTrigger data-testid="saving-throws" className="capitalize">
							<SelectValue
								className="placeholder:text-zinc-400"
								placeholder="Select a skill"
							/>
						</SelectTrigger>
						<SelectContent>
							{STAT_NAMES_V2.map((stat, i) => (
								<SelectItem key={stat + i} value={stat}>
									{capitalize(stat)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Button
						variant="secondary"
						data-testid="saving-throw-button"
						type="button"
						onClick={addSavingThrow}
					>
						Add
					</Button>
				</div>
			</div>
			{savingThrows.length > 0 && (
				<ul className="font-short flex gap-2 pt-2 flex-wrap">
					{savingThrows.map((stat, i) => (
						<li
							key={stat + i}
							className="flex bg-cararra-100 border-cararra-300 gap-1 px-3 py-1 border justify-between items-center sketch-border"
						>
							<p className="capitalize">{stat}</p>
							<button
								onClick={removeSavingThrow}
								data-index={i}
								className="group border-2 p-1.5 sketch-border border-transparent transition-colors hover:border-danger-300"
								type="button"
							>
								<Trash2 className="w-4 h-4 group-hover:text-danger-400 transition-colors" />
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
