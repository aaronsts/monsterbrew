import * as z from "zod";

export const createMonsterStatblockSchema = z.object({
	monster_name: z
		.string()
		.min(2, { message: "Monster name must be atleast 2 characters." })
		.max(50),
	monster_type: z.string({ required_error: "Please select a monster type" }),
	monster_sub_type: z.string().optional(),
	monster_size: z.string({ required_error: "Please select a size" }),
	monster_alignment: z
		.string({ required_error: "Please select an alignment" })
		.min(2),
	monster_ac: z.string().min(1, { message: "Please enter an AC value" }),
	monster_ac_type: z.string().optional(),
	monster_hit_die: z.string().regex(new RegExp(/(\d*)d(4|6|8|10|12|20)/gm), {
		message: "Please use a format like 2d20",
	}),
	monster_hit_modifier: z.string().optional(),
	monster_movement: z.string().min(3, {
		message: "Monster name must be atleast 3 characters.",
	}),
	monster_cr: z.string().optional(),
	monster_stats: z.object({
		str: z.string().min(1, { message: "Please fill in your stat" }),
		dex: z.string().min(1, { message: "Please fill in your stat" }),
		con: z.string().min(1, { message: "Please fill in your stat" }),
		int: z.string().min(1, { message: "Please fill in your stat" }),
		wis: z.string().min(1, { message: "Please fill in your stat" }),
		cha: z.string().min(1, { message: "Please fill in your stat" }),
	}),
	monster_senses: z.object({
		blind_sight: z.string().optional(),
		dark_vision: z.string().optional(),
		tremor_sense: z.string().optional(),
		true_sight: z.string().optional(),
		unknown_sense: z.string().optional(),
		passive_perception: z
			.string()
			.min(1, { message: "Please give a passive perception" }),
	}),
	monster_languages: z.string().optional(),
	monster_proficiency_bonus: z.string(),
	monster_traits: z.object({
		description: z.string().optional(),
	}),
	monster_actions: z.object({
		description: z.string().optional(),
	}),
	monster_bonus_actions: z.object({
		description: z.string().optional(),
	}),
	monster_reactions: z.object({
		description: z.string().optional(),
	}),
	is_legendary: z.boolean().default(false).optional(),
	monster_legendary_actions: z.object({
		description: z.string().optional(),
	}),
	has_lair: z.boolean().default(false).optional(),
	monster_lair: z.object({
		description: z.string().optional(),
	}),
});

export declare const MonsterSchema: z.ZodEffects<
	z.ZodObject<
		{
			slug: z.ZodString;
			name: z.ZodString;
			desc: z.ZodString;
			document__slug: z.ZodString;
			document__title: z.ZodString;
			document__license_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
			document__url: z.ZodString;
			type: z.ZodString;
			hit_dice: z.ZodString;
			size: z.ZodString;
			subtype: z.ZodOptional<z.ZodNullable<z.ZodString>>;
			group: z.ZodOptional<z.ZodNullable<z.ZodString>>;
			alignment: z.ZodString;
			armor_class: z.ZodNumber;
			armor_desc: z.ZodOptional<z.ZodNullable<z.ZodString>>;
			hit_points: z.ZodNumber;
			speed: z.ZodObject<
				{
					walk: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
					swim: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
					fly: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
					burrow: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
					climb: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
					hover: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
				},
				"strip",
				z.ZodTypeAny,
				{
					walk?: number | null | undefined;
					swim?: number | null | undefined;
					fly?: number | null | undefined;
					burrow?: number | null | undefined;
					climb?: number | null | undefined;
					hover?: boolean | null | undefined;
				},
				{
					walk?: number | null | undefined;
					swim?: number | null | undefined;
					fly?: number | null | undefined;
					burrow?: number | null | undefined;
					climb?: number | null | undefined;
					hover?: boolean | null | undefined;
				}
			>;
			perception: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
			skills: z.ZodRecord<z.ZodString, z.ZodNumber>;
			damage_vulnerabilities: z.ZodOptional<z.ZodNullable<z.ZodString>>;
			damage_resistances: z.ZodOptional<z.ZodNullable<z.ZodString>>;
			damage_immunities: z.ZodOptional<z.ZodNullable<z.ZodString>>;
			condition_immunities: z.ZodOptional<z.ZodNullable<z.ZodString>>;
			senses: z.ZodString;
			languages: z.ZodOptional<z.ZodNullable<z.ZodString>>;
			challenge_rating: z.ZodString;
			cr: z.ZodNumber;
			actions: z.ZodEffects<
				z.ZodOptional<
					z.ZodNullable<
						z.ZodArray<
							z.ZodObject<
								{
									name: z.ZodString;
									desc: z.ZodString;
									damage_dice: z.ZodOptional<z.ZodNullable<z.ZodString>>;
									attack_bonues: z.ZodOptional<z.ZodNullable<z.ZodString>>;
								},
								"strip",
								z.ZodTypeAny,
								{
									name: string;
									desc: string;
									damage_dice?: string | null | undefined;
									attack_bonues?: string | null | undefined;
								},
								{
									name: string;
									desc: string;
									damage_dice?: string | null | undefined;
									attack_bonues?: string | null | undefined;
								}
							>,
							"many"
						>
					>
				>,
				{
					name: string;
					desc: string;
					damage_dice?: string | null | undefined;
					attack_bonues?: string | null | undefined;
				}[],
				| {
						name: string;
						desc: string;
						damage_dice?: string | null | undefined;
						attack_bonues?: string | null | undefined;
				  }[]
				| null
				| undefined
			>;
			reactions: z.ZodEffects<
				z.ZodOptional<
					z.ZodNullable<
						z.ZodArray<
							z.ZodObject<
								{
									name: z.ZodString;
									desc: z.ZodString;
									damage_dice: z.ZodOptional<z.ZodNullable<z.ZodString>>;
									attack_bonues: z.ZodOptional<z.ZodNullable<z.ZodString>>;
								},
								"strip",
								z.ZodTypeAny,
								{
									name: string;
									desc: string;
									damage_dice?: string | null | undefined;
									attack_bonues?: string | null | undefined;
								},
								{
									name: string;
									desc: string;
									damage_dice?: string | null | undefined;
									attack_bonues?: string | null | undefined;
								}
							>,
							"many"
						>
					>
				>,
				{
					name: string;
					desc: string;
					damage_dice?: string | null | undefined;
					attack_bonues?: string | null | undefined;
				}[],
				| {
						name: string;
						desc: string;
						damage_dice?: string | null | undefined;
						attack_bonues?: string | null | undefined;
				  }[]
				| null
				| undefined
			>;
			legendary_desc: z.ZodString;
			legendary_actions: z.ZodEffects<
				z.ZodOptional<
					z.ZodNullable<
						z.ZodArray<
							z.ZodObject<
								{
									name: z.ZodString;
									desc: z.ZodString;
									damage_dice: z.ZodOptional<z.ZodNullable<z.ZodString>>;
									attack_bonues: z.ZodOptional<z.ZodNullable<z.ZodString>>;
								},
								"strip",
								z.ZodTypeAny,
								{
									name: string;
									desc: string;
									damage_dice?: string | null | undefined;
									attack_bonues?: string | null | undefined;
								},
								{
									name: string;
									desc: string;
									damage_dice?: string | null | undefined;
									attack_bonues?: string | null | undefined;
								}
							>,
							"many"
						>
					>
				>,
				{
					name: string;
					desc: string;
					damage_dice?: string | null | undefined;
					attack_bonues?: string | null | undefined;
				}[],
				| {
						name: string;
						desc: string;
						damage_dice?: string | null | undefined;
						attack_bonues?: string | null | undefined;
				  }[]
				| null
				| undefined
			>;
			special_abilities: z.ZodEffects<
				z.ZodOptional<
					z.ZodNullable<
						z.ZodArray<
							z.ZodObject<
								{
									name: z.ZodString;
									desc: z.ZodString;
									damage_dice: z.ZodOptional<z.ZodNullable<z.ZodString>>;
									attack_bonues: z.ZodOptional<z.ZodNullable<z.ZodString>>;
								},
								"strip",
								z.ZodTypeAny,
								{
									name: string;
									desc: string;
									damage_dice?: string | null | undefined;
									attack_bonues?: string | null | undefined;
								},
								{
									name: string;
									desc: string;
									damage_dice?: string | null | undefined;
									attack_bonues?: string | null | undefined;
								}
							>,
							"many"
						>
					>
				>,
				{
					name: string;
					desc: string;
					damage_dice?: string | null | undefined;
					attack_bonues?: string | null | undefined;
				}[],
				| {
						name: string;
						desc: string;
						damage_dice?: string | null | undefined;
						attack_bonues?: string | null | undefined;
				  }[]
				| null
				| undefined
			>;
			spell_list: z.ZodArray<z.ZodString, "many">;
			page_no: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
			img: z.ZodOptional<z.ZodString>;
			strength: z.ZodNumber;
			dexterity: z.ZodNumber;
			constitution: z.ZodNumber;
			intelligence: z.ZodNumber;
			wisdom: z.ZodNumber;
			charisma: z.ZodNumber;
			strength_save: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
			dexterity_save: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
			constitution_save: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
			intelligence_save: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
			wisdom_save: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
			charisma_save: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
		},
		"strip",
		z.ZodTypeAny,
		{
			slug: string;
			name: string;
			desc: string;
			document__slug: string;
			document__title: string;
			document__url: string;
			type: string;
			hit_dice: string;
			size: string;
			alignment: string;
			armor_class: number;
			hit_points: number;
			speed: {
				walk?: number | null | undefined;
				swim?: number | null | undefined;
				fly?: number | null | undefined;
				burrow?: number | null | undefined;
				climb?: number | null | undefined;
				hover?: boolean | null | undefined;
			};
			skills: Record<string, number>;
			senses: string;
			challenge_rating: string;
			cr: number;
			actions: {
				name: string;
				desc: string;
				damage_dice?: string | null | undefined;
				attack_bonues?: string | null | undefined;
			}[];
			reactions: {
				name: string;
				desc: string;
				damage_dice?: string | null | undefined;
				attack_bonues?: string | null | undefined;
			}[];
			legendary_desc: string;
			legendary_actions: {
				name: string;
				desc: string;
				damage_dice?: string | null | undefined;
				attack_bonues?: string | null | undefined;
			}[];
			special_abilities: {
				name: string;
				desc: string;
				damage_dice?: string | null | undefined;
				attack_bonues?: string | null | undefined;
			}[];
			spell_list: string[];
			strength: number;
			dexterity: number;
			constitution: number;
			intelligence: number;
			wisdom: number;
			charisma: number;
			document__license_url?: string | null | undefined;
			subtype?: string | null | undefined;
			group?: string | null | undefined;
			armor_desc?: string | null | undefined;
			perception?: number | null | undefined;
			damage_vulnerabilities?: string | null | undefined;
			damage_resistances?: string | null | undefined;
			damage_immunities?: string | null | undefined;
			condition_immunities?: string | null | undefined;
			languages?: string | null | undefined;
			page_no?: number | null | undefined;
			img?: string | undefined;
			strength_save?: number | null | undefined;
			dexterity_save?: number | null | undefined;
			constitution_save?: number | null | undefined;
			intelligence_save?: number | null | undefined;
			wisdom_save?: number | null | undefined;
			charisma_save?: number | null | undefined;
		},
		{
			slug: string;
			name: string;
			desc: string;
			document__slug: string;
			document__title: string;
			document__url: string;
			type: string;
			hit_dice: string;
			size: string;
			alignment: string;
			armor_class: number;
			hit_points: number;
			speed: {
				walk?: number | null | undefined;
				swim?: number | null | undefined;
				fly?: number | null | undefined;
				burrow?: number | null | undefined;
				climb?: number | null | undefined;
				hover?: boolean | null | undefined;
			};
			skills: Record<string, number>;
			senses: string;
			challenge_rating: string;
			cr: number;
			legendary_desc: string;
			spell_list: string[];
			strength: number;
			dexterity: number;
			constitution: number;
			intelligence: number;
			wisdom: number;
			charisma: number;
			document__license_url?: string | null | undefined;
			subtype?: string | null | undefined;
			group?: string | null | undefined;
			armor_desc?: string | null | undefined;
			perception?: number | null | undefined;
			damage_vulnerabilities?: string | null | undefined;
			damage_resistances?: string | null | undefined;
			damage_immunities?: string | null | undefined;
			condition_immunities?: string | null | undefined;
			languages?: string | null | undefined;
			actions?:
				| {
						name: string;
						desc: string;
						damage_dice?: string | null | undefined;
						attack_bonues?: string | null | undefined;
				  }[]
				| null
				| undefined;
			reactions?:
				| {
						name: string;
						desc: string;
						damage_dice?: string | null | undefined;
						attack_bonues?: string | null | undefined;
				  }[]
				| null
				| undefined;
			legendary_actions?:
				| {
						name: string;
						desc: string;
						damage_dice?: string | null | undefined;
						attack_bonues?: string | null | undefined;
				  }[]
				| null
				| undefined;
			special_abilities?:
				| {
						name: string;
						desc: string;
						damage_dice?: string | null | undefined;
						attack_bonues?: string | null | undefined;
				  }[]
				| null
				| undefined;
			page_no?: number | null | undefined;
			img?: string | undefined;
			strength_save?: number | null | undefined;
			dexterity_save?: number | null | undefined;
			constitution_save?: number | null | undefined;
			intelligence_save?: number | null | undefined;
			wisdom_save?: number | null | undefined;
			charisma_save?: number | null | undefined;
		}
	>,
	{
		document: {
			slug: string;
			title: string;
			url: string;
			license: string | null | undefined;
		};
		slug: string;
		name: string;
		desc: string;
		type: string;
		hit_dice: string;
		size: string;
		alignment: string;
		armor_class: number;
		hit_points: number;
		speed: {
			walk?: number | null | undefined;
			swim?: number | null | undefined;
			fly?: number | null | undefined;
			burrow?: number | null | undefined;
			climb?: number | null | undefined;
			hover?: boolean | null | undefined;
		};
		skills: Record<string, number>;
		senses: string;
		challenge_rating: string;
		cr: number;
		actions: {
			name: string;
			desc: string;
			damage_dice?: string | null | undefined;
			attack_bonues?: string | null | undefined;
		}[];
		reactions: {
			name: string;
			desc: string;
			damage_dice?: string | null | undefined;
			attack_bonues?: string | null | undefined;
		}[];
		legendary_desc: string;
		legendary_actions: {
			name: string;
			desc: string;
			damage_dice?: string | null | undefined;
			attack_bonues?: string | null | undefined;
		}[];
		special_abilities: {
			name: string;
			desc: string;
			damage_dice?: string | null | undefined;
			attack_bonues?: string | null | undefined;
		}[];
		spell_list: string[];
		strength: number;
		dexterity: number;
		constitution: number;
		intelligence: number;
		wisdom: number;
		charisma: number;
		subtype?: string | null | undefined;
		group?: string | null | undefined;
		armor_desc?: string | null | undefined;
		perception?: number | null | undefined;
		damage_vulnerabilities?: string | null | undefined;
		damage_resistances?: string | null | undefined;
		damage_immunities?: string | null | undefined;
		condition_immunities?: string | null | undefined;
		languages?: string | null | undefined;
		page_no?: number | null | undefined;
		img?: string | undefined;
		strength_save?: number | null | undefined;
		dexterity_save?: number | null | undefined;
		constitution_save?: number | null | undefined;
		intelligence_save?: number | null | undefined;
		wisdom_save?: number | null | undefined;
		charisma_save?: number | null | undefined;
	},
	{
		slug: string;
		name: string;
		desc: string;
		document__slug: string;
		document__title: string;
		document__url: string;
		type: string;
		hit_dice: string;
		size: string;
		alignment: string;
		armor_class: number;
		hit_points: number;
		speed: {
			walk?: number | null | undefined;
			swim?: number | null | undefined;
			fly?: number | null | undefined;
			burrow?: number | null | undefined;
			climb?: number | null | undefined;
			hover?: boolean | null | undefined;
		};
		skills: Record<string, number>;
		senses: string;
		challenge_rating: string;
		cr: number;
		legendary_desc: string;
		spell_list: string[];
		strength: number;
		dexterity: number;
		constitution: number;
		intelligence: number;
		wisdom: number;
		charisma: number;
		document__license_url?: string | null | undefined;
		subtype?: string | null | undefined;
		group?: string | null | undefined;
		armor_desc?: string | null | undefined;
		perception?: number | null | undefined;
		damage_vulnerabilities?: string | null | undefined;
		damage_resistances?: string | null | undefined;
		damage_immunities?: string | null | undefined;
		condition_immunities?: string | null | undefined;
		languages?: string | null | undefined;
		actions?:
			| {
					name: string;
					desc: string;
					damage_dice?: string | null | undefined;
					attack_bonues?: string | null | undefined;
			  }[]
			| null
			| undefined;
		reactions?:
			| {
					name: string;
					desc: string;
					damage_dice?: string | null | undefined;
					attack_bonues?: string | null | undefined;
			  }[]
			| null
			| undefined;
		legendary_actions?:
			| {
					name: string;
					desc: string;
					damage_dice?: string | null | undefined;
					attack_bonues?: string | null | undefined;
			  }[]
			| null
			| undefined;
		special_abilities?:
			| {
					name: string;
					desc: string;
					damage_dice?: string | null | undefined;
					attack_bonues?: string | null | undefined;
			  }[]
			| null
			| undefined;
		page_no?: number | null | undefined;
		img?: string | undefined;
		strength_save?: number | null | undefined;
		dexterity_save?: number | null | undefined;
		constitution_save?: number | null | undefined;
		intelligence_save?: number | null | undefined;
		wisdom_save?: number | null | undefined;
		charisma_save?: number | null | undefined;
	}
>;
