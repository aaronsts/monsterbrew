import React from "react";
import { IChildForm } from "./ability-scores";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { monster_sizes, monster_types } from "@/lib/constants";

export default function BaseCreatureInfo({ form }: IChildForm) {
	return (
		<div className="grid grid-cols-4 gap-3 border-b border-zinc-700 pb-6">
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
						<Select onValueChange={field.onChange} defaultValue={field.value}>
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
			<FormField
				control={form.control}
				name="size"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel>Size</FormLabel>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger>
									<SelectValue
										className="placeholder:text-zinc-400"
										placeholder="Select a size"
									/>
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{monster_sizes.map((size) => (
									<SelectItem key={size.value} value={size.value}>
										{size.label}
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
	);
}
