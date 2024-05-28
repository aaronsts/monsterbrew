import React from "react";
import { IChildForm } from "./ability-scores";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";

import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import Action from "./action";
import { Accordion } from "../ui/accordion";

export default function SpecialAbilities({ form }: IChildForm) {
	const { control } = form;
	const { fields, append, remove } = useFieldArray({
		name: "special_abilities",
		control,
	});
	return (
		<div>
			<div className="flex border-cararra-700 pb-2 items-end mb-2 justify-between border-b">
				<h3>Special Abilities</h3>
				<Button
					variant="secondary"
					size="sm"
					type="button"
					className="self-end"
					onClick={() => {
						append({ name: "", desc: "" });
					}}
				>
					<Plus className="w-4 h-4 mr-1" />
					Add Ability
				</Button>
			</div>
			<div>
				<Accordion type="multiple" className="w-full space-y-2">
					{fields.map((field, index) => (
						<Action
							inputName="special_abilities"
							field={field}
							index={index}
							key={field.id}
							form={form}
							remove={remove}
						/>
					))}
				</Accordion>
			</div>
		</div>
	);
}
