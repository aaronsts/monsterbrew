"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
	AbilityScores,
	Actions,
	BaseCreatureInfo,
	ChallengeRating,
	Conditions,
	LairActions,
	LegendaryActions,
	Movement,
	Reactions,
	SavingThrows,
	Skills,
	SpecialAbilities,
} from "../statblock-form";
import { UseFormReturn } from "react-hook-form";
import { Monster5e } from "@/types/monster5e";
import { CreatureListSelect } from "../creature-list-select";
import ImportButton from "../import-button";

interface StatblockFormProps {
	form: UseFormReturn<Monster5e>;
	onSubmit: (values: Monster5e) => void;
}

export default function StatblockForm({ form, onSubmit }: StatblockFormProps) {
	return (
		<div className="md:w-full print:hidden">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col relative gap-3 w-full"
				>
					<div className="flex flex-col pb-3 gap-2 sm:flex-row sticky z-30 top-16 bg-white justify-between">
						<h2>Create Creature</h2>
						<Button type="submit" variant="primary">
							Save
						</Button>
					</div>
					<BaseCreatureInfo form={form} />
					<Movement form={form} />
					<AbilityScores form={form} />
					<div className="grid grid-cols-2 gap-3 ">
						<FormField
							control={form.control}
							name="senses"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senses</FormLabel>
									<FormControl>
										<Input
											placeholder="ex. blindsight 60 ft., darkvision 120 ft."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="languages"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Languages</FormLabel>
									<FormControl>
										<Input placeholder="ex. Draconic, Common" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<ChallengeRating form={form} />
					</div>
					<div className="space-y-3">
						<Conditions form={form} />
						<Skills />
						<SavingThrows />
					</div>
					<div className="space-y-3">
						<SpecialAbilities form={form} />
						<Actions form={form} />
						<Reactions form={form} />
						<LegendaryActions form={form} />
						<LairActions form={form} />
					</div>
					<Button variant="primary" type="submit">
						Create Creature
					</Button>
				</form>
			</Form>
		</div>
	);
}
