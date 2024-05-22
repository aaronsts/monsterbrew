import { Monster5e } from "@/types/monster5e";

export function toggleMd(actions: Monster5e["actions"]) {
	if (!actions) return null;
	return actions.map((action) => {
		return {
			name: toggleBoldItalic(action.name),
			desc: action.desc,
			damage_dice: action.damage_dice,
			attack_bonus: action.attack_bonus,
		};
	});
}

export function toggleBoldItalic(string: string) {
	if (string.includes("***")) {
		return string.replace(/\*/g, "");
	}
	return `***${string}***`;
}
