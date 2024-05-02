import * as z from "zod";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { monsterStatblockSchema } from "@/lib/formSchemas";
import { UseFormReturn } from "react-hook-form";

export interface IChildForm {
	form: UseFormReturn<z.infer<typeof monsterStatblockSchema>>;
}

export default function AbilityScores({ form }: IChildForm) {
	return (
		<div className="grid grid-cols-3 gap-6">
			<FormField
				control={form.control}
				name="strength"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Str</FormLabel>
						<FormControl>
							<Input placeholder="ex. 27" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="dexterity"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Dex</FormLabel>
						<FormControl>
							<Input placeholder="ex. 22" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="constitution"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Con</FormLabel>
						<FormControl>
							<Input placeholder="ex. 22" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="intelligence"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Int</FormLabel>
						<FormControl>
							<Input placeholder="ex. 22" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="wisdom"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Wis</FormLabel>
						<FormControl>
							<Input placeholder="ex. 22" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="charisma"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Cha</FormLabel>
						<FormControl>
							<Input placeholder="ex. 22" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
