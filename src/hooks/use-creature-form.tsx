import {
	calculateHitPoints,
	calculateSavingThrows,
	calculateSkillSaves,
} from "@/lib/calculations";
import { CHALLENGE_RATINGS, initialFormValues } from "@/lib/constants";
import { monsterStatblockSchema } from "@/lib/schemas";
import { toggleMd } from "@/lib/markdownConverter";
import { capitalize } from "@/lib/utils";
import { useCreatureFormStore } from "@/store/creatureForm";
import { useCreaturesStore } from "@/store/zustand";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export function useCreatureForm() {
	const { creature, setCreature } = useCreaturesStore();
	const {
		savingThrows,
		setSavingThrows,
		skillList,
		setSkillList,
		setConditionList,
		setDamageList,
	} = useCreatureFormStore();
	const form = useForm<z.infer<typeof monsterStatblockSchema>>({
		mode: "onChange",
		resolver: zodResolver(monsterStatblockSchema),
		defaultValues: initialFormValues,
	});

	function loadCreatureValues() {
		const proficiencyBonus = CHALLENGE_RATINGS.find(
			(cr) => cr.label === creature.challenge_rating
		);
		if (!proficiencyBonus) {
			toast.error("No Proficiency Bonus Found");
			return;
		}

		const specialAbilities = toggleMd(creature.special_abilities);

		const actions = creature.actions!.map((action) => {
			const name = action.name.replace(/\*/g, "");
			return {
				name: name,
				desc: action.desc,
				damage_dice: action.damage_dice,
				attack_bonus: action.attack_bonus,
			};
		});

		form.reset({
			...initialFormValues,
			name: creature.name,
			type: capitalize(creature.type),
			size: capitalize(creature.size),
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
			languages: creature.languages!.length > 0 ? creature.languages : "--",
			challenge_rating: proficiencyBonus.value,
			special_abilities: specialAbilities,
			actions: actions,
			reactions: creature.reactions,
			legendary_desc: creature.legendary_desc || "",
			legendary_actions: creature.legendary_actions || [],
			lair_desc: creature.lair_desc || "",
			lair_actions: creature.lair_actions || [],
			regional_desc: creature.regional_desc || "",
			regional_actions: creature.regional_actions || [],
			mythic_desc: creature.regional_desc || "",
			mythic_actions: creature.regional_actions || [],
			environments: creature.environments,
			img_main: creature.img_main,
			page_no: creature.page_no,
			spell_list: creature.spell_list,
			document__license_url: creature.document__license_url,
			document__slug: creature.document__slug,
			document__title: creature.document__title,
			document__url: creature.document__url,
		});

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
		if (values.languages!.length === 0) {
			values.languages = "--";
		}
		console.log(values.special_abilities);
		values.special_abilities = values.special_abilities
			? values.special_abilities.map((ability) => ({
					name: `***${ability.name}***`,
					desc: ability.desc,
			  }))
			: null;

		values.actions = values.actions!.map((action) => ({
			name: `***${action.name}***`,
			desc: action.desc,
		}));

		setCreature(values);

		toast.message("Creature has been created.", {
			description: `${values.name} | AC: ${values.armor_class}`,
			duration: 5000,
		});
	}

	return { form, loadCreatureValues, onSubmit };
}
