import * as z from "zod";

export const monsterStatblockSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, { message: "Monster name must have a name" })
		.max(50),
	type: z.string({ required_error: "Please select a monster type" }),
	subtype: z.string().optional(),
	size: z.string({ required_error: "Please select a size" }),
	alignment: z
		.string()
		.trim()
		.min(2, { message: "Please select an alignment" }),
	armor_class: z.coerce
		.number()
		.min(1, { message: "Please enter an Armor Class value" }),
	armor_desc: z.string().optional(),
	hit_dice: z.string().regex(new RegExp(/(\d*)d(4|6|8|10|12|20)/gm), {
		message: "Please use a format like 2d20",
	}),
	hit_modifier: z.string().optional(),
	speed: z.object({
		walk: z.coerce.string().optional(),
		swim: z.coerce.string().optional(),
		fly: z.coerce.string().optional(),
		burrow: z.coerce.string().optional(),
		climb: z.coerce.string().optional(),
		hover: z.coerce.boolean().optional(),
	}),
	challenge_rating: z.string({
		required_error: "Please select a challenge rating",
	}),
	perception: z.coerce.number().optional(),
	skills: z.record(z.coerce.number()),
	senses: z.string().trim().optional(),
	damage_vulnerabilities: z.string().optional(),
	damage_resistances: z.string().optional(),
	damage_immunities: z.string().optional(),
	condition_immunities: z.string().optional(),
	languages: z.string().min(2, { message: "Please fill in a language" }),
	actions: z
		.array(
			z.object({
				name: z.string(),
				desc: z.string(),
				damage_dice: z.string().optional(),
				attack_bonus: z.string().optional(),
			})
		)
		.optional(),
	reactions: z
		.array(
			z.object({
				name: z.string(),
				desc: z.string(),
				damage_dice: z.string().optional(),
				attack_bonus: z.string().optional(),
			})
		)
		.optional(),
	legendary_desc: z.string().optional(),
	legendary_actions: z
		.array(
			z.object({
				name: z.string(),
				desc: z.string(),
				damage_dice: z.string().optional(),
				attack_bonus: z.string().optional(),
			})
		)
		.optional(),
	lair_desc: z.string().optional(),
	lair_actions: z
		.array(
			z.object({
				name: z.string(),
				desc: z.string(),
				damage_dice: z.string().optional(),
				attack_bonus: z.string().optional(),
			})
		)
		.optional(),
	special_abilities: z
		.array(
			z.object({
				name: z.string(),
				desc: z.string(),
				damage_dice: z.string().optional(),
				attack_bonus: z.string().optional(),
			})
		)
		.optional(),
	spell_list: z.array(z.string()),
	strength: z.coerce.number(),
	dexterity: z.coerce.number(),
	constitution: z.coerce.number(),
	intelligence: z.coerce.number(),
	wisdom: z.coerce.number(),
	charisma: z.coerce.number(),
	strength_save: z.number().nullable(),
	dexterity_save: z.number().nullable(),
	constitution_save: z.number().nullable(),
	intelligence_save: z.number().nullable(),
	wisdom_save: z.number().nullable(),
	charisma_save: z.number().nullable(),
});
