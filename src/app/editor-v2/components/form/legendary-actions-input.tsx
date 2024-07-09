import Action from "@/components/statblock-form/action-input";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addMarkdown } from "@/lib/markdownConverter";
import { useCreaturesStoreV2 } from "@/store/creatureStore";
import { Action as ActionType, Creature5e } from "@/types/monster5e";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function LegendaryActionsInput() {
	const { creature, updateCreature } = useCreaturesStoreV2();
	const [isLegendary, setIsLegendary] = useState<boolean>(false);

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
		if (!creature?.legendary_desc) return;
		creature!.legendary_desc.length > 0
			? setIsLegendary(true)
			: setIsLegendary(false);
	}, [creature]);

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

	function toggleLegendary() {
		setIsLegendary(!isLegendary);
	}

	return (
		<div>
			<div className="flex border-cararra-700 pb-2 items-end mb-2 justify-between border-b">
				<h3>Legendary Actions</h3>
				<div className="flex gap-6">
					<div className="space-x-2 flex items-center">
						<Checkbox
							id="legendary-actions"
							checked={isLegendary}
							onCheckedChange={toggleLegendary}
						/>
						<Label
							htmlFor="legendary-actions"
							className="text-xs font-short font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Legendary Creature
						</Label>
					</div>
					<Button
						variant="secondary"
						size="sm"
						type="button"
						className="self-end px-1 py-0 font-bold gap-1 h-auto border-none w-fit"
						onClick={() => {
							append({ name: "", desc: "" });
						}}
					>
						Add <Plus className="w-4 h-4" />
					</Button>
				</div>
			</div>
			{isLegendary && (
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
			)}
		</div>
	);
}
