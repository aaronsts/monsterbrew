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

export default function Reactions({ form }: IChildForm) {
	const { control } = form;
	const { fields, append, remove } = useFieldArray({
		name: "reactions",
		control,
	});
	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-between">
				<h3 className="leading-tight pb-1">Reactions</h3>
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
			{fields.map((field, index) => (
				<div key={field.id}>
					<FormField
						key={field.id}
						control={form.control}
						name={`reactions.${index}.name`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Reaction Name</FormLabel>
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
						name={`reactions.${index}.desc`}
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
		</div>
	);
}
