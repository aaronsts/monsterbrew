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
});
