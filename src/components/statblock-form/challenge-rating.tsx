import React, { useEffect, useState } from "react";
import { IChildForm } from "./ability-scores";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";

import { CHALLENGE_RATINGS } from "@/lib/constants";
import { useWatch } from "react-hook-form";
import { ComboBoxResponsive } from "../combo-box";

export default function ChallengeRating({ form }: IChildForm) {
	const [profBonus, setProfBonus] = useState<number>(0);
	const cr = useWatch({ control: form.control, name: "challenge_rating" });

	useEffect(() => {
		const rating = CHALLENGE_RATINGS.find((r) => r.value === cr);
		if (!rating) return;
		setProfBonus(rating.prof);
	}, [cr]);

	return (
		<div className="flex col-span-2 justify-between gap-3 items-end">
			<FormField
				control={form.control}
				name="challenge_rating"
				render={({ field }) => (
					<FormItem className="w-1/2">
						<FormLabel>Challenge Rating (CR)</FormLabel>
						<FormControl>
							<ComboBoxResponsive options={CHALLENGE_RATINGS} {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<p className=" text-right pb-1 font-yatra">
				<span className="font-yatra text-sm">Proficiency Bonus:</span> +
				{profBonus}
			</p>
		</div>
	);
}
