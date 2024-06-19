import { useCreaturesStoreV2 } from "@/store/creatureStore";
import BaseInformation from "./base-information";
import Stats from "./stats";
import { CHALLENGE_RATINGS } from "@/lib/constants";
import SavingThrows from "@/components/statblock/saving-throws";
import { capitalize } from "@/lib/utils";
import Actions from "./actions";

export default function Statblock() {
	const { creature } = useCreaturesStoreV2();
	if (!creature) return;

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
				<Actions type="special_abilities" />
				<Actions type="actions" />
			</div>
		</div>
	);
}
