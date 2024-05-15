import { Monster5e } from "@/types/monster5e";
import { capitalize } from "./utils";
import { calculateStatBonus } from "./calculations";
import { CHALLENGE_RATINGS } from "./constants";

export function createMarkdownPage(creature: Monster5e) {
	let markdownWindow = window.open();
	let markdown = [
		'<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><title>',
		creature.name,
		'</title><link rel="shortcut icon" type="image/x-icon" href="./dndimages/favicon.ico" /></head><body>',
	];
	markdown.push("<h2>Homebrewery V3</h2>", generateMarkdown(creature));
	markdown.push("</body></html>");
	markdownWindow!.document.write(markdown.join(""));
}

function generateMarkdown(creature: Monster5e) {
	const markdownLines: string[] = [];
	const speed = Object.entries(creature.speed).map((s) => {
		if (s[0] === "walk") return `${s[1]}ft.`;
		return `${s[0]} ${s[1]}ft.`;
	});

	markdownLines.push(`{{monster,frame,wide`);
	markdownLines.push(
		`## ${creature.name}`,
		`*${capitalize(creature.size)} ${creature.type}, ${creature.alignment}*`,
		`___`,
		`**Armor Class** :: ${creature.armor_class} (${creature.armor_desc})`,
		`**Hit Points** :: ${creature.hit_points} (${creature.hit_dice})`,
		`**Speed** :: ${speed.join(", ")}`,
		`___`
	);
	markdownLines.push(
		`|STR|DEX|CON|INT|WIS|CHA|`,
		`|:---:|:---:|:---:|:---:|:---:|:---:|`,
		`|${creature.strength} ${calculateStatBonus(creature.strength)}|` +
			`${creature.dexterity} ${calculateStatBonus(creature.dexterity)}|` +
			`${creature.constitution} ${calculateStatBonus(creature.constitution)}|` +
			`${creature.intelligence} ${calculateStatBonus(creature.intelligence)}|` +
			`${creature.wisdom} ${calculateStatBonus(creature.wisdom)}|` +
			`${creature.charisma} ${calculateStatBonus(creature.charisma)}|`
	);
	markdownLines.push("___");

	const savingThrows = [
		creature.strength_save && `Str +${creature.strength_save}`,
		creature.dexterity_save && `Dex +${creature.dexterity_save}`,
		creature.constitution_save && `Con +${creature.constitution_save}`,
		creature.intelligence_save && `Int +${creature.intelligence_save}`,
		creature.wisdom_save && `Wis +${creature.wisdom_save}`,
		creature.charisma_save && `Cha +${creature.charisma_save}`,
	].filter((t) => t !== null);

	savingThrows.length > 0 &&
		markdownLines.push(`**Saving Throws** :: ${savingThrows.join(", ")}`);

	const skills = Object.entries(creature.skills);
	const mappedSkills = skills.map((skl) => `${skl[0]} +${skl[1]}`);

	markdownLines.push(`**Skills** :: ${capitalize(mappedSkills.join(", "))}`);

	creature.damage_immunities &&
		markdownLines.push(
			`**Damage Immunities** :: ${creature.damage_immunities}`
		);
	creature.damage_resistances &&
		markdownLines.push(
			`**Damage Resistances** :: ${creature.damage_resistances}`
		);
	creature.damage_vulnerabilities &&
		markdownLines.push(
			`**Damage Vulnerabilities** :: ${creature.damage_vulnerabilities}`
		);
	creature.condition_immunities &&
		markdownLines.push(
			`**Condition Immunities** :: ${creature.condition_immunities}`
		);

	markdownLines.push(`**Senses** :: ${creature.senses}`);
	markdownLines.push(
		`**Languages** :: ${creature.languages ? creature.languages : "-"}`
	);

	const exp = CHALLENGE_RATINGS.find(
		(rating) => rating.label === creature.challenge_rating
	);
	markdownLines.push(
		`**Challenge** :: ${creature.challenge_rating} (${exp?.value} XP)`,
		"___"
	);

	creature.special_abilities?.forEach((ability, i) => {
		i === creature.special_abilities!.length - 1
			? markdownLines.push(`***${capitalize(ability.name)}.*** ${ability.desc}`)
			: markdownLines.push(
					`***${capitalize(ability.name)}.*** ${ability.desc}`,
					":"
			  );
	});

	if (creature.actions && creature.actions.length > 0) {
		markdownLines.push("### Actions");
		creature.actions.forEach((action, i) => {
			i === creature.actions!.length - 1
				? markdownLines.push(`***${capitalize(action.name)}.*** ${action.desc}`)
				: markdownLines.push(
						`***${capitalize(action.name)}.*** ${action.desc}`,
						":"
				  );
		});
	}

	if (creature.reactions && creature.reactions.length > 0) {
		markdownLines.push("### Reactions");
		creature.reactions.forEach((action, i) => {
			i === creature.reactions!.length - 1
				? markdownLines.push(`**${capitalize(action.name)}.** ${action.desc}`)
				: markdownLines.push(
						`**${capitalize(action.name)}.** ${action.desc}`,
						":"
				  );
		});
	}

	if (creature.legendary_actions && creature.legendary_actions.length > 0) {
		markdownLines.push(
			"### Legendary Actions",
			creature.legendary_desc ? creature.legendary_desc : "",
			":"
		);
		creature.legendary_actions.forEach((action, i) => {
			i === creature.legendary_actions!.length - 1
				? markdownLines.push(`**${capitalize(action.name)}.** ${action.desc}`)
				: markdownLines.push(
						`**${capitalize(action.name)}.** ${action.desc}`,
						":"
				  );
		});
	}

	if (creature.lair_actions) {
		markdownLines.push(
			"### Lair Actions",
			creature.lair_desc ? creature.lair_desc : "",
			":"
		);
		creature.lair_actions.forEach((action, i) => {
			i === creature.lair_actions!.length - 1
				? markdownLines.push(`**${capitalize(action.name)}.** ${action.desc}`)
				: markdownLines.push(
						`**${capitalize(action.name)}.** ${action.desc}`,
						":"
				  );
		});
	}
	markdownLines.push("}}");
	return markdownToHtml(markdownLines);
}

function markdownToHtml(markdownLines: string[]) {
	// Add line breaks and code tags
	const lines: string[] = [];
	markdownLines.forEach((line) => {
		line.split("<br>").forEach((subLine) => {
			lines.push(`${subLine}<br>`);
		});
	});
	return `<code>${lines.join("")}</code>`;
}
