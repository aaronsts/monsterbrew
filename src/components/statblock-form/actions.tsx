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
		<div className="space-y-2">
			<h3 className="border-b border-zinc-700 leading-tight pb-1">Actions</h3>
			{fields.map((field, index) => (
				<div key={field.id}>
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
						name={`actions.${index}.desc`}
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
				Add Action
			</Button>
		</div>
	);
}
