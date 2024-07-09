import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import React from "react";

function DescriptionInput() {
	const { creature, updateCreature } = useCreaturesStoreV2();

	function handleChange(event: React.FormEvent<HTMLTextAreaElement>) {
		if (!creature) return;
		updateCreature({
			desc: event.currentTarget.value,
		});
	}
	return (
		<div className="space-y-0.5 col-span-2">
			<Label htmlFor="desc">Description</Label>
			<Textarea
				onChange={handleChange}
				id="desc"
				name="desc"
				value={creature?.desc || ""}
			/>
		</div>
	);
}

export default DescriptionInput;
