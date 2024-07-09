import Action from "@/components/statblock-form/action-input";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { addMarkdown, addMarkdownV2 } from "@/lib/markdownConverter";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import { Action as ActionType, Creature5e } from "@/types/monster5e";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function SpecialTraitsInput() {
	const { creature, updateCreature } = useCreaturesStoreV2();
	const [creatureName, setCreatureName] = useState(creature?.name);
	const form = useForm<Creature5e>({
		defaultValues: {
			special_abilities: addMarkdown(creature!.special_abilities),
		},
	});

	const { watch } = form;

	useEffect(() => {
		setCreatureName(creature?.name);
	}, [creature]);

	useEffect(() => {
		if (creature!.name === creatureName) return;
		if (!creature?.special_abilities) return;
		form.reset({
			special_abilities: addMarkdownV2(creature!.special_abilities),
		});
	}, [creature, creatureName, form]);

	const { fields, append, remove } = useFieldArray({
		name: "special_abilities",
		control: form.control,
	});

	useEffect(() => {
		watch((data) => {
			const specialAbilities = data.special_abilities as ActionType[] | null;
			if (!specialAbilities) return;
			updateCreature({
				special_abilities: addMarkdown(specialAbilities),
			});
		});
	}, [updateCreature, watch]);

	return (
		<div>
			<div className="flex border-cararra-700 pb-2 items-end mb-2 justify-between border-b">
				<h3>Special Ability</h3>
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
									inputName="special_abilities"
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
