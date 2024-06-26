import Statistic from "./statistic";
import { Divider } from "../ui/divider";
import { CHALLENGE_RATINGS } from "@/lib/constants";
import SavingThrows from "./saving-throws";
import { useCreaturesStore } from "@/store/zustand";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCreature } from "@/services/creatures";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { capitalize } from "@/lib/utils";
import Actions from "./actions";
import Markdown from "react-markdown";
import { toast } from "sonner";

interface StatblockProps {
	loadCreatureValues: () => void;
}

const Statblock = ({ loadCreatureValues }: StatblockProps) => {
	const { selectedCreature, setCreature, creature } = useCreaturesStore();

	const { data, isLoading, error } = useQuery({
		queryKey: ["creature", selectedCreature],
		queryFn: () => getCreature(selectedCreature),
		placeholderData: keepPreviousData,
	});

	useEffect(() => {
		if (!data) return;
		setCreature(data);
	}, [data, setCreature]);

	if (isLoading) return <div className="font-yatra">Loading</div>;
	if (error) {
		toast.error(`Something went wrong: ${error.message}`);
		throw Error(`Something went wrong: ${error.message}`);
	}

	const skills = Object.entries(creature.skills)
		.map((skl) => `${capitalize(skl[0])} +${skl[1]}`)
		.join(", ");

	const movement = Object.entries(creature.speed)
		.map((move) => {
			if (move[0] === "walk") return `${move[1]} ft.`;
			return `${move[0]} ${move[1]} ft.`;
		})
		.join(", ");

	const exp = CHALLENGE_RATINGS.find(
		(rating) => rating.label === creature.challenge_rating
	);

	return (
		<div className="w-full print:columns-2 text-cararra-950 space-y-3">
			<div className="flex justify-between">
				<div>
					<h2 className="leading-none">{creature.name}</h2>
					<p className="italic capitalize">
						{creature.size} {creature.type}, {creature.alignment}
					</p>
				</div>
				<Button
					type="button"
					variant="secondary"
					className="bg-tower-500 print:hidden text-white border-tower-700 hover:bg-tower-700"
					onClick={loadCreatureValues}
				>
					Edit
				</Button>
			</div>
			<div className="space-y-1">
				<Divider />
				<div className="flex gap-2">
					<h4>Armor Class</h4>
					<p>
						{creature.armor_class}{" "}
						{creature.armor_desc && `(${creature.armor_desc})`}
					</p>
				</div>
				<div className="flex gap-2">
					<h4>Hit Points</h4>
					<p>
						{creature.hit_modifier
							? `${creature.hit_points} (${creature.hit_dice} + ${
									creature.hit_modifier && creature.hit_modifier
							  })`
							: `${creature.hit_points} (${creature.hit_dice})`}
					</p>
				</div>
				<p className="font-yatra">
					Speed <span className="font-sans">{movement}</span>
				</p>
			</div>
			<Divider />
			<div className="grid grid-cols-6 w-fit gap-6 ">
				<Statistic stat="STR" value={creature.strength} />
				<Statistic stat="DEX" value={creature.dexterity} />
				<Statistic stat="CON" value={creature.constitution} />
				<Statistic stat="INT" value={creature.intelligence} />
				<Statistic stat="WIS" value={creature.wisdom} />
				<Statistic stat="CHA" value={creature.charisma} />
			</div>
			<Divider />
			<div>
				<SavingThrows
					strength_save={creature.strength_save}
					dexterity_save={creature.dexterity_save}
					constitution_save={creature.constitution_save}
					intelligence_save={creature.intelligence_save}
					wisdom_save={creature.wisdom_save}
					charisma_save={creature.charisma_save}
				/>
				{skills.length > 0 && (
					<p className="font-yatra">
						Skills <span className="font-sans">{skills}</span>
					</p>
				)}
				{creature.condition_immunities !== "" && (
					<p className="capitalize font-yatra">
						Condition Immunities{" "}
						<span className="font-sans">{creature.condition_immunities}</span>
					</p>
				)}
				{creature.damage_vulnerabilities !== "" && (
					<p className="capitalize font-yatra">
						Damage Vulnerabilities{" "}
						<span className="font-sans">{creature.damage_vulnerabilities}</span>
					</p>
				)}
				{creature.damage_resistances !== "" && (
					<p className="capitalize font-yatra">
						Damage Resistances{" "}
						<span className="font-sans">{creature.damage_resistances}</span>
					</p>
				)}
				{creature.damage_immunities !== "" && (
					<p className="capitalize font-yatra">
						Damage Immunities{" "}
						<span className="font-sans">{creature.damage_immunities}</span>
					</p>
				)}
				<p className="font-yatra">
					Senses <span className="font-sans">{creature.senses}</span>
				</p>
				<p className="capitalize font-yatra">
					Languages <span className="font-sans">{creature.languages}</span>
				</p>
				<div className="flex justify-between">
					<div className="flex gap-2">
						<h4>Challenge Rating</h4>
						<p>
							{creature.challenge_rating} ({exp && exp?.value} XP)
						</p>
					</div>
					<div className="flex gap-2">
						<h4>Proficiency Bonus</h4>
						<p>+{exp && exp.prof}</p>
					</div>
				</div>
			</div>
			<Divider />
			<div className="space-y-3">
				<Actions type="special_abilities" />
				<Actions title="Actions" type="actions" />
				<Actions title="Reactions" type="reactions" />
				<Actions title="Legendary Actions" type="legendary_actions" />
				<Actions title="Mythical Actions" type="mythic_actions" />
				<Actions title="Regional Effects" type="regional_actions" />
			</div>
			{creature.desc && creature.desc?.length > 0 && (
				<div className="space-y-2">
					<h2 className="border-b border-zinc-700">Description</h2>
					<Markdown>{creature.desc}</Markdown>
				</div>
			)}
		</div>
	);
};

Statblock.displayName = "Statblock";

export default Statblock;
