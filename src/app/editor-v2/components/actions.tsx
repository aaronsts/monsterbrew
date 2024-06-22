import { useCreaturesStoreV2 } from "@/store/creatureStore";
import React from "react";
import Markdown from "react-markdown";

interface ActionProps {
	type:
		| "actions"
		| "reactions"
		| "special_abilities"
		| "legendary_actions"
		| "lair_actions"
		| "mythic_actions"
		| "regional_actions";
	title?: string;
}

export default function Actions({ type, title }: ActionProps) {
	const { creature } = useCreaturesStoreV2();

	if (!creature) return <></>;
	if (!creature[type] || creature[type]?.length === 0) return <></>;
	return (
		<div className="space-y-2">
			{title && <h2 className="border-b border-zinc-700">{title}</h2>}
			<p>{type === "legendary_actions" && creature.legendary_desc}</p>
			<div className="space-y-1">
				{creature[type]!.map((ability, i) => (
					<Markdown key={ability.name + i}>
						{ability.name + ". " + ability.desc}
					</Markdown>
				))}
			</div>
		</div>
	);
}
