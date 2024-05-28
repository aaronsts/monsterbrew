import {
	Monster5e,
	MonsterImprovedInitiative,
	MonsterTetraCube,
	tetraCubeKeys,
} from "@/types/monster5e";
import { monster_sizes } from "./constants";
import { capitalize } from "./utils";
import { calculateHitPoints } from "./calculations";
import { addMarkdown } from "./markdownConverter";
import { toast } from "sonner";

export function convertToOpen5e(statblock: any) {
	const objKeys = Object.keys(statblock).sort();
	const open5eKeys = [
		"document__slug",
		"document__title",
		"document__url",
		"document__license_url",
	];

	const isOpen5e = objKeys.some((key) => open5eKeys.includes(key));

	console.log(objKeys);
	const isTetraCube =
		JSON.stringify(objKeys) === JSON.stringify(tetraCubeKeys.sort());

	// Tetra Cube
	if (isTetraCube) {
		return tetraToOpen5e(statblock);
	}
	// Improved Initiative
	else if (objKeys.includes("Creatures")) {
		const slug = statblock.Creatures;
		const creature = statblock[`Creatures.${slug[0]}`];
		return improvedInitiativeToOpen5e(creature);
	}
	// Open5e
	else if (isOpen5e) {
		return statblock as Monster5e;
	}
	// Error
	else {
		toast.error("Format not supported");
		throw Error("Format not supported");
	}
}

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
		blindSight: (statblock.blindsight as number) * 1,
		// blind: statblock.blind,
		darkVision: (statblock.darkvision as number) * 1,
		tremorSense: (statblock.tremorsense as number) * 1,
		trueSight: (statblock.truesight as number) * 1,
		telepathy: (statblock.telepathy as number) * 1,
	};

	const senses = Object.entries(sensesObj)
		.filter((sense) => sense[1] !== 0)
		.map((sense) => `${sense[0].toLowerCase()} ${sense[1]} ft.`)
		.join(", ");

	const passivePerception = skills.hasOwnProperty("perception")
		? 10 + skills.perception
		: 10 + Math.floor(statblock.wisPoints / 2) - 5;

	const languages = statblock.languages.map((lang) => lang.name).join(", ");

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
		hit_points: calculateHitPoints(hitDice, hitModifier),
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
		strength_save: null,
		dexterity_save: null,
		constitution_save: null,
		intelligence_save: null,
		wisdom_save: null,
		charisma_save: null,
		challenge_rating: statblock.cr,
		languages: languages || "--",
		senses: [senses, `passive Perception ${passivePerception}`].join(", "),
		skills: skills,
		condition_immunities: conditions,
		damage_resistances: resistances,
		damage_immunities: immunities,
		damage_vulnerabilities: vulnerabilities,
		special_abilities: addMarkdown(statblock.abilities),
		actions: addMarkdown(statblock.actions),
		reactions: addMarkdown(statblock.reactions),
		legendary_desc: statblock.legendariesDescription,
		legendary_actions: addMarkdown(statblock.legendaries),
		lair_desc: statblock.lairDescription,
		lair_actions: addMarkdown(statblock.lairs),
		regional_desc: statblock.regionalDescription,
		regional_actions: addMarkdown(statblock.regionals),
		mythic_desc: statblock.mythicDescription,
		mythic_actions: addMarkdown(statblock.mythics),
		img_main: "",
		environments: [],
		spell_list: [],
		...savingThrows,
	};

	return monster5eFormat;
}

export function improvedInitiativeToOpen5e(
	statblock: MonsterImprovedInitiative
) {
	const mapActions = (actions: { Name: string; Content: string }[]) => {
		return actions.map((action) => ({
			name: action.Name,
			desc: action.Content,
		}));
	};

	const hitDice = statblock.HP.Notes.replace(/\(|\)/gm, "").split("+"); // "Notes": "(18d10+36)"

	const movement = statblock.Speed.reduce((prev, val) => {
		const mov = val.split(" ");
		return {
			...prev,
			[mov[0]]: mov[1],
		};
	}, {});

	const perceptionSense = statblock.Senses.find((sense) =>
		sense.includes("passive Perception")
	)!.match(/\d+/);

	const passivePerception = perceptionSense ? parseInt(perceptionSense[0]) : 0;

	const skills: Record<string, number> = {};
	statblock.Skills.forEach(
		(skl) => (skills[skl.Name.toLowerCase()] = skl.Modifier)
	);

	const savingThrows: any = {};
	statblock.Saves.forEach((save) => {
		switch (save.Name.toLowerCase()) {
			case "str":
				savingThrows.strength_save = save.Modifier;
				break;
			case "dex":
				savingThrows.dexterity_save = save.Modifier;
				break;
			case "con":
				savingThrows.constitution_save = save.Modifier;
				break;
			case "wis":
				savingThrows.wisdom_save = save.Modifier;
				break;
			case "int":
				savingThrows.intelligence_save = save.Modifier;
				break;
			case "cha":
				savingThrows.charisma_save = save.Modifier;
				break;
			default:
				break;
		}
	});

	const open5eFormat: Monster5e = {
		slug: "",
		name: statblock.Name,
		desc: statblock.Description,
		type: statblock.Type.split(" ")[1].replace(",", "").toLowerCase(),
		size: statblock.Type.split(" ")[0].toLowerCase(), // Type: 'Gargantuan Dragon, chaotic evil'
		alignment: statblock.Type.split(",")[1].trim(),
		armor_class: statblock.AC.Value,
		armor_desc: statblock.AC.Notes.replace(/\(|\)/gm, ""),
		hit_points: statblock.HP.Value,
		hit_dice: hitDice[0],
		hit_modifier: hitDice[1] ? parseInt(hitDice[1]) : 0,
		strength: statblock.Abilities.Str,
		dexterity: statblock.Abilities.Dex,
		constitution: statblock.Abilities.Con,
		intelligence: statblock.Abilities.Int,
		wisdom: statblock.Abilities.Wis,
		charisma: statblock.Abilities.Cha,
		speed: movement,
		challenge_rating: statblock.Challenge,
		perception: passivePerception,
		skills: skills,
		senses: statblock.Senses.join(", "),
		languages: statblock.Languages.join(", "),
		damage_vulnerabilities: statblock.DamageVulnerabilities.join(", "),
		damage_immunities: statblock.DamageImmunities.join(", "),
		damage_resistances: statblock.DamageResistances.join(", "),
		condition_immunities: statblock.ConditionImmunities.join(", "),
		special_abilities: addMarkdown(mapActions(statblock.Traits)),
		actions: addMarkdown(mapActions(statblock.Actions)),
		reactions: addMarkdown(mapActions(statblock.Reactions)),
		legendary_desc: "",
		legendary_actions: addMarkdown(mapActions(statblock.LegendaryActions)),
		mythic_actions: addMarkdown(mapActions(statblock.MythicActions)),
		strength_save: null,
		dexterity_save: null,
		constitution_save: null,
		intelligence_save: null,
		wisdom_save: null,
		charisma_save: null,
		img_main: "",
		environments: [],
		spell_list: [],
		...savingThrows,
	};
	return open5eFormat;
}
