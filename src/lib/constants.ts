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

export const challenge_ratings = {
	"0": {
		xp: "10",
		prof: 2,
	},
	"1/8": {
		xp: "25",
		prof: 2,
	},
	"1/4": {
		xp: "50",
		prof: 2,
	},
	"1/2": {
		xp: "100",
		prof: 2,
	},
	"1": {
		xp: "200",
		prof: 2,
	},
	"2": {
		xp: "450",
		prof: 2,
	},
	"3": {
		xp: "700",
		prof: 2,
	},
	"4": {
		xp: "1,100",
		prof: 2,
	},
	"5": {
		xp: "1,800",
		prof: 3,
	},
	"6": {
		xp: "2,300",
		prof: 3,
	},
	"7": {
		xp: "2,900",
		prof: 3,
	},
	"8": {
		xp: "3,900",
		prof: 3,
	},
	"9": {
		xp: "5,000",
		prof: 4,
	},
	"10": {
		xp: "5,900",
		prof: 4,
	},
	"11": {
		xp: "7,200",
		prof: 4,
	},
	"12": {
		xp: "8,400",
		prof: 4,
	},
	"13": {
		xp: "10,000",
		prof: 5,
	},
	"14": {
		xp: "11,500",
		prof: 5,
	},
	"15": {
		xp: "13,000",
		prof: 5,
	},
	"16": {
		xp: "15,000",
		prof: 5,
	},
	"17": {
		xp: "18,000",
		prof: 6,
	},
	"18": {
		xp: "20,000",
		prof: 6,
	},
	"19": {
		xp: "22,000",
		prof: 6,
	},
	"20": {
		xp: "25,000",
		prof: 6,
	},
	"21": {
		xp: "33,000",
		prof: 7,
	},
	"22": {
		xp: "41,000",
		prof: 7,
	},
	"23": {
		xp: "50,000",
		prof: 7,
	},
	"24": {
		xp: "62,000",
		prof: 7,
	},
	"25": {
		xp: "75,000",
		prof: 8,
	},
	"26": {
		xp: "90,000",
		prof: 8,
	},
	"27": {
		xp: "105,000",
		prof: 8,
	},
	"28": {
		xp: "120,000",
		prof: 8,
	},
	"29": {
		xp: "135,000",
		prof: 9,
	},
	"30": {
		xp: "155,000",
		prof: 9,
	},
};

export const ALL_SKILLS: { name: string; stat: string; expert?: boolean }[] = [
	{
		name: "acrobatics",
		stat: "dex",
	},
	{
		name: "animal handling",
		stat: "wis",
	},
	{
		name: "arcana",
		stat: "int",
	},
	{
		name: "athletics",
		stat: "str",
	},
	{
		name: "deception",
		stat: "cha",
	},
	{
		name: "history",
		stat: "int",
	},
	{
		name: "insight",
		stat: "wis",
	},
	{
		name: "intimidation",
		stat: "cha",
	},
	{
		name: "investigation",
		stat: "int",
	},
	{
		name: "medicine",
		stat: "wis",
	},
	{
		name: "nature",
		stat: "int",
	},
	{
		name: "perception",
		stat: "wis",
	},
	{
		name: "performance",
		stat: "cha",
	},
	{
		name: "persuasion",
		stat: "cha",
	},
	{
		name: "religion",
		stat: "int",
	},
	{
		name: "sleight of Hand",
		stat: "dex",
	},
	{
		name: "stealth",
		stat: "dex",
	},
	{
		name: "survival",
		stat: "wis",
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
