import React, { useEffect, useState } from "react";
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
import { useFieldArray, useWatch } from "react-hook-form";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Accordion } from "../ui/accordion";
import Action from "./action";

export default function LairActions({ form }: IChildForm) {
	const [hasLair, setHasLair] = useState(false);
	const { control } = form;
	const { fields, append, remove } = useFieldArray({
		name: "lair_actions",
		control,
	});

	const lairActions = useWatch({ control: control, name: "lair_actions" });

	const toggleHasLair = () => {
		setHasLair(!hasLair);
	};

	useEffect(() => {
		if (lairActions?.length === 0 || lairActions === null) return;
		setHasLair(true);
		return () => {
			setHasLair(false);
		};
	}, [lairActions]);

	return (
		<div className="w-full">
			<div className="flex items-center border-zinc-700 pb-2 justify-between border-b">
				<h3>Lair Actions</h3>
				<div className="space-x-2 flex items-center">
					<Checkbox
						id="lair-actions"
						checked={hasLair}
						onCheckedChange={toggleHasLair}
					/>
					<Label
						htmlFor="lair-actions"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Has Lair
					</Label>
				</div>
			</div>
			{hasLair && (
				<div className="flex flex-col gap-2">
					<FormField
						control={form.control}
						name="lair_desc"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="ex. The dragon can breathe air and water."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Accordion type="multiple" className="w-full space-y-2">
						{fields.map((field, index) => (
							<Action
								inputName="lair_actions"
								field={field}
								index={index}
								key={field.id}
								form={form}
								remove={remove}
							/>
						))}
					</Accordion>
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
						Add Lair Action
					</Button>
				</div>
			)}
		</div>
	);
}
