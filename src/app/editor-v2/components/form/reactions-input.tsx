import Action from "@/components/statblock-form/action-input";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { addMarkdown } from "@/lib/markdownConverter";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import { Action as ActionType, Creature5e } from "@/types/monster5e";
import { Plus } from "lucide-react";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function ReactionsInput() {
	const { creature, updateCreature } = useCreaturesStoreV2();
	const form = useForm<Creature5e>({
		defaultValues: {
			reactions: addMarkdown(creature!.reactions),
		},
	});
	const { fields, append, remove } = useFieldArray({
		name: "reactions",
		control: form.control,
	});
	const { watch } = form;

	useEffect(() => {
		watch((data) => {
			const reactions = data.reactions as ActionType[] | null;
			if (!reactions) return;
			updateCreature({
				reactions: addMarkdown(reactions),
			});
		});
	}, [updateCreature, watch]);

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
				</Button>
			</div>
			<div>
				<Form {...form}>
					<form>
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
					</form>
				</Form>
			</div>
		</div>
	);
}
