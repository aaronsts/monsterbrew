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

export default function LegendaryActions({ form }: IChildForm) {
	const [isLegendary, setIsLegendary] = useState(false);
	const { control } = form;
	const { fields, append, remove } = useFieldArray({
		name: "legendary_actions",
		control,
	});

	const legendaryActions = useWatch({
		control: control,
		name: "legendary_actions",
	});

	const toggleLegendary = () => {
		setIsLegendary(!isLegendary);
	};

	useEffect(() => {
		if (legendaryActions?.length === 0 || legendaryActions === null) return;
		setIsLegendary(true);
		return () => {
			setIsLegendary(false);
		};
	}, [isLegendary, legendaryActions]);

	return (
		<div className="w-full">
			<div className="flex items-center border-cararra-700 mb-2 pb-2 justify-between border-b">
				<h3>Legendary Actions</h3>
				<div className="space-x-2 flex items-center">
					<Checkbox
						id="legendary-actions"
						checked={isLegendary}
						onCheckedChange={toggleLegendary}
					/>
					<Label
						htmlFor="legendary-actions"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Legendary Creature
					</Label>
				</div>
			</div>
			{isLegendary && (
				<div className="flex flex-col gap-2">
					<FormField
						control={form.control}
						name="legendary_desc"
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
								inputName="legendary_actions"
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
						Add Legendary Action
					</Button>
				</div>
			)}
		</div>
	);
}
