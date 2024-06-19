import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { calculateSkillSaves } from "@/lib/calculations";
import { ALL_SKILLS } from "@/lib/constants";
import { capitalize, cn } from "@/lib/utils";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import { Monster5e, Skill } from "@/types/monster5e";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SkillSavesInput() {
	const { creature, updateCreature, challengeRating, skills, setSkills } =
		useCreaturesStoreV2();
	const [selectedSkill, setSelectedSkill] = useState<string>();

	const onSelectSkill = (e: string) => {
		setSelectedSkill(e);
	};

	useEffect(() => {
		if (!creature) return;
		const saves = calculateSkillSaves(creature, challengeRating());
		setSkills(saves);
	}, [challengeRating, creature, setSkills]);

	function addSkill(event: React.MouseEvent<HTMLElement>) {
		if (!creature) return;
		// get skill and stat modifier
		const skill = ALL_SKILLS.find((s) => s.name === selectedSkill);
		if (!skill) {
			toast.error("No Skill found");
			return;
		}
		skill.expert = event.currentTarget.dataset.expert === "true";

		const statBonus =
			Math.floor(
				parseInt(creature[skill.stat as keyof typeof creature] as string) / 2
			) - 5;
		const skillModifier = skill.expert
			? statBonus + challengeRating().prof * 2
			: statBonus + challengeRating().prof;

		// if skill exists, replace it, otherwise add it
		const indexOfSkill = skills.findIndex((skl) => skl.name === skill.name);
		if (indexOfSkill === -1) {
			const sortedSkillList = [...skills, skill].sort((a, b) =>
				a.name.localeCompare(b.name)
			);
			updateCreature({
				skills: { ...creature.skills, [skill.name]: skillModifier },
			});
			setSkills(sortedSkillList);
			return;
		}
		const newSkillList = skills;
		newSkillList.splice(indexOfSkill, 1);
		const sortedSkillList = [...newSkillList, skill].sort((a, b) =>
			a.name.localeCompare(b.name)
		);
		updateCreature({
			skills: { ...creature.skills, [skill.name]: skillModifier },
		});
		setSkills(sortedSkillList);
	}

	function removeSkill(event: React.MouseEvent<HTMLElement>) {
		if (!creature) return;
		if (!event.currentTarget.dataset.index) return;
		const index = parseInt(event.currentTarget.dataset.index);
		const newSkillList = skills.filter((_, i) => i !== index);
		const skill = skills.find((_, i) => i === index);
		if (!skill) return;
		const updatedSkills = creature.skills;
		delete updatedSkills[skill.name];

		updateCreature({ skills: updatedSkills });
		setSkills(newSkillList);
	}

	return (
		<div className="flex flex-col gap-1">
			<div className="space-y-0.5">
				<Label>Saving Throws</Label>
				<div className="flex gap-2 items-center">
					<Button
						type="button"
						onClick={addSkill}
						variant="secondary"
						className="bg-tower-400 border-tower-400 text-tower-50 hover:bg-tower-300 "
						data-expert="false"
					>
						Proficient
					</Button>
					<Button
						type="button"
						className="bg-norway-400 border-norway-400 text-norway-50 hover:bg-norway-300"
						onClick={addSkill}
						variant="secondary"
						data-expert="true"
					>
						Expert
					</Button>
					<Select onValueChange={onSelectSkill}>
						<SelectTrigger data-testid="saving-throws" className="capitalize">
							<SelectValue
								className="placeholder:text-zinc-400"
								placeholder="Select a skill"
							/>
						</SelectTrigger>
						<SelectContent>
							{ALL_SKILLS.map((stat, i) => (
								<SelectItem key={stat.name + i} value={stat.name}>
									{capitalize(stat.name)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
			{skills.length > 0 && (
				<ul className="font-short flex gap-2 pt-2 flex-wrap">
					{skills.map((stat, i) => (
						<li
							key={stat.name + i}
							className={cn(
								"flex gap-1 px-3 py-1 border justify-between items-center sketch-border ",
								stat.expert
									? "bg-norway-100 border-norway-300 text-norway-950"
									: "bg-tower-100 border-tower-300 text-tower-950"
							)}
						>
							<p className="capitalize">
								{stat.name} {stat.expert && "(expert)"}
							</p>
							<button
								onClick={removeSkill}
								data-index={i}
								className="group border-2 p-1.5 sketch-border border-transparent transition-colors hover:border-danger-300"
								type="button"
							>
								<Trash2 className="w-4 h-4 group-hover:text-danger-400 transition-colors" />
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
