import { createMonsterStatblockSchema } from "@/lib/formSchemas";
import * as z from "zod";
import { UseFormReturn } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const MonsterSensesForm = (
	form:
		| UseFormReturn<z.infer<typeof createMonsterStatblockSchema>>
		| any
		| undefined
) => {
	return (
		<div className="grid grid-cols-2 gap-6">
			<FormField
				control={form.control}
				name="monster_senses.blind_sight"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Blind Sight</FormLabel>
						<FormControl>
							<Input placeholder="ex. 20ft." {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="monster_senses.dark_vision"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Dark Vision</FormLabel>
						<FormControl>
							<Input placeholder="ex. 20ft." {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="monster_senses.tremor_sense"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Tremor Sense</FormLabel>
						<FormControl>
							<Input placeholder="ex. 20ft." {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="monster_senses.true_sight"
				render={({ field }) => (
					<FormItem>
						<FormLabel>True Sight</FormLabel>
						<FormControl>
							<Input placeholder="ex. 20ft." {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="monster_senses.unknown_sense"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Unknown</FormLabel>
						<FormControl>
							<Input placeholder="ex. Echolocation 20ft." {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="monster_senses.passive_perception"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Passive Perception</FormLabel>
						<FormControl>
							<Input placeholder="ex. 16" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
};

export default MonsterSensesForm;
