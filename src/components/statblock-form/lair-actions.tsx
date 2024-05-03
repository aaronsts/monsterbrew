import React, { useState } from "react";
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
import { Checkbox } from "../ui/checkbox";

export default function LairActions({ form }: IChildForm) {
	const [hasLair, setHasLair] = useState(false);

	const toggleHasLair = () => {
		setHasLair(!hasLair);
	};

	const { control } = form;
	const { fields, append, remove } = useFieldArray({
		name: "lair_actions",
		control,
	});

	return (
		<div className="w-full">
			<div className="flex items-center border-zinc-700 justify-between border-b">
				<h3 className="leading-tight pb-1">Lair Actions</h3>
				<div className="space-x-2 flex items-center">
					<Checkbox id="lair-actions" onCheckedChange={toggleHasLair} />
					<label
						htmlFor="lair-actions"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Has Lair
					</label>
				</div>
			</div>
			{hasLair && (
				<div className="space-y-2">
					<FormField
						control={form.control}
						name={`legendary_desc`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="ex. The dragon can breathe air and water."
										className="resize-none"
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
								name={`legendary_actions.${index}.name`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Legendary Action Name</FormLabel>
										<div className="flex justify-between gap-2 items-center">
											<FormControl>
												<Input
													placeholder="ex. Amphibious"
													className="resize-none"
													{...field}
												/>
											</FormControl>
											<Button
												size="icon"
												variant="destructive"
												type="button"
												onClick={() => {
													remove(index);
												}}
											>
												<Trash2 className="w-5 h-5 transition-colors" />
											</Button>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`legendary_actions.${index}.desc`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="ex. The dragon can breathe air and water."
												className="resize-none"
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
						onClick={() => {
							append({ name: "", desc: "" });
						}}
					>
						<Plus className="w-4 h-4 mr-1" />
						Add L. Action
					</Button>
				</div>
			)}
		</div>
	);
}
