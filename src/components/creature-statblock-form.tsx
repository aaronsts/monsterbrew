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

import { monsterStatblockSchema } from "@/lib/formSchemas";

import { monster_sizes, monster_types } from "@/lib/constants";
import { toast } from "sonner";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import Movement from "./statblock-form/movement";
import AbilityScores from "./statblock-form/ability-scores";
import Skills from "./statblock-form/skills";
import Conditions from "./statblock-form/conditions";
import ChallengeRating from "./statblock-form/challenge-rating";
import SpecialAbilities from "./statblock-form/special-abilities";
import Actions from "./statblock-form/actions";
import Reactions from "./statblock-form/reactions";
import LegendaryActions from "./statblock-form/legendary-actions";
import LairActions from "./statblock-form/lair-actions";

export default function CreatureStatblockForm() {
	const form = useForm<z.infer<typeof monsterStatblockSchema>>({
		resolver: zodResolver(monsterStatblockSchema),
		defaultValues: {
			name: "",
			type: "",
			alignment: "",
			armor_class: 0,
			armor_desc: "",
			hit_dice: "",
			hit_modifier: "",
			speed: {
				walk: 0,
				burrow: 0,
				climb: 0,
				fly: 0,
				swim: 0,
				hover: false,
			},
			challenge_rating: "",
			strength: 10,
			dexterity: 10,
			constitution: 10,
			intelligence: 10,
			wisdom: 10,
			charisma: 10,
			languages: "",
			special_abilities: [],
			actions: [],
			reactions: [],
			legendary_desc: "",
			legendary_actions: [],
			lair_desc: "",
			lair_actions: [],
			damage_vulnerabilities: "",
			damage_resistances: "",
			damage_immunities: "",
			condition_immunities: "",
			spell_list: [],
			strength_save: 0,
			dexterity_save: 0,
			constitution_save: 0,
			intelligence_save: 0,
			wisdom_save: 0,
			charisma_save: 0,
			skills: {},
		},
	});

	function onSubmit(values: z.infer<typeof monsterStatblockSchema>) {
		toast.message("Event has been created.", {
			description: `${values.name} | ${values.armor_class}`,
			duration: 60000,
		});
	}
	return (
		<div className="w-full">
			<h1>Create Creature</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-3 w-full"
				>
					<div className="grid grid-cols-2 gap-6">
						<FormField
							control={form.control}
							name="name"
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
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Monster Type</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													className="placeholder:text-zinc-400"
													placeholder="Select a type"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{monster_types.map((type) => (
												<SelectItem key={type.value} value={type.value}>
													{type.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-2 gap-6">
						<FormField
							control={form.control}
							name="size"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Size</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													className="placeholder:text-zinc-400"
													placeholder="Select a size"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{monster_sizes.map((type) => (
												<SelectItem key={type.value} value={type.value}>
													{type.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="alignment"
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
							name="armor_class"
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
							name="armor_desc"
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
							name="hit_dice"
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
							name="hit_modifier"
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
					<Movement form={form} />
					<ChallengeRating form={form} />
					<AbilityScores form={form} />
					{/* <MonsterSensesForm form={form} /> */}
					<FormField
						control={form.control}
						name="senses"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Senses</FormLabel>
								<FormControl>
									<Input
										placeholder="ex. blindsight 60 ft., darkvision 120 ft., passive Perception 26"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="languages"
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

					<Skills form={form} />
					<Conditions form={form} />
					<SpecialAbilities form={form} />
					<Actions form={form} />
					<Reactions form={form} />
					<div className="flex gap-3 w-full">
						<LegendaryActions form={form} />
						<LairActions form={form} />
					</div>
					<Button type="submit">Create Monster</Button>
				</form>
			</Form>
		</div>
	);
}
