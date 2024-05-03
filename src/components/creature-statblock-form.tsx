"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { monsterStatblockSchema } from "@/lib/formSchemas";

import { toast } from "sonner";
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
} from "./statblock-form";

export default function CreatureStatblockForm() {
	const [skillList, setSkillList] = useState<
		{ name: string; stat: string; expert?: boolean }[]
	>([]);

	const form = useForm<z.infer<typeof monsterStatblockSchema>>({
		resolver: zodResolver(monsterStatblockSchema),
		defaultValues: {
			name: "",
			type: "",
			alignment: "",
			armor_class: 0,
			armor_desc: "",
			hit_dice: "",
			hit_modifier: "",
			speed: {
				walk: 0,
				burrow: 0,
				climb: 0,
				fly: 0,
				swim: 0,
				hover: false,
			},
			challenge_rating: "",
			strength: 10,
			dexterity: 10,
			constitution: 10,
			intelligence: 10,
			wisdom: 10,
			charisma: 10,
			languages: "",
			special_abilities: [],
			actions: [],
			reactions: [],
			legendary_desc: "",
			legendary_actions: [],
			lair_desc: "",
			lair_actions: [],
			damage_vulnerabilities: "",
			damage_resistances: "",
			damage_immunities: "",
			condition_immunities: "",
			spell_list: [],
			strength_save: 0,
			dexterity_save: 0,
			constitution_save: 0,
			intelligence_save: 0,
			wisdom_save: 0,
			charisma_save: 0,
			senses: "",
			skills: {},
		},
	});

	function onSubmit(values: z.infer<typeof monsterStatblockSchema>) {
		toast.message("Event has been created.", {
			description: `${values.name} | ${values.armor_class}`,
			duration: 60000,
		});
	}
	return (
		<div className="w-full">
			<h1>Create Creature</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6 w-full"
				>
					<BaseCreatureInfo form={form} />
					<Movement form={form} />
					<AbilityScores form={form} />
					<div className="grid grid-cols-3 gap-3 pb-6 border-b border-zinc-700">
						<FormField
							control={form.control}
							name="senses"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senses</FormLabel>
									<FormControl>
										<Input
											placeholder="ex. blindsight 60 ft., darkvision 120 ft., passive Perception 26"
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
					<div className="grid grid-cols-2 gap-3 border-b border-zinc-700 pb-6">
						<Conditions form={form} />
						<Skills skillList={skillList} setSkillList={setSkillList} />
						<SavingThrows form={form} />
					</div>
					<div className="grid grid-cols-3 gap-6">
						<SpecialAbilities form={form} />
						<Actions form={form} />
						<Reactions form={form} />
					</div>
					<div className="flex gap-6 w-full">
						<LegendaryActions form={form} />
						<LairActions form={form} />
					</div>
					<Button type="submit">Create Monster</Button>
				</form>
			</Form>
		</div>
	);
}
