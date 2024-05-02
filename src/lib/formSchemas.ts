import * as z from "zod";

export const monsterStatblockSchema = z.object({
	name: z.string().min(2, { message: "Monster name must have a name" }).max(50),
	type: z.string({ required_error: "Please select a monster type" }),
	subtype: z.string().optional(),
	size: z.string({ required_error: "Please select a size" }),
	alignment: z.string({ required_error: "Please select an alignment" }).min(2),
	armor_class: z.coerce
		.number()
		.min(1, { message: "Please enter an AC value" }),
	armor_desc: z.string().optional(),
	hit_dice: z.string().regex(new RegExp(/(\d*)d(4|6|8|10|12|20)/gm), {
		message: "Please use a format like 2d20",
	}),
	hit_modifier: z.string().optional(),
	speed: z.object({
		walk: z.coerce.number().optional(),
		swim: z.coerce.number().optional(),
		fly: z.coerce.number().optional(),
		burrow: z.coerce.number().optional(),
		climb: z.coerce.number().optional(),
		hover: z.boolean().optional(),
	}),
	challenge_rating: z.string().optional(),
	perception: z.coerce.number().optional(),
	skills: z.record(z.coerce.number()),
	senses: z.string(),
	damage_vulnerabilities: z.string().optional(),
	damage_resistances: z.string().optional(),
	damage_immunities: z.string().optional(),
	condition_immunities: z.string().optional(),
	languages: z.string().optional(),
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
	strength: z.number(),
	dexterity: z.number(),
	constitution: z.number(),
	intelligence: z.number(),
	wisdom: z.number(),
	charisma: z.number(),
	strength_save: z.number().optional(),
	dexterity_save: z.number().optional(),
	constitution_save: z.number().optional(),
	intelligence_save: z.number().optional(),
	wisdom_save: z.number().optional(),
	charisma_save: z.number().optional(),
});
