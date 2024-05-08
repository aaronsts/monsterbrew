export const monster_sizes = [
	{ label: "Gargantuan", value: "gargantuan" },
	{ label: "Huge", value: "huge" },
	{ label: "Large", value: "large" },
	{ label: "Medium", value: "medium" },
	{ label: "Small", value: "small" },
	{ label: "Tiny", value: "tiny" },
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
