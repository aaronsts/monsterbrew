import { Divider } from "@/components/ui/divider";
import { calculateStatBonus } from "@/lib/calculations";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import React from "react";

export default function Stats() {
	const { creature } = useCreaturesStoreV2();

	return (
		<div className="space-y-3">
			<Divider />
			<div className="grid grid-cols-6 justify-start w-fit gap-6 ">
				<div className="flex flex-col items-center">
					<h4 className="font-bold">STR</h4>
					<p>
						{creature!.strength}{" "}
						<span>{calculateStatBonus(creature!.strength)}</span>
					</p>
				</div>
				<div className="flex flex-col items-center ">
					<h4 className="font-bold">DEX</h4>
					<p>
						{creature.dexterity}{" "}
						<span>{calculateStatBonus(creature.dexterity)}</span>
					</p>
				</div>
				<div className="flex flex-col items-center ">
					<h4 className="font-bold">CON</h4>
					<p>
						{creature.constitution}{" "}
						<span>{calculateStatBonus(creature.constitution)}</span>
					</p>
				</div>
				<div className="flex flex-col items-center ">
					<h4 className="font-bold">INT</h4>
					<p>
						{creature.intelligence}{" "}
						<span>{calculateStatBonus(creature.intelligence)}</span>
					</p>
				</div>
				<div className="flex flex-col items-center ">
					<h4 className="font-bold">WIS</h4>
					<p>
						{creature.wisdom} <span>{calculateStatBonus(creature.wisdom)}</span>
					</p>
				</div>
				<div className="flex flex-col items-center ">
					<h4 className="font-bold">CHA</h4>
					<p>
						{creature.charisma}{" "}
						<span>{calculateStatBonus(creature.charisma)}</span>
					</p>
				</div>
			</div>
			<Divider />
		</div>
	);
}
