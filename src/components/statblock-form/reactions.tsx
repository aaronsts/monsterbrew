import React from "react";
import { IChildForm } from "./ability-scores";
import { useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Accordion } from "../ui/accordion";
import Action from "./action";

export default function Reactions({ form }: IChildForm) {
	const { control } = form;
	const { fields, append, remove } = useFieldArray({
		name: "reactions",
		control,
	});
	return (
		<div>
			<div className="flex border-cararra-700 pb-2 items-end mb-2 justify-between border-b">
				<h3>Reactions</h3>
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
					Add Reaction
				</Button>
			</div>
			<Accordion type="multiple" className="w-full space-y-2">
				{fields.map((field, index) => (
					<Action
						inputName="reactions"
						field={field}
						index={index}
						key={field.id}
						form={form}
						remove={remove}
					/>
				))}
			</Accordion>
		</div>
	);
}
