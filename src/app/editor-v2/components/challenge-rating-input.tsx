import { ResponsiveComboBox } from "@/components/ui/combo-responsive";
import { Label } from "@/components/ui/label";
import { CHALLENGE_RATINGS } from "@/lib/constants";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import React from "react";

export default function ChallengeRatingInput() {
	const { creature } = useCreaturesStoreV2();

	const cr = CHALLENGE_RATINGS.find(
		(cr) => creature?.challenge_rating === cr.label
	) || { label: "0", value: "10", prof: 2 };

	return (
		<div className="flex gap-3 justify-between items-end">
			<div className="space-y-0.5 w-1/2">
				<Label htmlFor="challenge_rating">Challenge Rating (CR)</Label>
				<ResponsiveComboBox
					name="challenge_rating"
					options={CHALLENGE_RATINGS}
				/>
			</div>
			<p className="text-right pb-1 font-yatra">
				<span className="font-yatra text-sm">Proficiency Bonus:</span> +
				{cr.prof}
			</p>
		</div>
	);
}
