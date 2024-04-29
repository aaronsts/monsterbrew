"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ComboBoxResponsive } from "./combo-box";
import { createMonsterStatblockSchema } from "@/lib/formSchemas";
import MonsterStatisticForm from "./monster-statistic-form";
import MonsterSensesForm from "./monster-senses-form";
import MonsterAbilitiesForm from "./monster-abilities-form";
import Tiptap from "./tiptap";

const monster_types = [
	{ label: "Dragon", value: "dragon" },
	{ label: "Giant", value: "giant" },
	{ label: "Humanoid", value: "humanoid" },
	{ label: "Fey", value: "fey" },
];

const monster_sizes = [
	{ label: "Gargantuan", value: "gargantuan" },
	{ label: "Huge", value: "huge" },
	{ label: "Large", value: "large" },
	{ label: "Medium", value: "medium" },
	{ label: "Small", value: "small" },
	{ label: "Tiny", value: "tiny" },
];

const CreateStatblock = () => {
	const form = useForm<z.infer<typeof createMonsterStatblockSchema>>({
		resolver: zodResolver(createMonsterStatblockSchema),
		defaultValues: {
			monster_name: "",
			monster_sub_type: "",
			monster_alignment: "",
			monster_ac_type: "",
			monster_ac: "",
			monster_hit_die: "",
			monster_hit_modifier: "",
			monster_movement: "",
			monster_stats: {
				str: "",
				dex: "",
				con: "",
				int: "",
				wis: "",
				cha: "",
			},
			monster_senses: {
				blind_sight: "",
				dark_vision: "",
				tremor_sense: "",
				true_sight: "",
				unknown_sense: "",
				passive_perception: "",
			},
			monster_languages: "",
			monster_traits: { description: "" },
			monster_actions: { description: "" },
			monster_bonus_actions: { description: "" },
			monster_reactions: { description: "" },
		},
	});

	const [subTyping, setSubTyping] = useState(false);

	function onSubmit(values: z.infer<typeof createMonsterStatblockSchema>) {
		console.log(values);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="monster_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Monster Name</FormLabel>
							<FormControl>
								<Input placeholder="ex. Ancient Black Dragon" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div>
					<FormField
						control={form.control}
						name="monster_type"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Monster Type</FormLabel>
								<FormControl>
									<ComboBoxResponsive options={monster_types} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<button
						type="button"
						className="text-sm underline block mt-2 text-zinc-700"
						onClick={() => setSubTyping(true)}
					>
						Add monster sub-type
					</button>
				</div>
				{subTyping && (
					<FormField
						control={form.control}
						name="monster_sub_type"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Monster Sub-type</FormLabel>
								<FormControl>
									<Input
										placeholder="Choose a sub-typing if applicable"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				<div className="grid grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="monster_size"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Size</FormLabel>
								<FormControl>
									<ComboBoxResponsive options={monster_sizes} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="monster_alignment"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Monster Alignment</FormLabel>
								<FormControl>
									<Input placeholder="ex. Chaotic Evil" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="monster_ac"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Armor Class (AC)</FormLabel>
								<FormControl>
									<Input type="number" placeholder="ex. 22" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="monster_ac_type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Armor Class Type</FormLabel>
								<FormControl>
									<Input placeholder="ex. Natural Armor" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="monster_hit_die"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Hit Die</FormLabel>
								<FormControl>
									<Input placeholder="ex. 21d20" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="monster_hit_modifier"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Hit Points Modifier</FormLabel>
								<FormControl>
									<Input type="number" placeholder="ex. 147" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="monster_movement"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Movement</FormLabel>
							<FormControl>
								<Input
									placeholder="ex. 40 ft., fly 80 ft., swim 40 ft."
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<MonsterStatisticForm form={form} />
				<MonsterSensesForm form={form} />
				<FormField
					control={form.control}
					name="monster_languages"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Languages</FormLabel>
							<FormControl>
								<Input placeholder="ex. Draconic, Common" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<MonsterAbilitiesForm form={form} />
				<Tiptap />
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default CreateStatblock;
