"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ResponsiveComboBox } from "@/components/ui/combo-responsive";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import { calculateHP } from "@/lib/calculations";
import MovementInput from "./movement-input";
import StatInput from "./stats-input";
import SensesInput from "./senses-input";
import ChallengeRatingInput from "./challenge-rating-input";
import SavingThrowsInput from "./saving-throws-input";
import SkillSavesInput from "./skill-saves-input";
import DamageTypesInput from "./damage-types-input";
import BasicInfoInput from "./basic-info-input";

export default function StatblockForm() {
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
		</div>
	);
}
