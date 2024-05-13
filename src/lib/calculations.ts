import { ISavingThrow, ISkill } from "@/types";
import { ALL_SKILLS, CHALLENGE_RATINGS, STAT_NAMES } from "./constants";
import { Monster5e } from "@/types/monster5e";

export function calculateSavingThrows(creature: Monster5e) {
	const newSavingThrows: ISavingThrow[] = [];
	STAT_NAMES.forEach((stat) => {
		const savingThrowStat = stat.name.toLowerCase() + "_save";
		if (creature[savingThrowStat as keyof typeof creature] === null) return;
		newSavingThrows.push(stat);
	});
	return newSavingThrows;
}

export function calculateSkillSaves(
	creature: Monster5e,
	proficiencyBonus: (typeof CHALLENGE_RATINGS)[0]
) {
	const newSKillList: ISkill[] = [];
	Object.entries(creature.skills).forEach((skill) => {
		const creatureSkills = ALL_SKILLS.find((skl) => skl.name === skill[0]);
		if (!creatureSkills) return;
		const skillModifier =
			Math.floor(
				parseInt(
					creature[creatureSkills?.stat as keyof typeof creature] as string
				) / 2
			) -
			5 +
			proficiencyBonus.prof;
		newSKillList.push({
			...creatureSkills,
			expert: skill[1] > skillModifier,
		});
	});

	return newSKillList;
}

export function calculateHitPoints(hit_dice: string, hit_modifier?: string) {
	// hit_dice: 12d8
	const dice = hit_dice.split("d");
	const modifier = hit_modifier ? parseInt(hit_modifier) : 0;
	const hp =
		parseInt(dice[0]) + Math.floor(parseInt(dice[0]) * parseInt(dice[1]));
	const medianHp = Math.floor(hp / 2 + modifier);
	return medianHp;
}
