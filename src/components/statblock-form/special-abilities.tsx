import React from "react";
import { IChildForm } from "./ability-scores";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Controller } from "react-hook-form";
import TiptapEditor from "../tiptap";
import { Input } from "../ui/input";

export default function SpecialAbilities({ form }: IChildForm) {
	return (
		<div>
			<FormField
				control={form.control}
				name="name"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Monster Name</FormLabel>
						<FormControl>
							<Input placeholder="" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormItem className="min-h-36">
				<FormLabel>Lair Actions</FormLabel>
				<FormControl>
					<Controller
						render={({ field }) => (
							<TiptapEditor
								description={field.value}
								onChange={field.onChange}
							/>
						)}
						name="special_abilities.desc"
						defaultValue=""
					/>
				</FormControl>
			</FormItem>
		</div>
	);
}
