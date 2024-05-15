import Statistic from "./statistic";
import { Divider } from "../ui/divider";
import { CHALLENGE_RATINGS } from "@/lib/constants";
import SavingThrows from "./saving-throws";
import { forwardRef } from "react";
import { useCreaturesStore } from "@/store/zustand";

interface IPdfStatblock {}

const PdfStatblock = forwardRef<HTMLDivElement, IPdfStatblock>(
	(_props, ref) => {
		const { creature } = useCreaturesStore();
		const skills = Object.entries(creature.skills);
		const movement = Object.entries(creature.speed);
		const exp = CHALLENGE_RATINGS.find(
			(rating) => rating.label === creature.challenge_rating
		);

		return (
			<div
				ref={ref}
				className="w-full columns-2 p-12 text-cararra-950 space-y-3"
			>
				<div>
					<h2>{creature.name}</h2>

					<p className="italic capitalize">
						{creature.size} {creature.type}, {creature.alignment}
					</p>
				</div>
				<Divider />
				<div>
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
								if (i === movement.length - 1)
									return `${move[0]} ${move[1]} ft.`;
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
				<div className="space-y-1">
					<SavingThrows
						strength_save={creature.strength_save}
						dexterity_save={creature.dexterity_save}
						constitution_save={creature.constitution_save}
						intelligence_save={creature.intelligence_save}
						wisdom_save={creature.wisdom_save}
						charisma_save={creature.charisma_save}
					/>
					{skills.length > 0 && (
						<p>
							<span className="font-yatra leading-none">Skills </span>

							{skills.map((skill) => (
								<span key={skill[0]}>{`${skill[0]} +${skill[1]}, `}</span>
							))}
						</p>
					)}
					{creature.condition_immunities !== "" && (
						<p>
							<span className="font-yatra leading-none">
								Condition Immunities{" "}
							</span>
							{creature.condition_immunities}
						</p>
					)}
					{creature.damage_vulnerabilities !== "" && (
						<p>
							<span className="font-yatra leading-none">
								Damage Vulnerabilties{" "}
							</span>
							{creature.damage_vulnerabilities}
						</p>
					)}
					{creature.damage_resistances !== "" && (
						<p>
							<span className="font-yatra leading-none">
								Damage Resistances{" "}
							</span>
							{creature.damage_resistances}
						</p>
					)}
					{creature.damage_immunities !== "" && (
						<p>
							<span className="font-yatra leading-none">
								Damage Immunities{" "}
							</span>
							{creature.damage_immunities}
						</p>
					)}
					<p>
						<span className="font-yatra leading-none">Senses </span>
						{creature.senses}
					</p>
					{creature.languages && (
						<p>
							<span className="font-yatra leading-none">Languages </span>
							{creature.languages}
						</p>
					)}
					<div className="flex justify-between">
						<p>
							<span className="font-yatra leading-none">Challenge Rating </span>
							{creature.challenge_rating} ({exp && exp?.value} XP)
						</p>
						<p>
							<span className="font-yatra leading-none">Prof. Bonus </span>+
							{exp && exp.prof}
						</p>
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
	}
);

PdfStatblock.displayName = "PdfStatblock";

export default PdfStatblock;
