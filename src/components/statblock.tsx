import { Monster5e } from "@sturlen/open5e-ts";
import Statistic from "./statblock/statistic";
import { Divider } from "./ui/divider";
import { challenge_ratings } from "@/lib/constants";

const Statblock = ({ creature }: { creature: Monster5e }) => {
	const skills = Object.entries(creature.skills);
	const movement = Object.entries(creature.speed);
	const exp = Object.entries(challenge_ratings)
		.filter((key) => key[0] === creature.challenge_rating)
		.map((item) => item[1]);

	console.log(creature);
	return (
		<div className="w-full space-y-3">
			<div>
				<h1 className="leading-none">{creature.name}</h1>
				<p className="italic">
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
						{creature.hit_points} {`(${creature.hit_dice})`}
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
				<div className="flex gap-2">
					<h4>Saving Throws</h4>
					<p>
						<span>
							{creature.strength_save && `Str +${creature.strength_save}, `}
						</span>
						<span>
							{creature.dexterity_save && `Dex +${creature.dexterity_save}, `}
						</span>
						<span>
							{creature.constitution_save &&
								`Con +${creature.constitution_save}, `}
						</span>
						<span>
							{creature.intelligence_save &&
								`Int +${creature.intelligence_save}, `}
						</span>
						<span>
							{creature.wisdom_save && `Wis +${creature.wisdom_save}, `}
						</span>
						<span>
							{creature.charisma_save && `Cha +${creature.wisdom_save}`}
						</span>
					</p>
				</div>
				<div className="flex gap-2">
					<h4>Skills</h4>
					<p>
						{skills.map((skill) => (
							<span key={skill[0]}>{`${skill[0]} +${skill[1]}, `}</span>
						))}
					</p>
				</div>
				{creature.damage_vulnerabilities !== "" && (
					<div className="flex gap-2">
						<h4>Damage Vulnerabilties</h4>
						<p>{creature.damage_vulnerabilities}</p>
					</div>
				)}
				{creature.damage_resistances !== "" && (
					<div className="flex gap-2">
						<h4>Damage Resistances</h4>
						<p>{creature.damage_resistances}</p>
					</div>
				)}
				{creature.damage_immunities !== "" && (
					<div className="flex gap-2">
						<h4>Damage Immunities</h4>
						<p>{creature.damage_immunities}</p>
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
							{creature.challenge_rating} ({exp[0].xp} XP)
						</p>
					</div>
					<div className="flex gap-2">
						<h4>Proficiency Bonus</h4>
						<p>+{exp[0].prof}</p>
					</div>
				</div>
			</div>
			<Divider />
			<div className="py-1 space-y-1.5">
				{creature.special_abilities.map((ability) => (
					<div className="flex gap-2" key={ability.name}>
						<p>
							<span className="font-bold">{ability.name}.</span> {ability.desc}
						</p>
					</div>
				))}
			</div>
			<div className="space-y-2">
				<h2 className="border-b border-zinc-700">Actions</h2>
				{creature.actions.map((ability) => (
					<div className="flex gap-2" key={ability.name}>
						<p>
							<span className="font-bold">{ability.name}.</span> {ability.desc}
						</p>
					</div>
				))}
			</div>
			{creature.legendary_actions.length !== 0 && (
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

export default Statblock;
