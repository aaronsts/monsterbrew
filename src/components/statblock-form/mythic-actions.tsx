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

export default function MythicActions({ form }: IChildForm) {
	const [isMythic, setIsMythic] = useState(false);
	const { control } = form;
	const { fields, append, remove } = useFieldArray({
		name: "mythic_actions",
		control,
	});

	const mythicActions = useWatch({
		control: control,
		name: "mythic_actions",
	});

	const toggleMythic = () => {
		setIsMythic(!isMythic);
	};

	useEffect(() => {
		if (mythicActions?.length === 0 || mythicActions === null) return;
		setIsMythic(true);
		return () => {
			setIsMythic(false);
		};
	}, [isMythic, mythicActions]);

	return (
		<div className="w-full">
			<div className="flex items-center border-cararra-700 mb-2 pb-2 justify-between border-b">
				<h3>Mythical Actions</h3>
				<div className="space-x-2 flex items-center">
					<Checkbox
						id="mythic-actions"
						checked={isMythic}
						onCheckedChange={toggleMythic}
					/>
					<Label
						htmlFor="mythic-actions"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Mythic Creature
					</Label>
				</div>
			</div>
			{isMythic && (
				<div className="flex flex-col gap-2">
					<FormField
						control={form.control}
						name="mythic_desc"
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
					{fields.map((field, index) => (
						<div key={field.id}>
							<FormField
								key={field.id}
								control={form.control}
								name={`mythic_actions.${index}.name`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mythic Action Name</FormLabel>
										<div className="flex justify-between gap-2 items-center">
											<FormControl>
												<Input
													placeholder="ex. Amphibious"
													className="resize-none"
													{...field}
												/>
											</FormControl>
											<button
												type="button"
												className="group border-2 p-1.5 sketch-border border-transparent transition-colors hover:border-danger-300"
												onClick={() => {
													remove(index);
												}}
											>
												<Trash2 className="w-5 h-5 text-danger-600 group-hover:text-danger-400 transition-colors" />
											</button>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`mythic_actions.${index}.desc`}
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
						</div>
					))}
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
						Add Mythic Effect
					</Button>
				</div>
			)}
		</div>
	);
}
