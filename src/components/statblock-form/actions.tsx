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

export default function Actions({ form }: IChildForm) {
	const { control } = form;
	const { fields, append, remove } = useFieldArray({
		name: "actions",
		control,
	});
	return (
		<div>
			<div className="flex border-cararra-700 pb-2 items-end mb-2 justify-between border-b">
				<h3>Actions</h3>
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
					Add Action
				</Button>
			</div>
			<div>
				{fields.map((field, index) => (
					<div
						key={field.id}
						className="border-b-2 pb-4 pt-3 first:pt-1 last:border-b-0 border-cararra-500"
					>
						<FormField
							key={field.id}
							control={form.control}
							name={`actions.${index}.name`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ability Name</FormLabel>
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
							name={`actions.${index}.desc`}
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
		</div>
	);
}
