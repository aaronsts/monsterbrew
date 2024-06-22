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

export default function ActionsInput() {
	const { creature, updateCreature } = useCreaturesStoreV2();
	const form = useForm<Creature5e>({
		defaultValues: {
			actions: addMarkdown(creature!.actions),
		},
	});
	const { fields, append, remove } = useFieldArray({
		name: "actions",
		control: form.control,
	});
	const { watch } = form;

	useEffect(() => {
		watch((data) => {
			const actions = data.actions as ActionType[] | null;
			if (!actions) return;
			updateCreature({
				actions: addMarkdown(actions),
			});
		});
	}, [updateCreature, watch]);

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
				</Button>
			</div>
			<div>
				<Form {...form}>
					<form>
						<Accordion type="multiple" className="w-full space-y-2">
							{fields.map((field, index) => (
								<Action
									inputName="actions"
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
