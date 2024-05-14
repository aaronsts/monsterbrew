"use client";
import { useState } from "react";
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
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
} from "../statblock-form";
import { CHALLENGE_RATINGS, initialFormValues } from "@/lib/constants";
import { useCreaturesStore } from "@/store/zustand";
import { CreatureListSelect } from "../creature-list-select";
import { ISavingThrow, ISkill } from "@/types";
import { calculateHitPoints } from "@/lib/calculations";
import { editCreature } from "@/lib/editCreature";

export default function StatblockForm() {
	const { creature, setCreature } = useCreaturesStore();
	const [savingThrows, setSavingThrows] = useState<ISavingThrow[]>([]);
	const [skillList, setSkillList] = useState<ISkill[]>([]);
	const [damageList, setDamageList] = useState<string[]>([]);
	const [conditionList, setConditionList] = useState<string[]>([]);

	const form = useForm<z.infer<typeof monsterStatblockSchema>>({
		mode: "onChange",
		resolver: zodResolver(monsterStatblockSchema),
		defaultValues: initialFormValues,
	});

	function loadCreatureValues() {
		const data = editCreature(form, creature);
		if (!data) return;
		// Saving Throws
		setSavingThrows(data?.saveThrows);
		// Skill Saves
		setSkillList(data.skillSaves);
		// Conditions
		setConditionList(data.conditionImmunities);
		// Damage conditions
		setDamageList(data.dmgList);
	}

	function onSubmit(values: z.infer<typeof monsterStatblockSchema>) {
		if (!values) return;
		const proficiencyBonus = CHALLENGE_RATINGS.find(
			(cr) => cr.value === values.challenge_rating
		);
		if (!proficiencyBonus) return;
		values.challenge_rating = proficiencyBonus.label;
		// calculate median hitpoints
		values.hit_points = calculateHitPoints(
			values.hit_dice,
			values.hit_modifier
		);

		// Add numeric modifier to saving throws
		savingThrows.forEach((t) => {
			switch (t.value) {
				case "str":
					values.strength_save =
						proficiencyBonus.prof + Math.floor(values.strength / 2) - 5;
					break;
				case "dex":
					values.dexterity_save =
						proficiencyBonus.prof + Math.floor(values.dexterity / 2) - 5;
					break;
				case "con":
					values.constitution_save =
						proficiencyBonus.prof + Math.floor(values.constitution / 2) - 5;
					break;
				case "wis":
					values.wisdom_save =
						proficiencyBonus.prof + Math.floor(values.wisdom / 2) - 5;
					break;
				case "int":
					values.intelligence_save =
						proficiencyBonus.prof + Math.floor(values.intelligence / 2) - 5;
					break;
				case "cha":
					values.charisma_save =
						proficiencyBonus.prof + Math.floor(values.charisma / 2) - 5;
					break;
				default:
					break;
			}
		});

		// Remove unused movements from object
		Object.entries(values.speed).forEach((mov) => {
			// If movement is 0 or hover is false
			if (mov[1] === "" || !mov[1]) {
				delete values.speed[mov[0] as keyof typeof values.speed];
			}
		});

		// Add numeric modifier to skill saves
		skillList.forEach((s) => {
			const modifier = values[
				s.stat as keyof z.infer<typeof monsterStatblockSchema>
			] as number;

			values.skills[s.name] = s.expert
				? Math.floor(modifier / 2) - 5 + proficiencyBonus.prof * 2
				: Math.floor(modifier / 2) - 5 + proficiencyBonus.prof;
		});

		const passivePerception = values.skills.hasOwnProperty("perception")
			? 10 + values.skills.perception
			: 10 + Math.floor(values.wisdom / 2) - 5;

		values.senses = values.senses + ` passive Perception ${passivePerception}`;

		localStorage.setItem("monsterbrew-creature", JSON.stringify(values));
		setCreature(values);

		toast.message("Event has been created.", {
			description: `${values.name} | ${values.armor_class}`,
			duration: 60000,
		});
	}
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
							<Button onClick={loadCreatureValues}>tets</Button>
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
						<Conditions
							conditionList={conditionList}
							setConditionList={setConditionList}
							damageList={damageList}
							setDamageList={setDamageList}
							form={form}
						/>
						<Skills skillList={skillList} setSkillList={setSkillList} />
						<SavingThrows
							statList={savingThrows}
							setStatList={setSavingThrows}
						/>
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
