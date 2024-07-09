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

export default function MythicActionsInput() {
	const { creature, updateCreature } = useCreaturesStoreV2();
	const [isMythic, setIsMythic] = useState<boolean>(false);

	const form = useForm<Creature5e>({
		defaultValues: {
			mythic_desc: creature!.mythic_desc,
			mythic_actions: addMarkdown(creature!.mythic_actions),
		},
	});
	const { fields, append, remove } = useFieldArray({
		name: "mythic_actions",
		control: form.control,
	});
	const { watch } = form;

	useEffect(() => {
		if (!creature?.mythic_desc) return;
		creature!.mythic_desc.length > 0 ? setIsMythic(true) : setIsMythic(false);
	}, [creature]);

	useEffect(() => {
		watch((data) => {
			const mythic_actions = data.mythic_actions as ActionType[] | null;
			if (!mythic_actions) return;
			updateCreature({
				mythic_actions: addMarkdown(mythic_actions),
			});
		});
	}, [updateCreature, watch]);

	function handleChange(event: React.FormEvent<HTMLTextAreaElement>) {
		if (!creature) return;
		updateCreature({
			[event.currentTarget.id]: event.currentTarget.value,
		});
	}

	function toggleMythic() {
		setIsMythic(!isMythic);
	}

	return (
		<div>
			<div className="flex border-cararra-700 pb-2 items-end mb-2 justify-between border-b">
				<h3>Mythic Actions</h3>
				<div className="flex gap-6">
					<div className="space-x-2 flex items-center">
						<Checkbox
							id="mythic-actions"
							checked={isMythic}
							onCheckedChange={toggleMythic}
						/>
						<Label
							htmlFor="mythic-actions"
							className="text-xs font-short font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Mythic Creature
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
			{isMythic && (
				<div>
					<Form {...form}>
						<form>
							<Accordion type="multiple" className="w-full space-y-2">
								<div className="space-y-0.5 col-span-2">
									<Label htmlFor="mythic_desc">Description</Label>
									<Textarea
										onChange={handleChange}
										id="mythic_desc"
										name="mythic_desc"
										value={creature?.mythic_desc || ""}
									/>
								</div>
								{fields.map((field, index) => (
									<Action
										inputName="mythic_actions"
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
