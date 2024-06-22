import Action from "@/components/statblock-form/action-input";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addMarkdown } from "@/lib/markdownConverter";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import { Action as ActionType, Creature5e } from "@/types/monster5e";
import { Plus } from "lucide-react";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function LegendaryActionsInput() {
	const { creature, updateCreature } = useCreaturesStoreV2();
	const form = useForm<Creature5e>({
		defaultValues: {
			legendary_desc: creature!.legendary_desc,
			legendary_actions: addMarkdown(creature!.legendary_actions),
		},
	});
	const { fields, append, remove } = useFieldArray({
		name: "legendary_actions",
		control: form.control,
	});
	const { watch } = form;

	useEffect(() => {
		watch((data) => {
			const legendary_actions = data.legendary_actions as ActionType[] | null;
			if (!legendary_actions) return;
			updateCreature({
				legendary_actions: addMarkdown(legendary_actions),
			});
		});
	}, [updateCreature, watch]);

	function handleChange(event: React.FormEvent<HTMLTextAreaElement>) {
		if (!creature) return;
		updateCreature({
			[event.currentTarget.id]: event.currentTarget.value,
		});
	}

	return (
		<div>
			<div className="flex border-cararra-700 pb-2 items-end mb-2 justify-between border-b">
				<h3>Legendary Actions</h3>
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
							<div className="space-y-0.5 col-span-2">
								<Label htmlFor="legendary_desc">Description</Label>
								<Textarea
									onChange={handleChange}
									id="legendary_desc"
									name="legendary_desc"
									value={creature?.legendary_desc || ""}
								/>
							</div>
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
					</form>
				</Form>
			</div>
		</div>
	);
}
