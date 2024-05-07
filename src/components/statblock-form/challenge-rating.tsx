import React, { useEffect, useState } from "react";
import { IChildForm } from "./ability-scores";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { CHALLENGE_RATINGS } from "@/lib/constants";
import { useWatch } from "react-hook-form";
import { ComboBoxResponsive } from "../combo-box";

export default function ChallengeRating({ form }: IChildForm) {
	const [profBonus, setProfBonus] = useState<number>(0);
	const cr = useWatch({ control: form.control, name: "challenge_rating" });

	useEffect(() => {
		const rating = CHALLENGE_RATINGS.find((r) => r.label === cr);
		if (!rating) return;
		setProfBonus(rating.prof);
	}, [cr]);

	return (
		<div className="flex gap-2 items-end">
			<FormField
				control={form.control}
				name="challenge_rating"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Challenge Rating (CR)</FormLabel>
						<FormControl>
							<ComboBoxResponsive options={CHALLENGE_RATINGS} {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<p className="w-1/2 text-right">
				<span className="font-bold">Proficiency Bonus:</span> + {profBonus}
			</p>
		</div>
	);
}
