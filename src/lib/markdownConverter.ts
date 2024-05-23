import { Monster5e } from "@/types/monster5e";
import { ATTACK_TYPES } from "./constants";

export function addMarkdown(actions: Monster5e["actions"]) {
	if (!actions) return null;
	return actions.map((action) => {
		const attackType = ATTACK_TYPES.find((type) => action.desc.includes(type));
		if (!attackType) {
			return {
				name: toggleBoldItalic(action.name),
				desc: action.desc,
				damage_dice: action.damage_dice,
				attack_bonus: action.attack_bonus,
			};
		}
		return {
			name: toggleBoldItalic(action.name),
			desc: addItalic(action.desc, attackType),
			damage_dice: action.damage_dice,
			attack_bonus: action.attack_bonus,
		};
	});
}

export function toggleBoldItalic(string: string) {
	if (string.includes("***")) {
		return string.replaceAll("*", "");
	}
	return `***${string}***`;
}

export function addItalic(string: string, subString: string) {
	if (string.includes("_")) {
		return string.replaceAll("_", "*");
	}
	if (string.includes("*")) {
		return string;
	}
	return string.replace(subString, `*${subString}*`);
}
