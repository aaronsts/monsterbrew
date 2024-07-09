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

export default function LairActionsInput() {
	const { creature, updateCreature } = useCreaturesStoreV2();
	const [isLair, setIsLair] = useState<boolean>(false);

	const form = useForm<Creature5e>({
		defaultValues: {
			lair_desc: creature!.lair_desc,
			lair_actions: addMarkdown(creature!.lair_actions),
		},
	});
	const { fields, append, remove } = useFieldArray({
		name: "lair_actions",
		control: form.control,
	});
	const { watch } = form;

	useEffect(() => {
		if (!creature?.lair_desc) return;
		creature!.lair_desc.length > 0 ? setIsLair(true) : setIsLair(false);
	}, [creature]);

	console.log(isLair);

	useEffect(() => {
		watch((data) => {
			const lair_actions = data.lair_actions as ActionType[] | null;
			if (!lair_actions) return;
			updateCreature({
				lair_actions: addMarkdown(lair_actions),
			});
		});
	}, [updateCreature, watch]);

	function handleChange(event: React.FormEvent<HTMLTextAreaElement>) {
		if (!creature) return;
		updateCreature({
			[event.currentTarget.id]: event.currentTarget.value,
		});
	}

	function toggleLair() {
		setIsLair(!isLair);
	}

	return (
		<div>
			<div className="flex border-cararra-700 pb-2 items-end mb-2 justify-between border-b">
				<h3>Lair Actions</h3>
				<div className="flex gap-6">
					<div className="space-x-2 flex items-center">
						<Checkbox
							id="lair-actions"
							checked={isLair}
							onCheckedChange={toggleLair}
						/>
						<Label
							htmlFor="lair-actions"
							className="text-xs font-short font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Has Lair
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
			{isLair && (
				<div>
					<Form {...form}>
						<form>
							<Accordion type="multiple" className="w-full space-y-2">
								<div className="space-y-0.5 col-span-2">
									<Label htmlFor="lair_desc">Description</Label>
									<Textarea
										onChange={handleChange}
										id="lair_desc"
										name="lair_desc"
										value={creature?.lair_desc || ""}
									/>
								</div>
								{fields.map((field, index) => (
									<Action
										inputName="lair_actions"
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
