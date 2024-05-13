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
import { ALL_SKILLS, CHALLENGE_RATINGS, STAT_NAMES } from "@/lib/constants";
import { Monster5e } from "@/types/monster5e";
import { useCreaturesStore } from "@/store/zustand";
import { CreatureListSelect } from "../creature-list-select";
import { ISavingThrow, ISkill } from "@/types";
import {
	calculateHitPoints,
	calculateSavingThrows,
	calculateSkillSaves,
} from "@/lib/calculations";

function getProficiencyBonus(challenge_rating: string) {
	return CHALLENGE_RATINGS.find((cr) => cr.label === challenge_rating);
}

export default function StatblockForm() {
	const { creature, setCreature } = useCreaturesStore();
	const [savingThrows, setSavingThrows] = useState<ISavingThrow[]>([]);
	const [skillList, setSkillList] = useState<ISkill[]>([]);
	const [damageList, setDamageList] = useState<string[]>([]);
	const [conditionList, setConditionList] = useState<string[]>([]);

	const [initialFormValues, setInitialFormValues] = useState<Monster5e>({
		name: "",
		type: "",
		size: "",
		alignment: "",
		armor_class: 0,
		armor_desc: "",
		hit_dice: "",
		hit_modifier: "",
		speed: {
			walk: "30",
			burrow: "",
			climb: "",
			fly: "",
			swim: "",
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
		strength_save: null,
		dexterity_save: null,
		constitution_save: null,
		intelligence_save: null,
		wisdom_save: null,
		charisma_save: null,
		senses: "",
		skills: {},
	});

	const form = useForm<z.infer<typeof monsterStatblockSchema>>({
		mode: "onChange",
		resolver: zodResolver(monsterStatblockSchema),
		defaultValues: initialFormValues,
	});

	function loadCreatureValues() {
		if (!creature) return;
		setInitialFormValues(creature);
		form.reset({
			...initialFormValues,
			name: creature.name,
			type: creature.type,
			size: creature.size,
			alignment: creature.alignment,
			armor_class: creature.armor_class,
			armor_desc: creature.armor_desc || "",
			hit_dice: creature.hit_dice.split("+")[0],
			hit_modifier: creature.hit_modifier || creature.hit_dice.split("+")[1],
			speed: {
				...creature.speed,
			},
			strength: creature.strength,
			dexterity: creature.dexterity,
			constitution: creature.constitution,
			intelligence: creature.intelligence,
			wisdom: creature.wisdom,
			charisma: creature.charisma,
			senses: creature.senses?.split("passive Perception")[0],
			languages: creature.languages,
			challenge_rating: creature.challenge_rating,
			special_abilities: creature.special_abilities,
			actions: creature.actions,
			reactions: creature.reactions,
			legendary_desc: creature.legendary_desc,
			legendary_actions: creature.legendary_actions,
			lair_desc: creature.lair_desc,
			lair_actions: creature.lair_actions,
		});

		const proficiencyBonus = getProficiencyBonus(creature.challenge_rating);
		if (!proficiencyBonus) return;

		// Saving Throws
		const savingThrows = calculateSavingThrows(creature);
		setSavingThrows(savingThrows);

		// Skill Saves
		const skillSaves = calculateSkillSaves(creature, proficiencyBonus);
		setSkillList(skillSaves);

		// Conditions
		const conditionImmunities =
			creature.condition_immunities?.split(", ").filter((con) => con !== "") ||
			[];
		setConditionList(conditionImmunities);

		// Damage conditions
		const dmgImm =
			creature.damage_immunities!.length > 0
				? creature
						.damage_immunities!?.split(", ")
						.map((dmg) => "immune to " + dmg)
				: [];
		const dmgVul =
			creature.damage_vulnerabilities!.length > 0
				? creature
						.damage_vulnerabilities!?.split(", ")
						.map((dmg) => "vulnerable to " + dmg)
				: [];
		const dmgRes =
			creature.damage_resistances!.length > 0
				? creature
						.damage_resistances!?.split(", ")
						.map((dmg) => "resistant to " + dmg)
				: [];

		setDamageList([...dmgImm, ...dmgVul, ...dmgRes]);
	}

	function onSubmit(values: z.infer<typeof monsterStatblockSchema>) {
		if (!values) return;
		const proficiencyBonus = getProficiencyBonus(values.challenge_rating);
		if (!proficiencyBonus) return;

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
							<Button
								variant="secondary"
								className="bg-tower-500 text-white border-tower-700 hover:bg-tower-700"
								onClick={loadCreatureValues}
							>
								Use Preset
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
