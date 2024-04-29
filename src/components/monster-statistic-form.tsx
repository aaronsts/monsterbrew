import * as z from "zod";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { createMonsterStatblockSchema } from "@/lib/formSchemas";
import { UseFormReturn } from "react-hook-form";

const MonsterStatisticForm = (
	form:
		| UseFormReturn<z.infer<typeof createMonsterStatblockSchema>>
		| any
		| undefined
) => {
	return (
		<div className="grid grid-cols-3 gap-6">
			<FormField
				control={form.control}
				name="monster_stats.str"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Strength (STR)</FormLabel>
						<FormControl>
							<Input placeholder="ex. 27" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="monster_stats.dex"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Dexterity (DEX)</FormLabel>
						<FormControl>
							<Input placeholder="ex. 22" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="monster_stats.con"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Constitution (CON)</FormLabel>
						<FormControl>
							<Input placeholder="ex. 22" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="monster_stats.int"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Intelligence (INT)</FormLabel>
						<FormControl>
							<Input placeholder="ex. 22" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="monster_stats.wis"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Wisdom (WIS)</FormLabel>
						<FormControl>
							<Input placeholder="ex. 22" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="monster_stats.cha"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Charisma (CHA)</FormLabel>
						<FormControl>
							<Input placeholder="ex. 22" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
};

export default MonsterStatisticForm;
