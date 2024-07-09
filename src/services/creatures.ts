import { addMarkdown } from "@/lib/markdownConverter";
import { Open5eApi, ListCreature } from "@/types";
import { Creature5e, Monster5e } from "@/types/monster5e";
import { toast } from "sonner";

export const API_BASE_URL = "https://api.open5e.com/monsters";

export async function getAllCreatures() {
	try {
		const res = await fetch(
			`${API_BASE_URL}/?format=json&limit=5&fields=slug,name,challenge_rating,type,size,environments,document__slug&document__slug__in=5e,wotc-srd,tob,cc,tob2,dmag,menagerie,tob3,taldorei,tob-2023`
		);
		if (!res.ok) throw new Error("Failed to fetch data");
		const data: Open5eApi<ListCreature> = await res.json();
		return data;
	} catch (error: any) {
		toast.error(`Something went wrong ${error.message}`);
	}
}

export async function getCreature(slug: string) {
	try {
		const res = await fetch(`${API_BASE_URL}/${slug}`);
		if (!res.ok) throw new Error(`Failed to fetch data for ${slug}`);
		const data: Creature5e = await res.json();
		const hitPointsFormula = data.hit_dice.split("+");
		const modifiedData: Creature5e = {
			...data,
			desc: data.desc || "",
			actions: addMarkdown(data.actions),
			reactions: addMarkdown(data.reactions),
			hit_dice: hitPointsFormula[0],
			hit_modifier: hitPointsFormula[1] ? parseInt(hitPointsFormula[1]) : 0,
			special_abilities: addMarkdown(data.special_abilities),
			legendary_actions: addMarkdown(data.legendary_actions),
			mythic_actions: addMarkdown(data.mythic_actions),
			regional_actions: addMarkdown(data.regional_actions),
			lair_actions: addMarkdown(data.lair_actions),
		};
		return modifiedData;
	} catch (error: any) {
		toast.error(`Something went wrong: ${error.message}`);
	}
}
