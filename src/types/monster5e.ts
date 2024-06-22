import { monsterStatblockSchema } from "@/lib/schemas";
import * as z from "zod";

export type Monster5e = z.output<typeof monsterStatblockSchema>;

export type Movement = {
	walk: number | null;
	swim: number | null;
	burrow: number | null;
	climb: number | null;
	fly: number | null;
};

export type Senses = {
	blindsight?: number;
	darkvision?: number;
	tremorsense?: number;
	truesight?: number;
	passivePerception?: number;
};

export type SavingThrow = string;

export type Skill = {
	name: string;
	stat: string;
	expert?: boolean;
};

export type Action = {
	name: string;
	desc: string;
	damage_dice?: string;
	attack_bonus?: number;
};

export interface Creature5e {
	// basic info
	slug?: string;
	name: string;
	desc: string;
	type: string;
	subtype?: string;
	size: string;
	alignment: string;
	armor_class: number;
	armor_desc?: string;
	hit_points: number;
	customHp: boolean;
	hit_dice: string;
	hit_modifier: number;
	speed: Movement;
	challenge_rating: string;
	perception: string | null;
	skills: Record<string, number>;
	senses: string;
	languages: string;
	// immunities
	damage_vulnerabilities: string;
	damage_resistances: string;
	damage_immunities: string;
	condition_immunities: string;
	// actions
	special_abilities: Action[] | null;
	actions: Action[] | null;
	reactions: Action[] | null;
	bonus_actions: Action[] | null;
	legendary_desc: string;
	legendary_actions: Action[] | null;
	lair_desc: string;
	lair_actions: Action[] | null;
	regional_desc: string;
	regional_actions: Action[] | null;
	mythic_desc: string;
	mythic_actions: Action[] | null;
	spell_list: string[];
	// stats
	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;
	// savingthrows
	strength_save: number | null;
	dexterity_save: number | null;
	constitution_save: number | null;
	intelligence_save: number | null;
	wisdom_save: number | null;
	charisma_save: number | null;
	environments: string[];
	// metadata
	page_no?: number;
	img_main: string | null;
	document__slug: string;
	document__title: string;
	document__license_url: string;
	document__url: string;
}

export type MonsterTetraCube = {
	name: string;
	size: string;
	type: string;
	tag: string;
	alignment: string;
	hitDice: number;
	armorName: string;
	shieldBonus: number;
	natArmorBonus: number;
	otherArmorDesc: string;
	speed: number;
	burrowSpeed: number;
	climbSpeed: number;
	flySpeed: number;
	hover: boolean;
	swimSpeed: number;
	customHP: boolean;
	customSpeed: boolean;
	hpText: string;
	speedDesc: string;
	strPoints: number;
	dexPoints: number;
	conPoints: number;
	intPoints: number;
	wisPoints: number;
	chaPoints: number;
	blindsight: number | string;
	blind: boolean;
	darkvision: number | string;
	tremorsense: number | string;
	truesight: number | string;
	telepathy: number | string;
	cr: string;
	customCr: string;
	customProf: number;
	isLegendary: boolean;
	legendariesDescription: string;
	isLair: boolean;
	lairDescription: string;
	lairDescriptionEnd: string;
	isMythic: boolean;
	mythicDescription: string;
	isRegional: boolean;
	regionalDescription: string;
	regionalDescriptionEnd: string;
	properties: [];
	abilities: { name: string; desc: string }[];
	actions: { name: string; desc: string }[];
	bonusActions: { name: string; desc: string }[];
	reactions: { name: string; desc: string }[];
	legendaries: { name: string; desc: string }[];
	mythics: { name: string; desc: string }[];
	lairs: { name: string; desc: string }[];
	regionals: { name: string; desc: string }[];
	sthrows: { name: string; order: string }[];
	skills: { name: string; stat: string; note?: string }[];
	damagetypes: { name: string; stat: string; type: string }[];
	specialdamage: [];
	conditions: [];
	languages: { name: string; speaks: boolean }[];
	understandsBut: string;
	shortName: string;
	pluralName: string;
	doubleColumns: boolean;
	separationPoint: number;
	damage: [];
};

export const tetraCubeKeys = [
	"name",
	"size",
	"type",
	"tag",
	"alignment",
	"hitDice",
	"armorName",
	"shieldBonus",
	"natArmorBonus",
	"otherArmorDesc",
	"speed",
	"burrowSpeed",
	"climbSpeed",
	"flySpeed",
	"hover",
	"swimSpeed",
	"customHP",
	"customSpeed",
	"hpText",
	"speedDesc",
	"strPoints",
	"dexPoints",
	"conPoints",
	"intPoints",
	"wisPoints",
	"chaPoints",
	"blindsight",
	"blind",
	"darkvision",
	"tremorsense",
	"truesight",
	"telepathy",
	"cr",
	"customCr",
	"customProf",
	"isLegendary",
	"legendariesDescription",
	"isLair",
	"lairDescription",
	"lairDescriptionEnd",
	"isMythic",
	"mythicDescription",
	"isRegional",
	"regionalDescription",
	"regionalDescriptionEnd",
	"properties",
	"abilities",
	"actions",
	"bonusActions",
	"reactions",
	"legendaries",
	"mythics",
	"lairs",
	"regionals",
	"sthrows",
	"skills",
	"damagetypes",
	"specialdamage",
	"conditions",
	"languages",
	"understandsBut",
	"shortName",
	"pluralName",
	"doubleColumns",
	"separationPoint",
	"damage",
];

export type MonsterImprovedInitiative = {
	Id: string;
	Name: string;
	Path: string;
	Link: string;
	SearchHint: string;
	FilterDimensions: {
		Level: string;
		Source: string;
		Type: string;
	};
	LastUpdateMs: number;
	Version: string;
	Source: string;
	Type: string;
	HP: {
		Value: number;
		Notes: string;
	};
	AC: {
		Value: number;
		Notes: string;
	};
	InitiativeModifier: number;
	InitiativeAdvantage: boolean;
	Speed: string[];
	Abilities: {
		Str: number;
		Dex: number;
		Con: number;
		Int: number;
		Wis: number;
		Cha: number;
	};
	DamageVulnerabilities: string[];
	DamageResistances: string[];
	DamageImmunities: string[];
	ConditionImmunities: string[];
	Saves: {
		Name: string;
		Modifier: number;
	}[];
	Skills: {
		Name: string;
		Modifier: number;
	}[];
	Senses: string[];
	Languages: string[];
	Challenge: string;
	Traits: {
		Name: string;
		Content: string;
	}[];
	Actions: {
		Name: string;
		Content: string;
	}[];
	BonusActions: any[];
	Reactions: any[];
	LegendaryActions: {
		Name: string;
		Content: string;
	}[];
	MythicActions: any[];
	Description: string;
	Player: string;
	ImageURL: string;
};
