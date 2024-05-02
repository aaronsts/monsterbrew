import { ALL_SKILLS } from "@/lib/constants";

import { FormField, FormItem, FormLabel } from "../ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { IChildForm } from "./ability-scores";
import { useState } from "react";

import { Button } from "../ui/button";
import { Trash2, X } from "lucide-react";

export default function Skills({ form }: IChildForm) {
	const [selectedSkill, setSelectedSkill] = useState<string>();

	const [skillList, setSkillList] = useState<
		{ name: string; stat: string; expert?: boolean }[]
	>([]);

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
		<FormItem>
			<FormLabel>Skills</FormLabel>
			<div className="flex gap-2 pb-3 items-center">
				<Button type="button" onClick={addSkill} data-expert="false">
					Proficient
				</Button>
				<Button type="button" onClick={addSkill} data-expert="true">
					Expert
				</Button>
				<p className="text-lg">With:</p>
				<Select onValueChange={onSelectSkill}>
					<SelectTrigger className="capitalize">
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
			<ul>
				{skillList.map((skill, i) => (
					<li
						key={skill.name + i}
						className="flex gap-2 justify-between h-10 items-center border-t first:border-t-0"
					>
						<p className="capitalize">
							{skill.name} {skill.expert && "(expert)"}
						</p>
						<button
							onClick={removeSkill}
							data-index={i}
							className="group"
							type="button"
						>
							<Trash2 className="w-4 h-4 group-hover:text-red-400 transition-colors" />
						</button>
					</li>
				))}
			</ul>
		</FormItem>
	);
}
