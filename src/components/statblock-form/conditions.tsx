import React from "react";
import { IChildForm } from "./ability-scores";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Conditions({ form }: IChildForm) {
	return (
		<div>
			<div className="flex gap-2 items-end">
				<Select onValueChange={onSelectSkill}>
					<SelectTrigger>
						<SelectValue
							className="placeholder:text-zinc-400"
							placeholder="Select a skill"
						/>
					</SelectTrigger>
					<SelectContent>
						{ALL_SKILLS.map((type) => (
							<SelectItem key={type.name} value={type.name}>
								{type.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button type="button" onClick={addSkill} data-expert="false">
					Proficient
				</Button>
				<Button type="button" onClick={addSkill} data-expert="true">
					Expert
				</Button>
			</div>
			<div>
				{skillList.map((skill, i) => (
					<p key={skill.name + i}>
						<Button
							onClick={removeSkill}
							data-index={i}
							size="icon"
							type="button"
						>
							<X />
						</Button>
						{skill.name} {skill.expert && "EXP"}
					</p>
				))}
			</div>
		</div>
	);
}

// damage_vulnerabilities: "",
// 			damage_resistances: "",
// 			damage_immunities: "",
// 			condition_immunities: "",
