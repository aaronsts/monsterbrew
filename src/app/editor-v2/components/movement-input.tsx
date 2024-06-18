"use client";
import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import { Monster5e, Movement } from "@/types/monster5e";

export default function MovementInput() {
	const { creature, updateCreature } = useCreaturesStoreV2();

	function handleChange(event: React.FormEvent<HTMLInputElement>) {
		const speed = { ...creature.speed };
		const movement =
			event.currentTarget.value === "" ? null : event.currentTarget.value;

		if (!movement) {
			delete speed[event.currentTarget.id as keyof Movement];
		} else {
			speed[event.currentTarget.id as keyof Movement] = movement;
		}
		updateCreature({ speed: speed });
	}

	return (
		<div className="col-span-3 gap-x-3 gap-y-1 grid grid-cols-5">
			<div className="space-y-0.5">
				<Label htmlFor="walk">Walking</Label>
				<div className="relative">
					<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 z-10">
						ft.
					</span>
					<Input
						onChange={handleChange}
						id="walk"
						value={creature.speed.walk ?? ""}
						placeholder="0"
						type="number"
					/>
				</div>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="swim">Swimming</Label>
				<div className="relative">
					<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 z-10">
						ft.
					</span>
					<Input
						onChange={handleChange}
						id="swim"
						value={creature.speed.swim ?? ""}
						placeholder="0"
						type="number"
					/>
				</div>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="burrow">Burrowing</Label>
				<div className="relative">
					<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 z-10">
						ft.
					</span>
					<Input
						onChange={handleChange}
						id="burrow"
						value={creature.speed.burrow ?? ""}
						placeholder="0"
						type="number"
					/>
				</div>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="climb">Climbing</Label>
				<div className="relative">
					<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 z-10">
						ft.
					</span>
					<Input
						onChange={handleChange}
						id="climb"
						value={creature.speed.climb ?? ""}
						placeholder="0"
						type="number"
					/>
				</div>
			</div>
			<div className="space-y-0.5">
				<Label htmlFor="fly">Flying</Label>
				<div className="relative">
					<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 z-10">
						ft.
					</span>
					<Input
						onChange={handleChange}
						id="fly"
						value={creature.speed.fly ?? ""}
						placeholder="0"
						type="number"
					/>
				</div>
			</div>
		</div>
	);
}
