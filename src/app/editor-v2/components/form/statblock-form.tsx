"use client";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import MovementInput from "./movement-input";
import StatInput from "./stats-input";
import SensesInput from "./senses-input";
import ChallengeRatingInput from "./challenge-rating-input";
import SavingThrowsInput from "./saving-throws-input";
import SkillSavesInput from "./skill-saves-input";
import DamageTypesInput from "./damage-types-input";
import BasicInfoInput from "./basic-info-input";
import ConditionTypesInput from "./condition-types-input";
import ActionsInput from "./actions-input";
import SpecialTraitsInput from "./special-traits-input";
import ReactionsInput from "./reactions-input";

export default function StatblockForm() {
	const { creature } = useCreaturesStoreV2();
	return (
		<div className="space-y-3">
			<BasicInfoInput />
			<ChallengeRatingInput />
			<hr className="h-px bg-cararra-400 border-0" />
			<MovementInput />
			<StatInput />
			<hr className="h-px bg-cararra-400 border-0" />
			<SensesInput />
			<SavingThrowsInput />
			<SkillSavesInput />
			<DamageTypesInput />
			<ConditionTypesInput />
			{creature && (
				<>
					<SpecialTraitsInput />
					<ActionsInput />
					<ReactionsInput />
				</>
			)}
		</div>
	);
}
