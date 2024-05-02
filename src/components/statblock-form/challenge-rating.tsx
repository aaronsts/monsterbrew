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

export default function ChallengeRating({ form }: IChildForm) {
	const [profBonus, setProfBonus] = useState<number>(0);
	const cr = useWatch({ control: form.control, name: "challenge_rating" });

	useEffect(() => {
		const rating = CHALLENGE_RATINGS.find((r) => r.rating === cr);
		if (!rating) return;
		setProfBonus(rating.prof);
	}, [cr]);

	return (
		<FormField
			control={form.control}
			name="challenge_rating"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Challenge Rating (CR)</FormLabel>
					<div className="flex gap-2 items-center">
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger className="w-1/2">
									<SelectValue
										className="placeholder:text-zinc-400"
										placeholder="Select a challenge rating"
									/>
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{CHALLENGE_RATINGS.map((rating) => (
									<SelectItem key={rating.xp} value={rating.rating}>
										{rating.rating} ({rating.xp} XP)
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<p className="w-1/2 text-right">
							<span className="font-bold">Proficiency Bonus:</span> +{" "}
							{profBonus}
						</p>
					</div>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
