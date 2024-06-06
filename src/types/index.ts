export type ISavingThrow = {
	name: string;
	value: string;
};

export type ISkill = {
	name: string;
	stat: string;
	expert?: boolean;
};

export type Open5eApi<T> = {
	count: number;
	next: string;
	previous: null;
	results: T[];
};

export type ListCreature = {
	slug: string;
	challenge_rating: string;
	document__slug: string;
	environments: string[];
	name: string;
	type: string;
	size: string;
};
