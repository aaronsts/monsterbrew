import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Checkbox } from "./ui/checkbox";
import { Controller, UseFormReturn, useWatch } from "react-hook-form";
import * as z from "zod";
import { createMonsterStatblockSchema } from "@/lib/formSchemas";
import TiptapEditor from "./tiptap";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Bold, Italic, UnderlineIcon } from "lucide-react";

const MonsterLairForm = (
	form:
		| UseFormReturn<z.infer<typeof createMonsterStatblockSchema>>
		| any
		| undefined
) => {
	const hasLair = useWatch({ control: form.control, name: "has_lair" });
	return (
		<div className="space-y-3 w-full">
			<FormField
				control={form.control}
				name="has_lair"
				render={({ field }) => (
					<FormItem className="flex flex-row items-start gap-3 space-y-0  ">
						<FormControl>
							<Checkbox
								checked={field.value}
								onCheckedChange={field.onChange}
							/>
						</FormControl>
						<div className="space-y-1 leading-none">
							<FormLabel>Has Lair</FormLabel>
						</div>
					</FormItem>
				)}
			/>
			{hasLair ? (
				<FormItem className="min-h-36">
					<FormLabel>Lair Actions</FormLabel>
					<FormControl>
						<Controller
							render={({ field }) => (
								<TiptapEditor
									description={field.value}
									onChange={field.onChange}
								/>
							)}
							name="monster_lair.description"
							defaultValue=""
						/>
					</FormControl>
				</FormItem>
			) : (
				<FormItem className="!cursor-not-allowed h-36 opacity-50">
					<FormLabel>Lair Actions</FormLabel>
					<div className="border border-zinc-200 shadow-sm rounded-md">
						<ToggleGroup className="justify-start p-2" type="multiple">
							<ToggleGroupItem
								className="hover:cursor-not-allowed"
								value="bold"
								aria-label="Toggle bold"
							>
								<Bold className="w-4 h-4" />
							</ToggleGroupItem>
							<ToggleGroupItem
								className="hover:cursor-not-allowed"
								value="italic"
								aria-label="Toggle Italic"
							>
								<Italic className="w-4 h-4" />
							</ToggleGroupItem>
							<ToggleGroupItem
								className="hover:cursor-not-allowed"
								value="underline"
								aria-label="Toggle Underline"
							>
								<UnderlineIcon className="w-4 h-4" />
							</ToggleGroupItem>
						</ToggleGroup>
						<div className="border-t text-zinc-500 prose w-full max-w-full px-3 py-2 text-sm rounded-md min-h-[60px]">
							Detect. The dragon makes a Wisdom (Perception) check.
						</div>
					</div>
				</FormItem>
			)}
		</div>
	);
};

export default MonsterLairForm;
