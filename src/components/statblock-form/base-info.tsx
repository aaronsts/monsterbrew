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
import { monster_types, monster_sizes } from "@/lib/constants";
import { ComboBoxResponsive } from "../combo-box";

export default function BaseCreatureInfo({ form }: IChildForm) {
	return (
		<div className="grid grid-cols-3 gap-3">
			<FormField
				control={form.control}
				name="name"
				render={({ field }) => (
					<FormItem className="col-span-2">
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
						<FormControl>
							<ComboBoxResponsive options={monster_types} {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="size"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Monster Size</FormLabel>
						<FormControl>
							<ComboBoxResponsive options={monster_sizes} {...field} />
						</FormControl>
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
