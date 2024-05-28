import React, { useEffect, useState } from "react";
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Trash2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import {
	FieldArrayWithId,
	UseFieldArrayRemove,
	UseFormReturn,
	useWatch,
} from "react-hook-form";
import { monsterStatblockSchema } from "@/lib/schemas";
import * as z from "zod";

interface ActionProps {
	inputName:
		| "actions"
		| "special_abilities"
		| "legendary_actions"
		| "lair_actions"
		| "regional_actions"
		| "mythic_actions"
		| "reactions";
	field: FieldArrayWithId<z.infer<typeof monsterStatblockSchema>>;
	form: UseFormReturn<z.infer<typeof monsterStatblockSchema>>;
	remove: UseFieldArrayRemove;
	index: number;
}

export default function Action({
	inputName,
	field,
	form,
	remove,
	index,
}: ActionProps) {
	const { control } = form;
	const [actionName, setActionName] = useState("New Action");
	const [descriptionName, setDescriptionName] = useState("");

	const actionValue = useWatch({
		control: control,
		name: `${inputName}.${index}.name`,
	});
	const descValue = useWatch({
		control: control,
		name: `${inputName}.${index}.desc`,
	});

	useEffect(() => {
		if (actionValue.length === 0) return;
		setActionName(actionValue);
	}, [actionValue]);

	useEffect(() => {
		if (descValue.length === 0) return;
		setDescriptionName(descValue);
	}, [descValue]);

	return (
		<AccordionItem value={field.id}>
			<AccordionTrigger className="truncate ">
				<div className="truncate text-cararra-900 space-x-2">
					<span>{actionName}</span>
					<span>-</span>
					<span className="text-cararra-400">{descriptionName}</span>
				</div>
			</AccordionTrigger>
			<AccordionContent>
				<div className="border-b-2 pb-4 pt-3 first:pt-1 last:border-b-0 border-cararra-500">
					<FormField
						key={field.id}
						control={form.control}
						name={`${inputName}.${index}.name`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ability Name</FormLabel>
								<div className="flex justify-between gap-2 items-center">
									<FormControl>
										<Input className="resize-none" {...field} />
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
						name={`${inputName}.${index}.desc`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
}
