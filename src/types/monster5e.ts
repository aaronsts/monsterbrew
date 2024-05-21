import { monsterStatblockSchema } from "@/lib/formSchemas";
import * as z from "zod";

export type Monster5e = z.output<typeof monsterStatblockSchema>;

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
