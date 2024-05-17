import { Monster5e, MonsterTetraCube } from "@/types/monster5e";
import { monster_sizes } from "./constants";
import { capitalize } from "./utils";
import { calculateHitPoints } from "./calculations";

export function tetraToOpen5e(statblock: MonsterTetraCube) {
	const savingThrows: any = {};
	const monsterSize = monster_sizes.find(
		(size) => size.value.toLowerCase() === statblock.size.toLowerCase()
	);

	statblock.sthrows.forEach((t) => {
		switch (t.name) {
			case "str":
				savingThrows.strength_save =
					statblock.customProf + Math.floor(statblock.strPoints / 2) - 5;
				break;
			case "dex":
				savingThrows.dexterity_save =
					statblock.customProf + Math.floor(statblock.dexPoints / 2) - 5;
				break;
			case "con":
				savingThrows.constitution_save =
					statblock.customProf + Math.floor(statblock.conPoints / 2) - 5;
				break;
			case "wis":
				savingThrows.wisdom_save =
					statblock.customProf + Math.floor(statblock.wisPoints / 2) - 5;
				break;
			case "int":
				savingThrows.intelligence_save =
					statblock.customProf + Math.floor(statblock.intPoints / 2) - 5;
				break;
			case "cha":
				savingThrows.charisma_save =
					statblock.customProf + Math.floor(statblock.chaPoints / 2) - 5;
				break;
			default:
				break;
		}
	});

	const skills: Record<string, number> = {};
	statblock.skills.forEach((s) => {
		const modifierKey = s.stat + "Points";
		const modifier = statblock[modifierKey as keyof MonsterTetraCube] as number;
		skills[s.name] =
			s.note === " (ex)"
				? Math.floor(modifier / 2) - 5 + statblock.customProf * 2
				: Math.floor(modifier / 2) - 5 + statblock.customProf;
	});

	const hitDice = statblock.hitDice.toString() + "d" + monsterSize?.hit_die;
	const conBonus = Math.floor(statblock.conPoints / 2) - 5;
	const hitModifier = conBonus > 0 ? statblock.hitDice * conBonus : 0;

	const speed = {
		walk: statblock.speed.toString(),
		swim: statblock.swimSpeed.toString(),
		fly: statblock.flySpeed.toString(),
		burrow: statblock.burrowSpeed.toString(),
		climb: statblock.climbSpeed.toString(),
		hover: statblock.hover,
	};
	// Remove unused movements from object
	Object.entries(speed).forEach((mov) => {
		// If movement is 0 or hover is false
		if (mov[1] === "" || mov[1] === "0" || !mov[1]) {
			delete speed[mov[0] as keyof typeof speed];
		}
	});

	const sensesObj = {
		blindSight: statblock.blindsight,
		// blind: statblock.blind,
		darkVision: statblock.darkvision,
		tremorSense: statblock.tremorsense,
		trueSight: statblock.truesight,
		telepathy: statblock.telepathy,
	};

	const senses = Object.entries(sensesObj)
		.filter((sense) => sense[1] !== 0)
		.map((sense) => `${sense[0].toLowerCase()} ${sense[1]}ft.`)
		.join(", ");

	const conditions = statblock.conditions
		.map((cdn: { name: string }) => capitalize(cdn.name))
		.join(", ");

	const resistances = statblock.damagetypes
		.filter((dmg) => dmg.type === "r")
		.map((dmg) => capitalize(dmg.name))
		.join(", ");

	const immunities = statblock.damagetypes
		.filter((dmg) => dmg.type === "i")
		.map((dmg) => capitalize(dmg.name))
		.join(", ");

	const vulnerabilities = statblock.damagetypes
		.filter((dmg) => dmg.type === "v")
		.map((dmg) => capitalize(dmg.name))
		.join(", ");

	const monster5eFormat: Monster5e = {
		name: statblock.name,
		type: statblock.type,
		size: statblock.size,
		alignment: statblock.alignment,
		hit_points: calculateHitPoints(hitDice, hitModifier.toString()),
		hit_dice: hitDice,
		hit_modifier: hitModifier,
		armor_class: parseInt(statblock.otherArmorDesc.split(" ")[0]),
		armor_desc: statblock.armorName,
		speed: speed,
		strength: statblock.strPoints,
		dexterity: statblock.dexPoints,
		constitution: statblock.conPoints,
		intelligence: statblock.intPoints,
		wisdom: statblock.wisPoints,
		charisma: statblock.chaPoints,
		challenge_rating: statblock.cr,
		senses: senses,
		skills: skills,
		condition_immunities: conditions,
		damage_resistances: resistances,
		damage_immunities: immunities,
		damage_vulnerabilities: vulnerabilities,
		special_abilities: [...statblock.abilities],
		actions: [...statblock.actions],
		reactions: [...statblock.reactions],
		legendary_desc: statblock.legendariesDescription,
		legendary_actions: [...statblock.legendaries],
		lair_desc: statblock.lairDescription,
		lair_actions: [...statblock.lairs],
		...savingThrows,
	};

	return monster5eFormat;
}