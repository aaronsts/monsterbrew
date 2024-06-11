import { Divider } from "@/components/ui/divider";
import { calculateMedianHP } from "@/lib/calculations";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import React from "react";

export default function BaseInformation() {
	const { creature } = useCreaturesStoreV2();
	return (
		<div className="space-y-3">
			<div className="flex justify-between">
				<div>
					<h2 className="leading-none">{creature.name}</h2>
					<p className="italic capitalize">
						{creature.size} {creature.type}, {creature.alignment}
					</p>
				</div>
				{/* <Button
					type="button"
					variant="secondary"
					className="bg-tower-500 print:hidden text-white border-tower-700 hover:bg-tower-700"
					onClick={loadCreatureValues}
				>
					Edit
				</Button> */}
			</div>
			<Divider />
			<div>
				<div className="flex gap-2">
					<h4>Armor Class</h4>
					<p>
						{creature.armor_class}{" "}
						{creature.armor_desc && `(${creature.armor_desc})`}
					</p>
				</div>
				<div className="flex gap-2">
					<h4>Hit Points</h4>
					<p>
						{calculateMedianHP(creature.hit_dice)} ({creature.hit_dice})
					</p>
				</div>
				<p className="font-yatra">
					Speed <span className="font-sans">movement</span>
				</p>
			</div>
		</div>
	);
}
