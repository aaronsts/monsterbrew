import { calculateSavingThrows, calculateSkillSaves } from "@/lib/calculations";
import { CHALLENGE_RATINGS } from "@/lib/constants";
import { Monster5e } from "@/types/monster5e";
import { UseFormReturn } from "react-hook-form";

export function editCreature(
	form: UseFormReturn<Monster5e>,
	creature: Monster5e
) {
	if (!creature) return;
	const proficiencyBonus = CHALLENGE_RATINGS.find(
		(cr) => cr.label === creature.challenge_rating
	);
	if (!proficiencyBonus) return;

	form.reset({
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
		challenge_rating: proficiencyBonus.value,
		special_abilities: creature.special_abilities,
		actions: creature.actions,
		reactions: creature.reactions,
		legendary_desc: creature.legendary_desc,
		legendary_actions: creature.legendary_actions,
		lair_desc: creature.lair_desc,
		lair_actions: creature.lair_actions,
	});

	// Saving Throws
	const saveThrows = calculateSavingThrows(creature);
	// setSavingThrows(savingThrows);

	// Skill Saves
	const skillSaves = calculateSkillSaves(creature, proficiencyBonus);
	// setSkillList(skillSaves);

	// Conditions
	const conditionImmunities =
		creature.condition_immunities?.split(", ").filter((con) => con !== "") ||
		[];
	// setConditionList(conditionImmunities);

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

	const dmgList = [...dmgImm, ...dmgVul, ...dmgRes];

	return {
		dmgList,
		saveThrows,
		skillSaves,
		conditionImmunities,
	};
}
