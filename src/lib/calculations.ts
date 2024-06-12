import { ISavingThrow, ISkill } from "@/types";
import {
	ALL_SKILLS,
	CHALLENGE_RATINGS,
	STAT_NAMES,
	STAT_NAMES_V2,
	monster_sizes,
} from "./constants";
import { Monster5e, SavingThrow } from "@/types/monster5e";

export function calculateSavingThrows(creature: Monster5e) {
	const newSavingThrows: ISavingThrow[] = [];
	STAT_NAMES.forEach((stat) => {
		const savingThrowStat = stat.name.toLowerCase() + "_save";
		if (creature[savingThrowStat as keyof typeof creature] === null) return;
		newSavingThrows.push(stat);
	});
	return newSavingThrows;
}

export function calculateSavingThrowsv2(creature: Monster5e) {
	const newSavingThrows: SavingThrow[] = [];
	STAT_NAMES_V2.forEach((stat) => {
		const savingThrowStat = stat + "_save";
		if (creature[savingThrowStat as keyof Monster5e] === null) return;
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

export function calculateHitPoints(hit_dice: string, hit_modifier?: number) {
	// hit_dice: 12d8
	const dice = hit_dice.split("d");
	const modifier = hit_modifier ? hit_modifier : 0;
	const hp =
		parseInt(dice[0]) + Math.floor(parseInt(dice[0]) * parseInt(dice[1]));
	const medianHp = Math.floor(hp / 2 + modifier);
	return medianHp;
}

export function calculateStatBonus(value: number) {
	return Math.floor(value / 2) - 5 >= 0
		? `(+${Math.floor(value / 2) - 5})`
		: `(${Math.floor(value / 2) - 5})`;
}

export function calculateHP(amount: number, con: number, creatureSize: string) {
	const conBonus = Math.floor(con / 2) - 5;
	const hitDice =
		monster_sizes.find((size) => size.label === creatureSize)?.hit_die || 8;
	// '12d20 + 123' or ''
	return amount ? `${amount}d${hitDice} + ${conBonus * amount}` : "";
}

export function calculateMedianHP(hitpoints: string) {
	// 12d20 + 147
	const dice = hitpoints.split("+").map((d) => d.trim());
	// 12d20
	const amount = dice[0]
		.toLowerCase()
		.split("d")
		.map((a) => parseInt(a));
	// 12 + 12*20
	const hp = amount[0] + Math.floor(amount[0] * amount[1]);
	const modifier = parseInt(dice[1]) || 0;
	// 252 / 2 + 147
	const medianHP = Math.floor(hp / 2 + modifier) || 0;
	return medianHP;
}
