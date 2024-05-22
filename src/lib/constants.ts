export const initialFormValues = {
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
	special_abilities: null,
	actions: null,
	reactions: null,
	legendary_desc: "",
	legendary_actions: null,
	lair_desc: "",
	lair_actions: null,
	regional_desc: "",
	regional_actions: null,
	mythic_desc: "",
	mythic_actions: null,
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
};
export const monster_sizes = [
	{ label: "Gargantuan", value: "gargantuan", hit_die: 20 },
	{ label: "Huge", value: "huge", hit_die: 12 },
	{ label: "Large", value: "large", hit_die: 10 },
	{ label: "Medium", value: "medium", hit_die: 8 },
	{ label: "Small", value: "small", hit_die: 6 },
	{ label: "Tiny", value: "tiny", hit_die: 4 },
];

export const monster_types = [
	{ label: "Aberration", value: "aberration" },
	{ label: "Beast", value: "beast" },
	{ label: "Celestial", value: "celestial" },
	{ label: "Construct", value: "construct" },
	{ label: "Dragon", value: "dragon" },
	{ label: "Elemental", value: "elemental" },
	{ label: "Fey", value: "fey" },
	{ label: "Fiend", value: "fiend" },
	{ label: "Giant", value: "giant" },
	{ label: "Humanoid", value: "humanoid" },
	{ label: "Monstrosity", value: "monstrosity" },
	{ label: "Ooze", value: "ooze" },
	{ label: "Plant", value: "plant" },
	{ label: "Undead", value: "undead" },
	{ label: "Other", value: "other" },
];

export const STAT_NAMES = [
	{ name: "Strength", value: "str" },
	{ name: "Dexterity", value: "dex" },
	{ name: "Constitution", value: "con" },
	{ name: "Intelligence", value: "int" },
	{ name: "Wisdom", value: "wis" },
	{ name: "Charisma", value: "cha" },
];

export const CHALLENGE_RATINGS = [
	{ label: "0", value: "10", prof: 2 },
	{ label: "1/8", value: "25", prof: 2 },
	{ label: "1/4", value: "50", prof: 2 },
	{ label: "1/2", value: "100", prof: 2 },
	{ label: "1", value: "200", prof: 2 },
	{ label: "2", value: "450", prof: 2 },
	{ label: "3", value: "700", prof: 2 },
	{ label: "4", value: "1,100", prof: 2 },
	{ label: "5", value: "1,800", prof: 3 },
	{ label: "6", value: "2,300", prof: 3 },
	{ label: "7", value: "2,900", prof: 3 },
	{ label: "8", value: "3,900", prof: 3 },
	{ label: "9", value: "5,000", prof: 4 },
	{ label: "10", value: "5,900", prof: 4 },
	{ label: "11", value: "7,200", prof: 4 },
	{ label: "12", value: "8,400", prof: 4 },
	{ label: "13", value: "10,000", prof: 5 },
	{ label: "14", value: "11,500", prof: 5 },
	{ label: "15", value: "13,000", prof: 5 },
	{ label: "16", value: "15,000", prof: 5 },
	{ label: "17", value: "18,000", prof: 6 },
	{ label: "18", value: "20,000", prof: 6 },
	{ label: "19", value: "22,000", prof: 6 },
	{ label: "20", value: "25,000", prof: 6 },
	{ label: "21", value: "33,000", prof: 7 },
	{ label: "22", value: "41,000", prof: 7 },
	{ label: "23", value: "50,000", prof: 7 },
	{ label: "24", value: "62,000", prof: 7 },
	{ label: "25", value: "75,000", prof: 8 },
	{ label: "26", value: "90,000", prof: 8 },
	{ label: "27", value: "105,000", prof: 8 },
	{ label: "28", value: "120,000", prof: 8 },
	{ label: "29", value: "135,000", prof: 9 },
	{ label: "30", value: "155,000", prof: 9 },
];

export const ALL_SKILLS: { name: string; stat: string; expert?: boolean }[] = [
	{
		name: "acrobatics",
		stat: "dexterity",
	},
	{
		name: "animal handling",
		stat: "wisdom",
	},
	{
		name: "arcana",
		stat: "intelligence",
	},
	{
		name: "athletics",
		stat: "strength",
	},
	{
		name: "deception",
		stat: "charisma",
	},
	{
		name: "history",
		stat: "intelligence",
	},
	{
		name: "insight",
		stat: "wisdom",
	},
	{
		name: "intimidation",
		stat: "charisma",
	},
	{
		name: "investigation",
		stat: "intelligence",
	},
	{
		name: "medicine",
		stat: "wisdom",
	},
	{
		name: "nature",
		stat: "intelligence",
	},
	{
		name: "perception",
		stat: "wisdom",
	},
	{
		name: "performance",
		stat: "charisma",
	},
	{
		name: "persuasion",
		stat: "charisma",
	},
	{
		name: "religion",
		stat: "intelligence",
	},
	{
		name: "sleight of Hand",
		stat: "dexterity",
	},
	{
		name: "stealth",
		stat: "dexterity",
	},
	{
		name: "survival",
		stat: "wisdom",
	},
];

export const DAMAGE_TYPES = [
	"acid",
	"bludgeoning",
	"cold",
	"fire",
	"force",
	"lightning",
	"necrotic",
	"piercing",
	"poison",
	"psychic",
	"radiant",
	"slashing",
	"thunder",
];

export const CONDITION_TYPES = [
	"blinded",
	"charmed",
	"deafened",
	"exhaustion",
	"frightened",
	"grappled",
	"incapacitated",
	"invisible",
	"paralyzed",
	"petrified",
	"poisoned",
	"prone",
	"restrained",
	"stunned",
	"unconscious",
];

export const initialCreature = {
	slug: "ancient-black-dragon",
	name: "Ancient Black Dragon",
	desc: "",
	size: "Gargantuan",
	type: "Dragon",
	subtype: "",
	group: "Black Dragon",
	alignment: "chaotic evil",
	armor_class: 22,
	armor_desc: "natural armor",
	hit_points: 367,
	hit_dice: "21d20+147",
	speed: {
		walk: "40",
		swim: "40",
		fly: "80",
	},
	perception: 16,
	skills: {
		perception: 16,
		stealth: 9,
	},
	damage_vulnerabilities: "",
	damage_resistances: "",
	damage_immunities: "acid",
	condition_immunities: "",
	senses: "blindsight 60 ft., darkvision 120 ft., passive Perception 26",
	languages: "Common, Draconic",
	challenge_rating: "21",
	cr: 21,
	actions: [
		{
			name: "Multiattack",
			desc: "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
		},
		{
			name: "Bite",
			desc: "Melee Weapon Attack: +15 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 9 (2d8) acid damage.",
			damage_dice: "2d10+2d8",
		},
		{
			name: "Claw",
			desc: "Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage.",
			damage_dice: "2d6",
		},
		{
			name: "Tail",
			desc: "Melee Weapon Attack: +15 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
			damage_dice: "2d8",
		},
		{
			name: "Frightful Presence",
			desc: "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
		},
		{
			name: "Acid Breath (Recharge 5-6)",
			desc: "The dragon exhales acid in a 90-foot line that is 10 feet wide. Each creature in that line must make a DC 22 Dexterity saving throw, taking 67 (15d8) acid damage on a failed save, or half as much damage on a successful one.",
		},
	],
	reactions: [],
	legendary_desc:
		"The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The dragon regains spent legendary actions at the start of its turn.",
	legendary_actions: [
		{
			name: "Detect",
			desc: "The dragon makes a Wisdom (Perception) check.",
		},
		{
			name: "Tail Attack",
			desc: "The dragon makes a tail attack.",
		},
		{
			name: "Wing Attack (Costs 2 Actions)",
			desc: "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
		},
	],
	lair_actions: [],
	special_abilities: [
		{
			name: "Amphibious",
			desc: "The dragon can breathe air and water.",
		},
		{
			name: "Legendary Resistance (3/Day)",
			desc: "If the dragon fails a saving throw, it can choose to succeed instead.",
		},
	],
	regional_desc: "",
	regional_actions: [],
	mythic_desc: "",
	mythic_actions: [],
	spell_list: [],
	page_no: 280,
	strength: 27,
	dexterity: 14,
	constitution: 25,
	intelligence: 16,
	wisdom: 15,
	charisma: 19,
	strength_save: null,
	dexterity_save: 9,
	constitution_save: 14,
	intelligence_save: null,
	wisdom_save: 9,
	charisma_save: 11,
	environments: [],
	img_main: "",
	document__slug: "wotc-srd",
	document__title: "5e Core Rules",
	document__url:
		"http://dnd.wizards.com/articles/features/systems-reference-document-srd",
	document__license: "http://open5e.com/legal",
};
