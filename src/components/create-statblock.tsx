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

const formSchema = z.object({
	monster_name: z
		.string()
		.min(2, { message: "Monster name must be atleast 2 characters." })
		.max(50),
	monster_type: z.string({ required_error: "Please select a monster type" }),
	monster_sub_type: z.string().optional(),
	monster_size: z.string({ required_error: "Please select a size" }),
	monster_alignment: z
		.string({ required_error: "Please select an alignment" })
		.min(2),
	monster_ac: z.string().min(1, { message: "Please enter an AC value" }),
	monster_ac_type: z.string().optional(),
	monster_hit_die: z.string().regex(new RegExp(/(\d*)d(4|6|8|10|12|20)/gm), {
		message: "Please use a format like 2d20",
	}),
	monster_hit_modifier: z.string().optional(),
	monster_movement: z.string().min(3, {
		message: "Monster name must be atleast 3 characters.",
	}),
});

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
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			monster_name: "",
			monster_sub_type: "",
			monster_alignment: "",
			monster_ac_type: "",
			monster_ac: "",
			monster_hit_die: "",
			monster_hit_modifier: "",
			monster_movement: "",
		},
	});

	const [subTyping, setSubTyping] = useState(false);

	function onSubmit(values: z.infer<typeof formSchema>) {
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
							<FormLabel>Monster Alignment</FormLabel>
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
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default CreateStatblock;
