import Statistic from "./statistic";
import { Divider } from "../ui/divider";
import { CHALLENGE_RATINGS } from "@/lib/constants";
import SavingThrows from "./saving-throws";
import { useCreaturesStore } from "@/store/zustand";
import { useQuery } from "@tanstack/react-query";
import { getCreature } from "@/services/creatures";
import { useEffect } from "react";

const Statblock = () => {
	const { selectedCreature, setCreature, creature } = useCreaturesStore();
	const { data, isPending, error } = useQuery({
		queryKey: ["creature", selectedCreature],
		queryFn: () => getCreature(selectedCreature),
	});

	useEffect(() => {
		if (!data) return;
		setCreature(data);
	}, [data, setCreature]);

	if (isPending || !creature) return <div className="font-yatra">Loading</div>;
	if (error) return <div>{error.message}</div>;

	const skills = Object.entries(creature.skills);
	const movement = Object.entries(creature.speed);
	const exp = CHALLENGE_RATINGS.find(
		(rating) => rating.label === creature.challenge_rating
	);

	return (
		<div className="w-full text-cararra-950 space-y-3">
			<div>
				<h2>{creature.name}</h2>
				<p className="italic capitalize pb-3">
					{creature.size} {creature.type}, {creature.alignment}
				</p>
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
				<div className="flex gap-2">
					<h4>Speed</h4>
					<p>
						{movement.map((move, i) => {
							if (i === movement.length - 1 && move[0] === "walk")
								return `${move[1]} ft.`;
							if (i === movement.length - 1) return `${move[0]} ${move[1]} ft.`;
							if (move[0] === "walk") return `${move[1]} ft., `;
							return `${move[0]} ${move[1]} ft., `;
						})}
					</p>
				</div>
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
					<div className="flex gap-1">
						<h4>Skills</h4>
						<p>
							{skills.map((skill) => (
								<span key={skill[0]}>{`${skill[0]} +${skill[1]}, `}</span>
							))}
						</p>
					</div>
				)}
				{creature.condition_immunities !== "" && (
					<div className="flex gap-2">
						<h4>Condition Immunities</h4>
						<p className="capitalize">{creature.condition_immunities}</p>
					</div>
				)}
				{creature.damage_vulnerabilities !== "" && (
					<div className="flex gap-2">
						<h4>Damage Vulnerabilties</h4>
						<p className="capitalize">{creature.damage_vulnerabilities}</p>
					</div>
				)}
				{creature.damage_resistances !== "" && (
					<div className="flex gap-2">
						<h4>Damage Resistances</h4>
						<p className="capitalize">{creature.damage_resistances}</p>
					</div>
				)}
				{creature.damage_immunities !== "" && (
					<div className="flex gap-2">
						<h4>Damage Immunities</h4>
						<p className="capitalize">{creature.damage_immunities}</p>
					</div>
				)}
				<div className="flex gap-2">
					<h4>Senses</h4>
					<p className="lowercase">{creature.senses}</p>
				</div>
				{creature.languages && (
					<div className="flex gap-2">
						<h4>Languages</h4>
						<p>{creature.languages}</p>
					</div>
				)}
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
			<div className="py-1 space-y-1.5">
				{creature.special_abilities &&
					creature.special_abilities.map((ability) => (
						<div className="flex gap-2" key={ability.name}>
							<p>
								<span className="font-bold">{ability.name}.</span>{" "}
								{ability.desc}
							</p>
						</div>
					))}
			</div>
			<div className="space-y-2">
				<h2 className="border-b border-zinc-700">Actions</h2>
				{creature.actions &&
					creature.actions.map((ability) => (
						<div className="flex gap-2" key={ability.name}>
							<p>
								<span className="font-bold">{ability.name}.</span>{" "}
								{ability.desc}
							</p>
						</div>
					))}
			</div>
			{creature.legendary_actions &&
				creature.legendary_actions.length !== 0 && (
					<div className="space-y-2">
						<h2 className="border-b border-zinc-700">Legendary Actions</h2>
						<p>{creature.legendary_desc}</p>
						{creature.legendary_actions.map((ability) => (
							<div className="flex gap-2" key={ability.name}>
								<p>
									<span className="font-bold">{ability.name}.</span>{" "}
									{ability.desc}
								</p>
							</div>
						))}
					</div>
				)}
		</div>
	);
};

Statblock.displayName = "Statblock";

export default Statblock;
