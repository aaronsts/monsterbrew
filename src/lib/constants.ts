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
	{ rating: "0", xp: "10", prof: 2 },
	{ rating: "1/8", xp: "25", prof: 2 },
	{ rating: "1/4", xp: "50", prof: 2 },
	{ rating: "1/2", xp: "100", prof: 2 },
	{ rating: "1", xp: "200", prof: 2 },
	{ rating: "2", xp: "450", prof: 2 },
	{ rating: "3", xp: "700", prof: 2 },
	{ rating: "4", xp: "1,100", prof: 2 },
	{ rating: "5", xp: "1,800", prof: 3 },
	{ rating: "6", xp: "2,300", prof: 3 },
	{ rating: "7", xp: "2,900", prof: 3 },
	{ rating: "8", xp: "3,900", prof: 3 },
	{ rating: "9", xp: "5,000", prof: 4 },
	{ rating: "10", xp: "5,900", prof: 4 },
	{ rating: "11", xp: "7,200", prof: 4 },
	{ rating: "12", xp: "8,400", prof: 4 },
	{ rating: "13", xp: "10,000", prof: 5 },
	{ rating: "14", xp: "11,500", prof: 5 },
	{ rating: "15", xp: "13,000", prof: 5 },
	{ rating: "16", xp: "15,000", prof: 5 },
	{ rating: "17", xp: "18,000", prof: 6 },
	{ rating: "18", xp: "20,000", prof: 6 },
	{ rating: "19", xp: "22,000", prof: 6 },
	{ rating: "20", xp: "25,000", prof: 6 },
	{ rating: "21", xp: "33,000", prof: 7 },
	{ rating: "22", xp: "41,000", prof: 7 },
	{ rating: "23", xp: "50,000", prof: 7 },
	{ rating: "24", xp: "62,000", prof: 7 },
	{ rating: "25", xp: "75,000", prof: 8 },
	{ rating: "26", xp: "90,000", prof: 8 },
	{ rating: "27", xp: "105,000", prof: 8 },
	{ rating: "28", xp: "120,000", prof: 8 },
	{ rating: "29", xp: "135,000", prof: 9 },
	{ rating: "30", xp: "155,000", prof: 9 },
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
		name: "intelligenceimidation",
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
