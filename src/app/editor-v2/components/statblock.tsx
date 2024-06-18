import { useCreaturesStoreV2 } from "@/store/creatureStore";
import BaseInformation from "./base-information";
import Stats from "./stats";
import { CHALLENGE_RATINGS } from "@/lib/constants";
import SavingThrows from "@/components/statblock/saving-throws";
import { capitalize } from "@/lib/utils";

export default function Statblock() {
	const { creature } = useCreaturesStoreV2();
	const senses = creature.senses?.split(" passive") || "";
	const challengeRating = CHALLENGE_RATINGS.find(
		(cr) => creature.challenge_rating === cr.label
	);

	const skills = Object.entries(creature.skills)
		.map((skl) => `${capitalize(skl[0])} +${skl[1]}`)
		.sort()
		.join(", ");

	return (
		<div className="w-full print:columns-2 text-cararra-950 space-y-3">
			<BaseInformation />
			<Stats />
			<div className="">
				<SavingThrows
					strength_save={creature.strength_save}
					dexterity_save={creature.dexterity_save}
					constitution_save={creature.constitution_save}
					intelligence_save={creature.intelligence_save}
					wisdom_save={creature.wisdom_save}
					charisma_save={creature.charisma_save}
				/>
				{skills.length > 0 && (
					<div className="flex gap-2 items-center">
						<h4 className="font-yatra">Skills</h4>
						<p className="font-sans leading-relaxed inline-block">{skills}</p>
					</div>
				)}
				<div className="flex gap-2 items-center">
					<h4 className="font-yatra">Sense</h4>
					<p className="font-sans leading-relaxed inline-block">{senses[0]}</p>
				</div>
				<div className="flex gap-2 items-center">
					<h4 className="font-yatra">Languages</h4>
					<p className="font-sans leading-relaxed inline-block">
						{creature.languages}
					</p>
				</div>
				{creature.damage_vulnerabilities !== "" && (
					<div className="flex gap-2 items-center">
						<h4 className="font-yatra">Vulnerabilities</h4>
						<p className="font-sans capitalize leading-relaxed inline-block">
							{creature.damage_vulnerabilities}
						</p>
					</div>
				)}
				{creature.damage_resistances !== "" && (
					<div className="flex gap-2 items-center">
						<h4 className="font-yatra">Resistances</h4>
						<p className="font-sans capitalize leading-relaxed inline-block">
							{creature.damage_resistances}
						</p>
					</div>
				)}
				{creature.damage_immunities !== "" && (
					<div className="flex gap-2 items-center">
						<h4 className="font-yatra">Immunities</h4>
						<p className="font-sans capitalize leading-relaxed inline-block">
							{creature.damage_immunities}
						</p>
					</div>
				)}
				<div className="flex justify-between">
					<div className="flex gap-2 items-center">
						<h4 className="font-yatra">Challenge Rating</h4>
						<p className="font-sans leading-relaxed inline-block">
							{challengeRating?.label} ({challengeRating?.value} XP)
						</p>
					</div>
					<div className="flex gap-2 items-center">
						<h4 className="font-yatra">Proficiency Bonus</h4>
						<p className="font-sans leading-relaxed inline-block">
							+{challengeRating?.prof}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
