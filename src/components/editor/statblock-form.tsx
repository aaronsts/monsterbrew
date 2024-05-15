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
import { CreatureListSelect } from "../creature-list-select";
import { useCreatureForm } from "@/hooks/use-creature-form";

export default function StatblockForm() {
	const { form, loadCreatureValues, onSubmit } = useCreatureForm();

	return (
		<div className="md:w-full">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col relative gap-3 w-full"
				>
					<div className="bg-white z-20 sticky space-y-3 pb-1 top-16 ">
						<div className="flex gap-3  items-center">
							<CreatureListSelect />
							<Button
								type="button"
								variant="secondary"
								className="bg-tower-500 text-white border-tower-700 hover:bg-tower-700"
								onClick={loadCreatureValues}
							>
								Edit
							</Button>
						</div>
						<div className="flex gap-3 items-center justify-between">
							<h2>Create Creature</h2>
							<Button variant="primary" type="submit">
								Create Creature
							</Button>
						</div>
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
