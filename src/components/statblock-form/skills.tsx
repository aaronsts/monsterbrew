import { ALL_SKILLS } from "@/lib/constants";

import { FormItem, FormLabel } from "../ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useState } from "react";

import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type IskillList = {
	name: string;
	stat: string;
	expert?: boolean;
};
interface ISkills {
	skillList: IskillList[];
	setSkillList: React.Dispatch<React.SetStateAction<IskillList[]>>;
}

export default function Skills({ skillList, setSkillList }: ISkills) {
	const [selectedSkill, setSelectedSkill] = useState<string>();

	const onSelectSkill = (e: string) => {
		setSelectedSkill(e);
	};

	const addSkill = (event: React.MouseEvent<HTMLElement>) => {
		const skill = ALL_SKILLS.find((s) => s.name === selectedSkill);
		if (!skill) return;
		skill.expert = event.currentTarget.dataset.expert === "true";
		if (skillList.includes(skill)) {
			const newSkillList = [...skillList];
			setSkillList(newSkillList);
			return;
		}
		const newSkillList = [...skillList, skill];
		setSkillList(newSkillList);
	};

	const removeSkill = (event: React.MouseEvent<HTMLElement>) => {
		if (!event.currentTarget.dataset.index) return;
		const index = parseInt(event.currentTarget.dataset.index);
		const newSkillList = skillList.filter((_, i) => i !== index);
		setSkillList(newSkillList);
	};

	return (
		<FormItem className="space-y-2">
			<FormLabel>Skills</FormLabel>
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
				<p className="text-lg font-yatra">In:</p>
				<Select onValueChange={onSelectSkill}>
					<SelectTrigger data-testid="skill-proficiency" className="capitalize">
						<SelectValue
							className="placeholder:text-zinc-400"
							placeholder="Select a skill"
						/>
					</SelectTrigger>
					<SelectContent>
						{ALL_SKILLS.map((type) => (
							<SelectItem
								className="capitalize"
								key={type.name}
								value={type.name}
							>
								{type.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<ul className="font-short gap-2 pt-2 flex flex-wrap">
				{skillList.map((skill, i) => (
					<li
						key={skill.name + i}
						className={cn(
							"flex gap-1 px-3 py-1 border justify-between items-center sketch-border ",
							skill.expert
								? "bg-norway-100 border-norway-300 text-norway-950"
								: "bg-tower-100 border-tower-300 text-tower-950"
						)}
					>
						<p className="capitalize">
							{skill.name} {skill.expert && "(expert)"}
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
		</FormItem>
	);
}
