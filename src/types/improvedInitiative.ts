type HP = {
	Value: number;
	Notes: string;
};

type AC = {
	Value: number;
	Notes: string;
};

type Abilities = {
	Str: number;
	Dex: number;
	Con: number;
	Int: number;
	Wis: number;
	Cha: number;
};

type Skill = {
	Name: string;
	Modifier: number;
};

type Trait = {
	Name: string;
	Content: string;
};

type Action = {
	Name: string;
	Content: string;
};

export type ImprovedInitiativeStatblock = {
	Source: string;
	Type: string;
	HP: HP;
	AC: AC;
	InitiativeModifier: number;
	InitiativeAdvantage: boolean;
	Speed: string[];
	Abilities: Abilities;
	DamageVulnerabilities: string[];
	DamageResistances: string[];
	DamageImmunities: string[];
	ConditionImmunities: string[];
	Saves: Skill[];
	Skills: Skill[];
	Senses: string[];
	Languages: string[];
	Challenge: string;
	Traits: Trait[];
	Actions: Action[];
	BonusActions: any[];
	Reactions: any[];
	LegendaryActions: any[];
	MythicActions: any[];
	Description: string;
	Player: string;
	Version: string;
	ImageURL: string;
};
